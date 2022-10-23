import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

type UseTimeProps = {
  nowData: any[];
};

const UseRank: React.FC<UseTimeProps> = (props) => {

  const { nowData } = props;
  const chartRef = useRef(null);
  useEffect(() => {
    if (nowData.length > 0) {

      let myChart = echarts.getInstanceByDom(
        chartRef.current as unknown as HTMLDivElement
      );
      if (myChart == null) {
        myChart = echarts.init(chartRef.current as unknown as HTMLDivElement, 'dark');
      }
      let useData = []
      for(let i of nowData){
        useData.push([i.value, i.name, i.value])
      }
      let option = {
        backgroundColor:"rgba(0,0,0,0)",

        tooltip: {},
        grid: {
          left: "20%",
          top: "5%",
          right: "20%",
          bottom: "5%",
        },
        xAxis: {
          type: "value",
          name: "data",
          position: "left",
          nameTextStyle: {
            color: "rgba(13, 126, 222, 1)",
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed',
              color: "rgba(13, 126, 222, 1)"
            }
          },
          axisLabel: {
            color: "rgba(13, 126, 222, 1)",
          },
          boundaryGap: [0, '100%'],
          min:0,
          max:25
        },
        yAxis: {
          type: "category",
          name: "country",
        },
        dataZoom: [
          {
            type: 'slider',
            show: true,
            yAxisIndex: [0],
            right: '5%',
            bottom: '15%',
            top: '10%',
            start: 5,
            end: 30
          },
        ],
        visualMap: {
          orient: 'horizontal',
          left: 'center',
          min: 0,
          max: 20,
          // Map the score column to color
          dimension: 0,
          inRange: {
            color: ['rgba(13, 126, 222, 1)', 'rgba(63,218,255,1)']
          },
          show:false
        },

        series: {
          type: 'bar',
          data: useData,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(13, 126, 222)' },
              { offset: 1, color: 'rgba(18, 30, 55)' }
            ])
          },
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
            #useRank{
                height: 42vh;
                width:99%;
                background-size: cover;
                background-repeat: no-repeat;
            }
            `}
      </style>
      <div id="useRank" className="charts" ref={chartRef}>
      </div>
    </>
  );
};

export default UseRank;
