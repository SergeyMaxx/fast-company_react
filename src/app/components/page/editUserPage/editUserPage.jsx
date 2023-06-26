import React, {useEffect, useState} from 'react'
import {useHistory, useParams} from 'react-router-dom'
import {validator} from '../../../utils/validator'
import api from '../../../api'
import TextField from '../../common/form/textField'
import SelectField from '../../common/form/selectField'
import RadioField from '../../common/form/radioField'
import MultiSelectField from '../../common/form/multiSelectField'
import BackHistoryButton from '../../common/backButton'

const EditUserPage = () => {
  const {userId} = useParams()
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({
    name: '',
    email: '',
    profession: '',
    sex: 'male',
    qualities: []
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
    setLoading(true)
    api.users.getById(userId).then(({profession, qualities, ...data}) =>
      setData(prevState => ({
        ...prevState,
        ...data,
        qualities: qualities.map(q => ({label: q.name, value: q._id})),
        profession: profession._id
      }))
    )

    api.professions.fetchAll().then(data => {
      const professionsList = Object.keys(data).map(prof => ({
        label: data[prof].name,
        value: data[prof]._id
      }))
      setProfessions(professionsList)
    })

    api.qualities.fetchAll().then(data => {
      const qualitiesList = Object.keys(data).map(qual => ({
        value: data[qual]._id,
        label: data[qual].name,
        color: data[qual].color
      }))
      setQualities(qualitiesList)
    })
  }, [])

  useEffect(() => {
    if (data._id) {
      setLoading(false)
    }
  }, [data])

  const handleChange = target => {
    setData(prevState => ({
      ...prevState,
      [target.name]: target.value
    }))
  }

  const validatorConfig = {
    email: {
      isRequired: {message: 'Email is required'},
      isEmail: {message: 'Email entered incorrectly'}
    },
    name: {
      isRequired: {message: 'Enter your name'}
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
    try {
      e.preventDefault()
      if (validate()) return
      const {profession, qualities} = data

      await api.users.update(userId, {
        ...data,
        profession: getProfessionById(profession),
        qualities: getQualities(qualities)
      })

      history.push(`/users/${userId}`)

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="container mt-5">
      <BackHistoryButton/>
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          {!loading && Object.keys(professions).length > 0
            ? (
              <form onSubmit={handleSubmit}>
                <TextField
                  label="Name"
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                  error={errors.name}
                  placeholder="enter Name"
                />
                <TextField
                  label="E-mail"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  error={errors.email}
                  placeholder="enter Email"
                />
                <SelectField
                  label="Choose your profession"
                  defaultOption="Choose..."
                  options={professions}
                  name="profession"
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
                  defaultValue={data.qualities}
                  options={qualities}
                  onChange={handleChange}
                  name="qualities"
                  label="Choose your qualities"
                />
                <button
                  type="submit"
                  disabled={isValid}
                  className="btn btn-primary w-100 mx-auto"
                >
                  Обновить
                </button>
              </form>
            )
            : <h3>Loading...</h3>
          }
        </div>
      </div>
    </div>
  )
}

export default EditUserPage