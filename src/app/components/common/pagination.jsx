import React, {useEffect} from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'

const Pagination = ({itemsCount, pageSize, currentPage, onPageChange}) => {
  const pageCount = Math.ceil(itemsCount / pageSize)
  const pages = _.range(1, pageCount + 1)

  useEffect(() => {
    if (currentPage > pageCount) {
      onPageChange(pageCount)
    }
  }, [itemsCount, currentPage, pageCount])

  return (
    <>
      {itemsCount > pageSize &&
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
      }
    </>
  )
}

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
}

export default Pagination