import React, {useContext, useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {toast} from 'react-toastify'
import axios from 'axios'
import userService from '../services/user.service'
import localStorageService, {setTokens} from '../services/localStorage.service'
import {useHistory} from 'react-router-dom'

export const httpAuth = axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com/v1/',
  params: {key: process.env.REACT_APP_FIREBASE_KEY}
})

const AuthContext = React.createContext(null)

export const useAuth = () => useContext(AuthContext)

const AuthProvider = ({children}) => {
  const [currentUser, setUser] = useState()
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const history = useHistory()

  const login = async ({email, password}) => {
    try {
      const {data} = await httpAuth.post(`accounts:signInWithPassword`, {
        email,
        password,
        returnSecureToken: true
      })
      setTokens(data)
      await getUserData()

    } catch (error) {
      errorCatcher(error)
      const {code, message} = error.response.data.error
      console.log(code, message)

      if (code === 400) {
        switch (message) {
          case 'INVALID_PASSWORD':
            throw new Error('Email or password entered incorrectly')
          case 'EMAIL_NOT_FOUND':
            throw new Error('Email or password entered incorrectly')
          default:
            throw new Error('Too many login attempts try again later')
        }
      }
    }
  }

  function logOut() {
    localStorageService.removeAuthData()
    setUser(null)
    history.push('/')
  }

  const randomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  async function signUp({email, password, ...rest}) {
    try {
      const {data} = await httpAuth.post(`accounts:signUp`, {
        email,
        password,
        returnSecureToken: true
      })
      setTokens(data)
      await createUser({
        _id: data.localId,
        email,
        rate: randomInt(1, 5),
        completedMeetings: randomInt(0, 200),
        image: `https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1)
          .toString(36)
          .substring(7)}.svg`,
        ...rest
      })

    } catch (error) {
      errorCatcher(error)
      const {code, message} = error.response.data.error
      console.log(code, message)

      if (code === 400 && message === 'EMAIL_EXISTS') {
        throw {
          email: 'User with this Email already exists'
        }
      }
    }
  }

  async function createUser(data) {
    try {
      const {content} = await userService.create(data)
      setUser(content)

    } catch (error) {
      errorCatcher(error)
    }
  }

  async function updateUser(data) {
    try {
      const {content} = await userService.update(data)
      setUser(content)

    } catch (error) {
      errorCatcher(error)
    }
  }

  function errorCatcher(error) {
    const {message} = error.response.data
    setError(message)
  }

  async function getUserData() {
    try {
      const {content} = await userService.getCurrentUser()
      setUser(content)

    } catch (error) {
      errorCatcher(error)

    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (localStorageService.getAccessToken()) {
      getUserData()
    } else {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    if (error !== null) {
      toast(error)
      setError(null)
    }
  }, [error])

  return (
    <AuthContext.Provider value={{signUp, login, currentUser, logOut, updateUser}}>
      {!isLoading ? children : 'Loading...'}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default AuthProvider