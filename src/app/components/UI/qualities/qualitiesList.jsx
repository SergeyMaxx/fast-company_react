import React from 'react'
import PropTypes from 'prop-types'
import Quality from './quality'

const QualitiesList = ({qualities}) => {
  return (
    <>
      {qualities.map(q => (
        <Quality
          key={q._id}
          color={q.color}
          name={q.name}
        />
      ))}
    </>
  )
}

QualitiesList.propTypes = {
  qualities: PropTypes.arrayOf(PropTypes.object)
}

export default QualitiesList