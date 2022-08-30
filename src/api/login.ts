import request from '@/utils/request'

export function login(option) {
  return request({
    url: '/login',
    method: 'post',
    data: {
      ...option
    }
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}


