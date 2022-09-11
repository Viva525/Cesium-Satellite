import React, { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import { type } from "os";

type PolarEarthProps = {
    lng: number,
    lat: number,
    sateId: string
}

const PolarEarth: React.FC<{}> = () => {
  const [init, setInit] = useState<boolean>(false);
  const chartRef = useRef(null);
  useEffect(() => {
    setInit(true);
  }, []);

  useEffect(() => {
    if (init) {
      let myChart = echarts.getInstanceByDom(
        chartRef.current as unknown as HTMLDivElement
      );
      if (myChart == null) {
        myChart = echarts.init(chartRef.current as unknown as HTMLDivElement);
      }
      var data = [];

      for (var i = 0; i <= 100; i++) {
        var theta = (i / 100) * 360;
        var r = 5 * (1 + Math.sin((theta / 180) * Math.PI));
        data.push([r, theta]);
      }
      lnglat2polat(45, 90)

      let option = {
        polar: {},
        grid:{
            top:'1%',
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
            splitNumber: 18,
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
                color: '#000'
            },
            axisTick: {
                inside: true
            }
        },
        radiusAxis: {
            max:6371,
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
        series: [{
            coordinateSystem: 'polar',
            type: 'scatter',
            data: [[2320.866025105018, 327.6], [5320.4866025105018, 327.6], [213.20866025105018, 227.6]],
            symbolSize: 3
        }]
    };
      myChart.setOption(option)
    }
  }, [init]);

  const lnglat2polat = (lng: any, lat: any) => {
    let R = 6371;
    let x = R*Math.round(Math.cos((lng * Math.PI/180)) * 1000000) / 1000000
    console.log([x, lat]);
    
    return [x, lat]
  }
  return <div style={{ width: "100%", height: "18vh" }} ref={chartRef}></div>;
};

export default PolarEarth;
