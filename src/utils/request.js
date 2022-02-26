import axios from 'axios'

// env文件中的使用BaseURL VUE_APP_BASE_API
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

export default service
