import React, {useEffect, useState} from 'react'
import API from '../../../api'
import SelectField from '../form/selectField'
import TextAreaField from '../form/textAreaField'
import {validator} from '../../../utils/validator'
import PropTypes from 'prop-types'

const initialData = {userId: '', content: ''}

const AddCommentForm = ({onSubmit}) => {
  const [data, setData] = useState(initialData)
  const [users, setUsers] = useState({})
  const [errors, setErrors] = useState({})

  const handleChange = target => {
    setData(prevState => ({
      ...prevState,
      [target.name]: target.value
    }))
  }

  const validatorConfig = {
    userId: {
      isRequired: {message: 'Choose on behalf of whom you want to send a message'}
    },
    content: {
      isRequired: {message: 'Message cannot be empty'}
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

  useEffect(() => {
    API.users.fetchAll().then(setUsers)
  }, [])

  const clearForm = () => {
    setData(initialData)
    setErrors({})
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (validate()) return
    onSubmit(data)
    clearForm()
  }

  const arrayOfUsers = users && Object.keys(users).map(userId => ({
    label: users[userId].name,
    value: users[userId]._id
  }))

  return (
    <div>
      <h2>New comment</h2>
      <form onSubmit={handleSubmit}>
        <SelectField
          onChange={handleChange}
          options={arrayOfUsers}
          name="userId"
          value={data.userId}
          defaultOption="Choose user"
          error={errors.userId}
        />
        <TextAreaField
          value={data.content}
          onChange={handleChange}
          name="content"
          label="Message"
          error={errors.content}
        />
        <div className="d-flex justify-content-end">
          <button className="btn btn-primary">publish</button>
        </div>
      </form>
    </div>
  )
}

AddCommentForm.propTypes = {
  onSubmit: PropTypes.func
}

export default AddCommentForm