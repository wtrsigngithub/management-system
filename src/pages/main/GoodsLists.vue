<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>商品列表</span>
      </div>
      <!--------------------------------------------- 表格 ------------------------------------------------------->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="商品ID">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="商品名称">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="所属分类">
                <span>{{ props.row.category }}</span>
              </el-form-item>
              <el-form-item label="商品价格">
                <span>{{ props.row.price }}</span>
              </el-form-item>
              <el-form-item label="商品图片">
                <img class="imgset" :src="props.row.imgUrl" />
              </el-form-item>
              <el-form-item label="创建时间">
                <span>{{ props.row.ctime }}</span>
              </el-form-item>
              <el-form-item label="商品评价">
                <span>{{ props.row.rating }}</span>
              </el-form-item>
              <el-form-item label="商品销量">
                <span>{{ props.row.sellCount }}</span>
              </el-form-item>
              <el-form-item label="商品描述">
                <span>{{ props.row.goodsDesc }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="商品名称" prop="name"></el-table-column>
        <el-table-column label="所属分类" prop="category"></el-table-column>
        <el-table-column label="商品价格" prop="price"></el-table-column>
        <el-table-column label="商品图片">
          <template slot-scope="scope">
            <img :src="scope.row.imgUrl" class="imgset" />
          </template>
        </el-table-column>
        <el-table-column label="商品描述" prop="goodsDesc"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="edit(scope.row)">编辑</el-button>
            <el-button type="danger" size="mini" @click="removeclick(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--------------------------------------------- 分页 ------------------------------------------------------->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5,10, 15, 20, 25]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
      <!--------------------------------------------- 模态框 ------------------------------------------------------->
      <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="商品名称">
            <el-input v-model="backData.name" placeholder="商品名称" size="mini"></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
            <el-select v-model="backData.category" placeholder="请选择商品分类" size="mini">
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
            <el-input type="textarea" v-model="backData.goodsDesc"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="sureClick">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
//
import { getgoodsList, delgoods, categories, changegoods } from "@/api/apis";
import { getChinatime } from "@/utils/utils";
export default {
  data() {
    return {
      imageUrl: "",
      tableData: [],
      currentPage: 1,
      pageSize: 5,
      total: 0,
      dialogVisible: false,
      //回填数据

      price: 1,
      form: {
        name: "",
        category: "",
        goodsDesc: "",
        list: [],
      },
      imgUrl: "",
      backData: {},
      id: "",
    };
  },
  methods: {
    // 关闭模态框
    handleClose(done) {
      done();
    },
    // 图片上传成功后
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.imgUrl = res.imgUrl;
    },
    // 当前条数
    handleSizeChange(val) {
      this.pageSize = val;
      // 获取商品列表
      this.getgoodslistFn();
    },
    // 当前页数
    handleCurrentChange(val) {
      this.currentPage = val;
      // 获取商品列表
      this.getgoodslistFn();
    },
    // 获取商品列表
    getgoodslistFn() {
      getgoodsList(this.currentPage, this.pageSize).then((res) => {
        let arr = res.data.data;
        for (let obj of arr) {
          obj.ctime = getChinatime(obj.ctime);
          obj.imgUrl = `http://127.0.0.1:5000/upload/imgs/goods_img/${obj.imgUrl}`;
        }
        this.total = res.data.total;
        this.tableData = res.data.data;
      });
    },
    // 删除
    removeclick(data) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delgoods(data.id).then((res) => {
            if (res.data.code == 0) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              // 获取商品列表
              this.getgoodslistFn();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 编辑
    edit(data) {
      this.dialogVisible = true;
      this.backData = { ...data };
      this.id = data.id;
      console.log(this.backData);
      // 获取商品分类列表
      categories().then((res) => {
        this.form.list = res.data.categories;
      });
    },
    //确认编辑
    sureClick() {
      changegoods(
        this.backData.name,
        this.backData.category,
        this.backData.price,
        this.imgUrl,
        this.backData.goodsDesc,
        this.id
      ).then((res) => {
        if (res.data.code == 0) {
          this.$message({
            message: "修改成功!",
            type: "success",
          });
          // 刷新
          this.getgoodslistFn();
        }
      });
      this.dialogVisible = false;
    },
  },
  created() {
    // 获取商品列表
    this.getgoodslistFn();
  },
};
</script>

<style lang="less" scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.title {
  text-indent: 10px;
  margin-bottom: 5px;
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
.el-input {
  width: 300px;
}
.el-textarea {
  width: 300px;
}
.imgset,
.avatar {
  height: 140px;
  width: 140px;
}
</style>