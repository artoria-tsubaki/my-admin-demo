<script setup lang="ts">
import { GlobalStore } from '@/stores'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'
import { computed } from 'vue'
import { getBrowserLang } from '@/utils/util'

const globalStore = GlobalStore()
const i18nLocale = computed(() => {
  if (globalStore.language && globalStore.language == 'zh') return zhCn
  if (globalStore.language == 'en') return en
  return getBrowserLang() == 'zh' ? zhCn : en
})
</script>

<template>
  <el-config-provider :locale="i18nLocale">
    <router-view></router-view>
  </el-config-provider>
</template>
