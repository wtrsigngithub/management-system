<template>
  <div class="order">
    <!----------------------------------------------- 查询 --------------------------------------------->
    <div class="top">
      <div class="top_input">
        <p>订单号</p>
        <el-input v-model="orderNo" placeholder="订单号" size="small"></el-input>
      </div>
      <div class="top_input">
        <p>收货人</p>
        <el-input v-model="consignee" placeholder="收货人" size="small"></el-input>
      </div>
      <div class="top_input">
        <p>手机号</p>
        <el-input v-model="phone" placeholder="手机号" size="small"></el-input>
      </div>
      <div class="top_input">
        <p>订单状态</p>
        <el-select v-model="orderState" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.orderState"
            :label="item.label"
            :value="item.orderState"
          ></el-option>
        </el-select>
      </div>
    </div>
    <div class="block">
      <span class="demonstration">选择时间</span>
      <el-date-picker
        v-model="date"
        type="datetimerange"
        :picker-options="pickerOptions"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        align="right"
        size="small"
      ></el-date-picker>
      <el-button type="primary" size="small" @click="seeklist">查询</el-button>
      <el-button type="primary" size="small" @click="reset">重置</el-button>
    </div>
    <!----------------------------------------------- 表格 --------------------------------------------->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column fixed prop="orderNo" label="订单号"></el-table-column>
      <el-table-column prop="orderTime" label="下单时间"></el-table-column>
      <el-table-column prop="phone" label="手机"></el-table-column>
      <el-table-column prop="consignee" label="收货人"></el-table-column>
      <el-table-column prop="deliverAddress" label="配送地址"></el-table-column>
      <el-table-column prop="deliveryTime" label="送达时间"></el-table-column>
      <el-table-column prop="remarks" label="用户备注"></el-table-column>
      <el-table-column prop="orderAmount" label="订单金额"></el-table-column>
      <el-table-column prop="orderState" label="订单状态"></el-table-column>
      <el-table-column fixed="right" label="操作 ">
        <template slot-scope="scope">
          <el-button type="text" @click="lookOrder(scope.row)" size="small">查看</el-button>
          <el-button type="text" @click="edit(scope.row)" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!------------------------------------------------- 分页------------------------------------------------>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5,10,15, 20]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <!----------------------------------------------- 查看 --------------------------------------------->
    <el-dialog :title="title" :visible.sync="dialogVisible" width="30%">
      <div>
        <p>
          订单号:
          <span>{{Lookbackdata.orderNo}}</span>
        </p>
        <p>
          下单时间 :
          <span>{{Lookbackdata.orderTime}}</span>
        </p>
        <p>
          手机号:
          <span>{{Lookbackdata.phone}}</span>
        </p>
        <p>
          收货人:
          <span>{{Lookbackdata.consignee}}</span>
        </p>
        <p>
          配送地址:
          <span>{{Lookbackdata.deliverAddress}}</span>
        </p>
        <p>
          送达时间:
          <span>{{Lookbackdata.deliveryTime}}</span>
        </p>
        <p>
          用户备注:
          <span>{{Lookbackdata.remarks}}</span>
        </p>
        <p>
          订单金额:
          <span>{{Lookbackdata.orderAmount}}</span>
        </p>
        <p>
          订单状态:
          <span>{{Lookbackdata.orderState}}</span>
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">关闭</el-button>
      </span>
    </el-dialog>
    <!----------------------------------------------- 编辑 --------------------------------------------->
    <el-dialog title="编辑" :visible.sync="editdialogVisible" width="30%">
      <p class="editcont">
        <span>订单号:</span>
        <el-input placeholder="订单号" v-model="editbackData.orderNo" clearable></el-input>
      </p>
      <p class="editcont">
        <span class="demonstration">下单时间:</span>
        <el-date-picker v-model="editbackData.orderTime	" type="datetime" placeholder="选择日期时间"></el-date-picker>
      </p>

      <p class="editcont">
        <span>手机号:</span>
        <el-input placeholder="手机号" v-model="editbackData.phone" clearable></el-input>
      </p>
      <p class="editcont">
        <span>收货人:</span>
        <el-input placeholder="收货人" v-model="editbackData.consignee" clearable></el-input>
      </p>
      <p class="editcont">
        <span>配送地址:</span>
        <el-input placeholder="配送地址" v-model="editbackData.deliverAddress" clearable></el-input>
      </p>
      <p class="editcont">
        <span>配送时间:</span>
        <el-date-picker v-model="editbackData.deliveryTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
      </p>
      <p class="editcont">
        <span>用户备注:</span>
        <el-input placeholder="用户备注" v-model="editbackData.remarks" clearable></el-input>
      </p>
      <p class="editcont">
        <span>订单金额:</span>
        <el-input placeholder="订单金额" v-model="editbackData.orderAmount" clearable></el-input>
      </p>
      <p class="editcont">
        <span>订单状态:</span>
        <el-input placeholder="订单状态" v-model=" editbackData.orderState" clearable></el-input>
      </p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureidet ">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// getOrderdetail
import { getOrderlist, changeOrder } from "@/api/apis";
import { getChinatime } from "@/utils/utils";
export default {
  data() {
    return {
      //订单状态
      options: [
        {
          orderState: "全部",
          label: "全部",
        },
        {
          orderState: "已受理",
          label: "已受理",
        },
        {
          orderState: "配送中",
          label: "配送中",
        },
        {
          orderState: "已完成",
          label: "已完成",
        },
      ],

      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      orderState: "全部",
      phone: "", //	联系电话
      orderNo: "", //	订单号
      consignee: "", //	收货人
      date: null, //日期值
      tableData: [], //订单表格
      currentPage: 1, //当前页
      pagesize: 5, //当前条数
      total: 0, //总条数
      dialogVisible: false, //查看模态框开关
      editdialogVisible: false, //编辑模态框开关
      Lookbackdata: {}, // 查询回填数据
      title: "", //查看标题
      editbackData: {}, // 编辑回填数据
    };
  },
  methods: {
    // 当前条
    handleSizeChange(val) {
      this.pagesize = val;
      this.getOrderList(this.paramsex);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getOrderList(this.paramsex);
    },

    // 查看
    lookOrder(item) {
      this.dialogVisible = true;
      this.Lookbackdata = { ...item };
      this.title = `${this.Lookbackdata.consignee}的订单`;
      // getOrderdetail(id).then((res) => {
      //   console.log(res.data);
      // });
    },
    // 编辑
    edit(item) {
      this.editdialogVisible = true;
      this.editbackData = { ...item };
    },
    //确认编辑
    sureidet() {
      let arr = [getChinatime(this.date[0]), getChinatime(this.date[1])];
      console.log(JSON.stringify(arr));
      changeOrder(
        this.editbackData.id,
        this.editbackData.orderNo,
        this.editbackData.orderTime,
        this.editbackData.phone,
        this.editbackData.consignee,
        this.editbackData.deliverAddress,
        this.editbackData.deliveryTime,
        this.editbackData.remarks,
        JSON.stringify(this.editbackData.orderAmount),
        this.editbackData.orderState
      ).then((res) => {
        if (res.data.code == 0) {
          this.$message({
            message: "修改成功",
            type: "success",
          });
          this.editdialogVisible = false;
          this.getOrderList();
        }
      });
    },
    // 查询
    seeklist() {
      let { orderNo, consignee, phone, orderState } = this;
      // 额外参数对象
      let paramsex = {};
      if (orderNo != "") paramsex.orderNo = orderNo;
      if (phone != "") paramsex.phone = phone;
      if (consignee != "") paramsex.consignee = consignee;
      if (orderState != "" && orderState != "全部")
        paramsex.orderState = orderState;
      if (this.date) {
        paramsex.date = JSON.stringify([
          getChinatime(this.date[0]),
          getChinatime(this.date[1]),
        ]);
      }
      this.paramsex = paramsex;
      this.getOrderList(this.paramsex);
    },
    // 获取订单
    getOrderList(paramsex) {
      getOrderlist({
        currentPage: this.currentPage,
        pageSize: this.pagesize,
        ...paramsex,
      }).then((res) => {
        let arr = res.data.data;
        for (let obj of arr) {
          obj.orderTime = getChinatime(obj.orderTime);
          obj.deliveryTime = getChinatime(obj.deliveryTime);
        }
        this.tableData = res.data.data;
        this.total = res.data.total;
      });
    },
    //重置
    reset() {
      this.orderState = "全部";
      this.phone = "";
      this.orderNo = "";
      this.consignee = "";
      this.date = "";
    },
  },
  created() {
    this.getOrderList();
  },
};
</script>

<style lang="less" scoped>
.order {
  background: #fff;
  height: 100%;
  width: 100%;
  padding: 10px;
}
.top {
  display: flex;
  flex-wrap: wrap;
}
.top_input {
  display: flex;
  justify-content: space-between;
  width: 250px;
  align-items: center;
  p {
    font-size: 12px;
    width: 60px;
    margin-right: 5px;
    margin-left: 5px;
  }
}

.block {
  margin-top: 15px;
  margin-bottom: 50px;
  .demonstration {
    font-size: 12px;
    margin-right: 5px;
  }
  .el-button {
    margin-left: 5px;
  }
}
.el-dialog {
  div {
    p {
      margin-bottom: 10px;
      font-size: 16px;
    }
  }
}
.editcont {
  display: flex;
  align-items: center;
  .el-input {
    width: 300px;
    margin-left: 10px;
  }
}
</style>