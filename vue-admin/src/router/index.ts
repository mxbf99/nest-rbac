import { TOKEN_KEY } from '@/constants'
import useSettingStore from '@/stores/user'
import { localCache } from '@/utils/cache'
import { createRouter, createWebHistory } from 'vue-router'

const Layout = () => import('@/layout/index.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior: () => ({ left: 0, top: 0 }),
  routes: [
    {
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/login',
      component: () => import('@/views/login/login.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      component: Layout,
      children: [
        {
          path: '',
          component: () => import('@/views/not-found.vue')
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  const token = localCache.get(TOKEN_KEY)
  const settingStore = useSettingStore()
  const routes = settingStore.routes
  if (token) {
    if (to.path === '/login') {
      next('/')
    } else {
      if (routes.length == 0) {
        settingStore.loadLocalCache().then(() => {
          next({ path: to.path })
        })
      } else {
        next()
      }
    }
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
    }
  }
})

export default router
