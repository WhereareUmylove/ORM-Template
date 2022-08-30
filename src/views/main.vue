<template>
  <div class="app-wrapper">
    <header class="header">
      <div class="logo">
        <img src="" alt="">
        <span class="text">CrowdFunz</span>
      </div>
      <div class="rt">
        <el-avatar icon="el-icon-user-solid"></el-avatar>
        <p class="hello">{{ username }}</p>
        <p class="sign-out" @click="signOut">
          <i class="el-icon-switch-button"></i>
        </p>
      </div>
    </header>
    <el-menu :router="true" class="nav-menu" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" :default-active="$route.name" mode="vertical" :collapse="isCollapse" :unique-opened="true">

      <el-submenu index="6" v-if="hasPermission('角色列表') || hasPermission('系统用户列表')">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span>权限管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="role" v-if="hasPermission('角色列表')">角色管理</el-menu-item>
          <el-menu-item index="user" v-if="hasPermission('系统用户列表')">用户管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>

    <main class="main">
      <div class="content">
        <el-breadcrumb separator=" ">
          <el-breadcrumb-item>
            <div class="hamburger-container" @click="changeCollapse">
              <svg data-v-4e6f274c="" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="30" height="14" class="hamburger is-active">
                <path data-v-4e6f274c="" d="M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM142.4 642.1L298.7 519a8.84 8.84 0 0 0 0-13.9L142.4 381.9c-5.8-4.6-14.4-.5-14.4 6.9v246.3a8.9 8.9 0 0 0 14.4 7z"></path>
              </svg>
            </div>
          </el-breadcrumb-item>
          <el-breadcrumb-item>
            {{title}}
          </el-breadcrumb-item>
        </el-breadcrumb>
        <el-collapse-transition>
          <router-view />
        </el-collapse-transition>
      </div>
    </main>
  </div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
import { getUsername, getPermission } from "@/utils/storage";

@Component({
  components: {},
})
export default class App extends Vue {
  isCollapse = false;
  get username() {
    return getUsername();
  }
  hasPermission(name) {
    return getPermission(name);
  }
  get title() {
    return this.$route.meta.title;
  }
  created() {
    this.isCollapse =
      localStorage.getItem("isCollapse") === "true" ? true : false;
  }
  signOut() {
    this.$store.dispatch("Logout").then((res) => {
      this.$router.push("login");
    });
  }
  changeCollapse() {
    this.isCollapse = !this.isCollapse;
    localStorage.setItem("isCollapse", this.isCollapse);
  }
}
</script>

<style lang="scss">
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
  .header {
    height: 56px;
    box-shadow: 1px 1px 2px 1px #dddddd;
    font-size: 18px;
    z-index: 88;
    background-color: rgb(58, 58, 58);
    .logo {
      height: 56px;
      width: 200px;
      color: white;
      display: flex;
      float: left;
      align-items: center;
      justify-content: center;
      font-family: "Helvetica Neue";
      font-weight: 700;
      img {
        width: 36px;
        height: 36px;
      }
    }
    .hamburger-container {
      line-height: 56px;
      height: 56px;
      width: 20px;
      float: left;
      padding: 0 10px;
      .hamburger {
        display: inline-block;
        cursor: pointer;
        width: 20px;
      }
    }
    .rt {
      height: 100%;
      color: white;
      float: right;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .hello {
        font-size: 16px;
        margin-left: 10px;
        margin-right: 20px;
      }
      .sign-out {
        font-size: 20px;
        cursor: pointer;
        margin-right: 50px;
      }
    }
  }
  .nav-menu {
    float: left;
    height: calc(100% - 56px);
    position: relative;
    z-index: 99;
  }
  .nav-menu:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .main {
    height: calc(100% - 56px);
    background-color: #f2f5f5;
    position: absolute;
    top: 56px;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
    .content {
      background-color: white;
      overflow: auto;
      margin: 15px;
      padding: 15px;
    }
  }
}
.nav-menu {
  ~ .main {
    width: calc(100% - 200px);
    left: 200px;
    transition: left 0.2s;
  }
  ~ .header {
    width: calc(100% - 200px);
  }
}
.el-menu--collapse {
  ~ .main {
    width: calc(100% - 64px);
    left: 64px;
  }
  ~ .header {
    width: calc(100% - 64px);
  }
  .logo {
    height: 56px;
    width: 64px;
    .text {
      display: none;
    }
  }
}
.pagination-box {
  padding: 10px;
  background-color: rgb(255, 255, 255);
}
</style>