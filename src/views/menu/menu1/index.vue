<script setup lang="ts" name="menu1">
import { ref } from 'vue'

const value = ref<string>('')
</script>

<template>
  <div class="card content-box">
    <span class="text">ζζ―menu1 ππππ</span>
    <el-input v-model="value" placeholder="ζ΅θ―ηΌε­"></el-input>
  </div>
</template>

<style lang="scss" scoped></style>
