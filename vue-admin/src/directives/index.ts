import type { App } from 'vue'
import hasPermission from './permission/has-permission'

const install = (app: App) => {
  app.directive('hasPermission', hasPermission)
}

export default install
