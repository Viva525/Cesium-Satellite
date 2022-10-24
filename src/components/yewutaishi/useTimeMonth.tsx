import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

type UseTimeProps = {
  nowData: number
};

const UseTimeMonth: React.FC<UseTimeProps> = (props) => {

  const { nowData } = props;
  const chartRef = useRef(null);
  useEffect(() => {
    if (nowData) {
      let base = +new Date(2022, 10, 1);
      let oneDay = 24 * 3600 * 1000;
      let data1 = [[base, Math.round(Math.random() * 300)]];
      let data2 = [[base, 10]];
      let data3 = [[base, 5]];
      let data4 = [[base, 6]];
      for (let i = 1; i <= 360 / nowData; i++) {
        let now = new Date(base += oneDay * nowData);
        let nextData = Math.round((Math.random() - 0.5) * 20 * nowData + data1[i - 1][1])
        if (nextData < 0) {
          nextData = -nextData
        }
        data1.push([+now, nextData]);
        data2.push([+now, nextData + data2[i - 1][1]]);
        data3.push([+now, Math.floor(nextData / data1[i - 1][1] * 100) / 100]);
        data4.push([+now, Math.floor(nextData / data2[i - 1][1] * 100) / 100]);
      }
      var legend_data = [
        "当月使用",
        "累计使用",
        "同比增速(%)",
        "累计增速(%)",
      ];
      let myChart = echarts.getInstanceByDom(
        chartRef.current as unknown as HTMLDivElement
      );
      if (myChart == null) {
        myChart = echarts.init(chartRef.current as unknown as HTMLDivElement);
      }

      let option = {
        backgroundColor: "rgba(0,0,0,0)",
        tooltip: {
          trigger: 'axis',
          position: function (pt: any) {
            return [pt[0], '10%'];
          }
        },
        grid: {
          left: "10%",
          top: "20%",
          right: "10%",
          bottom: "15%",
        },
        xAxis: {
          type: "time",
          boundaryGap: false,
        },
        yAxis: [
          {
            type: "value",
            name: "使用次数",
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
        legend: {
          data: legend_data,
          right: 100,
          top: 0,
          textStyle: {
            color: "#fff",
          },
          itemWidth: 10,
          itemHeight: 10,
          // itemGap: 35
        },
        dataZoom: [
          {
            type: 'inside',
            start: 0,
            end: 50
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
            data: data1,
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
            data: data2,
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
                color: "#fff"
              },
              formatter: "{@value}",
            },
            data: data3,
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
                color: "#fff"
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
            data: data4,
          },
        ]
      }
      myChart.setOption(option, true);
      myChart.resize();
    }

  }, [nowData])


  return (
    <>
      <style>
        {`
            #useTimeMonth{
                height:27vh;
                width:99%;
                background-size: cover;
                background-repeat: no-repeat;
            }
            `}
      </style>
      <div id="useTimeMonth" className="charts" ref={chartRef}>
      </div>
    </>
  );
};

export default UseTimeMonth;
