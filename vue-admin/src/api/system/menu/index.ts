import request from '@/utils/request'
import type { QueryMenuParams } from './types'

export function CreateMenu(data: any) {
  return request({
    url: 'system/menu',
    method: 'post',
    data
  })
}

export function DeleteMenu(id: number) {
  return request({
    url: `system/menu/${id}`,
    method: 'delete'
  })
}

export function UpdateMenu(id: number, data: any) {
  return request({
    url: `system/menu/${id}`,
    method: 'put',
    data
  })
}

export function MenuList(params: QueryMenuParams) {
  return request({
    url: 'system/menu',
    method: 'get',
    params
  })
}
