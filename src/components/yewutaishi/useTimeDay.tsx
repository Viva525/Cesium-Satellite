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
        let date = +echarts.number.parseDate(2022 + '-10-01');
        let end = +echarts.number.parseDate( 2022 + '-12-31');
        let dayTime = 3600 * 24 * 1000;
        let data = [];
        for (let time = date; time < end; time += dayTime) {
          data.push([
            echarts.format.formatTime('yyyy-MM-dd', time),
            Math.floor(Math.random() * 10000)
          ]);
        }
        return data;
      }
      const data = getVirtulData();
      const topData = data
      .sort(function (a:any, b:any) {
        return b[1] - a[1];
      }).slice(0, 10)
      let myChart = echarts.getInstanceByDom(
        chartRef.current as unknown as HTMLDivElement
      );
      if (myChart == null) {
        myChart = echarts.init(chartRef.current as unknown as HTMLDivElement, 'dark');
      }

      let option = {
        backgroundColor: "rgba(0,0,0,0)",  
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '30',
          left: '100',
          data: ['日使用次数', '使用前十'],
          textStyle: {
            color: '#fff'
          }
        },
        calendar: {
          left: 30,
          right: 30,
          top: 100,
          bottom: 60,
          range: ['2022-10', '2022-12-31'],
          splitLine: {
            show: true,
            lineStyle: {
              color: '#000',
              width: 4,
              type: 'solid'
            }
          },
          yearLabel: {
            formatter: '{start}  1st',
            color: '#fff'
          },
          itemStyle: {
            color: '#323c48',
            borderWidth: 1,
            borderColor: '#111'
          }
        },
        series: [{
          name: '日使用次数',
          type: 'scatter',
          coordinateSystem: 'calendar',
          data: data,
          symbolSize: function (val:any) {
            return val[1] / 500;
          },
          itemStyle: {
            color: '#ddb926'
          }
        },
        {
          name: '使用前十',
          type: 'effectScatter',
          coordinateSystem: 'calendar',
          data: topData,
          symbolSize: function (val:any) {
            return val[1] / 500;
          },
          showEffectOn: 'render',
          rippleEffect: {
            brushType: 'stroke'
          },
          itemStyle: {
            color: '#f4e925',
            shadowBlur: 10,
            shadowColor: '#333'
          },
          zlevel: 1
        },]

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
                height: 27vh;
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
