<template>
  <div>
    <div class="top">
      <p>时间范围</p>
      <el-date-picker
        v-model="date"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        align="right"
      ></el-date-picker>
      <el-button type="primary" @click="query">查询</el-button>
    </div>
    <div class="echarts"></div>
  </div>
</template>

<script>
import Echarts from "echarts";
import { getChinatime } from "@/utils/utils";
import { ordertotal } from "@/api/apis";
export default {
  data() {
    return {
      date: [],
    };
  },
  methods: {
    query() {
      let strarr = JSON.stringify([
        getChinatime(this.date[0]),
        getChinatime(this.date[1]),
      ]);
      this.getOrder(strarr);
    },
    getOrder(str) {
      ordertotal(str).then((res) => {
        // for (let obj of res.data.data) {
        //   obj.orderTime = getChinatime(obj.orderTime);
        // }
        console.log(getChinatime(res.data.data[0].orderTime));
        var option = {
          title: {
            text: "折线图堆叠",
          },
          tooltip: {
            trigger: "axis",
          },
          legend: {
            data: ["订单金额"],
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
            data: res.data.data.map((item) => getChinatime(item.orderTime)),
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              name: "订单金额",
              type: "line",
              stack: "总量",
              data: res.data.data.map((item) => item.orderAmount),
            },
          ],
        };

        this.echart.setOption(option);
      });
    },
  },
  mounted() {
    this.echart = Echarts.init(document.querySelector(".echarts"));
  },
};
</script>
<style lang="less" scoped>
.top {
  display: flex;
  align-items: center;
  color: #b2b4b7;
  margin: 20px 0;
  p {
    margin-right: 10px;
  }
  .el-button {
    margin-left: 10px;
  }
}
.echarts {
  height: 400px;
  width: 90%;
  padding: 0 20px;
}
</style>