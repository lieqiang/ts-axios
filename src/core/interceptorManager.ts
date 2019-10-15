import { ResolvedFn, RejectedFn } from '../types'
interface Interceptor<T> { // 泛型接口 why because: 请求拦截器和响应拦截器 resolved 的函数参数类型是不一样的；
  resolved: ResolvedFn<T> // 泛型接口
  rejected?: RejectedFn
}

export default class InterceptorManager<T> { // 泛型类
  // Array<> 数组泛型，Array<元素类型>：写法
  private interceptors: Array<Interceptor<T> | null> // 需写 | null
  constructor() {
    this.interceptors = [] // this.interceptor = private interceptor????
  }

  use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number { // 提供 resloved 和 rejected函数
    this.interceptors.push({
      resolved,
      rejected // 不传 undefind
    })
    console.log(this.interceptors)
    return this.interceptors.length - 1
  }

  forEach(fn: (interceptor: Interceptor<T>) => void): void { // interceptor: Interceptor<T>) => void 传入函数类型写法
    this.interceptors.forEach(interceptor => {
      debugger
      if (interceptor) {
        fn(interceptor)
      }
    })
  }

  eject(id: number): void {
    if (this.interceptors[id]) {
      this.interceptors[id] = null
    }
  }
}