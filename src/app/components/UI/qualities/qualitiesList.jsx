import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import Quality from './quality'
import {useDispatch, useSelector} from 'react-redux'
import {getQualitiesByIds, getQualitiesLoadingStatus, loadQualitiesList} from '../../../store/qualities'

const QualitiesList = ({qualities}) => {
  const isLoading = useSelector(getQualitiesLoadingStatus())
  const qualitiesList = useSelector(getQualitiesByIds(qualities))
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadQualitiesList())
  }, [])

  if (isLoading) return 'Loading...'

  return (
    <>
      {qualitiesList.map(q => (
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
  qualities: PropTypes.array
}

export default QualitiesList