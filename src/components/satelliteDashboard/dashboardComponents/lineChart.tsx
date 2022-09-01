import React, { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";

type LineChartProps = {
  title: string;
  type: "Bar" | "Line";
  xData: Array<string>;
  yData: Array<number> | Array<Array<number>>;
  width: number | string;
  height: number | string;
  legend: Array<String>;
};

let myChart: echarts.EChartsType | undefined;
const LineChart: React.FC<LineChartProps> = (props) => {
  const { title, type, xData, yData, width, height, legend } = props;
  const [init, setInit] = useState<boolean>(false);
  const chartRef = useRef(null);
  const color = [
    ["#05c3d9", "#1b5161"],
    ["#05c3a9", "#1b5e61"],
    ["#058529", "#1b5161"],
    ["#65c3a1", "#1b5161"],
    ["#054569", "#1b5161"],
    ["#05c789", "#1b5161"],
    ["#05c3d9", "#1b5161"],
    ["#05c3d9", "#1b5161"],
  ];

  useEffect(() => {
    setInit(true);
  });

  useEffect(() => {
    if (init) {
      myChart = echarts.getInstanceByDom(
        chartRef.current as unknown as HTMLDivElement
      );
      if (myChart == null) {
        myChart = echarts.init(chartRef.current as unknown as HTMLDivElement);
      }
      if (type === "Bar") {
        initBarChart();
      } else if (type === "Line") {
        initLineChart();
      }
    }
  }, [init]);

  const initBarChart = () => {
    let tmpSeries = [];
    for (let i = 0; i < yData.length; i++) {
      let t = {
        name: legend[i],
        type: "bar",
        barWidth: 3,
        //@ts-ignore
        data: yData[i].slice(0, 20),
        itemStyle: {
          color: {
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            type: "linear",
            global: false,
            colorStops: [
              {
                offset: 0,
                color: color[i][0],
              },
              {
                offset: 1,
                color: color[i][1],
              },
            ],
          },
        },
      };
      
      tmpSeries.push(t);
    }
    let option = {
      backgroundColor: "rgba(255,255,255,0.1)",
      tooltip: {
        trigger: "axis",
      },
      grid: {
        top: "16%",
        left: "5%",
        right: "5%",
        bottom: "15%",
      },
      legend: {
        align: "left",
        right: "5%",
        top: "1%",
        type: "plain",
        textStyle: {
          color: "white",
          fontSize: 12,
        },
        itemGap: 5,
        // itemWidth: 15,
        data: legend,
      },
      calculable: true,
      xAxis: [
        {
          type: "category",
          boundaryGap: false,
          axisLine: {
            show: true,
            lineStyle: {
              color: "rgba(255,255,255,0.5)",
            },
          },
          axisLabel: {
            textStyle: {
              color: "#fff",
              padding: 2,
              fontSize: 8,
            },
            formatter: function (data: any) {
              return data;
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "rgba(255,255,255,0.1)",
            },
          },
          axisTick: {
            show: false,
          },
          data: xData.slice(0, 20),
        },
      ],
      yAxis: [
        {
          name: "number",
          nameTextStyle: {
            color: "#fff",
            fontSize: 10,
            padding: -5,
          },
          min: 0,
          splitLine: {
            show: true,
            lineStyle: {
              color: "rgba(255,255,255,0.1)",
            },
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "rgba(255,255,255,0.5)",
            },
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: "#fff",
              padding: 2,
              fontSize: 8,
            },
            formatter: function (value: number) {
              if (value === 0) {
                return value;
              }
              return value;
            },
          },
          axisTick: {
            show: false,
          },
        },
      ],
      series: tmpSeries,
    };
    myChart?.setOption(option);
  };

  const initLineChart = () => {
    let option = {
      // title: title,
      backgroundColor: "rgba(255,255,255,0.1)",
      tooltip: {
        trigger: "axis",
        backgroundColor: "transparent",
        textStyle: {
          color: "#fff",
          fontSize: 11,
        },
        axisPointer: {
          lineStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "rgba(126,199,255,0)", // 0% 处的颜色
                },
                {
                  offset: 0.5,
                  color: "rgba(126,199,255,1)", // 100% 处的颜色
                },
                {
                  offset: 1,
                  color: "rgba(126,199,255,0)", // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
          },
        },
      },
      legend: {
        align: "left",
        right: "5%",
        top: "1%",
        type: "plain",
        textStyle: {
          color: "white",
          fontSize: 12,
        },
        itemGap: 25,
        itemWidth: 20,
        icon: "path://M0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z",
        data: legend,
      },
      grid: {
        top: "16%",
        left: "5%",
        right: "5%",
        bottom: "15%",
      },
      xAxis: [
        {
          type: "category",
          boundaryGap: false,
          axisLine: {
            show: true,
            lineStyle: {
              color: "rgba(255,255,255,0.5)",
            },
          },
          axisLabel: {
            textStyle: {
              color: "#fff",
              padding: 2,
              fontSize: 8,
            },
            formatter: function (data: any) {
              return data;
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "rgba(255,255,255,0.1)",
            },
          },
          axisTick: {
            show: false,
          },
          data: xData.slice(0, 20),
        },
      ],
      yAxis: [
        {
          name: "number",
          nameTextStyle: {
            color: "#fff",
            fontSize: 10,
            padding: -5,
          },
          min: 0,
          splitLine: {
            show: true,
            lineStyle: {
              color: "rgba(255,255,255,0.1)",
            },
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "rgba(255,255,255,0.5)",
            },
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: "#fff",
              padding: 2,
              fontSize: 8,
            },
            formatter: function (value: number) {
              if (value === 0) {
                return value;
              }
              return value;
            },
          },
          axisTick: {
            show: false,
          },
        },
      ],
      series: [
        {
          name: legend[0],
          type: "line",
          symbol: "circle", // 默认是空心圆（中间是白色的），改成实心圆
          showAllSymbol: true,
          symbolSize: 0,
          smooth: true,
          lineStyle: {
            normal: {
              width: 0.9,
              color: "rgba(25,163,223,1)", // 线条颜色
            },
            borderColor: "rgba(0,0,0,.4)",
          },
          itemStyle: {
            color: "rgba(25,163,223,1)",
            borderWidth: 0,
          },
          tooltip: {
            show: true,
          },
          areaStyle: {
            //区域填充样式
            normal: {
              //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: "rgba(25,163,223,.3)",
                  },
                  {
                    offset: 1,
                    color: "rgba(25,163,223, 0)",
                  },
                ],
                false
              ),
              shadowColor: "rgba(25,163,223, 0.5)", //阴影颜色
              shadowBlur: 20, //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
            },
          },
          data: yData.slice(0, 20),
        },
      ],
    };
    //@ts-ignore
    myChart.setOption(option);
  };

  return (
    <div
      ref={chartRef}
      style={{
        width: `${typeof width === "string" ? width : width + "px"}`,
        height: `${typeof height === "string" ? height : height + "px"}`,
        background: "#212124",
        border: "1px solid #333",
        boxShadow: "2px 8px 16px rgba(0,0,0,0.2)",
        margin: "10px",
      }}
    ></div>
  );
};

export default LineChart;
