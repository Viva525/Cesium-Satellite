import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

type UseTimeProps = {
  nowData: number;
};

const UseTimeYear: React.FC<UseTimeProps> = (props) => {

  const { nowData } = props;
  const chartRef = useRef(null);
  useEffect(() => {
    if (nowData) {
      let myChart = echarts.getInstanceByDom(
        chartRef.current as unknown as HTMLDivElement
      );
      if (myChart == null) {
        myChart = echarts.init(chartRef.current as unknown as HTMLDivElement, 'dark');
      }
      // 颜色设置
      var color = {
        linearYtoG: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 1,
          y2: 1,
          colorStops: [{
            offset: 0,
            color: '#f5b44d'
          }, {
            offset: 1,
            color: '#28f8de'
          }]
        },
        linearGtoB: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 1,
          y2: 0,
          colorStops: [{
            offset: 0,
            color: '#43dfa2'
          }, {
            offset: 1,
            color: '#28f8de'
          }]
        },
        linearBtoG: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 1,
          y2: 0,
          colorStops: [{
            offset: 0,
            color: '#1c98e8'
          }, {
            offset: 1,
            color: '#28f8de'
          }]
        },
        areaBtoG: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0,
            color: 'rgba(35,184,210,.2)'
          }, {
            offset: 1,
            color: 'rgba(35,184,210,0)'
          }]
        }
      };
      let option = {
        backgroundColor: "transparent",
        polar: {
          radius: [20, '70%'],
          center: ['35%', '50%'],
        },
        legend: {
          type: "plain",
          data: ["折线图", "雷达图"],
          left: "5%",
        },
        angleAxis: {
          startAngle: 75
        },
        radiusAxis: {
          type: 'category',
          data: ['2022', '2023', '2024', '2025']
        },
        radar: {
          indicator: [
            { text: '2022', max: 26000 },
            { text: '2023', max: 26000 },
            { text: '2024', max: 26000 },
            { text: '2025', max: 26000 },
          ],

          center: ['80%', '50%'],
          radius: "40%",
          name: {
            color: '#fff'
          },
          axisName:{
            show:false
          },
          splitNumber: 8,
          axisLine: {
            lineStyle: {
              color: color.linearYtoG,
              opacity: .6
            }
          },
          splitLine: {
            lineStyle: {
              color: color.linearYtoG,
              opacity: .6
            }
          },

          splitArea: {
            areaStyle: {
              color: '#fff',
              opacity: .1,
              shadowBlur: 25,
              shadowColor: '#000',
              shadowOffsetX: 0,
              shadowOffsetY: 5,
            }
          },
        },
        tooltip: {},
        series: [
          {
            type: 'bar',
            name: "折线图",
            data: [17851, 16812, 19634, 25135],
            itemStyle: {
              color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [{
                  offset: 0,
                  color: '#0ff'
                },
                {
                  offset: 1,
                  color: '#5467df'
                }
                ]
              ),
            },
            coordinateSystem: 'polar',
            label: {
              show: true,
              position: 'middle',
              formatter: '{b}: {c}'
            }
          },
          {
            type: 'radar',
            data: [{
              value: [17851, 16812, 19634, 25135],
              name: "雷达图",
              itemStyle: {
                normal: {
                  color: '#43dfa2',
                }
              },
              lineStyle: {
                normal: {
                  opacity: 0,
                }
              },
              areaStyle: {
                normal: {
                  color: color.linearGtoB,
                  shadowBlur: 15,
                  shadowColor: 'rgba(0,0,0,.2)',
                  shadowOffsetX: 0,
                  shadowOffsetY: 5,
                  opacity: .8
                }
              },

              label: {
                show: true,
                formatter: function (params: any) {
                  return params.value;
                }
              },
            },]
          }
        ]
      };
      myChart.setOption(option, true);
      myChart.resize();
    }

  }, [nowData])


  return (
    <>
      <style>
        {`
            #useTimeYear{
                height: 27vh;
                width:99%;
                background-size: cover;
                background-repeat: no-repeat;
            }
            `}
      </style>
      <div id="useTimeYear" className="charts" ref={chartRef}>
      </div>
    </>
  );
};

export default UseTimeYear;
