<script setup lang="ts">
import { Login } from '@/api/interface'
import { ElForm, ElNotification } from 'element-plus'
import { onMounted, reactive, ref } from 'vue'
import { CircleClose, UserFilled } from '@element-plus/icons-vue'
import { loginApi } from '@/api/modules/auth'
import md5 from 'js-md5'
import { GlobalStore } from '@/stores'
import { initDynamicRouter } from '@/routers/modules/dynamicRouter'
import { HOME_URL } from '@/config/config'
import router from '@/routers'
import { getTimeState } from '@/utils/util'

const gloabelStore = GlobalStore()

type FormInstance = InstanceType<typeof ElForm>
const loginFormRef = ref<FormInstance>()
const loginRules = reactive({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
})

const loading = ref(false)
const loginForm = reactive<Login.ReqLoginForm>({ username: '', password: '' })
const login = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (!valid) return
    loading.value = true
    try {
      // 执行登录接口
      const { data } = await loginApi({ ...loginForm, password: md5(loginForm.password) })
      gloabelStore.setToken(data.access_token)

      // 添加动态路由
      await initDynamicRouter()

      // 清除上个账号的 tab 信息

      // 跳转到首页
      router.push(HOME_URL)
      ElNotification({
        title: getTimeState(),
        message: '欢迎登陆 Admin System',
        type: 'success',
        duration: 3000
      })
    } finally {
      loading.value = false
    }
  })
}
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

onMounted(() => {
  // 监听 enter 事件 调用登录
  document.onkeydown = (e: any) => {
    e = window.event || e
    if (e.code === 'Enter' || e.code === 'enter' || e.code === 'NumpadEnter') {
      if (loading.value) return
      login(loginFormRef.value)
    }
  }
})
</script>

<template>
  <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" size="large">
    <el-form-item prop="username">
      <el-input v-model="loginForm.username" placeholder="用户名">
        <template #prefix>
          <el-icon class="el-input__icon"><user /></el-icon>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input v-model="loginForm.password" placeholder="密码" type="password">
        <template #prefix>
          <el-icon class="el-input__icon"><lock /></el-icon>
        </template>
      </el-input>
    </el-form-item>
  </el-form>
  <div class="login-btn">
    <el-button :icon="CircleClose" round @click="resetForm(loginFormRef)" size="large">重置</el-button>
    <el-button :icon="UserFilled" round @click="login(loginFormRef)" size="large" type="primary" :loading="loading"> 登录 </el-button>
  </div>
</template>

<style lang="scss" scoped>
@import '../index.scss';
</style>
