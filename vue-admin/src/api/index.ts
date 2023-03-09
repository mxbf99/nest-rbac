import request from '@/utils/request'

export function GetInfo() {
  return request({
    url: '/getInfo',
    method: 'get'
  })
}

export function GetRoutes() {
  return request({
    url: '/system/menu/routes',
    method: 'get'
  })
}

export function GetPermissions() {
  return request({
    url: '/system/menu/permissions',
    method: 'get'
  })
}
