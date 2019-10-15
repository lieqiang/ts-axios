import { AxiosRequestConfig } from '../types'
import { deepMerge, isPlainObject } from '../helpers/util'

const strats = Object.create(null) // 创建一个空对象

function defaultStrat(val1: any, val2: any):any {
  return typeof val2 !== 'undefined' ? val2 : val2
}


function fromVal2Strat(val1: any, val2: any): any {
  if (typeof val2 !== 'undefined') {
    return val2
  }
}

function deepMergeStrat(val1: any, val2: any): any { // 深拷贝
    if (isPlainObject(val2)) {
      return deepMerge(val1, val2)
    } else if (typeof val2 !== 'undefined') {
      return val2
    } else if (isPlainObject(val1)) {
      return deepMerge(val1)
    } else if (typeof val1 !== 'undefined') {
      return val1
    }
  }

const stratKeysFromVal2 = ['url', 'params', 'data']

stratKeysFromVal2.forEach((key) => {
  strats[key] = fromVal2Strat
})
// 
const stratKeysDeepMerge = ['headers']

stratKeysDeepMerge.forEach(key => {
  strats[key] = deepMergeStrat
})
// 
export default function mergeConfig(
    config1: AxiosRequestConfig,
    config2?: AxiosRequestConfig // config2可选参数
): AxiosRequestConfig {
  if (!config2) {
    config2 = {}
  }
  const config = Object.create(null)
  for (let key in config2) { // 用户自定义配置
    mergeField(key)
  }

  for (let key in config1) {
    if (!config2[key]) {
      mergeField(key)
    }
  }

  function mergeField(key: string): void {
    const strat = strats[key] || defaultStrat // ['url', 'params', 'data']默认用户自定义，否则defaultStrat，有用户自定义则用自定义，否则默认配置
    config[key] = strat(config1[key], config2![key]) // 断言定义了；
  }

  return config
}
