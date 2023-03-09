import type { RouteRecordRaw } from 'vue-router'

const Layout = () => import('@/layout/index.vue')
const viteComponent = import.meta.glob('../views/**/*.vue')

export interface IUserMenuChildren {
  id: number
  url: string
  title: string
  icon: string
  cache: boolean
  link: boolean
  hidden: boolean
  children: any[]
}

export interface IUserMenu {
  id: number
  url: string
  title: string
  icon: string
  cache: boolean
  link: boolean
  hidden: boolean
  children: IUserMenuChildren[]
}

/**
 *
 * @param routes 要遍历的路由
 * @returns 返回路由
 */
export function mapToRoute(routes: any[]): RouteRecordRaw[] {
  const routeList: RouteRecordRaw[] = []
  for (const route of routes) {
    const { path, name, component, meta, children } = route
    if (meta.link) continue
    const routeItem: RouteRecordRaw = {
      path,
      name,
      component: !component
        ? Layout
        : viteComponent[`../views/${component}.vue`],
      meta,
      children: children && mapToRoute(children),
      redirect: route.redirect ? route.redirect : undefined
    }
    routeList.push(routeItem)
  }
  return routeList
}

/**
 *
 * @param routes 要遍历的路由
 * @param parent_path 父级路由
 * @returns 返回菜单
 *  */
export function mapTomenu(routes: any[], parent_path: any): IUserMenu[] {
  const menuList: IUserMenu[] = []
  for (const route of routes) {
    const { id, path, meta, children } = route
    const menu = {
      id,
      url: !parent_path || meta.link ? path : parent_path + '/' + path,
      title: meta.title,
      icon: meta.icon,
      cache: meta.cache,
      link: meta.link,
      hidden: meta.hidden,
      children: children && mapTomenu(children, path)
    }
    menuList.push(menu)
  }

  return menuList
}

/**
 *
 * @param menus 要遍历的菜单
 * @param path 当前路由
 * @returns  返回当前路由的菜单
 */
export function findActiveMenu(
  menus: IUserMenu[],
  path: string
): IUserMenu | undefined {
  for (const menu of menus) {
    if (menu.url === path) {
      return menu
    }
    if (menu.children) {
      const activeMenu: IUserMenu | undefined = findActiveMenu(
        menu.children,
        path
      )
      if (activeMenu) {
        return activeMenu
      }
    }
  }
  return undefined
}
