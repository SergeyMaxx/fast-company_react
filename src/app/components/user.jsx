import React from 'react'
import Qualities from './qualities'
import BookMark from './bookmark'
import PropTypes from 'prop-types'

const User = ({onDelete, onToggleBookMark, user}) => {
  return (
    <tr>
      <td>{user.name}</td>
      <td>
        {user.qualities.map(q => (
          <Qualities
            key={q._id}
            color={q.color}
            name={q.name}
          />)
        )}
      </td>
      <td>{user.profession.name}</td>
      <td>{user.completedMeetings}</td>
      <td>{user.rate} /5</td>
      <td>
        <BookMark
          status={user.bookmark}
          remove={() => onToggleBookMark(user._id)}
        />
      </td>
      <td>
        <button
          onClick={() => onDelete(user._id)}
          className="btn btn-danger"
        >
          delete
        </button>
      </td>
    </tr>
  )
}

User.propTypes = {
  onDelete: PropTypes.func.isRequired,
  onToggleBookMark: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default User