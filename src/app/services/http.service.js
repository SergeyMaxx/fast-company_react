import axios from 'axios'
import {toast} from 'react-toastify'
import configFile from '../config.json'
import {httpAuth} from '../hooks/useAuth'
import localStorageService, {
  getAccessToken, getRefreshToken, getTokenExpiresDate
} from './localStorage.service'

const http = axios.create({
  baseURL: configFile.apiEndpoint
})

http.interceptors.request.use(async config => {
    if (configFile.isFireBase) {
      const containSlash = /\/$/gi.test(config.url)
      config.url = (containSlash ? config.url.slice(0, -1) : config.url) + '.json'

      if (getRefreshToken() && getTokenExpiresDate() < Date.now()) {
        const {data} = await httpAuth.post('token', {
          grant_type: 'refresh_token',
          refresh_token: getRefreshToken()
        })

        localStorageService.setTokens({
          refreshToken: data.refresh_token,
          idToken: data.id_token,
          expiresIn: data.expires_in,
          localId: data.user_id
        })
      }

      if (getAccessToken()) {
        config.params = {...config.params, auth: getAccessToken()}
      }
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

const transformData = data => {
  return data && !data._id
    ? Object.keys(data).map(key => ({...data[key]}))
    : data
}

http.interceptors.response.use(res => {
    if (configFile.isFireBase) {
      res.data = {content: transformData(res.data)}
    }
    return res
  }, function (error) {
    const expectedErrors = error.response &&
      error.response.status >= 400 &&
      error.response.status < 500

    if (!expectedErrors) {
      console.log(error)
      toast.error('Something was wrong. Try it later')
    }
    return Promise.reject(error)
  }
)

const httpService = {
  get: http.get,
  post: http.post,
  put: http.put,
  delete: http.delete,
  patch: http.patch
}

export default httpService