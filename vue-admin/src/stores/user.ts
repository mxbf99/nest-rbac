import { defineStore } from 'pinia'
import { Login, Logout } from '@/api/auth'
import type { LoginData } from '@/api/auth/types'
import { ElMessage } from 'element-plus'
import { localCache } from '@/utils/cache'
import { TOKEN_KEY } from '@/constants'
import router from '@/router'
import { GetInfo, GetPermissions, GetRoutes } from '@/api'
import { mapToRoute, mapTomenu, type IUserMenu } from '@/utils/menu-route'
import useOptionStore from './option'

const Layout = () => import('@/layout/index.vue')

interface ISettingState {
  token: string
  userInfo: any
  routes: any[]
  menus: IUserMenu[]
  permissions: string[]
}

const useSettingStore = defineStore({
  id: 'setting',
  state: (): ISettingState => ({
    token: '',
    userInfo: {},
    routes: [],
    menus: [],
    permissions: []
  }),
  actions: {
    async login(data: LoginData) {
      //登录
      const token: any = await Login(data)
      this.token = token
      localCache.set(TOKEN_KEY, token)
      ElMessage.success('登录成功')
      router.push('/')
    },

    async loadLocalCache() {
      const token = localCache.get(TOKEN_KEY)
      if (token) {
        //获取用户信息
        const userInfo: any = await GetInfo()
        this.userInfo = userInfo
        //获取用户路由
        const routes: any = await GetRoutes()
        this.routes = routes

        if (routes.length === 0) {
          localCache.remove(TOKEN_KEY)
          return ElMessage.error('您没有权限访问该系统')
        }

        const mapRoutes = mapToRoute(routes)
        mapRoutes.forEach((route) => {
          if (route.component && route.children?.length === 0) {
            router.addRoute({
              path: '',
              component: Layout,
              children: [route]
            })
          } else {
            route.component && router.addRoute(route)
          }
        })

        const menus = mapTomenu(routes, null)
        this.menus = menus

        //获取用户权限
        const permissions: any = await GetPermissions()
        this.permissions = permissions

        const optionStore = useOptionStore()
        await optionStore.getRoles()
        await optionStore.getMenus()
      }
    },

    logout() {
      Logout().then(() => {
        localCache.remove(TOKEN_KEY)
        this.token = ''
        this.userInfo = {}
        this.routes = []
        this.permissions = []
        ElMessage.success('退出成功')
        router.push('/login')
      })
    }
  }
})

export default useSettingStore
