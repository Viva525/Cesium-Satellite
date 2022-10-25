//@ts-nocheck
import React, { useEffect, useRef } from "react";
import * as echarts from 'echarts'


const RsChart3: React.FC<any> = () => {
  const chartRef = useRef(null)

  useEffect(() => {
    let myChart = echarts.init(chartRef.current as unknown as HTMLDivElement)
    // 数据
    var dateBase = new Date();
    var year = dateBase.getFullYear();
    var dottedBase = +dateBase + 1000 * 3600 * 24;
    var weekCategory = [];

    var radarData: any[] = [];
    var radarDataAvg = [];
    var maxData = 12000;
    var weekMaxData = [];
    var weekLineData = [];



    // 月数据
    for (var i = 0; i < 7; i++) {


      // 折线图数据
      weekMaxData.push(maxData);
      var distance = Math.round(Math.random() * 11000 + 500);
      weekLineData.push(distance);

      // 雷达图数据
      // 我的指标
      var averageSpeed = +(Math.random() * 5 + 3).toFixed(3);
      var maxSpeed = averageSpeed + (+(Math.random() * 3).toFixed(2));
      var hour = +(distance / 1000 / averageSpeed).toFixed(1);
      var radarDayData = [distance, averageSpeed, maxSpeed, hour];
      radarData.unshift(radarDayData);

      // 平均指标
      var distanceAvg = Math.round(Math.random() * 8000 + 4000);
      var averageSpeedAvg = +(Math.random() * 4 + 4).toFixed(3);
      var maxSpeedAvg = averageSpeedAvg + (+(Math.random() * 2).toFixed(2));
      var hourAvg = +(distance / 1000 / averageSpeed).toFixed(1);
      var radarDayDataAvg = [distanceAvg, averageSpeedAvg, maxSpeedAvg, hourAvg];
      radarDataAvg.unshift(radarDayDataAvg);
    }
    weekCategory = ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日",]


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
      legend: {
        top: 40,
        left: 80,
        orient: 'vertical',
        itemGap: 15,
        itemWidth: 12,
        itemHeight: 12,
        data: ['运行次数', '我的指标'],
        textStyle: {
          color: '#fff',
          fontSize: 14,
        },
      },
      tooltip: {
        trigger: 'none'
      },
      radar: {
        center: ['68%', '30%'],
        radius: '40%',
        name: {
          color: '#fff'
        },
        splitNumber: 8,
        axisLine: {
          lineStyle: {
            color: color.linearYtoG,
            opacity: .6
          }
        },

        axisLabel: {
          margin: -50,
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
        indicator: [{
          name: '低轨卫星',
          max: maxData
        }, {
          name: '中轨卫星',
          max: 10
        }, {
          name: '高轨卫星',
          max: 12
        }, {
          name: '地面基站',
          max: 3.5
        }]
      },
      grid: {
        left: 90,
        right: 80,
        bottom: 40,
        top: '60%',
      },
      xAxis: {
        type: 'category',
        position: 'bottom',
        axisLine: true,
        axisLabel: {
          color: 'rgba(255,255,255,.8)',
          fontSize: 12
        },
        data: weekCategory,
      },

      yAxis: {
        name: 'km/h',
        nameLocation: 'end',
        nameGap: 24,
        nameTextStyle: {
          color: 'rgba(255,255,255,.5)',
          fontSize: 14
        },
        max: maxData,
        splitNumber: 4,

        axisLine: {
          lineStyle: {
            opacity: 0
          }
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: '#fff',
            opacity: .1
          }
        },
        axisLabel: {
          color: 'rgba(255,255,255,.8)',
          fontSize: 12

        }
      },
      series: [{
        name: '每日跑步指标分布与比较',
        type: 'radar',
        symbolSize: 0,
        data: [
          {
            value: radarData[6],
            name: '运行次数',
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
          }]
      }, 
      {
        name: '运行次数',
        type: 'line',
        smooth: true,
        symbol: 'emptyCircle',
        symbolSize: 8,
        itemStyle: {
          normal: {
            color: '#fff'
          }
        },
        lineStyle: {
          normal: {
            color: color.linearBtoG,
            width: 2
          }
        },
        areaStyle: {
          normal: {
            color: color.areaBtoG,
          }
        },
        data: weekLineData,
        lineSmooth: true,
        markLine: {
          silent: true,
          data: [{
            type: 'average',
            name: '新建房屋'
          }],
          precision: 0,
          label: {
            normal: {
              formatter: ''
            }
          },
          lineStyle: {
            normal: {
              color: 'rgba(248,211,81,.7)'
            }
          }
        },
        tooltip: {
          position: 'top',
          formatter: '{c} m',
          backgroundColor: 'rgba(28,152,232,.2)',
          padding: 6
        }
      }, {
        name: '占位背景',
        type: 'bar',
        itemStyle: {
          normal: {
            show: true,
            color: '#000',
            opacity: 0
          }
        },
        silent: true,
        barWidth: '50%',
        data: weekMaxData,
        animation: false
      }, {
        name: '占位背景',
        type: 'bar',
        itemStyle: {
          normal: {
            show: true,
            color: '#000',
            opacity: .1
          }
        },
        silent: true,
        barWidth: '50%',
        barGap: 0,
        data: weekMaxData,
        animation: false
      }],
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
      }
    };

    // 点击事件
    myChart.on('click', function (params) {
      if (params.componentType === 'series' && params.seriesType === 'line') {

        var dataIndex = params.dataIndex;
        myChart.setOption({
          series: [
            {
              name: '平均运行次数',
              type: 'radar',
              symbolSize: 0,
              data: [
                {
                  name: '我的指标',
                  value: radarData[dataIndex],
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
                }]
            }]
        })
      }
    });

    myChart.setOption(option)

  }, [])


  return (
    <div id="rs-chart3" ref={chartRef}></div>
  )
}

export default RsChart3