import React from 'react'
import PropTypes from 'prop-types'
import Quality from './quality'
import {useQualities} from '../../../hooks/useQualities'

const QualitiesList = ({qualities}) => {
  const {isLoading} = useQualities()

  if (isLoading) {
    return <h3>'Loading...'</h3>
  }

  return (
    <>
      {qualities.map(q => <Quality key={q} id={q}/>)}
    </>
  )
}

QualitiesList.propTypes = {
  qualities: PropTypes.arrayOf(PropTypes.string)
}

export default QualitiesList