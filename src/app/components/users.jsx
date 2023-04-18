import React, {useEffect, useState} from 'react'
import User from './user'
import {paginate} from '../utils/paginate'
import Pagination from './pagination'
import PropTypes from 'prop-types'

const Users = ({users, onDelete, onToggleBookMark}) => {
  const count = users.length
  const pageSize = 4
  const [currentPage, setCurrentPage] = useState(1)
  const userCrop = paginate(users, currentPage, pageSize)
  const pageCount = Math.ceil(count / pageSize)

  useEffect(() => {
    if (currentPage > pageCount) {
      setCurrentPage(pageCount)
    }
  }, [count, currentPage, pageCount])

  return (
    <>
      {count > 0 && (
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
      {count > pageSize &&
        <Pagination
          pageCount={pageCount}
          currentPage={currentPage}
          onPageChange={pageIndex => setCurrentPage(pageIndex)}
        />
      }
    </>
  )
}

Users.propTypes = {
  onDelete: PropTypes.func.isRequired,
  onToggleBookMark: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired
}

export default Users