//@ts-nocheck
import React, { useEffect, useRef } from "react";
import * as echarts from 'echarts'


const RsChart2: React.FC<any>=() =>{
    const chartRef = useRef(null)
    
    useEffect(() =>{
        let myChart = echarts.init(chartRef.current as unknown as HTMLDivElement)
        var uploadedDataURL = './images/rsChart1_0.png';

        var img = './images/rsChart1.png';
        
        var trafficWay = [
            {
                name: '山东',
                value: 20,
            },
            {
                name: '北京',
                value: 10,
            },
            {
                name: '贵州',
                value: 30,
            },
            {
                name: '上海',
                value: 40,
            },
            {
                name: '杭州',
                value: 40,
            },
            {
                name: '重庆',
                value: 40,
            },
        ];
        var nameArray = trafficWay.map((item) => {
            return item.name;
        });
        
        var data = [];
        var color = ['#2ca1ff', '#f5824b', '#1d3646', '#614b86', '#fd5151', '#4e72e1'];
        for (var i = 0; i < trafficWay.length; i++) {
            data.push(
                {
                    value: trafficWay[i].value,
                    name: trafficWay[i].name,
                    itemStyle: {
                        normal: {
                            borderWidth: 8,
                            shadowBlur: 10,
                            borderRadius: 20,
                            borderColor: color[i],
                            shadowColor: color[i],
                        },
                    },
                },
                {
                    value: 8,
                    name: '',
                    itemStyle: {
                        normal: {
                            label: {
                                show: false,
                            },
                            labelLine: {
                                show: false,
                            },
                            color: 'rgba(0, 0, 0, 0)',
                            borderColor: 'rgba(0, 0, 0, 0)',
                            borderWidth: 0,
                        },
                    },
                }
            );
        }
        var seriesOption = [
            {
                name: '',
                type: 'pie',
                clockWise: false,
                radius: ["60%", "70%"],
                hoverAnimation: false,
                center: ['50%', '50%'],
                itemStyle: {
                    normal: {
                        label: {
                            show: true,
                            position: 'outside',
                            color: '#ddd',
                            formatter: function (params: { value: number; name: string; }) {
                                var percent = 0;
                                var total = 0;
                                for (var i = 0; i < trafficWay.length; i++) {
                                    total += trafficWay[i].value;
                                }
                                //@ts-ignore
                                percent = ((params.value / total) * 100).toFixed(0);
                                if (params.name !== '') {
                                    return '{img1|}' + '{font1|' + percent + '%}' + '\n' + '{font2|' + params.name + '}';
                                } else {
                                    return '';
                                }
                            },
                            rich: {
                                font1: {
                                    color: '#ffffff',
                                    fontWeight: 'bold',
                                    fontSize: '22',
                                },
                                font2: {
                                    color: 'rgba(255,255,255,0.8)',
                                    textAlign: 'left',
                                },
                                img1: {
                                    backgroundColor: {
                                        image: uploadedDataURL,
                                    },
                                    height: 20,
                                    width: 20,
                                },
                            },
                        },
                        labelLine: {
                            length: 50,
                            // length2:100,
                            show: true,
                            lineStyle: {
                                color: 'rgba(255, 255, 255, 0.0)',
                            },
                        },
                    },
                },
                data: data,
            },
        ];
        let option = {
            backgroundColor: {
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
            color: color,
            graphic: {
                elements: [
                    {
                        type: 'image',
                        z: 3,
                        style: {
                            image: img,
                            width: 180,
                            height: 180,
                        },
                        left: 'center',
                        top: 'center',
                    },
                ],
            },
            tooltip: {
                show: false,
            },
            toolbox: {
                show: false,
            },
            series: seriesOption,
        };
        

 myChart.setOption(option)

    }, [])


    return(
        <div id="rs-chart2" ref={chartRef}></div>
    )
}

export default RsChart2