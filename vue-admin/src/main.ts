import { createApp } from 'vue'

import 'normalize.css'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/display.css'
import './assets/css/index.less'

import App from './App.vue'
import router from './router'
import pinia from './stores'
import icons from './icons'
import directives from './directives'

import ElementPlus from 'element-plus'

const app = createApp(App)

app.use(pinia)
app.use(ElementPlus)
app.use(icons)
app.use(router)
app.use(directives)

app.mount('#app')
