import React, {useEffect, useState} from 'react'
import TextField from '../common/form/textField'
import {validator} from '../../utils/validator'

const LoginForm = () => {
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
  }

  const validatorConfig = {
    email: {
      isRequired: {message: 'E-mail is required'},
      isEmail: {message: 'email entered incorrectly'}
    },
    password: {
      isRequired: {message: 'Password is required'},
      isCapitalSymbol: {message: 'password must contain a capital letter'},
      isContainDigit: {message: 'password must contain a number'},
      min: {
        message: 'password must contain at least 8 characters',
        value: 8
      }
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
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit}>
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
        disabled={isValid}
        className="btn btn-primary w-100 mx-auto"
      >
        Submit
      </button>
    </form>
  )
}

export default LoginForm