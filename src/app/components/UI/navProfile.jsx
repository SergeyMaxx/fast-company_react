import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {getCurrentUserData} from '../../store/users'

function NavProfile() {
  const currentUser = useSelector(getCurrentUserData())
  const [isOpen, setOpen] = useState(false)

  if (!currentUser) return "Loading..."

  return (
    <div className="dropdown" onClick={() => setOpen(!isOpen)}>
      <div className="btn dropdown-toggle d-flex align-items-center">
        <div className="me-5">{currentUser.name}</div>
        <img
          src={currentUser.image}
          alt="avatar"
          height="40"
          className="img-responsive rounded-circle"
        />
      </div>
      <div className={'w-100 dropdown-menu' + (isOpen ? ' show' : '')}>
        <Link
          to={`/users/${currentUser._id}`}
          className="dropdown-item"
        >
          Profile
        </Link>
        <Link to="/logout" className="dropdown-item">
          Log Out
        </Link>
      </div>
    </div>
  )
}

export default NavProfile