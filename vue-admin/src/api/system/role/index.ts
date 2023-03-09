import request from '@/utils/request'

export function CreateRole(data: any) {
  return request({
    url: 'system/role',
    method: 'post',
    data
  })
}

export function DeleteRole(id: number) {
  return request({
    url: `system/role/${id}`,
    method: 'delete'
  })
}

export function UpdateRole(id: number, data: any) {
  return request({
    url: `system/role/${id}`,
    method: 'put',
    data
  })
}

export function RoleList(params: any) {
  return request({
    url: 'system/role',
    method: 'get',
    params
  })
}
