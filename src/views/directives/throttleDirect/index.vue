<template>
  <div class="card content-box">
    <span class="text">่ๆตๆไปค ๐๐๐๐๐๐</span>
    <el-button type="primary" v-throttle="throttleClick">่ๆตๆ้ฎ (ๆฏ้1S็งๅๆง่ก)</el-button>
  </div>
</template>

<script setup lang="ts" name="throttleDirect">
import { ElMessage } from 'element-plus'
const throttleClick = () => {
  ElMessage.success('ๆๆฏ่ๆตๆ้ฎ่งฆๅ็ไบไปถ ๐๐๐')
}
</script>

<style scoped lang="scss">
@import './index.scss';
</style>
