import * as echarts from "echarts";
import React, { useEffect, useRef, useState } from "react";

type HourChartProps = {
  title: string;
  data: number;
  width: number | string;
  height: number | string;
};

const HourChart: React.FC<HourChartProps> = (props) => {
  const { title, data, width, height } = props;
  const [init, setInit] = useState<boolean>(false);
  const chartRef = useRef(null);

  useEffect(() => {
    setInit(true);
  }, []);

  useEffect(() => {
    if (init) {
      console.log(data);
      
      let myChart = echarts.init(chartRef.current as unknown as HTMLDivElement);
      var colorSet = {
        color: "#22B95E",
      };
      var color1 = {
        type: "linear",
        x: 0,
        y: 0,
        x2: 1,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: "rgba(255,255,255,0.1)",
          },
          {
            offset: 1,
            color: "rgba(255,255,255,0.3)",
          },
        ],
        global: false,
      };
      var color2 = {
        type: "linear",
        x: 0,
        y: 0,
        x2: 1,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: "#30DBBA",
          },
          {
            offset: 1,
            color: "#2DE696",
          },
        ],
        global: false,
      };

      let option = {
        backgroundColor: "rgba(255,255,255,0)",
        tooltip: {
          show: false,
        },
        series: [
          {
            name: "内部进度条",
            type: "gauge",
            radius: "75%",
            min: 0, //最小刻度
            max: 24, //最大刻度
            splitNumber: 10,
            axisLine: {
              lineStyle: {
                color: [
                  [data / 24, colorSet.color],
                  [1, colorSet.color],
                ],
                width: 2,
              },
            },
            axisLabel: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: false,
            },
            itemStyle: {
              color: "#ffffff",
            },
            detail: {
              show: false,
            },
            data: [
              {
                name: "",
                value: data,
              },
            ],
            pointer: {
              show: true,
              length: "70%",
              radius: "20%",
              width: 3, //指针粗细
            },
            animationDuration: 4000,
          },
          {
            name: "内部阴影",
            type: "gauge",
            radius: "67%",
            splitNumber: 1,
            axisLine: {
              lineStyle: {
                color: [
                  [
                    data / 24,
                    new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                      {
                        offset: 0,
                        color: "rgba(45,230,150,0)",
                      },
                      {
                        offset: 0.5,
                        color: "rgba(45,230,150,0.2)",
                      },
                      {
                        offset: 1,
                        color: "rgba(45,230,150,1)",
                      },
                    ]),
                  ],
                  [1, "rgba(28,128,245,0)"],
                ],
                width: 100,
              },
            },
            axisLabel: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: false,
            },
            itemStyle: {
              show: false,
            },
          },
          {
            name: "内部小圆",
            type: "gauge",
            radius: "69%",
            splitNumber: 10,
            axisLine: {
              lineStyle: {
                color: [
                  [data / 24, color2],
                  [1, "rgba(0,0,0,0)"],
                ],
                width: 10,
              },
            },
            axisLabel: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: false,
            },
            itemStyle: {
              show: false,
            },
          },
          {
            name: "外部刻度",
            type: "gauge",
            //  center: ['20%', '50%'],
            radius: "70%",
            min: 0, //最小刻度
            max: 24, //最大刻度
            splitNumber: 6, //刻度数量
            startAngle: 225,
            endAngle: -45,
            axisLine: {
              show: true,
              lineStyle: {
                width: 1,
                color: [[1, "rgba(0,0,0,0)"]],
              },
            }, //仪表盘轴线
            axisLabel: {
              show: true,
              color: "#ffffff",
              fontSize: 14,
              fontFamily: "SourceHanSansSC-Regular",
              fontWeight: "bold",
              // position: "top",
              distance: -30,
              formatter: function (v: string) {
                switch (v + "") {
                  case "0":
                    return "0";
                  case "1":
                    return "1";
                  case "2":
                    return "2";
                  case "3":
                    return "3";
                  case "4":
                    return "4";
                  case "5":
                    return "5";
                  case "6":
                    return "6";
                  case "7":
                    return "7";
                  case "8":
                    return "8";
                  case "9":
                    return "9";
                  case "10":
                    return "10";
                  case "11":
                    return "11";
                  case "12":
                    return "12";
                  case "13":
                    return "13";
                  case "14":
                    return "14";
                  case "15":
                    return "15";
                  case "16":
                    return "16";
                  case "17":
                    return "17";
                  case "18":
                    return "18";
                  case "19":
                    return "19";
                  case "20":
                    return "20";
                  case "21":
                    return "21";
                  case "22":
                    return "22";
                  case "23":
                    return "23";
                  case "24":
                    return "24";
                }
              },
            }, //刻度标签。
            axisTick: {
              show: true,
              splitNumber: 4,
              lineStyle: {
                color: color1, //用颜色渐变函数不起作用
                width: 1,
              },
              length: -6,
            }, //刻度样式
            splitLine: {
              show: true,
              length: -12,
              lineStyle: {
                color: color1, //用颜色渐变函数不起作用
              },
            }, //分隔线样式
            detail: {
              show: false,
            },
          },
          {
            name: "内部进度条",
            type: "gauge",
            // center: ['20%', '50%'],
            radius: "28%",

            splitNumber: 10,
            axisLine: {
              lineStyle: {
                color: [
                  [data / 24, colorSet.color],
                  [1, colorSet.color],
                ],
                width: 1,
              },
            },
            axisLabel: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: false,
            },
            itemStyle: {
              color: "#ffffff",
            },
            detail: {
              formatter: function (value: string | number) {
                if (value !== 0) {
                  return value + "小时";
                } else {
                  return 0;
                }
              },
              offsetCenter: [0, 67],
              textStyle: {
                padding: [0, 0, 0, 0],
                fontSize: 18,
                color: "#ffffff",
              },
            },
            data: [
              {
                value: data,
                itemStyle: {
                  color: "#ffffff",
                  fontFamily: "MicrosoftYaHei",
                  fontSize: 14,
                },
              },
            ],
            pointer: {
              show: false,
            },
            animationDuration: 4000,
          },
          {
            //指针上的圆
            type: "pie",
            tooltip: {
              show: false,
            },
            hoverAnimation: false,
            legendHoverLink: false,
            radius: ["0%", "4%"],
            center: ["50%", "50%"],
            label: {
              normal: {
                show: false,
              },
            },
            labelLine: {
              normal: {
                show: false,
              },
            },
            data: [
              {
                value: 24,
                itemStyle: {
                  normal: {
                    color: "#ffffff",
                  },
                },
              },
            ],
          },
        ],
      };

      myChart.setOption(option)
    }
  }, [init]);

  return (
    <div
      style={{
        width: `${typeof width === "string" ? width : width + "px"}`,
        height: `${typeof height === "string" ? height : height + "px"}`,
        background: "#212124",
        border: "1px solid #333",
        boxShadow: "2px 8px 16px rgba(0,0,0,0.2)",
        margin: "10px",
      }}
    >
      <div
        style={{
          height: "20%",
          width: "100%",
          textAlign: "center",
          color: "#fff",
          fontSize: "24px",
          paddingTop: "10%",
        }}
      >
        {title}
      </div>
      <div
        ref={chartRef}
        style={{
          height: "80%",
          width: "100%",
        }}
      ></div>
    </div>
  );
};

export default HourChart;
