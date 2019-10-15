import { isDate, isObject } from './util'
export function buildURL(url: string, params?: any): string {
  if (!params) {
    return url
  }
  const parts: string[] = []
  Object.keys(params).forEach((key) => {
    const val = params[key]
    if (val === null || val === undefined) {
      return
    }
    let values = []
    if (Array.isArray(val)) {
      values = val
    } else {
      values = [val]
    }
    values.forEach((val) => {
      if (isDate(val)) {
        val = val.toISOString()
      } else if (isObject(val)) {
        val = JSON.stringify(val)
      }
      parts.push(`${key}=${val}`)
    })
  })
  let serializedParams = parts.join('&')
  if (serializedParams) {
    const markIndex = url.indexOf('#') // hash
    if (markIndex !== -1) {
        url = url.slice(0, markIndex)
    }
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }
    return url
}