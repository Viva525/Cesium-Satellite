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
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAoCAIAAAHZGgcFAAAACXBIWXMAAAsTAAALEwEAmpwYAAAF62lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAyMi0wOS0wNlQxOTozOTo1NSswODowMCIgeG1wOk1vZGlmeURhdGU9IjIwMjItMDktMDZUMTk6NDM6MDQrMDg6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMjItMDktMDZUMTk6NDM6MDQrMDg6MDAiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ZWZhZDlkOTktZTgzMS05NjRkLTkxOWEtY2IyM2NiYjJlNjg3IiB4bXBNTTpEb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6MTFiNTViMWMtMmU2Mi1jNjQ2LWI3ZTQtOWY2MTFjNzJmNTRkIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6MTJmZTM4NTYtYmFlZi1hOTQ1LTlmOTgtMThjZGNmYzU5MTU3Ij4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDoxMmZlMzg1Ni1iYWVmLWE5NDUtOWY5OC0xOGNkY2ZjNTkxNTciIHN0RXZ0OndoZW49IjIwMjItMDktMDZUMTk6Mzk6NTUrMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAoV2luZG93cykiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmVmYWQ5ZDk5LWU4MzEtOTY0ZC05MTlhLWNiMjNjYmIyZTY4NyIgc3RFdnQ6d2hlbj0iMjAyMi0wOS0wNlQxOTo0MzowNCswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz71xk7rAAAAVklEQVQ4jWPkrbvHwMDAxMDAgItiJFoJihhJHIQBzAvSyDGAYg6KF+AA3TU4tQ9hCSw+Z15bjV35qOjgEcWeYjEB89pqhs+vcUY/CTaOqh5VPaqaEAAA6YUQtQ92ficAAAAASUVORK5CYII=";
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
