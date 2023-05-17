import React, {useEffect, useState} from 'react'
import api from '../api'
import {useHistory} from 'react-router-dom'
import PropTypes from 'prop-types'
import QualitiesList from './qualitiesList'

const UserPage = ({id}) => {
  const [userById, setUserById] = useState(null)
  const history = useHistory()

  useEffect(() => {
    api.users.getById(id).then(data => setUserById(data))
  }, [id])

  return (
    userById
      ?
      <div className="mx-4">
        <h1>{userById.name}</h1>
        <h2>
          Профессия: {userById.profession.name}
        </h2>
        <QualitiesList qualities={userById.qualities}/>
        <div>
          completedMeetings: {userById.completedMeetings}
        </div>
        <h2>Rate: {userById.rate}</h2>
        <button onClick={() => history.push('/users')}>
          Все пользователи
        </button>
      </div>
      : <div>Loading...</div>
  )
}

UserPage.propTypes = {
  id: PropTypes.string.isRequired
}

export default UserPage