import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import geoWorld from "../../../public/data/world.json"
import { UseMapProps } from "../../types/type"

const UseMap: React.FC<UseMapProps> = (props) => {
  const { nowData, setUseRegionData } = props;
  const chartRef = useRef(null);
  useEffect(() => {
    if (nowData) {
      let myChart = echarts.getInstanceByDom(
        chartRef.current as unknown as HTMLDivElement
      );
      if (myChart == null) {
        myChart = echarts.init(chartRef.current as unknown as HTMLDivElement);
        //@ts-ignore
        echarts.registerMap('world', geoWorld);
      }
      let useData = []
      for(let i of geoWorld.features){
        useData.push({
          name:i.properties.name,
          value: Math.round(Math.random() * 20)
        })
      }
      setUseRegionData(useData)

      let option = {
        
        backgroundColor:"rgba(0,0,0,0)",
        tooltip: {
          trigger: 'item',
        },
        visualMap: {
          min: 0,
          max: 20,
          calculable: true,
          type: 'continuous',
          orient: 'horizontal',
          left: 'center',
          color: ['rgba(13, 126, 222)', 'rgba(18, 30, 55)']
        },
        geo: {
          type: 'map',
          map: 'world',
          roam: true,
          geoIndex: 0,
          zoom: 1.4,  //地图的比例
          emphasis: {
            itemStyle: {
              areaColor: '#5b8ff9',
            },
            label: {
              color: '#fff',  //选中后的字体颜色
              fontSize: "15px"
            }
          },
          itemStyle: {
            areaColor: 'rgba(13, 126, 222, 0.5)',
            borderColor: 'rgba(63,218,255,0.3)',
            // borderWidth: 2,
            show: true
          },

        },
        series: {
          name: '地区使用数量',
          type: 'map',
          map: 'china',
          roam: true,
          geoIndex: 0,
          data: useData,
          label: {
            // 默认文本标签样式
            color: "white",
            show: true,
          },
          itemStyle: {
            // 区域背景透明
            areaColor: "transparent",
            borderColor: "rgba(39,211,233, 1)",
            borderWidth: 1,

          },
        },
      }
      myChart.setOption(option, true);
      myChart.resize();
    }

  }, [nowData])


  return (
    <>
      <style>
        {`
            #useMap{
                height:90vh;
                width:99%;
                background-size: cover;
                background-repeat: no-repeat;
            }
            `}
      </style>
      <div id="useMap" className="charts" ref={chartRef}>
      </div>
    </>
  );
};

export default UseMap;
