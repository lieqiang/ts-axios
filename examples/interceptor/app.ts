import axios from '../../src/index'

// axios.interceptors.request.use 和 axios.interceptors.response.use公用一个use方法
axios.interceptors.request.use(config => {
  config.headers.test += '1'
  return config
})
axios.interceptors.request.use(config => { // 传入一个函数 resolved
  config.headers.test += '2'
  return config
})
axios.interceptors.request.use(config => { // = Axios 类 this.interceptors.request.use  request最后的拦截器先执行，
  config.headers.test += '3'
  return config
})

axios.interceptors.response.use(res => { // response前面的拦截器先执行
  res.data += '1'
  return res
})
let interceptor = axios.interceptors.response.use(res => { // 返回 拦截器id interceptor
  res.data += '2'
  return res
})
axios.interceptors.response.use(res => {
  res.data += '3'
  return res
})

axios.interceptors.response.eject(interceptor)

axios({
  url: '/interceptor/get',
  method: 'get',
  headers: {
    test: ''
  }
}).then((res) => {
  console.log(res.data)
})
