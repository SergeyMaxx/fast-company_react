import React, {useEffect, useState} from 'react'
import TextField from '../common/form/textField'
import {validator} from '../../utils/validator'
import {useHistory} from 'react-router-dom'
import {clearErrors, getAuthErrors, login} from '../../store/users'
import {useDispatch, useSelector} from 'react-redux'

const LoginForm = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const loginError = useSelector(getAuthErrors())
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
    dispatch(clearErrors())
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

  const handleSubmit = e => {
    e.preventDefault()
    if (validate()) return

    const redirect = history.location.state
      ? history.location.state.from.pathname
      : '/'

    dispatch(login({payload: data, redirect}))
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