import React from 'react'
import PropTypes from 'prop-types'
import UserCard from '../../UI/userCard'
import QualitiesCard from '../../UI/qualitiesCard'
import MeetingsCard from '../../UI/meetingsCard'
import Comments from '../../UI/comments'
import {useSelector} from 'react-redux'
import {getUserById} from '../../../store/users'

const UserPage = ({id}) => {
  const user = useSelector(getUserById(id))

  return (
    user
      ? (
        <div className="container">
          <div className="row gutters-sm">
            <div className="col-md-4 mb-3">
              <UserCard user={user}/>
              <QualitiesCard qualities={user.qualities}/>
              <MeetingsCard completedMeetings={user.completedMeetings}/>
            </div>
            <div className=" col-md-8">
              <Comments/>
            </div>
          </div>
        </div>
      )
      : <h3>Loading...</h3>
  )
}

UserPage.propTypes = {
  id: PropTypes.string.isRequired
}

export default UserPage