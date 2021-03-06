const toString = Object.prototype.toString

export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}
export function isObject (val: any): val is Object {
  return val !== null && typeof val === 'object'
}

export function isPlainObject(val: any): val is Object {
  return toString.call(val) === '[object Object]'
}

// U new Axios() 实例
export function extend<T, U>(to: T, from: U): T & U { // 返回 T & U 类型
  for (const key in from) {
    ;(to as T & U)[key] = from[key] as any // 
  }
  return to as T & U // 断言成 T & U 类型
}

export function deepMerge(...objs: any[]): any { // 熟悉，了解
  const result = Object.create(null)

  objs.forEach(obj => {
    if (obj) {
      Object.keys(obj).forEach(key => {
        const val = obj[key]
        if (isPlainObject(val)) {
          if (isPlainObject(result[key])) {
            result[key] = deepMerge(result[key], val)
          } else {
            result[key] = deepMerge(val)
          }
        } else {
          result[key] = val
        }
      })
    }
  })

  return result
}