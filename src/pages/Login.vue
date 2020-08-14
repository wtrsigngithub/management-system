<template>
  <div class="Login">
    <div class="input_box">
      <p>系统登录</p>
      <div class="err-input" v-show="errShow">
        <i class="el-input__icon el-icon-circle-close"></i>
        {{errMsg}}
      </div>
      <el-input placeholder="请输入用户名" v-model="acc" clearable>
        <i slot="prefix" class="el-input__icon el-icon-user-solid"></i>
      </el-input>
      <el-input placeholder="请输入密码" v-model="pwd" show-password>
        <i slot="prefix" class="el-input__icon el-icon-user-solid"></i>
      </el-input>

      <el-button type="primary" @click="Login_btn">登录</el-button>
    </div>
  </div>
</template>

<script>
import { login } from "../api/apis";
export default {
  data() {
    return {
      acc: "",
      pwd: "",
      errMsg: "",
      errShow: false,
    };
  },
  methods: {
    Login_btn() {
      login(this.acc, this.pwd).then((res) => {
        // console.log(res.data);
        if (res.data.code == 0) {
          localStorage.token = res.data.token; //写入token
          localStorage.role = res.data.role; //写入用户组
          localStorage.acc = this.acc; //存入用户名
          localStorage.id=res.data.id //存入id
          this.$router.push("/Main/Index"); //改变hash地址
          this.$message({
            message: "用户登录成功!",
            type: "success",
          });
        } else {
          this.errMsg = res.data.msg;
          this.errShow = true;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.Login {
  height: 100%;
  width: 100%;
  background: #2d3a4b;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.input_box {
  height: 200px;
  width: 300px;
  p {
    text-align: center;
    font-weight: 700;
    color: #fff;
    line-height: 60px;
  }
  .err-input {
    color: red;
  }

  /deep/input {
    background-color: transparent;
    color: #fff;
  }
  .el-button {
    width: 100%;
    margin-top: 10px;
  }
}
</style>