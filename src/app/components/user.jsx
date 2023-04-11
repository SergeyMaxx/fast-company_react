import React from 'react'
import Qualities from './qualitie'
import BookMark from './bookmark'

const User = ({onDelete, onToggleBookMark, user}) => {
  return (
    <tr>
      <td>{user.name}</td>
      <td>
        {user.qualities.map(q => (
          <Qualities
            key={q._id}
            color={q.color}
            name={user.name}
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

export default User