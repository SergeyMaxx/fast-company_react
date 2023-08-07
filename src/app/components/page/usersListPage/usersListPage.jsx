import React, {useEffect, useState} from 'react'
import {paginate} from '../../../utils/paginate'
import Pagination from '../../common/pagination'
import GroupList from '../../common/groupList'
import SearchStatus from '../../UI/searchStatus'
import UsersTable from '../../UI/usersTable'
import _ from 'lodash'
import {useUser} from '../../../hooks/useUsers'
import {useAuth} from '../../../hooks/useAuth'
import {useSelector} from 'react-redux'
import {getProfessions, getProfessionsLoadingStatus} from '../../../store/professions'

const UsersListPage = () => {
  const {users, setUsers} = useUser()
  const {currentUser} = useAuth()
  const professions = useSelector(getProfessions())
  const professionsLoading = useSelector(getProfessionsLoadingStatus())
  const [currentPage, setCurrentPage] = useState(1)
  const [search, setSearch] = useState('')
  const [selectedProf, setSelectedProf] = useState()
  const [sortBy, setSortBy] = useState({path: 'name', order: 'asc'})
  const pageSize = 8

  const handleSelectProf = item => {
    search.trim() && setSearch('')
    setSelectedProf(item)
  }

  const handleSearch = ({target}) => {
    setSelectedProf(undefined)
    setSearch(target.value)
  }

  const handleToggleBookMark = id => {
    const newArray = users.map(user => user._id === id
      ? {...user, bookmark: !user.bookmark}
      : user
    )
    setUsers(newArray)
  }

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedProf, search])

  if (users) {
    const filterUser = selectedProf
      ? users.filter(u => u.profession === selectedProf._id)
      : users

    const filteredUser = search
      ? users.filter(u => u.name.toLowerCase().includes(search))
      : filterUser

    const filteredUsers = filteredUser.filter(u => u._id !== currentUser._id)
    const count = filteredUsers.length
    const sortedUser = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order])
    const userCrop = paginate(sortedUser, currentPage, pageSize)

    return (
      <div className="d-flex">
        {professions && !professionsLoading && (
          <div className="d-flex flex-column flex-shrink-0 p-3">
            <GroupList
              selectedItem={selectedProf}
              items={professions}
              onItemSelect={handleSelectProf}
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
          <input
            type="text"
            onChange={handleSearch}
            placeholder="Search"
            className="form-control"
            value={search}
          />
          {count > 0 && (
            <UsersTable
              users={userCrop}
              onSort={item => setSortBy(item)}
              selectedSort={sortBy}
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
  return <h3>'Loading...'</h3>
}

export default UsersListPage