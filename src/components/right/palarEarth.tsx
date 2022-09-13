import React, { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import { type } from "os";
import { PolarEarthProps } from "../../types/type"
import geoMap from "./map.json"

const PolarEarth: React.FC<PolarEarthProps> = (props) => {
  const [init, setInit] = useState<boolean>(false);
  const { position } = props
  const polarChartRef = useRef(null);
  const mapChartRef = useRef(null)
  useEffect(() => {
    setInit(true);
  }, []);

  useEffect(() => {
    if (init) {
      console.log(position)
      drawPolarEarth()
      draw2DEarth()
    }
  }, [position]);


  const drawPolarEarth = () => {
    let myChart = echarts.getInstanceByDom(
      polarChartRef.current as unknown as HTMLDivElement
    );
    if (myChart == null) {
      myChart = echarts.init(polarChartRef.current as unknown as HTMLDivElement);
    }
    //@ts-ignore
    var data = [], cate: any[] = []
    for (let item of position) {
      data.push(item)
      cate.push(item[2])
    }
    let option = {
      polar: {},
      grid: {
        top: '1%',
        bottom: "1%"
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        },
        backgroundColor: "#212124",
        textStyle: {
          color: "#fff",
          fontSize: 11,
        }
      },
      angleAxis: {
        type: 'value',
        startAngle: -90,
        splitNumber: 14,
        clockwise: false,
        min: 0,
        max: 360,
        minorTick: {
          show: true,
          splitNumber: 10
        },
        axisLine: { //坐标轴轴线设置
          lineStyle: {
            color: '#0d559e',
          },
        },
        splitLine: {
          lineStyle: {
            color: '#007bff'
          }
        },
        axisLabel: {
          color: '#fff',
          fontSize: 8,
          formatter: (value: any, index: any) => {
            if (value === 90) return `${value} E`
            if (value === 270) return `W ${360 - value}`
            if (value > 180) {
              value = 360 - value
            }
            return value
          }
        },
        axisTick: {
          inside: true
        }
      },
      radiusAxis: {
        min: 0,
        max: 6371,
        splitNumber: 8,
        axisLine: { //坐标轴轴线设置
          show: false,
        },
        axisTick: { //坐标轴刻度设置
          show: false
        },
        axisLabel: {
          show: false
        },

        splitLine: {
          lineStyle: {
            color: '#007bff'
          }
        }
      },
      visualMap: [{
        show: false,
        dimension: 2,
        categories: cate,
        inRange: {
          color: (function () {
            var colors = ['#51689b', '#ce5c5c', '#fbc357', '#8fbf8f', '#659d84', '#fb8e6a', '#c77288', '#786090', '#91c4c5', '#6890ba'];
            return colors.concat(colors);
          })()
        }
      }],
      series: [{
        coordinateSystem: 'polar',
        type: 'scatter',
        //@ts-ignore
        data: data,
        symbolSize: 5
      }]
    };
    myChart.setOption(option, true)
  }

  const draw2DEarth = () => {
    let myChart = echarts.getInstanceByDom(
      mapChartRef.current as unknown as HTMLDivElement
    );
    if (myChart == null) {
      myChart = echarts.init(mapChartRef.current as unknown as HTMLDivElement);
    }
    let useData = [{
      name: "now",
      value: [125.299633, 43.914039, 10]
    }]

    //@ts-ignore
    echarts.registerMap('world', geoMap)
    let option = {
      tooltip: {
        trigger: "item",
        //@ts-ignore
        formatter: function (params) {
          if (params.seriesType == "effectScatter") {
            return params.marker + params.data.name + "" + params.data.value[2];
          } else if (params.seriesType == "lines") {
            return params.data.fromName + " -> " + params.data.toName + "<br />" + params.data.value;
          } else {
            return params.name;
          }
        },
      },
      grid: {
        right: '8%',
        // top:'5%'
      },
      geo: {
        map: 'world',
        aspectScale: 0.65, //长宽比
        zoom: 1.12,
        tooltip: {
          show: false,
        },
        scaleLimit: {
          min: 1,
          max: 5,
        },
        label: {
          show: false
        },
        roam: false,
        itemStyle: {
          borderColor: "#0d559e",
          borderWidth: 0.2,
          areaColor: {
            type: "radial",
            x: 0.5,
            y: 0.5,
            r: 0.8,
            colorStops: [
              {
                offset: 0,
                color: "#1867B5", // 0% 处的颜色
              },
              {
                offset: 1,
                color: "#1867B5", // 100% 处的颜色
              },
            ],
            globalCoord: true, // 缺省为 false
          },

        },
        emphasis: {
          itemStyle: {
            label: {
              // show: !1,
              color: "#fff",
            },
            areaColor: "#0E83B7",
            //    shadowColor: 'rgb(12,25,50)',
            borderWidth: 0.2,

          }
        },
        silent: true
      },
      series: [
        {
          name: '地点',
          type: 'scatter',
          coordinateSystem: 'geo',
          zlevel: 2,
          rippleEffect: {
            period: 1,
            brushType: "stroke",
            scale: 8
          },
          label: {
            show: true,
            position: "right",
            color: "#9966cc",
            formatter: "{b}",
            textStyle: {
              color: "#fff"
            }

          },
          symbol: "circle",
          symbolSize: 10,
          itemStyle: {
            show: true,
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "#F65857", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#EC2624", // 100% 处的颜色
                },
              ],
            },
          },
          emphasis: {
            label: {
              show: true
            }
          },
          data: useData
        }
      ],
    }

    myChart.setOption(option, true)

  }
  return (
    <div style={{ width: "100%", height: "18vh" }}>
      <div style={{ width: "40%", height: "100%", float: "left" }} ref={polarChartRef} ></div>
      <div style={{ width: "60%", height: "100%", float: "left" }} ref={mapChartRef} ></div>
    </div>
  )
};

export default PolarEarth;
