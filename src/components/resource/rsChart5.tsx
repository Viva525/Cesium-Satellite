//@ts-nocheck
import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

const RsChart5: React.FC<any> = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    let myChart = echarts.init(chartRef.current as unknown as HTMLDivElement);
    var xAxis_data = [
      "S1",
      "S2",
      "S3",
      "S4",
      "GPS1",
      "GPS2",
      "GPS3",
      "BD1",
      "BD2",
    ];
    var series_data = [
      [
        209.41, 20.56, 51.8, 20.16, 34.8, 25.24, 11.18, 11.13, 1.42
      ],
      [
        1088.48, 109.84, 256.53, 110.28, 210.49, 131.67, 60.81, 44.92, 7.25
      ],
      [
        9.97, 4.37, 3.05, -15.05, -2.5, 31.15, 6.06, 20.52, 8.95
      ],
      [
        23.58, 20.01, 24.38, 19.13, 20.66, 21.73, 40.76, 27.64, 17.88
      ],
    ];

    var legend_data = [
      "当月时长",
      "累计时长",
      "当月增速(%)",
      "累计增速(%)",
    ];
    var option = {
      backgroundColor: {
        type: 'radial',
        x: 0.5,
        y: 0.5,
        r: 0.5,
        colorStops: [
            {
                offset: 0,
                color: 'rgba(15, 38, 96, 0.5)',
            },
            {
                offset: 1,
                color: 'rgba(15, 38, 96, 0.1)',
            },
        ],
        global: false,
      },
      tooltip: {
        trigger: "none",
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
        },
      },

      grid: {
        left: "2%",
        right: "2%",
        bottom: "2%",
        top: "15%",
        containLabel: true,
      },
      legend: {
        data: legend_data,
        right: 80,
        top: 5,
        textStyle: {
          color: "#fff",
        },
        itemWidth: 10,
        itemHeight: 10,
        // itemGap: 35
      },
      xAxis: {
        type: "category",
        data: xAxis_data,
        axisLine: {
          lineStyle: {
            color: "white",
          },
        },
        axisLabel: {
          interval: 0,
          rotate: 40,
          textStyle: {
            fontFamily: "Microsoft YaHei",
          },
        },
      },

      yAxis: [
        {
          type: "value",
          name: "工作时长",
          axisLine: {
            show: false,
            lineStyle: {
              color: "white",
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "rgba(255,255,255,0.3)",
            },
          },
          axisLabel: {},
        },
        {
          type: "value",
          name: "同比（%）",
          nameTextStyle: {
            color: "white",
          },
          position: "right",
          axisLine: {
            lineStyle: {
              color: "white",
            },
          },
          splitLine: {
            show: false,
          },
          axisLabel: {
            show: true,
            //formatter: '{value} %', //右侧Y轴文字显示
            formatter: "{value} ", //右侧Y轴文字显示
            textStyle: {
              color: "white",
            },
          },
        },
      ],
      series: [
        {
          name: legend_data[0],
          type: "bar",
          barWidth: "20%",
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#fccb05",
                },
                {
                  offset: 1,
                  color: "#f5804d",
                },
              ]),
              barBorderRadius: 12,
            },
          },
          label: {
            normal: {
              show: false,
              position: "top",
            },
            formatter: "{@value}",
          },
          data: series_data[0],
        },
        {
          name: legend_data[1],
          type: "bar",
          barWidth: "20%",
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#8bd46e",
                },
                {
                  offset: 1,
                  color: "#09bcb7",
                },
              ]),
              barBorderRadius: 11,
            },
          },
          label: {
            normal: {
              show: false,
              position: "top",
            },
            formatter: "{@value}",
          },
          data: series_data[1],
        },
        {
          name: legend_data[2],
          type: "line",
          yAxisIndex: 1,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#fccb05",
                },
                {
                  offset: 1,
                  color: "#f5804d",
                },
              ]),
              barBorderRadius: 11,
            },
          },
          label: {
            normal: {
              show: true,
              position: "top",
              color:"#fff"
            },
            formatter: "{@value}",
          },
          data: series_data[2],
        },
        {
          name: legend_data[3],
          type: "line",
          yAxisIndex: 1,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#8bd46e",
                },
                {
                  offset: 1,
                  color: "#09bcb7",
                },
              ]),
              barBorderRadius: 11,
            },
          },
          label: {
            normal: {
              show: true,
              position: "top",
              color:"#fff"
            },
            formatter: "{@value}",
          },
          markLine: {
            symbol: "none",
            data: [
              {
                silent: false, //鼠标悬停事件  true没有，false有
                lineStyle: {
                  //警戒线的样式  ，虚实  颜色
                  type: "solid",
                  color: "#FA3934",
                },
                label: {
                  position: "end",
                  formatter: "",
                },
                yAxis: 0, // 警戒线的标注值，可以有多个yAxis,多条警示线   或者采用   {type : 'average', name: '平均值'}，type值有  max  min  average，分为最大，最小，平均值
              },
            ],
          },
          data: series_data[3],
        },
      ],
    };

    myChart.setOption(option);
  }, []);

  return <div id="rs-chart5" ref={chartRef}></div>;
};

export default RsChart5;
