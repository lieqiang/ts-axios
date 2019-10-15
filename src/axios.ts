import { AxiosRequestConfig } from './types'
import { AxiosInstance } from './types'
import Axios from './core/Axios'
import { extend } from './helpers/util'
import defaults from './defaults'
function createInstance(config: AxiosRequestConfig): AxiosInstance { // 返回 types AxiosInstance 类型
  const context = new Axios(config) // config 默认配置
  const instance = Axios.prototype.request.bind(context) // axios() === axios.request()
  extend(instance, context)
  return instance as AxiosInstance // 强制类型断言
}
const axios = createInstance(defaults) // bound 原型
export default axios // bound 原型 axios 混合对象，axios 本身是一个方法，带一些混合属性