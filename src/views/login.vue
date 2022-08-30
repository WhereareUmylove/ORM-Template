<template>
  <div class="login">
    <div class="logo">
      <img src="" alt="CrowdFunz">
      <span>CrowdFunz</span>
    </div>
    <div class="bg">
    </div>
    <div class="box">
      <el-form ref="loginForm" :model="loginForm" :rules="rules" class="login-form" :hide-required-asterisk="true">
        <el-form-item prop="userName">
          <span>账户</span>
          <el-input v-model="loginForm.userName" placeholder="请输入用户名" prefix-icon="el-icon-user" />
        </el-form-item>
        <el-form-item prop="passWord">
          <span>密码</span>
          <el-input v-model="loginForm.passWord" :type="showPwd" placeholder="请输入密码" prefix-icon="el-icon-lock" @keyup.enter.native="login">
            <i slot="suffix" class="el-icon-key" @mouseenter="showPwd = 'text'" @mouseleave="showPwd = 'password'"></i>
          </el-input>
        </el-form-item>
      </el-form>
      <el-button :loading="loading" type="primary" @click="login">登 录</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { GValidate } from "@/utils/decorate";

@Component({
  components: {},
})
export default class App extends Vue {
  showPwd = "password";

  loginForm = {
    userName: "",
    passWord: "",
  };
  rules = {
    userName: [{ required: true, message: "请输入用户名", trigger: "blur" }],
    passWord: [{ required: true, message: "请输入密码", trigger: "blur" }],
  };
  loading = false;

  @GValidate("loginForm")
  login() {
    let form = { ...this.loginForm };
    this.loading = true;
    this.$store
      .dispatch("Login", form)
      .then((res) => {
        this.loading = false;
        this.$router.push("/user");
      })
      .catch((res) => {
        this.loading = false;
      });
  }
}
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  overflow: hidden;
  justify-content: center;
  background-color: #1d1d26;
  user-select: none;
  display: flex;
  align-items: center;
  position: relative;

  .box {
    position: fixed;
    width: 320px;
    height: 320px;
    background-color: #fff;
    box-shadow: 3px 3px 20px 2px rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    padding: 40px 70px;
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      cursor: pointer;
      user-select: none;
    }
    .el-button {
      display: block;
      width: 100%;
      font-size: 22px;
      margin-top: 10px;
      margin-bottom: 40px;
    }

    .login-form {
      .el-form-item {
        margin-bottom: 34px;
      }
      .el-form-item__content > span {
        font-size: 18px;
        letter-spacing: 1.8px;
      }
    }
  }

  .logo {
    position: fixed;
    left: 20px;
    top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 50px;
      height: 50px;
    }
    span {
      margin-left: 10px;
      font-weight: 800;
      font-size: 20px;
      color: rgb(255, 255, 255);
      display: inline-block;
      height: 50px;
      line-height: 50px;
    }
  }
  .bg {
    width: 100%;
    height: 100%;
  }
}
</style>