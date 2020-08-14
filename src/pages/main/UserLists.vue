<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>账号列表</span>
      <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
    </div>
    <div class="text item">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="selectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="账号" width="300">
          <template slot-scope="scope">{{ scope.row.account }}</template>
        </el-table-column>
        <el-table-column prop="userGroup" label="用户组" width="300"></el-table-column>
        <el-table-column prop="ctime" label="创建时间" show-overflow-tooltip></el-table-column>
        <el-table-column prop="address" label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="edit(scope.row)">编辑</el-button>
            <el-button type="danger" size="mini" @click="removeuser(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="	[5,10,15,20]"
        :page-size="curLong"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
      <div style="margin-top: 20px">
        <el-button type="danger" @click="clickBatchDelete">批量删除</el-button>
        <el-button type="primary" @click="toggleSelection()">取消选择</el-button>
      </div>
    </div>
    <el-dialog title="修改用户" :visible.sync="dialogFormVisible" width="500px">
      <el-form :model="form">
        <el-form-item label="用户账号" :label-width="formLabelWidth" style="width:320px">
          <el-input v-model="changeaccount" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户组" :label-width="formLabelWidth">
          <el-select v-model="changeuserGroup" placeholder="请选择用户组">
            <el-option value="超级管理员"></el-option>
            <el-option value="普通管理员"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureclick">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
import { userList, reUser, batchdel, changeUser } from "@/api/apis";
import { getChinatime } from "@/utils/utils";
export default {
  data() {
    return {
      currentPage: 1,
      curLong: 5,
      tableData: [],
      tableIndex: "",
      total: 0,
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: "",
        region: "",
      },
      formLabelWidth: "100px",
      ids: [],
      changeid: "", //修改账号的id
      changeaccount: "", //修改账号
      changeuserGroup: "", //修改账号的用户组
    };
  },
  methods: {
    //取消选择
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    //复选框发生变化
    selectionChange(arr) {
      this.ids = arr.map((item) => {
        return item.id;
      });
    },
    //批量删除
    clickBatchDelete() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          batchdel(JSON.stringify(this.ids)).then((res) => {
            if (res.data.code == 0) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.getUserList();
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
    //改变当前页数
    handleSizeChange(val) {
      this.curLong = val;
      this.getUserList();
    },
    //改变当前条数
    handleCurrentChange(val) {
      this.currentPage = val;

      // 获取账号列表
      this.getUserList();
    },
    //删除用户
    removeuser(index) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.tableIndex = index;
          // 删除用户api
          reUser(this.tableData[this.tableIndex].id).then((res) => {
            if (res.data.code == 0) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              // 获取账号列表
              this.getUserList();
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
    // 获取账号列表
    getUserList() {
      userList(this.currentPage, this.curLong).then((res) => {
        let arr = res.data.data;
        for (let obj of arr) {
          obj.ctime = getChinatime(obj.ctime);
        }

        this.tableData = res.data.data;
        this.total = res.data.total;
      });
    },
    //编辑
    edit(item) {
      this.dialogFormVisible = true;
      this.changeid = item.id;
      this.changeaccount = item.account;
      this.changeuserGroup = item.userGroup;
    },
    //确认编辑
    sureclick() {
      changeUser(this.changeid, this.changeaccount, this.changeuserGroup).then(
        (res) => {
          if (res.data.code == 0) {
            this.$message({
              message: "修改成功!",
              type: "success",
            });
          }
        }
      );
      this.dialogFormVisible = false;
      this.getUserList();
    },
  },
  created() {
    // 获取账号列表
    this.getUserList();
  },
};
</script>

<style lang="less" scoped>
</style>