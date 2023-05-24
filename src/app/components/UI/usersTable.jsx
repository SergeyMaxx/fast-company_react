import React from 'react'
import PropTypes from 'prop-types'
import Bookmark from '../common/bookmark'
import QualitiesList from './qualities/qualitiesList'
import Table from '../common/table/table'
import {Link} from 'react-router-dom'

const UsersTable = ({users, onSort, selectedSort, onToggleBookMark, onDelete}) => {
  const columns = {
    name: {
      path: 'name',
      name: 'Имя',
      component: (user) => <Link to={`/users/${user._id}`}>{user.name}</Link>
    },
    qualities: {
      name: 'Качества',
      component: user => <QualitiesList qualities={user.qualities}/>
    },
    professions: {
      path: 'profession.name',
      name: 'Профессия'
    },
    completedMeetings: {
      path: 'completedMeetings',
      name: 'Встретился, раз'
    },
    rate: {
      path: 'rate',
      name: 'Оценка'
    },
    bookmark: {
      path: 'bookmark',
      name: 'Избранное',
      component: user => (
        <Bookmark
          status={user.bookmark}
          remove={() => onToggleBookMark(user._id)}
        />
      )
    },
    delete: {
      component: user => (
        <button
          onClick={() => onDelete(user._id)}
          className="btn btn-danger"
        >
          delete
        </button>
      )
    }
  }

  return (
    <Table
      onSort={onSort}
      selectedSort={selectedSort}
      columns={columns}
      data={users}
    />
  )
}

UsersTable.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object),
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
  onToggleBookMark: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}

export default UsersTable