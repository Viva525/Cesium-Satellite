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
      //@ts-ignore
      let data = [],
        cate: any[] = [];

      for (let item of position) {
        data.push([...lnglat2polat(item[0], item[1]), item[2]]);
        cate.push(item[2]);
      }
      drawPolarEarth(data, cate);
      draw2DEarth(position, cate);
    }
  }, [position]);


  const drawPolarEarth = (data: any, cate: any) => {
    let myChart = echarts.getInstanceByDom(
      polarChartRef.current as unknown as HTMLDivElement
    );
    if (myChart == null) {
      myChart = echarts.init(
        polarChartRef.current as unknown as HTMLDivElement
      );
    }

    let option = {
      polar: {},
      grid: {
        top: "1%",
        left: "1%"
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
        },
        backgroundColor: "#212124",
        textStyle: {
          color: "#fff",
          fontSize: 11,
        },
      },
      angleAxis: {
        type: "value",
        startAngle: -90,
        splitNumber: 14,
        clockwise: false,
        min: 0,
        max: 360,
        minorTick: {
          show: true,
          splitNumber: 10,
        },
        axisLine: {
          //坐标轴轴线设置
          lineStyle: {
            color: "#0d559e",
          },
        },
        splitLine: {
          lineStyle: {
            color: "#007bff",
          },
        },
        axisLabel: {
          color: "#fff",
          fontSize: 8,
          margin: 2,
          formatter: (value: any, index: any) => {
            if (value === 90) return `${value} E`;
            if (value === 270) return `W ${360 - value}`;
            if (value > 180) {
              value = 360 - value;
            }
            return value;
          },
        },
        axisTick: {
          inside: true,
        },
      },
      radiusAxis: {
        min: 0,
        max: 6371,
        splitNumber: 8,
        axisLine: {
          //坐标轴轴线设置
          show: false,
        },
        axisTick: {
          //坐标轴刻度设置
          show: false,
        },
        axisLabel: {
          show: false,
        },

        splitLine: {
          lineStyle: {
            color: "#007bff",
          },
        },
      },
      visualMap: [
        {
          show: false,
          dimension: 2,
          categories: cate,
          inRange: {
            color: (function () {
              var colors = [
                "#33FFFF",
                "#FF0033",
                "#FFCC33",
                "#B3FF00",
                "#659d84",
                "#fb8e6a",
                "#c77288",
                "#786090",
                "#91c4c5",
                "#6890ba",
              ];
              return colors.concat(colors);
            })(),
          },
        },
      ],
      series: [
        {
          coordinateSystem: "polar",
          type: "effectScatter",
          //@ts-ignore
          data: data,
          symbolSize: 5,
          rippleEffect: {
            period: 2,
            scale: 5,
          },
        },
      ],
    };
    myChart.setOption(option, true);
  };

  const lnglat2polat = (lng: any, lat: any) => {
    let R = 6371;
    let x = Math.abs(
      (R * Math.round(Math.cos((lat * Math.PI) / 180) * 1000000)) / 1000000
    );
    if (lng < 0) {
      lng += 360;
    }
    return [x, lng];
  };

  const draw2DEarth = (data: any, cate: any) => {
    let myChart = echarts.getInstanceByDom(
      mapChartRef.current as unknown as HTMLDivElement
    );
    if (myChart == null) {
      myChart = echarts.init(mapChartRef.current as unknown as HTMLDivElement);
    }

    //@ts-ignore
    echarts.registerMap('world', geoMap)
    let option = {
      tooltip: {
        show: false
      },
      grid: {
        right: '1%',
        left:'1%'
      },
      geo: {
        map: 'world',
        aspectScale: 0.65, //长宽比
        zoom: 1.2,
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
          disabled: true
        },
        silent: true
      },
      visualMap: [
        {
          show: false,
          dimension: 2,
          categories: cate,
          inRange: {
            color: (function () {
              var colors = [
                "#33FFFF",
                "#FF0033",
                "#FFCC33",
                "#B3FF00",
                "#659d84",
                "#fb8e6a",
                "#c77288",
                "#786090",
                "#91c4c5",
                "#6890ba",
              ];
              return colors.concat(colors);
            })(),
          },
        },
      ],
      series: [
        {
          name: '地点',
          type: "effectScatter",
          coordinateSystem: 'geo',
          zlevel: 2,
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
          rippleEffect: {
            period: 2,
            scale: 5,
          },
          symbolSize: 5,
          itemStyle: {
            show: true,

          },
          data: data
        }
      ],
    }

    myChart.setOption(option, true)
    myChart.resize()

  }
  return (
    <div style={{ width: "100%", height: "18vh" }}>
      <div style={{ width: "42%", height: "100%", float: "left" }} ref={polarChartRef} ></div>
      <div style={{ width: "58%", height: "100%", float: "left" }} ref={mapChartRef} ></div>
    </div>
  )
};

export default PolarEarth;
