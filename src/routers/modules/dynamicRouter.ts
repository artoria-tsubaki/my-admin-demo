import { LOGIN_URL } from '@/config/config'
import router from '@/routers'
import { notFoundRouter } from '@/routers/modules/staticRouter'
import { AuthStore } from '@/stores/modules/auth'
import { getFlatArr, isType } from '@/utils/util'
import { ElNotification } from 'element-plus'

// 引入 views 文件夹下所有 vue 文件
const modules = import.meta.glob('@/views/**/*.vue')
console.log(modules);


export const initDynamicRouter = async () => {
  try {
    // 获取菜单列表 && 按钮权限
    const authStore = AuthStore()
    await authStore.getAuthMenuList()
    await authStore.getAuthButtonList()

    // 判断当前用户有没有菜单权限
    if (!authStore.authMenuListGet.length) {
      ElNotification({
        title: '无权访问',
        message: '当前账号无任何菜单权限，请联系系统管理员！',
        type: 'warning',
        duration: 3000,
      })
      router.replace(LOGIN_URL)
      return Promise.reject('No permission')
    }

    dynamicAddRouter(authStore)
  } catch (error) {
    // 按钮 || 菜单请求出错时，重定向到登录页
    router.replace(LOGIN_URL)
    return Promise.reject(error)
  }
}

const dynamicAddRouter = (authStore: any) => {
  // 添加动态路由
  let dynamicRouter = getFlatArr(JSON.parse(JSON.stringify(authStore.authMenuListGet)))
  dynamicRouter.forEach((item: any) => {
    if (item.children) delete item.children
    if (item.component && isType(item.component) == "string") item.component = modules['/src/views' + item.component + '.vue']
    if (item.meta.isFull) {
      router.addRoute(item)
    } else {
      router.addRoute('layout', item)
    }
  })

  // 添加 notFoundRouter
  router.addRoute(notFoundRouter)
}
