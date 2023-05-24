import React, {useState} from 'react'
import PropTypes from 'prop-types'

const TextField = ({label, type, name, value, onChange, placeholder, error}) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="mb-4">
      <label htmlFor={name}>{label}</label>
      <div className="input-group has-validation">
        <input
          type={showPassword ? 'text' : type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={'form-control' + (error ? ' is-invalid' : '')}
        />
        {type === 'password' && (
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={() => setShowPassword(prevState => !prevState)}
          >
            <i className={'bi bi-eye' + (showPassword ? '-slash' : '')}/>
          </button>
        )}
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  )
}

TextField.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  error: PropTypes.string
}

export default TextField