import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    // const { code } = config.data
    // console.log(code)

    // if (store.getters.token) {
    // let each request carry token
    // ['X-Token'] is a custom headers key
    // please modify it according to the actual situation
    // config.headers['Authorization'] = getToken()
    config.headers['Authorization'] = getToken()
    // }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    // console.log(res)
    // console.log(response)
    // if the custom code is not 20000, it is judged as an error.
    if (response.config.url.indexOf('order/downLoad') !== -1) {
      return res
    }

    if (res.returnCode !== '0000') {
      Message({
        message: res.returnMsg || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      if (res.returnCode === '10006' || res.returnCode === '10001') {
        // to re-login
        // MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
        //   confirmButtonText: 'Re-Login',
        //   cancelButtonText: 'Cancel',
        //   type: 'warning'
        // }).then((res) => {
        store.dispatch('user/resetToken').then((res) => {
          location.reload()
          // router.push({ path: `/login?path=${router.currentRoute.fullPath}` })
        })
        // })
      }
      return Promise.reject(new Error(res.returnMsg || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.returnMsg || 'Network error',
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)
export default service
