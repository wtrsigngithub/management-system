<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <div>
            <img src="../../assets/dingdanguanli.png" alt />
          </div>
          <div class="title_font">
            <p>总订单</p>
            <p>00000</p>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <div>
            <img src="../../assets/money.png" alt />
          </div>
          <div class="title_font">
            <p>总销售额</p>
            <p>00000</p>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <div>
            <img src="../../assets/order.png" alt />
          </div>
          <div class="title_font">
            <p>今日订单数</p>
            <p>00000</p>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <div>
            <img src="../../assets/xiaoshoue.png" alt />
          </div>
          <div class="title_font">
            <p>今日销售额</p>
            <p>00000</p>
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="echarts"></div>
  </div>
</template>

<script>
import echarts from "echarts";
import { totaldata } from "@/api/apis";
export default {
  mounted() {
    totaldata().then((res) => {
      console.log(res.data);
      var option = {
        title: {
          text: "数据统计",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["订单", "销售额", "注册人数", "管理人员"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: res.data.xData,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "订单",
            type: "line",
            stack: "总量",
            data: res.data.orderData,
          },
          {
            name: "销售额",
            type: "line",
            stack: "总量",
            data: res.data.amountData,
          },
        ],
      };
      myecharts.setOption(option);
    });
    var myecharts = echarts.init(document.querySelector(".echarts"));
  },
};
</script>

<style lang="less" scoped>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #fff;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  height: 100px;
  display: flex;
  justify-content: space-between;
  padding: 0 30px;
  align-items: center;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.title_font {
  p:first-child {
    flex-direction: column;
    justify-content: center;
    color: #d0d0d0;
    font-size: 18px;
    margin-bottom: 10px;
    margin-right: 10px;
  }
  p:nth-child(2) {
    text-align: center;
  }
}
.echarts {
  height: 400px;
  width: 90%;
  background: #fff;
  padding: 0 20px;
}
</style>