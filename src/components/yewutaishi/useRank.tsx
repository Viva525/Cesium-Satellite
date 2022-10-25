import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import rankData from "../../../public/data/rankData.json"

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
      const updateFrequency = 2000;
      const dimension = 0;
      const countryColors = {
        'Australia': 'rgba(0, 212, 255, 0.6)',
        'Canada': 'rgb(79, 112, 225)',
        'China': 'rgb(58, 120, 111)',
        'Cuba': 'rgba(117, 216, 116, 0.7)',
        'Finland': 'rgb(59, 201, 161)',
        'France': 'rgb(64, 141, 233)',
        'Germany': 'rgba(0, 212, 255, 0.6)',
        'Iceland': 'rgb(79, 112, 225)',
        'India': 'rgb(58, 120, 111)',
        'Japan': 'rgba(117, 216, 116, 0.7)',
        'North Korea': 'rgb(59, 201, 161)',
        'South Korea': 'rgb(64, 141, 233)',
        'New Zealand': 'rgba(0, 212, 255, 0.6)',
        'Norway': 'rgb(79, 112, 225)',
        'Poland': 'rgb(58, 120, 111)',
        'Russia': 'rgba(117, 216, 116, 0.7)',
        'Turkey': 'rgb(59, 201, 161)',
        'United Kingdom': 'rgb(64, 141, 233)',
        'United States': 'rgba(0, 212, 255, 0.6)'
      };
      const years: any[] = [];
      for (let i = 0; i < rankData.length; ++i) {
        if (years.length === 0 || years[years.length - 1] !== rankData[i][4]) {
          years.push(rankData[i][4]);
        }
      }
      let startIndex = 10;
      let startYear = years[startIndex];
      let option = {
        backgroundColor: "rgba(0,0,0,0)",
        grid: {
          top: 10,
          bottom: 30,
          left: 150,
          right: 40
        },
        xAxis: {
          max: 'dataMax',
          axisLabel: {
            formatter: function (n: any) {
              return Math.round(n) + '';
            }
          }
        },
        dataset: {
          source: rankData.slice(1).filter(function (d) {
            return d[4] === startYear;
          })
        },
        yAxis: {
          type: 'category',
          inverse: true,
          max: 10,
          axisLabel: {
            show: true,
            fontSize: 12,
            rich: {
              flag: {
                fontSize: 25,
                padding: 5
              }
            }
          },
          animationDuration: 300,
          animationDurationUpdate: 300
        },
        series: [
          {
            realtimeSort: true,
            seriesLayoutBy: 'column',
            type: 'bar',
            itemStyle: {
              color: function (param: any) {
                //@ts-ignore
                return countryColors[param.value[3]] || '#5470c6';
              }
            },
            encode: {
              x: dimension,
              y: 3
            },
            label: {
              show: true,
              precision: 1,
              position: 'right',
              valueAnimation: true,
              fontFamily: 'monospace'
            }
          }
        ],
        // Disable init animation.
        animationDuration: 0,
        animationDurationUpdate: updateFrequency,
        animationEasing: 'linear',
        animationEasingUpdate: 'linear',
        graphic: {
          elements: [
            {
              type: 'text',
              right: 160,
              bottom: 60,
              style: {
                text: startYear,
                font: 'bolder 80px monospace',
                fill: 'rgba(200, 200, 200, 0.25)'
              },
              z: 100
            }
          ]
        }
      };
      //@ts-ignore
      myChart.setOption(option, true);
      for (let i = startIndex; i < years.length - 1; ++i) {
        (function (i) {
          setTimeout(function () {
            updateYear(years[i + 1]);
          }, (i - startIndex) * updateFrequency);
        })(i);
      }
      function updateYear(year: any) {
        let source = rankData.slice(1).filter(function (d) {
          return d[4] === year;
        });
        //@ts-ignore
        option.series[0].data = source;
        option.graphic.elements[0].style.text = '';
        //@ts-ignore
        myChart.setOption(option, true);
      }
    }

  }, [nowData])


  return (
    <>
      <style>
        {`
            #useRank{
                height: 44vh;
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
