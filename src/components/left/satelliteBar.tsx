import * as echarts from "echarts";
import React, { useEffect, useRef, useState } from "react";

const SatelliteBar: React.FC<{}> = () => {
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

      var myColor = ["rgba(210, 51, 90, 0)"];
      var dataLine = [35, 32, 50];
      var positionLeft = 10,
        max = 100 + positionLeft;

      var g_cellBar0_y =
        "data:image/png;base64,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";
      var g_cellBarImg0_y = new Image();
      g_cellBarImg0_y.src = g_cellBar0_y;

      var option = {
        backgroundColor: "rgba(255,255,255,0)",
        grid: [
          {
            left: "10%",
            top: "8%",
            right: "5%",
            bottom: "0",
            containLabel: true,
          },
          {
            left: "20%",
            top: "8%",
            right: "5%",
            bottom: "0",
            containLabel: true,
          },
        ],
        xAxis: [
          {
            show: false,
          },
        ],
        yAxis: [
          {
            axisTick: "none",
            axisLine: "none",
            axisLabel: {
              inside: true,
              margin:20,
              align: "right",
            // padding:[0, 40, 0, 0]
              textStyle: {
                color: "#fff",
                fontSize: "12",
              },
            },
            z: 10,
            data: ["BEIDOU", "GPS", "STARLINK"],
          },
          {
            axisTick: "none",
            axisLine: "none",
            show: true,
            axisLabel: {
              inside: true,
              align: "right",
              textStyle: {
                color: "#ffff",
                fontSize: "12",
              },
            },
            z: 10,
            data: dataLine,
          },
          {
            axisLine: {
              lineStyle: {
                color: "rgba(255,255,255, 0)",
              },
            },
            data: [],
          },
        ],
        series: [
          {
            //间距
            type: "bar",
            barWidth: 20,
            stack: "b",
            legendHoverLink: false,
            itemStyle: {
              normal: {
                color: "rgba(0,0,0,0)",
              },
            },
            z: 3,
            data: [
              positionLeft,
              positionLeft,
              positionLeft
            ],
          },
          {
            name: "条",
            type: "bar",
            stack: "b",
            yAxisIndex: 0,
            data: dataLine,
            label: {
              normal: {
                show: false,
                position: "right",
                distance: 5,
                formatter: function (param: { value: string }) {
                  return param.value + "%";
                },
                textStyle: {
                  color: "#fff",
                  fontSize: "16",
                },
              },
            },
            barWidth: 20,
            itemStyle: {
              color: {
                image: g_cellBarImg0_y,
                repeat: "repeat",
              }
            },
            z: 2,
          },
          {
            name: "白框",
            type: "bar",
            yAxisIndex: 1,
            barGap: "-100%",
            data: [99.8, 99.9, 99.9],
            barWidth: 28,
            itemStyle: {
              normal: {
                color: "rgba(0,0,0,0)",
                barBorderRadius: 2,
              },
            },
            z: 1,
          },
          {
            name: "外框",
            type: "bar",
            yAxisIndex: 2,
            barGap: "-100%",
            data: [100, 100, 100],
            barWidth: 30,
            label: {
              normal: {
                show: false,
                position: "right",
                distance: 10,
                formatter: function (data: { dataIndex: string | number }) {
                  //@ts-ignore
                  return dataLine[data.dataIndex] + "%";
                },
                textStyle: {
                  color: "#ffff00",
                  fontSize: "12",
                },
              },
            },
            itemStyle: {
              normal: {
                color: function (params: { dataIndex: number }) {
                  var num = myColor.length;
                  return myColor[params.dataIndex % num];
                },
                barBorderRadius: [0, 7, 0, 7],
              },
            },
            z: 0,
          },
        ],
      };
      myChart.setOption(option);
      myChart.resize();
    }
  }, [init]);

  return (
    <div ref={chartRef} style={{ width: "100%", height: "12vh" }}>
    </div>
  );
};

export default SatelliteBar;
