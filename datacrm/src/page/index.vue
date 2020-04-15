<template>
  <div class="main fillcontain">
    <el-container>
      <el-aside>
        <el-button class="fold-btn" :class="{'close-fold': isCollapse}" @click="isCollapse=!isCollapse">
          <i v-if="!isCollapse" class="el-icon-s-fold"></i>
          <i v-if="isCollapse" class="el-icon-s-unfold"></i>
        </el-button>
        <el-menu :default-active="defaultActive" class="el-menu-jf" style="min-height: 100%;" background-color="#008ecc"
          text-color="#fff" active-text-color="#f5af00" :collapse="isCollapse" router>
          <el-menu-item class="logo-box" index="home" style="min-height:60px;">
            <img class="logo" src="../assets/lo.png" alt="logo_首页">
            <span slot="title">9 SQUARE</span>
          </el-menu-item>
          <el-submenu index="addReport">
            <template slot="title"><i class="el-icon-s-data"></i><span slot="title">数据管理</span></template>
            <el-menu-item index="addReport"><i class="el-icon-document-add"></i>添加数据</el-menu-item>
            <el-menu-item index="reportList"><i class="el-icon-data-analysis"></i>数据列表</el-menu-item>
            <el-menu-item index="impStore"><i class="el-icon-data-analysis"></i>重点商户</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-user-solid"></i><span slot="title">个人中心</span></template>
            <el-menu-item index="changPwd"><i class="el-icon-document-add"></i>修改密码</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <el-menu :default-active="'1'" class="user-info" mode="horizontal" text-color="#333">
            <el-submenu index="1">
              <template slot="title">
                <el-avatar :size="50" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png">
                </el-avatar>
                {{user.name}}管理员
              </template>
              <el-menu-item index="1-1">个人中心</el-menu-item>
              <el-menu-item index="2-2" @click="logout">退出登陆</el-menu-item>
            </el-submenu>
          </el-menu>

        </el-header>
        <el-main>
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </el-main>
        <el-footer>@ 九方购物中心-总部-信息技术中心</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isCollapse: false,
        user: {},
        defaultActive: '1',
        logoutFlag: false
      }
    },
    mounted() {
      let localUser = JSON.parse(localStorage.getItem('user'));
      this.user = localUser ? localUser : {};
    },
    methods: {
      showLogout() {
        this.logoutFlag = true;
      },
      logout() {
        localStorage.removeItem('user');
        localStorage.removeItem('mallInfo');
        this.logoutFlag = false;
        this.$router.push('/login')
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .logo-box {

    .logo {
      width: 26px;
    }

    span {
      font-size: 1.35rem;
      margin-left: 7px;
      font-family: fantasy;
      vertical-align: -webkit-baseline-middle;
    }
  }

  .el-container {
    height: 100vh;
  }


  .el-header,
  .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .user-info {
    float: right;
    position: relative;
    background: #b2c0d1;


    .el-avatar {
      vertical-align: middle;
      margin-right: 8px;
    }

  }

  .el-aside {
    width: auto !important;
  }

  .fold-btn {
    position: absolute;
    left: 199px;
    font-size: 25px;
    color: #0077bc;
    border-radius: 0 5px 5px 0;
    top: 3px;
    background: transparent;
    border: none;
    z-index: 999;
  }

  .fold-btn.close-fold {
    left: 56px;
  }

  .el-menu--horizontal .el-menu .el-menu-item {
    text-align: center;

    &:hover {
      background: #ecf5ff;
      color: #409EFF !important;
    }
  }

  .el-menu-jf {
    i {
      color: #fff;
      font-size: 18px;
      vertical-align: text-top;
    }

  }

  .el-menu-jf:not(.el-menu--collapse) {
    width: 200px;
  }

  // .el-menu--horizontal>.el-submenu .el-submenu__title:hover {
  //   background-color: #b2c0d1 !important;
  // }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
  }
</style>