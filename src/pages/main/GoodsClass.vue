<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>商品分类</span>
      <el-button
        type="primary"
        @click="addClass"
        size="middle"
        style="float: right; padding: 3px 0"
      >添加分类</el-button>
    </div>
    <div class="text item">
      <el-table ref="singleTable" :data="tableData" style="width: 100%">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="分类名称">
          <template slot-scope="scope">
            <span v-show="!scope.row.isedit">{{scope.row.cateName}}</span>
            <el-input v-model="scope.row.cateName" v-show="scope.row.isedit" size="mini"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="是否启用">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="clickEdit(scope)">{{ scope.row.isedit ? '完成': '编辑' }}</el-button>
            <el-button type="danger" size="mini" @click="removeclick(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="curLong"
        layout="total,sizes, prev, pager, next"
        :total="total"
      ></el-pagination>
    </div>
    <!-- 添加分类弹出框 -->
    <el-dialog title="添加分类" :visible.sync="dialogFormVisible" width="500px">
      <el-form :model="form">
        <el-form-item label="分类名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="是否启用" :label-width="formLabelWidth">
          <el-switch v-model="form.isyes" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureClick">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
import { catelist, addcate, delcate, editcate } from "@/api/apis";
export default {
  data() {
    return {
      tableData: [],
      currentPage: 1,
      curLong: 5,
      total: 0,
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: "",
        isyes: true,
      },
      formLabelWidth: "120px",
    };
  },
  methods: {
    //改变当前条数
    handleSizeChange(val) {
      this.curLong = val;
      this.getgoodsList();
    },
    //改变当前页数
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getgoodsList();
    },
    //获取商品列表
    getgoodsList() {
      catelist(this.currentPage, this.curLong).then((res) => {
        res.data.data.forEach((item) => {
          item.state = item.state == 1 ? true : false;
        });
        // 先转换
        let arr = res.data.data;
        for (let obj of arr) {
          obj.isedit = false; //此对象数据是否在编辑状态
        }
        this.tableData = res.data.data;
        this.total = res.data.total;
      });
    },
    // 打开添加分类
    addClass() {
      this.dialogFormVisible = true;
    },
    //确定添加分类
    sureClick() {
      addcate(this.form.name, this.form.isyes).then((res) => {
        if (res.data.code == 0) {
          this.$message({
            type: "success",
            message: "添加成功!",
          });
          // 重载列表
          this.getgoodsList();
        }
      });
      this.form.name = "";
      this.dialogFormVisible = false;
    },
    //删除商品分类
    removeclick(row) {
      delcate(row.id).then((res) => {
        if (res.data.code == 0) {
          this.$message({ type: "success", message: "删除成功!" });
          // 重载列表
          this.getgoodsList();
        }
      });
    },
    // 编辑商品分类
    clickEdit(scope) {
      if (scope.row.isedit) {
        //改变数据
        editcate(scope.row.id, scope.row.cateName, scope.row.state).then((res) => {
          if (res.data.code == 0) {
            this.$message({ type: "success", message: "修改成功!" });
            // 重载列表
            this.getgoodsList();
          }
        });
        scope.row.isedit = false;
      } else {
        //打开编辑状态
        scope.row.isedit = true;
      }
    },
  },
  created() {
    this.getgoodsList();
  },
};
</script>

<style lang="less" scoped>
.goods_class {
  p {
    margin: 10px 0;
  }
}
</style>