import request from '@/utils/request'
import type { QueryUserParams } from './types'

export function CreateUser(data: any) {
  return request({
    url: 'system/user',
    method: 'post',
    data
  })
}

export function DeleteUser(id: number) {
  return request({
    url: `system/user/${id}`,
    method: 'delete'
  })
}

export function UpdateUser(id: number, data: any) {
  return request({
    url: `system/user/${id}`,
    method: 'put',
    data
  })
}

export function UserList(params: QueryUserParams) {
  return request({
    url: 'system/user',
    method: 'get',
    params
  })
}
