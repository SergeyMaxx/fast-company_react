import React from 'react'
import PropTypes from 'prop-types'
import {useSelector} from 'react-redux'
import {getProfessionById, getProfessionsLoadingStatus} from '../../store/professions'

const Profession = ({id}) => {
  const isLoading = useSelector(getProfessionsLoadingStatus())
  const professionById = useSelector(getProfessionById(id))

  return isLoading
    ? <p>'Loading...'</p>
    : <p>{professionById.name}</p>
}

Profession.propTypes = {
  id: PropTypes.string
}

export default Profession