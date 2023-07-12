import React, {useEffect, useState} from 'react'
import {validator} from '../../utils/validator'
import TextField from '../common/form/textField'
import SelectField from '../common/form/selectField'
import RadioField from '../common/form/radioField'
import MultiSelectField from '../common/form/multiSelectField'
import CheckBoxField from '../common/form/checkBoxField'
import {useQualities} from '../../hooks/useQualities'
import {useProfessions} from '../../hooks/useProfession'
import {useAuth} from '../../hooks/useAuth'
import {useHistory} from 'react-router-dom'

const RegisterForm = () => {
  const {qualities} = useQualities()
  const {professions} = useProfessions()
  const {signUp} = useAuth()
  const history = useHistory()
  const [errors, setErrors] = useState({})
  const [data, setData] = useState({
    email: '',
    password: '',
    profession: '',
    sex: 'male',
    qualities: [],
    licence: false
  })

  const qualitiesList = qualities.map(q => ({label: q.name, value: q._id}))
  const professionsList = professions.map(p => ({label: p.name, value: p._id}))

  const handleChange = target => {
    setData(prevState => ({
      ...prevState,
      [target.name]: target.value
    }))
  }

  const validatorConfig = {
    email: {
      isRequired: {message: 'Email is required'},
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
    },
    professions: {
      isRequired: {message: 'Professions is required'}
    },
    licence: {
      isRequired: {message: 'You may not use our service without confirming the license agreement'}
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

    const newData = {
      ...data,
      qualities: data.qualities.map(q => q.value)
    }

    try {
      await signUp(newData)
      history.push('/')

    } catch (error) {
      setErrors(error)
    }
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
      <SelectField
        label="Choose your profession"
        defaultOption="Choose..."
        name="profession"
        options={professionsList}
        onChange={handleChange}
        value={data.profession}
        error={errors.profession}
      />
      <RadioField
        options={[
          {name: 'Male', value: 'male'},
          {name: 'Female', value: 'female'},
          {name: 'Other', value: 'other'}
        ]}
        value={data.sex}
        name="sex"
        onChange={handleChange}
        label="Choose your sex"
      />
      <MultiSelectField
        options={qualitiesList}
        onChange={handleChange}
        defaultValue={data.qualities}
        name="qualities"
        label="Choose your qualities"
      />
      <CheckBoxField
        value={data.licence}
        onChange={handleChange}
        name="licence"
        error={errors.licence}
      >
        Confirm <a>license agreement</a>
      </CheckBoxField>
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

export default RegisterForm