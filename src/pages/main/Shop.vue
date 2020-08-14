<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>店铺管理</span>
      <el-button
        style="float: right; padding: 3px 0"
        type="primary"
        size="middle"
        @click="holddata"
      >保存</el-button>
    </div>
    <div class="text item">
      <el-form ref="form" :model="shopdata" label-width="80px" size="mini">
        <el-form-item label="店铺名称">
          <el-input v-model="shopdata.name"></el-input>
        </el-form-item>
        <el-form-item label="店铺公告">
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="shopdata.bulletin"></el-input>
        </el-form-item>
        <el-form-item label="店铺头像">
          <el-upload
            class="avatar-uploader"
            action="http://127.0.0.1:5000/shop/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="店铺图片">
          <el-upload
            action="http://127.0.0.1:5000/shop/upload"
            list-type="picture-card"
            :on-remove="handleRemove"
            :file-list="shopimgs"
            :on-success="shopimgsUploadSuccess"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </el-form-item>
        <el-form-item label="配送费">
          <el-input v-model="shopdata.deliveryPrice"></el-input>
        </el-form-item>
        <el-form-item label="配送时间">
          <el-input v-model="shopdata.deliveryTime"></el-input>
        </el-form-item>
        <el-form-item label="配送描述">
          <el-input v-model="shopdata.description"></el-input>
        </el-form-item>
        <el-form-item label="店铺评分">
          <el-input v-model="shopdata.score"></el-input>
        </el-form-item>
        <el-form-item label="销量">
          <el-input v-model="shopdata.sellCount"></el-input>
        </el-form-item>
        <el-form-item label="活动">
          <el-checkbox-group v-model="shopdata.supports" v-if="shopdata.supports">
            <el-checkbox label="在线支付满28减5" name="supports">在线支付满28减5</el-checkbox>
            <el-checkbox label="VC无限橙果汁全场8折" name="supports">VC无限橙果汁全场8折</el-checkbox>
            <el-checkbox label="单人精彩套餐" name="supports">单人精彩套餐</el-checkbox>
            <el-checkbox label="特价饮品八折抢购" name="supports">特价饮品八折抢购</el-checkbox>
            <el-checkbox label="单人特色套餐" name="supports">单人特色套餐</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="营业时间">
          <el-time-picker
            is-range
            v-model="shopdata.date"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围"
          ></el-time-picker>
        </el-form-item>
        <el-form-item></el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<script>
import { getshopifo, changeshop } from "@/api/apis";
// import getChinatime from '@/utils/utils'
export default {
  data() {
    return {
      shopimgs: [], //回填店铺图片数组
      imageUrl: "",
      dialogImageUrl: "",
      value1: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
      dialogVisible: false,
      shopdata: {},
    };
  },
  methods: {
    // 店铺头像上传成功
    handleAvatarSuccess(res, file) {
      if (res.code == 0) {
        this.shopdata.avatar = `http://127.0.0.1:5000/upload/shop/${res.imgUrl}`;
        this.$message({
          type: "success",
          message: "店铺头像上传成功",
        });
        this.imageUrl = URL.createObjectURL(file.raw);
      }
    },

    //店铺图片上传成功
    shopimgsUploadSuccess(res) {
      if (res.code == 0) this.shop.pics.push(res.imgUrl);
    },
    //店铺图片删除
    handleRemove(res) {
      this.shopdata.pics.splice(this.shopdata.pics.indexOf(res.name), 1);
    },
    // 保存
    holddata() {},
  },
  created() {
    getshopifo().then((res) => {
      this.shopdata = res.data.data;
      //回填照片墙图片
      this.shopimgs = this.shopdata.pics.map((imgstr) => {
        return {
          name: imgstr,
          url: `http://127.0.0.1:5000/upload/shop/${imgstr}`,
        };
      });
    });
  },
};
</script>

<style lang="less" scoped>
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
.el-input,
.el-textarea {
  width: 300px;
}
</style>