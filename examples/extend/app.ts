import axios from '../../src/index'

// axios({
//   url: '/extend/post',
//   method: 'post',
//   data: {
//     msg: 'hi'
//   }
// })

// axios.request({
//   url: '/extend/post',
//   method: 'post',
//   data: {
//     msg: 'hello'
//   }
// })

// axios.get('/extend/get')

// axios.options('/extend/options')

// axios.delete('/extend/delete')

// axios.head('/extend/head')

// axios.post('/extend/post', { msg: 'post' })

// axios.put('/extend/put', { msg: 'put' })

// axios.patch('/extend/patch', { msg: 'patch' })

// axios({
//   url: '/extend/post',
//   method: 'post',
//   data: {
//     msg: 'hi'
//   }
// })

// axios('/extend/post', {
//   method: 'post',
//   data: {
//     msg: 'hello'
//   }
// })

// code: 0,
// message: 'ok',
// result: {
//   name: 'jack',
//   age: 18
// }

// 泛型测试
interface ResponseData<T = any> {
  code: number
  result: T
  message: string
}

interface User {
  name: string
  age: number
}

function getUser<T>() {
  console.log(axios)
  // 传入 interface ResponseData, ResponseDate 接口接收 T （user接口）参数
  return axios<ResponseData<T>>('/extend/user') // 参照这种写法
    .then(res => res.data)
    .catch(err => console.error(err))
}

async function test() {
  const user = await getUser<User>() // 拿到结果就可以正确做类型推导
  if (user) {
    console.log(user.result.name)
    // console.log(user.result.name)
  }
}

test()
