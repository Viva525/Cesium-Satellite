import React, { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import { type } from "os";
import { PolarEarthProps } from "../../types/type";

const PolarEarth: React.FC<PolarEarthProps> = (props) => {
  const [init, setInit] = useState<boolean>(false);
  const { position } = props;
  const chartRef = useRef(null);
  const polarChartRef = useRef(null);
  useEffect(() => {
    setInit(true);
  }, []);

  useEffect(() => {
    if (init) {
      drawPolarEarth();
      draw2DEarth();
    }
  }, [position]);

  const drawPolarEarth = () => {
    let myChart = echarts.getInstanceByDom(
      polarChartRef.current as unknown as HTMLDivElement
    );
    if (myChart == null) {
      myChart = echarts.init(
        polarChartRef.current as unknown as HTMLDivElement
      );
    }
    //@ts-ignore
    var data = [],
      cate: any[] = [];
    for (let item of position) {
      data.push([...lnglat2polat(item[0], item[1]), item[2]]);
      cate.push(item[2]);
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
          margin:2,
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

  const draw2DEarth = () => {
    let myChart = echarts.getInstanceByDom(
      chartRef.current as unknown as HTMLDivElement
    );
    if (myChart == null) {
      myChart = echarts.init(chartRef.current as unknown as HTMLDivElement);
    }
  };
  return (
    <div style={{ width: "100%", height: "18vh" }}>
      <div style={{ width: "42%", height: "100%" }} ref={polarChartRef}></div>
      <div style={{ width: "50%", height: "100%" }} ref={chartRef}></div>
    </div>
  );
};

export default PolarEarth;
