<template>
  <div class="login-container">
    <el-form
    class="login-form"
    ref="loginFromRef"
    :model="loginForm"
    :rules="loginRules"
    >
      <div class="title-container">
        <h3 class="title">用户登录</h3>
      </div>
      <!--  username -->
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon="user" />
        </span>
        <el-input
        placeholder="username"
        name="username"
        type="text"
        v-model="loginForm.username"
        >
        </el-input>
      </el-form-item>
       <!--  password -->
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon="password" />
        </span>
        <el-input
        placeholder="password"
        name="password"
        v-model="loginForm.password"
        :type="passwordType"
        ></el-input>
         <span class="show-pwd" @click="onChangePwdType">
          <svg-icon :icon="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <!-- 登录按钮 -->
      <el-button
      type="primary"
      style="width:100%;margin-bottom:30px"
      :loading="loading"
      @click="handlerLogin"
      >登录</el-button>
    </el-form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { validatePassword } from '@/views/login/rules'
import { useStore } from 'vuex'
const loginForm = ref({
  username: 'admin',
  password: '123456'
})
// 验证规则
const loginRules = ref({
  username: [
    {
      required: true,
      trigger: 'blur',
      message: '用户名为必填项'
    }
  ],
  password: [
    {
      required: true,
      trigger: 'blur',
      validator: validatePassword()
    }
  ]
})
// 密码框显示
const passwordType = ref('password')
// template中 绑定的方法，直接声明即可
const onChangePwdType = () => {
  // 使用 ref声明的数据，在script中使用，需要加value获取 template中 不需要
  if (passwordType.value === 'password') {
    passwordType.value = 'text'
  } else {
    passwordType.value = 'password'
  }
}
// 处理登录
const loading = ref(false)
const store = useStore()
const loginFromRef = ref(null)
const handlerLogin = () => {
  // 表单校验
  console.log(loginFromRef.value)
  loginFromRef.value.validate(valid => {
    if (!valid) return
    // 触发登录动作
    loading.value = true
    store.dispatch('user/login', loginForm.value)
      .then(() => {
        loading.value = false
      })
      .catch(err => {
        console.log(err)
        loading.value = false
      })
  })
  // 进行登录处理
}
</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    ::v-deep .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }

    ::v-deep .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;

      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
