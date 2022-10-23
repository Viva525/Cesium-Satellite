import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

type UseTimeProps = {
  nowData: number
};

const UseTimeMonth: React.FC<UseTimeProps> = (props) => {

  const { nowData } = props;
  const chartRef = useRef(null);
  useEffect(() => {
    if (nowData) {
      let base = +new Date(2022, 10, 1);
      let oneDay = 24 * 3600 * 1000;

      let data = [[base, Math.round(Math.random() * 300)]];

      for (let i = 1; i <= 720 / nowData; i++) {
        let now = new Date((base += oneDay * nowData));
        let nextData = Math.round((Math.random() - 0.5) * 20 * nowData + data[i - 1][1])
        if(nextData < 0){
          nextData = -nextData
        }
        data.push([+now, nextData]);
      }
      console.log(data)
      let myChart = echarts.getInstanceByDom(
        chartRef.current as unknown as HTMLDivElement
      );
      if (myChart == null) {
        myChart = echarts.init(chartRef.current as unknown as HTMLDivElement);
      }

      let option = {
        backgroundColor:"rgba(0,0,0,0)",
        tooltip: {
          trigger: 'axis',
          position: function (pt: any) {
            return [pt[0], '10%'];
          }
        },
        grid: {
          left: "10%",
          top: "20%",
          right: "2%",
          bottom: "15%",
        },
        xAxis: {
          type: 'time',
          boundaryGap: false
        },
        yAxis: {
          type: "value",
          name: "次数",
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
          boundaryGap: [0, '100%']
        },
  
        dataZoom: [
          {
            type: 'inside',
            start: 0,
            end: 50
          },
        ],

        series: [
          {
            data: data,
            type: "line",
            name:"次数",
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
      }
      myChart.setOption(option, true);
      myChart.resize();
    }

  }, [nowData])


  return (
    <>
      <style>
        {`
            #useTimeMonth{
                height:25vh;
                width:99%;
                background-size: cover;
                background-repeat: no-repeat;
            }
            `}
      </style>
      <div id="useTimeMonth" className="charts" ref={chartRef}>
      </div>
    </>
  );
};

export default UseTimeMonth;
