import React, {useEffect, useState} from 'react'
import {paginate} from '../utils/paginate'
import Pagination from './pagination'
import GroupList from './groupList'
import api from '../api'
import SearchStatus from './searchStatus'
import UsersTable from './usersTable'
import _ from 'lodash'

const UsersList = () => {
  const [users, setUsers] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [professions, setProfessions] = useState(null)
  const [selectedProf, setSelectedProf] = useState()
  const [sortBy, setSortBy] = useState({path: 'name', order: 'asc'})
  const pageSize = 4

  useEffect(() => {
    api.users.fetchAll().then(data => setUsers(data))
  }, [])

  useEffect(() => {
    api.professions().then(data => setProfessions(data))
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

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedProf])

  if (users) {
    const filteredUser = selectedProf
      ? users.filter(u => u.profession._id === selectedProf._id)
      : users

    const count = filteredUser.length
    const sortedUser = _.orderBy(filteredUser, [sortBy.path], [sortBy.order])
    const userCrop = paginate(sortedUser, currentPage, pageSize)

    return (
      <div className="d-flex">
        {professions && (
          <div className="d-flex flex-column flex-shrink-0 p-3">
            <GroupList
              selectedItem={selectedProf}
              items={professions}
              onItemSelect={item => setSelectedProf(item)}
            />
            <button
              className="btn  btn-secondary mt-2"
              onClick={() => setSelectedProf(null)}
            >
              Очистить
            </button>
          </div>
        )}
        <div className="d-flex flex-column">
          <SearchStatus length={count}/>
          {count > 0 && (
            <UsersTable
              users={userCrop}
              onSort={item => setSortBy(item)}
              selectedSort={sortBy}
              onDelete={handleDelete}
              onToggleBookMark={handleToggleBookMark}
            />
          )}
          <div className="d-flex justify-content-center">
            <Pagination
              itemsCount={count}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={pageIndex => setCurrentPage(pageIndex)}
            />
          </div>
        </div>
      </div>
    )
  }
  return 'Loading...'
}

export default UsersList