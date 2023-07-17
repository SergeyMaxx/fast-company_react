import React, {useContext, useEffect, useState} from 'react'
import {toast} from 'react-toastify'
import PropTypes from 'prop-types'
import qualityService from '../services/quality.service'

const QualitiesContext = React.createContext(null)

export const useQualities = () => useContext(QualitiesContext)

export const QualitiesProvider = ({children}) => {
  const [isLoading, setLoading] = useState(true)
  const [qualities, setQualities] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    if (error !== null) {
      toast(error)
      setError(null)
    }
  }, [error])

  useEffect(() => {
    getQualities()
  }, [])

  function errorCatcher(error) {
    const {message} = error.response.data
    setError(message)
  }

  const getQuality = id => qualities.find(q => q._id === id)

  const getQualities = async () => {
    try {
      const {content} = await qualityService.fetchAll()
      setQualities(content)
      setLoading(false)

    } catch (error) {
      errorCatcher(error)
    }
  }

  return (
    <QualitiesContext.Provider value={{isLoading, qualities, getQuality}}>
      {children}
    </QualitiesContext.Provider>
  )
}

QualitiesProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}