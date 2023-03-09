import axios, { type AxiosResponse } from 'axios'
import type { InternalAxiosRequestConfig } from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
import { localCache } from './cache'
import { TOKEN_KEY } from '@/constants'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 50000
})

// 请求拦截
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localCache.get(TOKEN_KEY)
    if (token && config?.headers)
      config.headers.Authorization = `Bearer ${token}`
    return config
  },
  (error: any) => {
    return Promise.reject(error)
  }
)

// 响应拦截
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data.data
  },
  (error: any) => {
    const data = error.response?.data
    if (data?.code === 401) {
      ElMessageBox.alert('登录已过期，请重新登录', '提示', {
        confirmButtonText: '确定',
        callback: () => {
          localCache.remove(TOKEN_KEY)
          window.location.reload()
        }
      })
    } else {
      ElMessage.error(data?.msg || '网络错误')
    }

    return Promise.reject(error)
  }
)

export default instance
