import useSettingStore from '@/stores/user'
import type { Directive } from 'vue'

const hasPermission: Directive = {
  mounted(el, binding) {
    const { value } = binding
    const permissions = useSettingStore().permissions
    if (value) {
      const permission = value
      const has = permissions.find((item) => {
        return permission.includes(item)
      })
      if (!has) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error(`need roles! Like v-permission="['admin','editor']"`)
    }
  }
}

export default hasPermission
