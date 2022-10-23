import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

type UseTimeProps = {
  nowData: number;
};

const UseTimeDay: React.FC<UseTimeProps> = (props) => {

  const { nowData } = props;
  const chartRef = useRef(null);
  useEffect(() => {
    if (nowData) {
      function getVirtulData() {
        let year = '2022';
        var date = +echarts.number.parseDate(year + '-10-01');
        var end = +echarts.number.parseDate(+year + 2 + '-10-01');
        var dayTime = 3600 * 24 * 1000;
        var data = [];
        for (var time = date; time < end; time += dayTime) {
          data.push([
            echarts.format.formatTime('yyyy-MM-dd', time),
            Math.floor(Math.random() * 1000)
          ]);
        }
        return data;
      }
      let myChart = echarts.getInstanceByDom(
        chartRef.current as unknown as HTMLDivElement
      );
      if (myChart == null) {
        myChart = echarts.init(chartRef.current as unknown as HTMLDivElement, 'dark');
      }

      let option = {
        backgroundColor:"rgba(0,0,0,0)",
        tooltip: {},
        visualMap: {
          min: 0,
          max: 1000,
          calculable: true,
          type: 'continuous',
          orient: 'horizontal',
          left: 'center',
          color: ['rgba(13, 126, 222, 0.5)', 'rgba(18, 30, 55, 0.5)']
        },
        calendar: {
          left: 30,
          right: 30,
          top: 30,
          bottom: 60,
          cellSize: ['auto'],
          range: ['2022-10', '2022-12-31'],
          itemStyle: {
            borderWidth: 0.5
          },
          yearLabel: { show: false }
        },
        series: {
          type: 'heatmap',
          coordinateSystem: 'calendar',
          data: getVirtulData()
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
            #useTimeDay{
                height: 25vh;
                width:99%;
                background-size: cover;
                background-repeat: no-repeat;
            }
            `}
      </style>
      <div id="useTimeDay" className="charts" ref={chartRef}>
      </div>
    </>
  );
};

export default UseTimeDay;
