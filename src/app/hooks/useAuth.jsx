import React, {useContext, useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {toast} from 'react-toastify'
import axios from 'axios'
import userService from '../services/user.service'
import {setTokens} from '../services/localStorage.service'

const httpAuth = axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com/v1/',
  params: {key: process.env.REACT_APP_FIREBASE_KEY}
})

const AuthContext = React.createContext(null)

export const useAuth = () => useContext(AuthContext)

const AuthProvider = ({children}) => {
  const [currentUser, setUser] = useState({})
  const [error, setError] = useState(null)

  const signIn = async ({email, password}) => {
    try {
      const {data} = await httpAuth.post(`accounts:signInWithPassword`, {
        email,
        password,
        returnSecureToken: true
      })
      setTokens(data)

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

  async function signUp({email, password, ...rest}) {
    try {
      const {data} = await httpAuth.post(`accounts:signUp`, {
        email,
        password,
        returnSecureToken: true
      })
      setTokens(data)
      await createUser({_id: data.localId, email, ...rest})

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
      const {content} = userService.create(data)
      setUser(content)

    } catch (error) {
      errorCatcher(error)
    }
  }

  function errorCatcher(error) {
    const {message} = error.response.data
    setError(message)
  }

  useEffect(() => {
    if (error !== null) {
      toast(error)
      setError(null)
    }
  }, [error])

  return (
    <AuthContext.Provider value={{signUp, signIn, currentUser}}>
      {children}
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