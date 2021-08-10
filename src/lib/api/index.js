import axios from 'axios'
import store from '../../store'

const TOKEN = sessionStorage.getItem('token')

const getClient = () => {
  const config = {
    baseURL: process.env.VUE_APP_API_BASE_URL,
    timeout: process.env.VUE_APP_REQUEST_TIMEOUT || 5000
  }

  config.headers = {
    Authorization: `Bearer ${TOKEN}`
  }

  const client = axios.create(config)
  initInterceptors(client)
  return client
}

export default class ApiClient {
  constructor () {
    this.client = getClient()
  }

  setHeaders (headers) {
    this.client.defaults.headers = headers
    return this
  }

  getClient () {
    return this.client
  }

  get (path, params) {
    return this.client.get(path, params)
  }

  post (path, params) {
    return this.client.post(path, params)
  }

  put (path, params) {
    return this.client.put(path, params)
  }

  delete (path, params) {
    return this.client.delete(path, params)
  }
}

function initInterceptors (client) {
  client.interceptors.response.use(response => {
    let res = response.data
    res.status = response.status
    return res
  }, error => {
    if (error.response.status === 401) {
      store.dispatch('auth/clearSession', null)
    }
    return Promise.reject(error)
  })
}
