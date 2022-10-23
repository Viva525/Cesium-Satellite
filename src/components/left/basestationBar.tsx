import * as echarts from "echarts";
import React, { useEffect, useRef, useState } from "react";

const BasestationBar: React.FC<{}> = () => {
  const [init, setInit] = useState<boolean>(false);
  const chartRef = useRef(null);

  useEffect(() => {
    setInit(true);
  }, []);

  useEffect(() => {
    if (init) {
      let myChart = echarts.getInstanceByDom(
        chartRef.current as unknown as HTMLDivElement
      );
      if (myChart == null) {
        myChart = echarts.init(chartRef.current as unknown as HTMLDivElement);
      }

      var newchartName = [
          "星期一",
          "星期二",
          "星期三",
          "星期四",
          "星期五",
          "星期六",
          "星期日",
        ],
        newchartValue1 = ["91", "51", "29", 40, 50, 35, 90],
        newchartValue2 = ["83", "81", "20", 50, 40, 44, 87];
      var barWidth = 20;
      var data = [
        {
          name: "",
          value: 100,
          symbolPosition: "end",
        },
        {
          name: "",
          value: 100,
          symbolPosition: "end",
        },
        {
          name: "",
          value: 100,
          symbolPosition: "end",
        },
        {
          name: "",
          value: 100,
          symbolPosition: "end",
        },
        {
          name: "",
          value: 100,
          symbolPosition: "end",
        },
        {
          name: "",
          value: 100,
          symbolPosition: "end",
        },
        {
          name: "",
          value: 100,
          symbolPosition: "end",
        },
      ];
      var dataBottom = [
        {
          name: "",
          value: "100",
        },
        {
          name: "",
          value: "100",
        },
        {
          name: "",
          value: "100",
        },
        {
          name: "",
          value: "100",
        },
        {
          name: "",
          value: "100",
        },
      ];
      var color1 = {
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        type: "linear",
        global: false,
        colorStops: [
          {
            //第一节下面
            offset: 0,
            color: "#1C98CD",
          },
          {
            offset: 1,

            color: "rgba(61,187,255,.16)",
          },
        ],
      };
      var color2 = {
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        type: "linear",
        global: false,
        colorStops: [
          {
            //第一节下面
            offset: 0,
            color: "#E7AB47",
          },
          {
            offset: 1,
            color: "rgba(255,164,41,.16)",
          },
        ],
      };
      let option = {
        background: "#0000",
        legend: {
          selectedMode: false, //取消图例上的点击事件
          data: ["已完成", "未完成"],
          icon: "rect",
          show: true,
          top: 15,
          right: 10,
          textStyle: {
            color: "#fff",
            fontWeight: "normal",
            fontSize: 12,
          },
        },
        //提示框
        tooltip: {
          trigger: "none"
        },
        grid: {
          top: "25%",
          left: "5%",
          bottom: "5%",
          right: "5%",
          containLabel: true,
        },
        animation: false,
        xAxis: [
          {
            type: "category",
            axisTick: {
              show: false,
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "rgba(255,255,255,.8)",
              },
            },
            axisLabel: {
              inside: false,
              textStyle: {
                color: "#fff",
                fontWeight: "normal",
                fontSize: 12,
              },
              margin: 20, //刻度标签与轴线之间的距离。
            },
            data: newchartName,
          },
          {
            type: "category",
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
            splitArea: {
              show: false,
            },
            splitLine: {
              show: false,
            },
            data: newchartName,
          },
        ],
        yAxis: [
          {
            show: true,
            type: "value",
            axisLabel: {
              textStyle: {
                color: "#fff",
              },
            },
            splitLine: {
              lineStyle: {
                color: "rgba(255,255,255,.8)",
              },
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "rgba(255,255,255,.8)",
              },
            },
          },
        ],
        series: [
          {
            name: "已完成",
            type: "pictorialBar",
            symbolSize: [barWidth, 10],
            symbolOffset: ["-55%", -5],
            symbolPosition: "end",
            z: 15,
            color: "#3eb6f5",
            zlevel: 2,
            data: newchartValue1,
          },
          {
            name: "未完成",
            type: "pictorialBar",
            symbolSize: [barWidth, 10],
            symbolOffset: ["55%", -5],
            symbolPosition: "end",
            z: 15,
            color: "#ffc241",
            zlevel: 2,
            data: newchartValue2,
          },

          {
            name: "已完成",
            type: "bar",
            barGap: "10%",
            barWidth: barWidth,
            itemStyle: {
              color: color1,
              borderColor: color1,
              borderWidth: 1,
              borderType: "solid",
            },
            label: {
              show: true,
              formatter: "{c}" + "%",
              position: "top",
              color: "rgba(119,167,255,1)",
              fontSize: 12,
              textAlign: "center",
            },
            zlevel: 2,
            data: newchartValue1,
          },
          {
            name: "未完成",
            type: "bar",
            barGap: "10%",
            barWidth: barWidth,
            itemStyle: {
              // color: 'rgba(255,164,41,.16)',
              color: color2,
              borderColor: color2,
              borderWidth: 1,
              borderType: "solid",
            },
            label: {
              show: true,
              formatter: "{c}" + "%",
              position: "top",
              color: "rgba(255,228,59,1)",
              fontSize: 12,
              textAlign: "center",
            },
            zlevel: 2,
            data: newchartValue2,
          },
          {
            name: "已完成",
            type: "bar",
            xAxisIndex: 1,
            barGap: "10%",
            data: [100, 100, 100, 100, 100, 100, 100],
            zlevel: 1,
            barWidth: barWidth,
            itemStyle: {
              normal: {
                color: "rgba(61,187,255,.16)",
              },
            },
          },
          {
            name: "未完成",
            type: "bar",
            xAxisIndex: 1,
            barGap: "10%",
            data: [100, 100, 100, 100, 100, 100, 100],
            zlevel: 1,
            barWidth: barWidth,
            itemStyle: {
              normal: {
                color: "rgba(255,164,41,.16)",
              },
            },
          },
          {
            name: "已完成",
            type: "pictorialBar",
            symbolSize: [barWidth, 10],
            symbolOffset: ["-55%", 5],
            z: 12,
            color: "#3eb6f5",

            data: dataBottom,
          },
          {
            name: "未完成",
            type: "pictorialBar",
            symbolSize: [barWidth, 10],
            symbolOffset: ["55%", 5],
            z: 12,
            color: "#ffc241",

            data: dataBottom,
          },
          // 头

          {
            name: "已完成",
            type: "effectScatter",
            rippleEffect: {
              period: 1,
              scale: 5,
              brushType: "fill",
            },
            z: 20,
            zlevel: 3,
            symbolPosition: "end",
            symbolSize: [5, 4],
            symbolOffset: [-12, 0],
            itemStyle: {
              normal: {
                shadowColor: "rgba(0, 0, 0, .3)",
                shadowBlur: 5,
                shadowOffsetY: 3,
                shadowOffsetX: 0,
                color: "rgba(119,167,255,1)",
              },
            },
            data: data,
          },
          {
            name: "未完成",
            type: "effectScatter",
            rippleEffect: {
              period: 1,
              scale: 5,
              brushType: "fill",
            },
            z: 20,
            zlevel: 2,
            symbolPosition: "end",
            symbolSize: [5, 4],
            symbolOffset: ["12", 0],
            itemStyle: {
              normal: {
                shadowColor: "rgba(0, 0, 0, .3)",
                shadowBlur: 5,
                shadowOffsetY: 3,
                shadowOffsetX: 0,
                color: "rgba(255,164,41,0.5)",
              },
            },
            data: data,
          },
        ],
      };

      myChart.setOption(option);
      myChart.resize();
    }
  }, [init]);

  return <div ref={chartRef} style={{ width: "100%", height: "24vh" }}></div>;
};

export default BasestationBar;
