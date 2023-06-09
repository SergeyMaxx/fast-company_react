import React from 'react'
import PropTypes from 'prop-types'
import {useHistory} from 'react-router-dom'

const UserCard = ({user}) => {
  const history = useHistory()

  return (
    <div className="card mb-3">
      <div className="card-body">
        <button
          onClick={() => history.push(history.location.pathname + '/edit')}
          className="position-absolute top-0 end-0 btn btn-light btn-sm">
          <i className="bi bi-gear"/>
        </button>
        <div className="d-flex flex-column align-items-center text-center position-relative">
          <img
            src={`https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1)
              .toString(36)
              .substring(7)}.svg`
            }
            className="rounded-circle shadow-1-strong me-3"
            alt="avatar"
            width="150"
            height="150"
          />
          <div className="mt-3">
            <h4>{user.name}</h4>
            <p className="text-secondary mb-1">{user.profession.name}</p>
            <div className="text-muted">
              <i className="bi bi-caret-down-fill text-primary" role="button"/>
              <i className="bi bi-caret-up text-secondary" role="button"/>
              <span className="ms-2">{user.rate}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

UserCard.propTypes = {
  user: PropTypes.object
}

export default UserCard