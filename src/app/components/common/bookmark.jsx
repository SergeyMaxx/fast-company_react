import React from 'react'
import PropTypes from 'prop-types'

const BookMark = ({status, remove}) => {
  return (
    <button onClick={remove}>
      <i className={'bi bi-bookmark' + (status ? '-heart-fill' : '')}/>
    </button>
  )
}

BookMark.propTypes = {
  status: PropTypes.bool.isRequired,
  remove: PropTypes.func.isRequired
}

export default BookMark