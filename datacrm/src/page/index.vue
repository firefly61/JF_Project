<template>
  <div class="main fillcontain">
    <el-container>
      <el-aside width="200px">
        <el-menu :default-active="defaultActive" style="min-height: 100%;" router>
          <el-menu-item index="addReport" style="min-height:60px;">
            <img class="logo" src="../assets/_logo.png" alt="logo_首页">
          </el-menu-item>
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-document"></i>数据管理</template>
            <el-menu-item index="addReport"><i class="el-icon-document-add"></i>添加数据</el-menu-item>
            <el-menu-item index="reportList"><i class="el-icon-data-analysis"></i>数据列表</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-document"></i>个人中心</template>
            <el-menu-item index="addReport"><i class="el-icon-document-add"></i>修改密码</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <el-dropdown class="f-r">
            <div class="user-info">
              <el-avatar :size="50" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png">
              </el-avatar>
              admin
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

        </el-header>
        <el-main>
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </el-main>
        <el-footer>@中航九方购物中心—总部—信息技术中心</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        defaultActive: '1'
      }
    },
    methods: {
      logout() {
        console.log(1)
        this.$router.push('/login')
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .logo {
    width: 100%;
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
    height: 60px;
    line-height: 60px;

    .el-avatar {
      vertical-align: middle;
      margin-right: 8px;
    }
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
  }
</style>