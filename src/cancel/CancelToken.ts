import { CancelExecutor, Canceler, CancelTokenSource } from '../types'
import Cancel from './Cancel'

interface ResolvePromise {
  (reason?: Cancel): void
}
export default class CancelToken {
  promise: Promise<Cancel>
  reason?: Cancel
  constructor(executor: CancelExecutor) {
    let resolvePromise: ResolvePromise
    this.promise = new Promise<Cancel>(resolve => {
      // pending
      resolvePromise = resolve
    })
    executor(message => {
      if (this.reason) {
        return
      }
      this.reason = new Cancel(message!)
      resolvePromise(this.reason) // pending状态 变为 resolve状态
    })
  }
  throwIfRequested() {
    if (this.reason) {
      throw this.reason
    }
  }

  static source(): CancelTokenSource {
    let cancel!: Canceler
    const token = new CancelToken(c => {
      // c cancel方法
      cancel = c
    })
    return {
      cancel,
      token
    }
  }
}
