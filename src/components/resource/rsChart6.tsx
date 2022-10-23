//@ts-nocheck
import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

const RsChart6: React.FC<any> = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    let myChart = echarts.init(chartRef.current as unknown as HTMLDivElement);

    var data = [];
    var dataCount = 40;
    var startTime = +new Date();
    var categories = [
      "S1",
      "S2",
      "S3",
      "S4",
      "GPS",
      "BD",
    ];
    var types = [
      { name: "运行", color: "#75d874" },
      { name: "故障", color: "#00d4ff" },
      { name: "等待", color: "#3a786f" },
      { name: "备用", color: "#4f70e1" },
    ];

    //产生模拟数据
    echarts.util.each(categories, function (category, index) {
      var baseTime = startTime;
      for (var i = 0; i < dataCount; i++) {
        var typeItem = types[Math.round(Math.random() * (types.length - 1))];
        var duration = Math.round(Math.random() * 1000000);
        data.push({
          name: typeItem.name,
          value: [index, baseTime, (baseTime += duration), duration],
          itemStyle: {
            normal: {
              color: typeItem.color,
            },
          },
        });
        baseTime += Math.round(Math.random() * 2000);
      }
    });
    //设定图形效果
    function renderItem(params, api) {
      var categoryIndex = api.value(0);
      var start = api.coord([api.value(1), categoryIndex]);
      var end = api.coord([api.value(2), categoryIndex]);
      var height = api.size([0, 1])[1] * 0.6;

      var rectShape = echarts.graphic.clipRectByRect(
        {
          x: start[0],
          y: start[1] - height / 2,
          width: end[0] - start[0],
          height: height,
        },
        {
          x: params.coordSys.x,
          y: params.coordSys.y,
          width: params.coordSys.width,
          height: params.coordSys.height,
        }
      );

      return (
        rectShape && {
          type: "rect",
          shape: rectShape,
          style: api.style(),
        }
      );
    }

    let option = {
      backgroundColor:{
        type: 'radial',
        x: 0.5,
        y: 0.5,
        r: 0.5,
        colorStops: [
            {
                offset: 0,
                color: 'rgba(15, 38, 96, 0.5)',
            },
            {
                offset: 1,
                color: 'rgba(15, 38, 96, 0.1)',
            },
        ],
        global: false,
      },
      //鼠标提示
      tooltip: {
        formatter: function (params) {
          return params.marker + params.name + ": " + params.value[3] + " ms";
        },
      },
      legend: {
        show: true,
        selectedMode:false,
        data: ["正常运行", "故障", "等待", "备用"],
        right: 50,
        top: 5,
        textStyle:{
          color:'#fff',
        },
        left: "center",
      },

      //缩放
      dataZoom: [
        {
          type: "slider",
          show: false,
          filterMode: "weakFilter",
          showDataShadow: false,
          top: 550,
          height: 10,
          borderColor: "transparent",
          backgroundColor: "#e2e2e2",
          handleIcon:
            "M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7v-1.2h6.6z M13.3,22H6.7v-1.2h6.6z M13.3,19.6H6.7v-1.2h6.6z", //jshint ignore:line
          handleSize: 20,
          handleStyle: {
            shadowBlur: 6,
            shadowOffsetX: 1,
            shadowOffsetY: 2,
            shadowColor: "#aaa",
          },
          labelFormatter: "",
          start: 0,
          end: 70,
        },
        {
          type: "inside",
          filterMode: "weakFilter",
        },
      ],
      grid: {
        top: 30,
        bottom:20
      },
      xAxis: {
        min: startTime,
        scale: true,
        axisLabel: {
          color:'#fff',
          formatter: function (val) {
            return Math.max(0, val - startTime) + " ms";
          },
        },
      },
      yAxis: {
        data: categories,
        axisLabel:{
          color: "#fff"
        }
      },

      series: [
        {
          name: "正常运行",
          type: "custom",
          renderItem: renderItem,
          itemStyle: {
            opacity: 0.8,
            color: "#75d874",
          },
          encode: {
            x: [1, 2],
            y: 0,
          },
          data: data,
        },
        {
          name: "故障",
          type: "custom",
          renderItem: renderItem,
          itemStyle: {
            opacity: 0.8,
            normal: {
              color: "#00d4ff",
              borderWidth: 2,
            },
          },
          encode: {
            x: [1, 2],
            y: 0,
          },
          data: data,
        },
        {
          name: "等待",
          type: "custom",
          renderItem: renderItem,
          itemStyle: {
            opacity: 0.8,
            normal: {
              color: "#3a786f",
              borderWidth: 2,
            },
          },
          encode: {
            x: [1, 2],
            y: 0,
          },
          data: data,
        },
        {
          name: "备用",
          type: "custom",
          renderItem: renderItem,
          itemStyle: {
            opacity: 0.8,
            normal: {
              color: "#4f70e1",
              borderWidth: 2,
            },
          },
          encode: {
            x: [1, 2],
            y: 0,
          },
          data: data,
        },
      ],
    };

    myChart.setOption(option);
  }, []);

  return <div id="rs-chart6" ref={chartRef}></div>;
};

export default RsChart6;
