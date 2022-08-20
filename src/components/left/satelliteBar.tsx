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

      var myColor = ["#81E7ED"];
      var dataLine = [35, 32, 50];
      var positionLeft = 10,
        max = 100 + positionLeft;

      var g_cellBar0_y =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAoCAYAAAAhf6DEAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAA6SURBVEhLY2x8/vY/A4mg3zwcTDOBSTLBqGYSwahmEsGoZhLBqGYSwahmEsGoZhLBqGYSwZDUzMAAAJldBMF2UASmAAAAAElFTkSuQmCC";
      var g_cellBarImg0_y = new Image();
      g_cellBarImg0_y.src = g_cellBar0_y;

      var option = {
        backgroundColor: "rgba(255,255,255,0.1)",
        grid: [
          {
            left: "10%",
            top: "12%",
            right: "5%",
            bottom: "8%",
            containLabel: true,
          },
          {
            left: "20%",
            top: "12%",
            right: "5%",
            bottom: "8%",
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
                color: "#1e1e1e",
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
    <div ref={chartRef} style={{ width: "100%", height: "20vh" }}>
           {" "}
    </div>
  );
};

export default SatelliteBar;
