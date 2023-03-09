import { MenuList } from '@/api/system/menu'
import { RoleList } from '@/api/system/role'
import { defineStore } from 'pinia'

interface IOptionState {
  roles: any[]
  menus: any[]
}

//选项
const useOptionStore = defineStore({
  id: 'option',
  state: (): IOptionState => ({
    roles: [],
    menus: []
  }),
  actions: {
    async getRoles() {
      const roles: any = await RoleList({})
      this.roles = roles
    },
    async getMenus() {
      const menus: any = await MenuList({})
      this.menus = menus
    }
  }
})

export default useOptionStore
