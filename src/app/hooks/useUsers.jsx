import React, {useContext, useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import userService from '../services/user.service'
import {toast} from 'react-toastify'
import {useAuth} from './useAuth'

const UserContext = React.createContext(null)

export const useUser = () => useContext(UserContext)

const UserProvider = ({children}) => {
  const [users, setUsers] = useState([])
  const {currentUser} = useAuth()
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getUsers()
  }, [])

  useEffect(() => {
    if (error !== null) {
      toast(error)
      setError(null)
    }
  }, [error])

  async function getUsers() {
    try {
      const {content} = await userService.get()
      setUsers(content)
      setLoading(false)

    } catch (error) {
      errorCatcher(error)
    }
  }

  useEffect(() => {
    if (!isLoading) {
      const arrUsers = [...users]
      const index = arrUsers.findIndex(u => u._id === currentUser._id)
      arrUsers[index] = currentUser
      setUsers(arrUsers)
    }
  }, [currentUser])

  function errorCatcher(error) {
    const {message} = error.response.data
    setError(message)
    setLoading(false)
  }

  const getUserById = userId => users.find(u => u._id === userId)

  return (
    <UserContext.Provider value={{users, setUsers, getUserById}}>
      {!isLoading ? children : 'Loading...'}
    </UserContext.Provider>
  )
}

UserProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default UserProvider