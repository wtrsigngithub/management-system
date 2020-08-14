<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>修改密码</span>
      <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
    </div>
    <div class="text item">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="原密码" prop="oldpass">
          <el-input v-model="ruleForm.oldpass"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newpass">
          <el-input type="password" v-model="ruleForm.newpass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<script>
import { changePwd } from "@/api/apis";
import { checkOldpass } from "@/api/apis";
export default {
  data() {
    var validateOldpass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validateNewpass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码"));
      } else {
        callback();
      }
    };
    var validatecheckPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.newpass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        oldpass: "",
        newpass: "",
        checkPass: "",
      },
      rules: {
        oldpass: [{ validator: validateOldpass, trigger: "blur" }],
        newpass: [{ validator: validateNewpass, trigger: "blur" }],
        checkPass: [{ validator: validatecheckPass, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm() {
      checkOldpass(this.ruleForm.oldpass, localStorage.id).then((res) => {
        if (res.data.code == 0) {
          changePwd(this.ruleForm.newpass, localStorage.id).then((res) => {
            if (res.data.code == 0) {
              this.ruleForm.oldpass = "";
              this.ruleForm.newpass = "";
              this.ruleForm.checkPass = "";
              this.$message({
                message: "密码修改成功,请重新登录!",
                type: "success",
              });
              this.$router.push("/"); //改变hash地址
            } else alert(123);
          });
        } else if (res.data.code == 1) {
          this.$message({
            message: "原密码错误,请重新输入",
            type: "warning",
          });
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="less" scoped>
.el-input {
  width: 300px;
}
</style>