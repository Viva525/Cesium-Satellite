//@ts-nocheck
import React, { useEffect, useRef } from "react";
import * as echarts from 'echarts'


const RsChart4: React.FC<any>=() =>{
    const chartRef = useRef(null)
    
    useEffect(() =>{
        let myChart = echarts.init(chartRef.current as unknown as HTMLDivElement)
        let pieData = [{
          'name': '星链',
          'value': 80
      }
      , {
          'name': 'GPS',
          'value': 50
      }, {
          'name': '北斗',
          'value': 40
      }, {
          'name': '基站',
          'value': 15
      }
      ]
     
      var titleArr: { text: string; left: string; top: string; textAlign: string; textStyle: { fontWeight: string; fontSize: string; color: string; textAlign: string; }; }[] = [],
          seriesArr = [];
     
      pieData.forEach(function(item, index) {
          titleArr.push({
              text: item.name,
              left: index * 24 + 15.5 + '%',
              top: '80%',
              textAlign: 'center',
              textStyle: {
                  fontWeight: 'normal',
                  fontSize: '20',
                  color: 'white',
                  textAlign: 'center',
              },
          });
          seriesArr.push({
              type: 'pie',
              name: '外层细圆环',
              radius: ['55%', '59%'],
              center: [index * 24 + 15.5 + '%', '45%'],
              hoverAnimation: false,
              clockWise: false,
              itemStyle: {
                  normal: {
                      color: '#6e7175'
                  }
              },
              label: {
                  show: false
              },
              data: [100]
          }, {
              type: 'pie',
              name: '内层层细圆环',
              radius: ['30%', '34%'],
              center: [index * 24 + 15.5 + '%', '45%'],
              hoverAnimation: false,
              clockWise: false,
              itemStyle: {
                  normal: {
                      color: '#6e7175'
                  }
              },
              label: {
                  show: false
              },
              data: [100]
          }, {
              type: 'pie',
              zlevel: 3,
              silent: true,
              radius: ['26%', '28%'],
              center: [index * 24 + 15.5 + '%', '45%'],
              label: {
                  normal: {
                      show: false
                  },
              },
              labelLine: {
                  normal: {
                      show: false
                  }
              },
              data: dotArr()
          })
      });
     
      seriesArr.push({
          name: pieData[0].name,
          type: 'pie',
          clockWise: false,
             radius: ['43%', '52%'],
          itemStyle: {
              normal: {
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
                  label: {
                      show: false
                  },
                  labelLine: {
                      show: false
                  },
              }
          },
          hoverAnimation: false,
          center: [0 * 24 + 15.5 + '%', '45%'],
          data: [{
              value: pieData[0].value,
              label: {
                  normal: {
                      formatter: function(params: { value: any; }) {
                          return params.value;
                      },
                      position: 'center',
                      show: true,
                      textStyle: {
                          fontSize: '25',
                          // fontWeight: 'bold',
                          color: '#1cc7ff'
                      }
                  }
              },
          }]
      }, {
          name: pieData[1].name,
          type: 'pie',
          clockWise: false,
             radius: ['43%', '52%'],
          itemStyle: {
              normal: {
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
                  label: {
                      show: false
                  },
                  labelLine: {
                      show: false
                  },
              }
          },
          hoverAnimation: false,
          center: [1 * 24 + 15.5 + '%', '45%'],
          data: [{
              value: pieData[1].value,
              label: {
                  normal: {
                      formatter: function(params: { value: any; }) {
                          return params.value;
                      },
                      position: 'center',
                      show: true,
                      textStyle: {
                          fontSize: '25',
                          // fontWeight: 'bold',
                          color: '#1cc7ff'
                      }
                  }
              },
          }, {
              value: pieData[0].value - pieData[1].value,
              name: 'invisible',
              itemStyle: {
                  normal: {
                      color: 'rgba(0,0,0,0)'
                  },
                  emphasis: {
                      color: 'rgba(0,0,0,0)'
                  }
              }
          }]
      }, {
          name: pieData[2].name,
          type: 'pie',
          clockWise: false,
          radius:['43%', '52%'],
          itemStyle: {
              normal: {
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
                  label: {
                      show: false
                  },
                  labelLine: {
                      show: false
                  },
              }
          },
          hoverAnimation: false,
          center: [2 * 24 + 15.5 + '%', '45%'],
          data: [{
              value: pieData[2].value,
              label: {
                  normal: {
                      formatter: function(params: { value: any; }) {
                          return params.value;
                      },
                      position: 'center',
                      show: true,
                      textStyle: {
                          fontSize: '25',
                          // fontWeight: 'bold',
                          color: '#1cc7ff'
                      }
                  }
              },
          }, {
              value: 100 - pieData[2].value,
              name: 'invisible',
              itemStyle: {
                  normal: {
                      color: 'rgba(0,0,0,0)'
                  },
                  emphasis: {
                      color: 'rgba(0,0,0,0)'
                  }
              }
          }]
      },
      {
          name: pieData[3].name,
          type: 'pie',
          clockWise: false,
          radius:['43%', '52%'],
          itemStyle: {
              normal: {
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
                  label: {
                      show: false
                  },
                  labelLine: {
                      show: false
                  },
              }
          },
          hoverAnimation: false,
          center: [3 * 24 + 15.5 + '%', '45%'],
          data: [{
              value: pieData[3].value,
              label: {
                  normal: {
                      formatter: function(params: { value: any; }) {
                          return params.value;
                      },
                      position: 'center',
                      show: true,
                      textStyle: {
                          fontSize: '25',
                          // fontWeight: 'bold',
                          color: '#1cc7ff'
                      }
                  }
              },
          }, {
              value: 100 - pieData[3].value,
              name: 'invisible',
              itemStyle: {
                  normal: {
                      color: 'rgba(0,0,0,0)'
                  },
                  emphasis: {
                      color: 'rgba(0,0,0,0)'
                  }
              }
          }]
      }, )
     
      let option = {
          grid: {
              left: '5%',
              right: '2%',
              bottom: '0%',
              top: '0%',
              containLabel: true
          },
          backgroundColor:{
            type: 'radial',
            x: 0.5,
            y: 0.5,
            r: 0.5,
            colorStops: [
                {
                    offset: 0,
                    color: 'rgba(15, 38, 96, 0.6)',
                },
                {
                    offset: 1,
                    color: 'rgba(15, 38, 96, 0.1)',
                },
            ],
            global: false,
          },
          title: titleArr,
          series: seriesArr,
      }
     
      function dotArr() {
          let dataArr = [];
          for (var i = 0; i < 80; i++) {
              if (i % 2 === 0) {
                  dataArr.push({
                      name: (i + 1).toString(),
                      value: 1,
                      itemStyle: {
                          normal: {
                              color: "#676a6c",
                              borderWidth: 1,
                              borderColor: "#676a6c"
                          }
                      }
                  })
              } else {
                  dataArr.push({
                      name: (i + 1).toString(),
                      value: 2,
                      itemStyle: {
                          normal: {
                              color: "rgba(0,0,0,0)",
                              borderWidth: 0,
                              borderColor: "rgba(0,0,0,0)"
                          }
                      }
                  })
              }
     
          }
          return dataArr
      }

 myChart.setOption(option)

    }, [])


    return(
        <div id="rs-chart4" ref={chartRef}></div>
    )
}

export default RsChart4