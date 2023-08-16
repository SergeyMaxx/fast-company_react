import React from 'react'
import {useParams, Redirect} from 'react-router-dom'
import UserPage from '../components/page/userPage'
import UsersListPage from '../components/page/usersListPage'
import EditUserPage from '../components/page/editUserPage'
import UsersLoader from '../components/UI/hoc/usersLoader'
import {useSelector} from 'react-redux'
import {getCurrentUserId} from '../store/users'

const Users = () => {
  const {userId, edit} = useParams()
  const currentUserId = useSelector(getCurrentUserId())

  return (
    <>
      <UsersLoader>
        {userId
          ? edit
            ? userId === currentUserId
              ? <EditUserPage/>
              : <Redirect to={`/users/${currentUserId}/edit`}/>
            : <UserPage id={userId}/>
          : <UsersListPage/>
        }
      </UsersLoader>
    </>
  )
}

export default Users