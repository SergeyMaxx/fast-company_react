import React, {useState} from 'react'
import User from './user'
import {paginate} from '../utils/paginate'
import Pagination from './pagination'
import PropTypes from 'prop-types'

const Users = ({users, onDelete, onToggleBookMark}) => {
  const count = users.length
  const pageSize = 4
  const [currentPage, setCurrentPage] = useState(1)
  const userCrop = paginate(users, currentPage, pageSize)

  return (
    <>
      {users.length > 0 && (
        <table className="table">
          <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качества</th>
            <th scope="col">Профессия</th>
            <th scope="col">Встретился, раз</th>
            <th scope="col">Оценка</th>
            <th scope="col">Избранное</th>
            <th/>
          </tr>
          </thead>
          <tbody>
          {userCrop.map(user => (
            <User
              key={user._id}
              onDelete={onDelete}
              onToggleBookMark={onToggleBookMark}
              user={user}
            />
          ))}
          </tbody>
        </table>
      )}
      <Pagination
        itemsCount={count}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={pageIndex => setCurrentPage(pageIndex)}
      />
    </>
  )
}

User.propTypes = {
  onDelete: PropTypes.func.isRequired,
  onToggleBookMark: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired
}

export default Users