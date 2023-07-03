import React from 'react'
import {useParams} from 'react-router-dom'
import UserPage from '../components/page/userPage/userPage'
import EditUserPage from '../components/page/editUserPage'
import UsersListPage from '../components/page/usersListPage'
import UserProvider from '../hooks/useUsers'

const Users = () => {
  const {userId, edit} = useParams()

  return (
    <>
      <UserProvider>
        {userId
          ? edit
            ? <EditUserPage/>
            : <UserPage id={userId}/>
          : <UsersListPage/>
        }
      </UserProvider>
    </>
  )
}

export default Users