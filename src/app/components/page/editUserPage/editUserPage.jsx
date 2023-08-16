import React, {useEffect, useState} from 'react'
import {validator} from '../../../utils/validator'
import TextField from '../../common/form/textField'
import SelectField from '../../common/form/selectField'
import RadioField from '../../common/form/radioField'
import MultiSelectField from '../../common/form/multiSelectField'
import BackHistoryButton from '../../common/backButton'
import {useDispatch, useSelector} from 'react-redux'
import {getQualitiesLoadingStatus, getQualities} from '../../../store/qualities'
import {getProfessions, getProfessionsLoadingStatus} from '../../../store/professions'
import {getCurrentUserData, updateUser} from '../../../store/users'

const EditUserPage = () => {
  const [isLoading, setIsLoading] = useState(true)
  const professions = useSelector(getProfessions())
  const professionsLoading = useSelector(getProfessionsLoadingStatus())
  const qualities = useSelector(getQualities())
  const qualitiesLoading = useSelector(getQualitiesLoadingStatus())
  const currentUser = useSelector(getCurrentUserData())
  const [errors, setErrors] = useState({})
  const [data, setData] = useState()
  const dispatch = useDispatch()

  const qualitiesList = qualities.map(q => ({label: q.name, value: q._id}))
  const professionsList = professions.map(p => ({label: p.name, value: p._id}))

  const getQualitiesListByIds = elements => {
    const qualitiesArray = []

    for (const el of elements) {
      for (const quality of qualities) {
        if (quality._id === el) {
          qualitiesArray.push(quality)
          break
        }
      }
    }
    return qualitiesArray
  }

  useEffect(() => {
    if (!professionsLoading && !qualitiesLoading && !data && currentUser) {
      setData({
        ...currentUser,
        qualities: getQualitiesListByIds(currentUser.qualities).map(q => ({
          label: q.name,
          value: q._id
        }))
      })
    }
  }, [professionsLoading, qualitiesLoading, data, currentUser])

  useEffect(() => {
    if (data && isLoading) {
      setIsLoading(false)
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

  const handleSubmit = e => {
    e.preventDefault()
    if (validate()) return

    const newData = {
      ...data,
      qualities: data.qualities.map(q => q.value)
    }
    dispatch(updateUser(newData))
  }

  return (
    <div className="container mt-5">
      <BackHistoryButton/>
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          {!isLoading && Object.keys(professions).length > 0
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
                  options={professionsList}
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
                  options={qualitiesList}
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