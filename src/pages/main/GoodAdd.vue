<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>商品添加</span>
    </div>
    <div class="text item">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="商品名称">
          <el-input v-model="form.name" placeholder="商品名称" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="商品分类">
          <el-select v-model="form.category" placeholder="请选择商品分类" size="mini">
            <el-option
              :label="item.cateName"
              :value="item.cateName"
              v-for="(item,index) in form.list"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品价格">
          <el-input-number v-model="price" :min="1" :max="99" label="描述文字" size="mini"></el-input-number>
        </el-form-item>
        <el-form-item label="商品图片">
          <el-upload
            class="avatar-uploader"
            action="http://127.0.0.1:5000/goods/goods_img_upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="商品描述">
          <el-input type="textarea" v-model="form.goodsDesc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addclick">添加商品</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<script>
import { categories, add } from "@/api/apis";
export default {
  data() {
    return {
      price: 1,
      imageUrl: "",
      form: {
        name: "",
        category: "",
        goodsDesc: "",
        list: [],
      },
      imgUrl: "",
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.imgUrl = res.imgUrl;
    },
    //添加
    addclick() {
      add(
        this.form.name,
        this.form.category,
        this.price,
        this.imgUrl,
        this.form.goodsDesc
      ).then((res) => {
        if (res.data.code == 0) {
          (this.form.name = ""),
            (this.form.category = ""),
            (this.price = 1),
            (this.imageUrl = ""),
            (this.form.goodsDesc = "");
          this.$message({
            message: "添加成功!",
            type: "success",
          });
        }
      });
    },
  },
  created() {
    // 获取商品分类列表
    categories().then((res) => {
      this.form.list = res.data.categories;
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
.el-input {
  width: 300px;
}
.el-textarea {
  width: 300px;
}
</style>
