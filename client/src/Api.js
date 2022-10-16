import axios from 'axios'

export const Api = axios.create({
  // eslint-disable-next-line no-undef
  baseURL: process.env.VUE_APP_API_ENDPOINT || 'http://localhost:3000/api/v1'
})
