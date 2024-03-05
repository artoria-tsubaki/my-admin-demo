<script setup lang="ts" name="login">
import LoginForm from './components/LoginForm.vue'
import { dayOfYear } from 'pycd-js'

console.log(dayOfYear());

</script>

<template>
  <div class="login-container flx-center">
    <!-- <SwitchDack class="dark" /> -->
    <div class="login-box">
      <div class="login-left">
        <img src="@/assets/images/login_left0.png" alt="login" />
      </div>
      <div class="login-form">
        <div class="login-logo">
          <img src="@/assets/images/logo.svg" alt="" class="login-icon" />
          <h2 class="login-text">Geeker-Admin</h2>
        </div>
        <LoginForm />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
