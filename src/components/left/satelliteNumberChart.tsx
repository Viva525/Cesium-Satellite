import React, { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";

const SatelliteNumberChart: React.FC<{}> = () => {
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
            myChart = echarts.init(
              chartRef.current as unknown as HTMLDivElement
            );
          }
      fetch("./data/status.json")
        .then((response) => response.json())
        .then((data) => {
        
          let data1 = data.starlink.slice(141, data.starlink.length);
          let xLabel = data1.map((ele: { date: string }) => ele.date).reverse();
          let service = data1.map((ele: { service: number }) => ele.service).reverse();
          let total = data1.map((ele: { total: number }) => ele.total).reverse();
          let burn = data1.map((ele: { burn: number }) => ele.burn).reverse();

          let option = {
            backgroundColor: "rgba(255,255,255, 0.05)",
            tooltip: {
              trigger: "axis",
              backgroundColor: "transparent",
              textStyle: {
                color: "#fff",
                fontSize: 11,
              },
              axisPointer: {
                lineStyle: {
                  color: {
                    type: "linear",
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: "rgba(126,199,255,0)", // 0% 处的颜色
                      },
                      {
                        offset: 0.5,
                        color: "rgba(126,199,255,1)", // 100% 处的颜色
                      },
                      {
                        offset: 1,
                        color: "rgba(126,199,255,0)", // 100% 处的颜色
                      },
                    ],
                    global: false, // 缺省为 false
                  },
                },
              },
            },
            legend: {
              align: "left",
              right: "5%",
              top: "5%",
              type: "plain",
              textStyle: {
                color: "white",
                fontSize: 12,
              },
              itemGap: 25,
              itemWidth: 20,
              icon: "path://M0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z",
              data: [
                {
                  name: "total",
                },
                {
                  name: "service",
                },
                {
                  name: "burn",
                },
              ],
            },
            grid: {
              top: "16%",
              left: "10%",
              right: "2%",
              bottom: "15%",
            },
            xAxis: [
              {
                type: "category",
                boundaryGap: false,
                axisLine: {
                  show: true,
                  lineStyle: {
                    color: "rgba(255,255,255,0.5)",
                  },
                },
                axisLabel: {
                  textStyle: {
                    color: "#fff",
                    padding: 2,
                    fontSize: 8,
                  },
                  formatter: function (data: any) {
                    return data;
                  },
                },
                splitLine: {
                  show: true,
                  lineStyle: {
                    color: "rgba(255,255,255,0.1)",
                  },
                },
                axisTick: {
                  show: false,
                },
                data: xLabel,
              },
            ],
            yAxis: [
              {
                name: "number",
                nameTextStyle: {
                  color: "#fff",
                  fontSize: 10,
                  padding: -5,
                },
                min: 0,
                splitLine: {
                  show: true,
                  lineStyle: {
                    color: "rgba(255,255,255,0.1)",
                  },
                },
                axisLine: {
                  show: true,
                  lineStyle: {
                    color: "rgba(255,255,255,0.5)",
                  },
                },
                axisLabel: {
                  show: true,
                  textStyle: {
                    color: "#fff",
                    padding: 2,
                    fontSize: 8,
                  },
                  formatter: function (value: number) {
                    if (value === 0) {
                      return value;
                    }
                    return value;
                  },
                },
                axisTick: {
                  show: false,
                },
              },
            ],
            series: [
              {
                name: "total",
                type: "line",
                symbol: "circle", // 默认是空心圆（中间是白色的），改成实心圆
                showAllSymbol: true,
                symbolSize: 0,
                smooth: true,
                lineStyle: {
                  normal: {
                    width: 0.9,
                    color: "rgba(13, 126, 222, 1)", // 线条颜色
                  },
                  borderColor: "rgba(0,0,0,.4)",
                },
                itemStyle: {
                  color: "rgba(13, 126, 222, 1)",
                  borderWidth: 0,
                },
                tooltip: {
                  show: true,
                },
                areaStyle: {
                  //区域填充样式
                  normal: {
                    //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                    color: new echarts.graphic.LinearGradient(
                      0,
                      0,
                      0,
                      1,
                      [
                        {
                          offset: 0,
                          color: "rgba(13, 126, 222,.3)",
                        },
                        {
                          offset: 1,
                          color: "rgba(13, 126, 222, 0)",
                        },
                      ],
                      false
                    ),
                    shadowColor: "rgba(13, 126, 222, 0.5)", //阴影颜色
                    shadowBlur: 20, //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
                  },
                },
                data: total,
              },
              {
                name: "service",
                type: "line",
                symbol: "circle", // 默认是空心圆（中间是白色的），改成实心圆
                showAllSymbol: true,
                symbolSize: 0,
                smooth: true,
                lineStyle: {
                  normal: {
                    width: 0.9,
                    color: "rgba(210, 51, 90,1)", // 线条颜色
                  },
                  borderColor: "rgba(0,0,0,.4)",
                },
                itemStyle: {
                    color: "rgba(210, 51, 90,1)",
                  borderWidth: 0,
                },
                tooltip: {
                  show: true,
                },
                areaStyle: {
                  //区域填充样式
                  normal: {
                    //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                    color: new echarts.graphic.LinearGradient(
                      0,
                      0,
                      0,
                      1,
                      [
                        {
                          offset: 0,
                          color: "rgba(210, 51, 90,.3)",
                        },
                        {
                          offset: 1,
                          color: "rgba(210, 51, 90, 0)",
                        },
                      ],
                      false
                    ),
                    shadowColor: "rgba(210, 51, 90, 0.5)", //阴影颜色
                    shadowBlur: 20, //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
                  },
                },
                data: service,
              },
              {
                name: "burn",
                type: "line",
                symbol: "circle", // 默认是空心圆（中间是白色的），改成实心圆
                showAllSymbol: true,
                symbolSize: 0,
                smooth: true,
                lineStyle: {
                  normal: {
                    width: 0.9,
                    color: "rgba(129, 231, 237,1)", // 线条颜色
                  },
                  borderColor: "rgba(0,0,0,.4)",
                },
                itemStyle: {
                    color: "rgba(129, 231, 237,1)",
                  borderWidth: 0,
                },
                tooltip: {
                  show: true,
                },
                areaStyle: {
                  //区域填充样式
                  normal: {
                    //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                    color: new echarts.graphic.LinearGradient(
                      0,
                      0,
                      0,
                      1,
                      [
                        {
                          offset: 0,
                          color: "rgba(10,219,250,.3)",
                        },
                        {
                          offset: 1,
                          color: "rgba(10,219,250, 0)",
                        },
                      ],
                      false
                    ),
                    shadowColor: "rgba(10,219,250, 0.5)", //阴影颜色
                    shadowBlur: 20, //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
                  },
                },
                data: burn,
              },
            ],
          };
          //@ts-ignore
          myChart.setOption(option);
          let len = 0;
          setInterval(() => {
            if (len === xLabel.length) {
              len = 0;
            }
            //@ts-ignore
            myChart.dispatchAction({
              type: "showTip",
              seriesIndex: 0,
              dataIndex: len,
            });
            len++;
          }, 500);
        });
    }
  }, [init]);

  return (
    <>
      <style>
        {`
                #satellite-number{
                    height:18vh;
                    width: 100%
                }
                `}
      </style>

      <div id="satellite-number" ref={chartRef}>
             {" "}
      </div>
    </>
  );
};

export default SatelliteNumberChart;
