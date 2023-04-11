import React from 'react'

const BookMark = ({status, remove}) => {
  return (
    <button onClick={remove}>
      <i className={'bi bi-bookmark' + (status ? '-heart-fill' : '')}/>
    </button>
  )
}

export default BookMark