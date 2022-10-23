//@ts-nocheck
import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

const BaseChart0: React.FC<any> = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    let myChart = echarts.init(chartRef.current as unknown as HTMLDivElement);
    var hours = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
      "21",
      "22",
      "23",
    ];
    var days = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
    var arr = [
      [
        123, 123, 12, 3, 123, 12, 123, 123, 12, 3, 123, 12, 123, 123, 12, 3,
        123, 12, 123, 123, 12, 3, 123, 12,
      ],
      [
        123, 123, 12, 3, 123, 12, 123, 123, 12, 3, 123, 12, 123, 123, 12, 3,
        123, 12, 123, 123, 12, 3, 123, 12,
      ],
      [
        123, 123, 12, 3, 123, 12, 123, 123, 12, 3, 123, 12, 123, 123, 12, 3,
        123, 12, 123, 123, 12, 3, 123, 12,
      ],
      [
        123, 123, 12, 3, 123, 12, 123, 123, 12, 3, 123, 12, 123, 123, 12, 3,
        123, 12, 123, 123, 12, 3, 123, 12,
      ],
      [
        123, 123, 12, 3, 123, 12, 123, 123, 12, 3, 123, 12, 123, 123, 12, 3,
        123, 12, 123, 123, 12, 3, 123, 12,
      ],
      [
        123, 123, 12, 3, 123, 12, 123, 123, 12, 3, 123, 12, 123, 123, 12, 3,
        123, 12, 123, 123, 12, 3, 123, 12,
      ],
      [
        123, 123, 12, 3, 123, 12, 123, 123, 12, 3, 123, 12, 123, 123, 12, 3,
        123, 12, 123, 123, 12, 3, 123, 12,
      ],
    ];
    let option = {
      backgroundColor: "#00000000",
      title: [],
      xAxis: [],
      grid: [],
      tooltip: {
        trigger: "none",
        axisPointer: {},
      },
      yAxis: [],
      series: [],
    };

    for (var i = 0; i < days.length; i++) {
      option.title.push({
        textBaseline: "middle",
        top: ((i + 0.5) * 100) / 7 + "%",
        text: days[i],
        textStyle:{
          fontSize:14,
          color:'#fff'
        }
      });
      option.xAxis.push({
        gridIndex: i,
        type: "category",
        data: hours,
        axisLabel: {
          fontSize:12,
          color: "#fff",
          interval: 0,
        },
      });
      option.grid.push({
        top: (i * 100) / 7 + 2 + "%",
        height: 30,
      });
      option.yAxis.push({
        gridIndex: i,
        show: false,
        type: "value",
        axisTick: {
          //y轴刻度线
          show: false,
        },
        splitLine: {
          //网格线
          show: false,
        },
        axisLine: {
          //y轴
          show: false,
        },
      });
      option.series.push({
        xAxisIndex: i, //使用x轴的index-0，y轴的index-0
        yAxisIndex: i,
        data: arr[i],
        type: "bar",
        barWidth: 10
      });
    }

    myChart.setOption(option);
  }, []);

  return (
    <div
      id="baseChart0"
      style={{ width: "100%", height: "30vh" }}
      ref={chartRef}
    ></div>
  );
};

export default BaseChart0;
