import React from 'react'
import PropTypes from 'prop-types'

const SearchStatus = ({length}) => {
  const renderPhrase = number => {
    const lastDigit = Number(number.toString().slice(-1))
    return number === 1 || (number > 4 && number < 22) || (lastDigit <= 1 || lastDigit > 4)
      ? 'Человек тусанёт'
      : 'Человека тусанут'
  }

  return (
    <h2>
      <span
        className={'badge ' + (length > 0 ? 'bg-primary' : 'bg-danger')}
      >
        {length
          ? `${length} ${renderPhrase(length)} с тобой сегодня`
          : 'Никто с тобой не тусанет'}
      </span>
    </h2>
  )
}

SearchStatus.propTypes = {
  length: PropTypes.number
}

export default SearchStatus