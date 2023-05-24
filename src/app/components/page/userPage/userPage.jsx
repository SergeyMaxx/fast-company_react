import React, {useEffect, useState} from 'react'
import api from '../../../api'
import {useHistory} from 'react-router-dom'
import PropTypes from 'prop-types'
import QualitiesList from '../../UI/qualities/qualitiesList'

const UserPage = ({id}) => {
  const [userById, setUserById] = useState(null)
  const history = useHistory()

  useEffect(() => {
    api.users.getById(id).then(data => setUserById(data))
  }, [])

  return (
    userById
      ?
      <div className="mx-4">
        <h1>{userById.name}</h1>
        <h2>Профессия: {userById.profession.name}</h2>
        <QualitiesList qualities={userById.qualities}/>
        <div>completedMeetings: {userById.completedMeetings}</div>
        <h2>Rate: {userById.rate}</h2>
        <button
          className="btn btn-primary"
          onClick={() => history.push(`/users/${id}/edit`)}>
          Изменить
        </button>
      </div>
      : <h3>Loading...</h3>
  )
}

UserPage.propTypes = {
  id: PropTypes.string.isRequired
}

export default UserPage