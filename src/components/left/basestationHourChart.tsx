import * as echarts from "echarts";
import React, { useEffect, useRef, useState } from "react";

type BasestationHourChartProps = {
  data: number;
  width: number | string;
  height: number | string;
};

const BasestationHourChart: React.FC<BasestationHourChartProps> = (props) => {
  const { data, width, height } = props;
  const [init, setInit] = useState<boolean>(false);
  const chartRef = useRef(null);

  useEffect(() => {
    setInit(true);
  }, []);

  useEffect(() => {
    if (init) {
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
      var dataStyle = {
        normal: {
          label: {
            show: false,
          },
          labelLine: {
            show: false,
          },
          shadowBlur: 0,
          shadowColor: "#203665",
        },
      };
      let option = {
        backgroundColor: "rgba(255,255,255,0)",
        grid: {
          left: 0,
        },
        tooltip: {
          show: false,
        },
        series: [
          {
            name: "内部进度条",
            type: "gauge",
            center: ["20%", "55%"],
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
            center: ["20%", "55%"],
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
            center: ["20%", "55%"],
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
            center: ["21%", "55%"],
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
              distance: -20,
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
            center: ["20%", "55%"],
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
            center: ["20%", "55%"],
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
          {
            name: "第一个圆环",
            type: "pie",
            clockWise: false,
            radius: [40, 32],
            itemStyle: dataStyle,
            hoverAnimation: false,
            center: ["52%", "50%"],
            data: [
              {
                value: 70,
                label: {
                  normal: {
                    rich: {
                      a: {
                        color: "#5FB878",
                        align: "center",
                        fontSize: 16,
                        fontWeight: "bold",
                      },
                      b: {
                        color: "#fff",
                        align: "center",
                        fontSize: 16,
                      },
                    },
                    formatter: function (params: { value: string }) {
                      return (
                        "{b|运行}\n\n\n\n" +
                        "{a|" +
                        params.value +
                        "次}" +
                        "\n\n\n\n{b|2%}"
                      );
                    },
                    position: "center",
                    show: true,
                    textStyle: {
                      fontSize: "16",
                      fontWeight: "normal",
                      color: "#fff",
                    },
                  },
                },
                itemStyle: {
                  normal: {
                    color: "#5FB878",
                    shadowColor: "#5FB878",
                    shadowBlur: 0,
                  },
                },
              },
              {
                value: 75,
                name: "invisible",
                itemStyle: {
                  normal: {
                    color: "#E1E8EE",
                  },
                  emphasis: {
                    color: "#E1E8EE",
                  },
                },
              },
            ],
          },
          {
            name: "第二个圆环",
            type: "pie",
            clockWise: false,
            radius: [40, 32],
            itemStyle: dataStyle,
            hoverAnimation: false,
            center: ["70%", "50%"],
            data: [
              {
                value: 24,
                label: {
                  normal: {
                    rich: {
                      a: {
                        color: "#01AAED",
                        align: "center",
                        fontSize: 16,
                        fontWeight: "bold",
                      },
                      b: {
                        color: "#fff",
                        align: "center",
                        fontSize: 16,
                      },
                    },
                    formatter: function (params: { value: string }) {
                      return (
                        "{b|计划}\n\n\n\n" +
                        "{a|" +
                        params.value +
                        "次}" +
                        "\n\n\n\n{b|2%}"
                      );
                    },
                    position: "center",
                    show: true,
                    textStyle: {
                      fontSize: "16",
                      fontWeight: "normal",
                      color: "#fff",
                    },
                  },
                },
                itemStyle: {
                  normal: {
                    color: "#01AAED",
                    shadowColor: "#01AAED",
                    shadowBlur: 0,
                  },
                },
              },
              {
                value: 50,
                name: "invisible",
                itemStyle: {
                  normal: {
                    color: "#E1E8EE",
                  },
                  emphasis: {
                    color: "#E1E8EE",
                  },
                },
              },
            ],
          },
          {
            name: "第三个圆环",
            type: "pie",
            clockWise: false,
            radius: [40, 32],
            itemStyle: dataStyle,
            hoverAnimation: false,
            center: ["88%", "50%"],
            data: [
              {
                value: 11,
                label: {
                  normal: {
                    rich: {
                      a: {
                        color: "#FF5722",
                        align: "center",
                        fontSize: 16,
                        fontWeight: "bold",
                      },
                      b: {
                        color: "#fff",
                        align: "center",
                        fontSize: 16,
                      },
                    },
                    formatter: function (params: { value: string }) {
                      return (
                        "{b|停机}\n\n\n\n" +
                        "{a|" +
                        params.value +
                        "次}" +
                        "\n\n\n\n{b|2%}"
                      );
                    },
                    position: "center",
                    show: true,
                    textStyle: {
                      fontSize: "16",
                      fontWeight: "normal",
                      color: "#fff",
                    },
                  },
                },
                itemStyle: {
                  normal: {
                    color: "#FF5722",
                    shadowColor: "#FF5722",
                    shadowBlur: 0,
                  },
                },
              },
              {
                value: 25,
                name: "invisible",
                itemStyle: {
                  normal: {
                    color: "#E1E8EE",
                  },
                  emphasis: {
                    color: "#E1E8EE",
                  },
                },
              },
            ],
          },
        ],
      };

      myChart.setOption(option);
    }
  }, [init]);

  return (
    <div
      style={{
        width: `${typeof width === "string" ? width : width + "vh"}`,
        height: `${typeof height === "string" ? height : height + "vh"}`,
        background: "rgba(255,255,255,0)",
      }}
    >
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

export default BasestationHourChart;
