import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

type UseTimeProps = {
  nowData: number;
};

const UseTimeYear: React.FC<UseTimeProps> = (props) => {

  const { nowData } = props;
  const chartRef = useRef(null);
  useEffect(() => {
    if (nowData) {
      let myChart = echarts.getInstanceByDom(
        chartRef.current as unknown as HTMLDivElement
      );
      if (myChart == null) {
        myChart = echarts.init(chartRef.current as unknown as HTMLDivElement, 'dark');
      }

      let option = {
        backgroundColor:"transparent",
        polar: {
          radius: [30, '80%']
        },
        angleAxis: {
          startAngle: 75
        },
        radiusAxis: {
          type: 'category',
          data: ['2022', '2023', '2024', '2025']
        },
        tooltip: {},
        series: {
          type: 'bar',
          data: [17851, 16812, 19634, 25135],
          itemStyle: {        
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(13, 126, 222)' },
            { offset: 1, color: 'rgba(18, 30, 55)' }
          ])
          },
          coordinateSystem: 'polar',
          label: {
            show: true,
            position: 'middle',
            formatter: '{b}: {c}'
          }
        }
      };
      myChart.setOption(option, true);
      myChart.resize();
    }

  }, [nowData])


  return (
    <>
      <style>
        {`
            #useTimeYear{
                height: 25vh;
                width:99%;
                background-size: cover;
                background-repeat: no-repeat;
            }
            `}
      </style>
      <div id="useTimeYear" className="charts" ref={chartRef}>
      </div>
    </>
  );
};

export default UseTimeYear;
