export function validator(data, config) {
  const errors = {}

  function validate(validateMethod, data, config) {
    let statusValidate

    switch (validateMethod) {
      case 'isRequired': {
        if (typeof data === 'boolean') {
          statusValidate = !data
        } else {
          statusValidate = data.trim() === ''
        }
        break
      }
      case 'isEmail': {
        const emailRegExp = /^\S+@\S+\.\S+$/g
        statusValidate = !emailRegExp.test(data)
        break
      }
      case 'isCapitalSymbol': {
        const capitalRegExp = /[A-Z]+/g
        statusValidate = !capitalRegExp.test(data)
        break
      }
      case 'isContainDigit': {
        const digitRegExp = /\d+/g
        statusValidate = !digitRegExp.test(data)
        break
      }
      case 'min': {
        statusValidate = data.length < config.value
        break
      }
      default:
        break
    }
    if (statusValidate) {
      return config.message
    }
  }

  for (const dataKey in data) {
    for (const validateMethod in config[dataKey]) {
      const error = validate(
        validateMethod, data[dataKey], config[dataKey][validateMethod]
      )
      if (error && !errors[dataKey]) {
        errors[dataKey] = error
      }
    }
  }
  return errors
}