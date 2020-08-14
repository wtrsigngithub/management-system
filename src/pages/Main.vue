<template>
  <el-container>
    <!-- Aside -->
    <el-aside width="250px">
      <el-menu
        default-active="/Main/Index"
        class="el-menu-vertical-demo"
        background-color="#304156"
        text-color="#fff"
        active-text-color="#D81E06"
        unique-opened
        router
      >
        <div class="title">
          <img src="../assets/Pepper.png" alt />
          <span>后台管理中心</span>
        </div>
        <div v-for="(item) in powerarr" :key="item.url">
          <el-menu-item v-if="!item.children" :index="item.url">
            <i :class="item.icon"></i>
            <span slot="title">{{item.name}}</span>
          </el-menu-item>
          <el-submenu v-else :index="item.url">
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{item.name}}</span>
            </template>
            <el-menu-item
              v-for="children in item.children"
              :key="children.url"
              :index="children.url"
            >{{children.name}}</el-menu-item>
          </el-submenu>
        </div>
      </el-menu>
    </el-aside>
    <el-container>
      <!-- Header -->
      <el-header>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>
            <a href="/">活动管理</a>
          </el-breadcrumb-item>
        </el-breadcrumb>
        <div class="head-portrait">
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              {{username}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="a">个人中心</el-dropdown-item>
              <el-dropdown-item command="b">注销</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-avatar :size="50" :src="headimg"></el-avatar>
        </div>
      </el-header>
      <!-- Main -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { token, accountinfo } from "@/api/apis";
export default {
  data() {
    return {
      username: "", //用户名
      //动态菜单
      list: [
        {
          url: "/Main/Index",
          icon: "el-icon-message-solid",
          name: "后台首页",
          roles: ["super", "normal"],
        },
        {
          url: "/Main/Order",
          icon: "el-icon-s-promotion",
          name: "订单管理",
          roles: ["super", "normal"],
        },

        {
          url: "/main/items",
          icon: "el-icon-message-solid",
          name: "商品管理",
          children: [
            { url: "/Main/GoodsLists", name: "商品列表" },
            { url: "/Main/GoodAdd", name: "添加商品" },
            { url: "/Main/GoodsClass", name: "商品分类" },
          ],
          roles: ["super", "normal"],
        },
        {
          url: "/Main/Shop",
          icon: "el-icon-eleme",
          name: "店铺管理",
          roles: ["super"],
        },

        {
          url: "/main/users",
          icon: "el-icon-s-platform",
          name: "账号管理",
          children: [
            { url: "/Main/UserLists", name: "用户列表" },
            { url: "/Main/UserAdd", name: "添加用户" },
            { url: "/Main/ChangePwd", name: "修改密码" },
          ],
          roles: ["super"],
        },
        {
          url: "/main/total",
          icon: "el-icon-s-opportunity",
          name: "销售统计",
          children: [
            { url: "/Main/GoodsStatistics", name: "销售统计" },
            { url: "/Main/OrderStatistics", name: "订单统计" },
          ],
          roles: ["super"],
        },
      ],
      headimg: "",
    };
  },
  computed: {
    // 权限
    powerarr() {
      let newarr = this.list.filter((item) => {
        return item.roles.includes(localStorage.role);
      });
      return newarr;
    },
  },
  methods: {
    handleCommand() {
      location.href = "http://127.0.0.1:8080/#/Main/changeUser";
    },
  },
  created() {
    // 判断用户token是否过期
    token(localStorage.token).then((res) => {
      if (res.data.code == 0) {
        //有效
        this.username = localStorage.acc;
      } else {
        //无效
        this.username = "请登录";
      }
    });
    // 获取用户头像
    accountinfo(localStorage.id).then((res) => {
      this.headimg = res.data.accountInfo.imgUrl;
    });
    //监听bus传递事件
    this.$bus.$on("imgupdatefinish", () => {
      accountinfo(localStorage.id).then((res) => {
        this.headimg = res.data.accountInfo.imgUrl;
      });
    });
  },
};
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
}
.title {
  display: flex;
  align-items: center;
  font-size: 18px;
  color: #fff;
  margin: 10px 0;
  img{
    margin-left: 20px;
  }
  span{
    margin-left: 5px;
  }
}
.el-header {
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.el-aside {
  background-color: #304156;
}

.el-main {
  background-color: #f0f2f5;
}
.el-menu {
  border-right: 0;
  height: 100%;
}
.head-portrait {
  display: flex;
  align-items: center;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>