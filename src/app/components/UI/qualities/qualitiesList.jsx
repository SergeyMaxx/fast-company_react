import React from 'react'
import PropTypes from 'prop-types'
import Quality from './quality'
import {useQualities} from '../../../hooks/useQualities'

const QualitiesList = ({qualities}) => {
  const {isLoading} = useQualities()

  if (isLoading) return 'Loading...'

  return (
    <>
      {qualities.map(q => <Quality key={q} id={q}/>)}
    </>
  )
}

QualitiesList.propTypes = {
  qualities: PropTypes.array
}

export default QualitiesList