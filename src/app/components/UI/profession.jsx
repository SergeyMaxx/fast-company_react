import React from 'react'
import {useProfessions} from '../../hooks/useProfession'
import PropTypes from 'prop-types'

const Profession = ({id}) => {
  const {isLoading, getProfession} = useProfessions()
  const prof = getProfession(id)

  return isLoading ? <p>{prof.name}</p> : <h3>'Loading...'</h3>
}

Profession.propTypes = {
  id: PropTypes.string
}

export default Profession