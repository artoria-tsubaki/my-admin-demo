import { Login } from '@/api/interface/index'
import http from '@/api'
import { PORT1 } from '@/api/config/servicePort'
import { MenuEmits } from 'element-plus'

/**
 * @description 登录模块
 * @param params 表单参数
 * @returns 
 */
export const loginApi = (params: Login.ReqLoginForm) => {
  return http.post<Login.ResLogin>(PORT1 + `/login`, params, { headers: { noLoading: true } })
}

/**
 * @description 获取按钮权限
 * @returns 
 */
export const getAuthButtonListApi = () => {
  return http.get<Login.ResAuthButtons>(PORT1 + `/auth/buttons`, {}, { headers: { noLoading: true } })
}

export const getAuthMenuListApi = () => {
  return http.get<Menu.MenuOptions[]>(PORT1 + `/menu/list`, {}, { headers: { noLoading: true } })
}