import React, {useEffect, useState} from 'react'
import Users from './components/users'
import api from './api'

function App() {
  const [users, setUsers] = useState(null)

  useEffect(() => {
    api.users().then(data => setUsers(data))
  }, [])

  const handleDelete = userId => {
    setUsers(p => p.filter(user => user._id !== userId))
  }

  const handleToggleBookMark = id => {
    setUsers(p => p.map(user => user._id === id
      ? {...user, bookmark: !user.bookmark}
      : user
    ))
  }

  return (
    <div>
      {users &&
        <Users
          users={users}
          onDelete={handleDelete}
          onToggleBookMark={handleToggleBookMark}
        />
      }
    </div>
  )
}

export default App