<template>
  <div class="card content-box">
    <span class="text">ιΏζζδ»€ ππππππ</span>
    <el-button type="primary" v-longpress="longpress">ιΏζ2η§θ§¦εδΊδ»Ά</el-button>
  </div>
</template>

<script setup lang="ts" name="longpressDirect">
import { ElMessage } from 'element-plus'
const longpress = () => {
  ElMessage.success('ιΏζδΊδ»Άθ§¦εζε πππ')
}
</script>

<style scoped lang="scss"></style>
