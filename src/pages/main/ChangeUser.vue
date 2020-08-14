<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>管理员信息</span>
    </div>
    <p>
      <span>管理员ID:</span>
      <span>{{list.id}}</span>
    </p>
    <p>
      <span>账号:</span>
      <span>{{list.account}}</span>
    </p>
    <p>
      <span>用户组:</span>
      <span>{{list.userGroup}}</span>
    </p>
    <p>
      <span>创建时间:</span>
      <span>{{list.ctime}}</span>
    </p>
    <div class="head">
      <div class="name">管理员头像:</div>
      <div class="headbox">
        <el-upload
          class="avatar-uploader"
          action="http://127.0.0.1:5000/users/avatar_upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :data="uploaddata"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
    </div>
  </el-card>
</template>

<script>
import { accountinfo } from "@/api/apis";
export default {
  data() {
    return {
      list: [],
      imageUrl: "",
      uploaddata: {},
    };
  },
  methods: {
    //   图片上传成功后
    handleAvatarSuccess(res) {
      if (res.code == 0) {
        //发出通知
        this.$bus.$emit("imgupdatefinish");
      }
    },
  },
  created() {
    //   获取用户信息
    accountinfo(localStorage.id).then((res) => {
      this.list = res.data.accountInfo;
    });
    this.uploaddata = { id: localStorage.id };
  },
};
</script>

<style lang="less" scoped>
p {
  border-bottom: 1px solid #f2f2f2;
  line-height: 60px;
}
.head {
  display: flex;
  align-items: center;
}
/deep/.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>