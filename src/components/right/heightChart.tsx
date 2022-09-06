import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

type HeightChartProps = {
  satellitePostionData: number[];
  nowSystemDate: string[];
};

const HeightChart: React.FC<HeightChartProps> = (props) => {
  const { satellitePostionData, nowSystemDate } = props;
  const chartRef = useRef(null);

  useEffect(() => {
    if (satellitePostionData.length !== 0) {
      let myChart = echarts.getInstanceByDom(
        chartRef.current as unknown as HTMLDivElement
      );
      if (myChart == null) {
        myChart = echarts.init(chartRef.current as unknown as HTMLDivElement);
      }
      let option = {
        grid: {
          left: "11%",
          top: "22%",
          right: "2%",
          bottom: "15%",
        },
        xAxis: {
          type: "category",
          axisLabel: {
            color: "rgba(13, 126, 222, 1)",
            align: "left",
          },
          data: nowSystemDate,
        },
        yAxis: {
          type: "value",
          name: "height / km",
          position: "left",
          nameTextStyle: {
            color: "rgba(13, 126, 222, 1)",
          },
          splitLine:{
            show:true,
            lineStyle:{
              type: 'dashed',
              color: "rgba(13, 126, 222, 1)"
            }
          },
          axisLabel: {
            color: "rgba(13, 126, 222, 1)",
          },
          min: (value: any) => {
            return value.min - 1;
          },
          max: (value: any) => {
            return value.max + 1;
          },
        },
        dataZoom: [
          {
            type: "inside",
            orient: "vertical",
          },
        ],
        series: [
          {
            data: satellitePostionData,
            type: "line",
            itemStyle: {
              color: 'rgba(210, 51, 90,1)'
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(210, 51, 90,0.8)'
                },
                {
                  offset: 1,
                  color: 'rgba(210, 51, 90, 0)'
                }
              ])
            },
          },
        ],
      };
      myChart.setOption(option, true);
      myChart.resize();
    }
  }, [satellitePostionData, nowSystemDate]);

  return (
    <>
      <style>
        {`
            #satellite{
                height: 15vh;
                width:99%;
                background-image: url("../assets/rightCon01.png");
                background-size: cover;
                background-repeat: no-repeat;
            }
            `}
      </style>
      <div id="satellite" className="charts" ref={chartRef}>
      </div>
    </>
  );
};

export default HeightChart;
