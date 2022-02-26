import request from '@/utils/request'

/**
 * 登录
 * return peomise
 */

export const login = data => {
  return request({
    url: '/sys/login',
    method: 'POST',
    headers: {
      icode: 'DE6984F288DCD0FD'
    },
    data
  })
}
