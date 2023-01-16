import { createApp } from 'vue'
import { createPinia } from 'pinia'

// element plus
import ElementPlus from 'element-plus'
// element icons
import * as Icons from '@element-plus/icons-vue'
// element css
import 'element-plus/dist/index.css'
// element dark(内置暗黑模式)
import 'element-plus/theme-chalk/dark/css-vars.css'
// custom element dark(自定义暗黑模式)
// import "@/styles/theme/element-dark.scss";

// CSS common style sheet
import '@/styles/common.scss'
import '@/styles/reset.scss'
import '@/styles/element.scss'

// iconfont
import '@/assets/iconfont/iconfont.scss'

import App from './App.vue'
// vue Router
import router from '@/routers'
// vue i18n
import I18n from '@/languages/'
import errorHandler from '@/utils/errorHandler'
import pinia from '@/stores/index'
import directives from "@/directives/index"; 
// svg icons
import "virtual:svg-icons-register";
const app = createApp(App)

// 注册element Icons组件
Object.keys(Icons).forEach((key) => {
  app.component(key, Icons[key as keyof typeof Icons])
})

app.config.errorHandler = errorHandler

app.use(router).use(I18n).use(ElementPlus).use(pinia).use(directives).mount('#app')
