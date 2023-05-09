import React from 'react'
import PropTypes from 'prop-types'
import Qualities from './qualities'

const QualitiesList = ({qualities}) => {
  return (
    <>
      {qualities.map(q => (
        <Qualities
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