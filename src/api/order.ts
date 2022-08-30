import request from '@/utils/request'

/* ** ** ** ** ** ** ** ** ** *
* ** ** *Version:  1.o* ** ** *
* ** ** ** ** ** ** *** ** ** */

export function getUserList(params) {
  return request({
    url: '/user/list',
    method: 'get',
    params: {
      ...params
    }
  })
}