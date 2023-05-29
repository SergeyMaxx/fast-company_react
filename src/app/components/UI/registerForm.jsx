import React, {useEffect, useState} from 'react'
import {validator} from '../../utils/validator'
import TextField from '../common/form/textField'
import api from '../../api'
import SelectField from '../common/form/selectField'
import RadioField from '../common/form/radioField'
import MultiSelectField from '../common/form/multiSelectField'
import CheckBoxField from '../common/form/checkBoxField'

const RegisterForm = () => {
  const [data, setData] = useState({
    email: '',
    password: '',
    options: '',
    sex: 'male',
    qualities: [],
    licence: false
  })

  const [professions, setProfessions] = useState([])
  const [qualities, setQualities] = useState([])
  const [errors, setErrors] = useState({})

  const getProfessionById = id => {
    for (const prof of professions) {
      if (prof.value === id) {
        return {
          _id: prof.value,
          name: prof.label
        }
      }
    }
  }

  const getQualities = elements => {
    const qualitiesArray = []

    for (const elem of elements) {
      for (const quality in qualities) {
        if (elem.value === qualities[quality].value) {
          qualitiesArray.push({
            _id: qualities[quality].value,
            name: qualities[quality].label,
            color: qualities[quality].color
          })
        }
      }
    }
    return qualitiesArray
  }

  useEffect(() => {
    api.professions().then(data => {
      const professionsList = Object.keys(data).map(professionName => ({
        label: data[professionName].name,
        value: data[professionName]._id
      }))
      setProfessions(professionsList)
    })

    api.qualities().then(data => {
      const qualitiesList = Object.keys(data).map(optionName => ({
        value: data[optionName]._id,
        label: data[optionName].name,
        color: data[optionName].color
      }))
      setQualities(qualitiesList)
    })
  }, [])

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

  const handleSubmit = e => {
    e.preventDefault()
    if (validate()) return
    const {professions, qualities} = data

    console.log({
      ...data,
      options: getProfessionById(professions),
      qualities: getQualities(qualities)
    })
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
        name="professions"
        options={professions}
        onChange={handleChange}
        value={data.professions}
        error={errors.options}
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
        options={qualities}
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