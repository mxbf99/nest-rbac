import reuqest from '@/utils/request'

export function Login(data: any) {
  return reuqest({
    url: '/auth/login',
    method: 'post',
    data
  })
}

export function Logout() {
  return reuqest({
    url: '/auth/logout',
    method: 'post'
  })
}
