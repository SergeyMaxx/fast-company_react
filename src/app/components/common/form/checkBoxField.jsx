import React from 'react'
import PropTypes from 'prop-types'

const CheckBoxField = ({name, value, onChange, children, error}) => {
  return (
    <div className="form-check mb-4">
      <input
        className={'form-check-input' + (error ? ' is-invalid' : '')}
        type="checkbox"
        value=""
        id={name}
        onChange={() => onChange({name, value: !value})}
        checked={value}
      />
      <label className="form-check-label" htmlFor={name}>
        {children}
      </label>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  )
}

CheckBoxField.propTypes = {
  name: PropTypes.string,
  value: PropTypes.bool,
  onChange: PropTypes.func,
  error: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
}

export default CheckBoxField