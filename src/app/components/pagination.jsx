import React from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'

const Pagination = ({pageCount, currentPage, onPageChange}) => {
  const pages = _.range(1, pageCount + 1)

  return (
    <nav>
      <ul className="pagination">
        {pages.map(page => (
          <li
            className={'page-item ' + (page === currentPage ? 'active' : '')}
            key={'page_' + page}
          >
            <button className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

Pagination.propTypes = {
  pageCount: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
}

export default Pagination