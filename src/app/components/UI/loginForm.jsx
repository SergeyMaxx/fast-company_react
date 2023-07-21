import React, {useEffect, useState} from 'react'
import TextField from '../common/form/textField'
import {validator} from '../../utils/validator'
import {useAuth} from '../../hooks/useAuth'
import {useHistory} from 'react-router-dom'

const LoginForm = () => {
  const history = useHistory()
  const {login} = useAuth()
  const [loginError, setLoginError] = useState(null)
  const [errors, setErrors] = useState({})
  const [data, setData] = useState({
    email: '',
    password: '',
    stayOn: false
  })

  const handleChange = target => {
    setData(prevState => ({
      ...prevState,
      [target.name]: target.value
    }))
    setLoginError(null)
  }

  const validatorConfig = {
    email: {
      isRequired: {message: 'E-mail is required'}
    },
    password: {
      isRequired: {message: 'Password is required'}
    }
  }

  useEffect(() => {
    validate()
  }, [data])

  const validate = () => {
    const errors = validator(data, validatorConfig)
    setErrors(errors)
    return Object.keys(errors).length !== 0
  }

  const isValid = Object.keys(errors).length !== 0

  const handleSubmit = async e => {
    e.preventDefault()
    if (validate()) return

    try {
      await login(data)
      history.push(
        history.location.state
          ? history.location.state.from.pathname
          : '/'
      )

    } catch (error) {
      setLoginError(error.message)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {loginError && <div className="text-danger">{loginError}</div>}
      <TextField
        label="E-mail"
        name="email"
        value={data.email}
        onChange={handleChange}
        placeholder="enter Email"
        error={errors.email}
      />
      <TextField
        label="Password"
        type="password"
        name="password"
        value={data.password}
        onChange={handleChange}
        placeholder="enter password"
        error={errors.password}
      />
      <button
        type="submit"
        disabled={isValid || !!loginError}
        className="btn btn-primary w-100 mx-auto"
      >
        Submit
      </button>
    </form>
  )
}

export default LoginForm