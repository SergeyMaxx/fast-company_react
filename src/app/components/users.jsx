import React, {useEffect, useState} from 'react'
import User from './user'
import {paginate} from '../utils/paginate'
import Pagination from './pagination'
import PropTypes from 'prop-types'
import GroupList from './groupList'
import api from '../api'
import SearchStatus from './searchStatus'

const Users = ({users, onDelete, onToggleBookMark}) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [professions, setProfessions] = useState(null)
  const [selectedProf, setSelectedProf] = useState()

  const pageSize = 4
  const pageCount = Math.ceil(users.length / pageSize)

  useEffect(() => {
    if (currentPage > pageCount) {
      setCurrentPage(pageCount)
    }
  }, [users.length, currentPage, pageCount])

  useEffect(() => {
    api.professions().then(data => setProfessions(data))
  }, [])

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedProf])

  const filteredUser = selectedProf
    ? users.filter(u => u.profession._id === selectedProf._id)
    : users

  const count = filteredUser.length
  const userCrop = paginate(filteredUser, currentPage, pageSize)

  return (
    <div className="d-flex">
      {professions && (
        <div className="d-flex flex-column flex-shrink-0 p-3">
          <GroupList
            selectedItem={selectedProf}
            items={professions}
            onItemSelect={item => setSelectedProf(item)}
          />
          <button className="btn  btn-secondary mt-2" onClick={() => setSelectedProf(null)}>
            Очистить
          </button>
        </div>
      )}
      <div className="d-flex flex-column">
        <SearchStatus length={count}/>
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
        <div className="d-flex justify-content-center">
          {count > pageSize &&
            <Pagination
              pageCount={pageCount}
              currentPage={currentPage}
              onPageChange={pageIndex => setCurrentPage(pageIndex)}
            />
          }
        </div>
      </div>
    </div>
  )
}

Users.propTypes = {
  onDelete: PropTypes.func.isRequired,
  onToggleBookMark: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.object)
}

export default Users