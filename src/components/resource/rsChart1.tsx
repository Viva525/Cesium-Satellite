//@ts-nocheck
import React, { useEffect, useRef } from "react";
import * as echarts from 'echarts'


const RsChart1: React.FC<any>=() =>{
    const chartRef = useRef(null)
    
    useEffect(() =>{
        let myChart = echarts.init(chartRef.current as unknown as HTMLDivElement)
        let option = commonEchartOption_4(
            ['#9fb9e3', 21, '链路利用率Top5', '5%'],
            [
                ['15%', '10%', '53%', '5'],
                ['15%', '55%', '7%', '5'],
            ],
            [
                [100, 0],
                [100, 1],
            ],
            [
                [
                    'category',
                    'left',
                    [-5, 0, 0, 0],
                    [-70, 0, 0, 12],
                    '#9FB9E3',
                    16,
                    35,
                    0,
                    'left',
                    [-32, -30, 0, 0],
                    14,
                    [true, [32, -30, 0, 0]],
                ],
                [
                    'category',
                    'left',
                    [-5, 0, 0, 0],
                    [-70, 0, 0, 10],
                    '#9FB9E3',
                    16,
                    5,
                    1,
                    'left',
                    [-32, -20, 0, 0],
                    14,
                    [true, [32, -20, 0, 0]],
                ],
            ],
            [
                [
                    '一平面入口流量',
                    '8%',
                    '#00D4FF',
                    '#00D4FF',
                    0,
                    0,
                    ['40%', ['80%', '100%'], ['0%', '0%']],
                    [true, '收', '#00D4FF'],
                ],
                [
                    '一平面发口流量',
                    '8%',
                    '#34E598',
                    '#34E598',
                    0,
                    0,
                    ['40%', ['80%', '100%'], ['0%', '0%']],
                    [true, '发', '#34E598'],
                ],
                [
                    '二平面入口流量',
                    '8%',
                    '#00D4FF',
                    '#00D4FF',
                    1,
                    3,
                    ['40%', ['80%', '100%'], ['0%', '0%']],
                    [true, '收', '#00D4FF'],
                ],
                [
                    '二平面发口流量',
                    '8%',
                    '#34E598',
                    '#34E598',
                    1,
                    3,
                    ['40%', ['80%', '100%'], ['0%', '0%']],
                    [true, '发', '#34E598'],
                ],
            ],
            5,
            'Mb',
            true
        );
        option.yAxis[0].data = ['STARLINK-3350_51105', 'STARLINK-3391_51117', 'GPS_2F-10_40730', 'GPS_2F-11_41019', 'BEIDOU-17_40549'];
        option.series[0].data = [36, 42, 53, 63, 80];
        option.series[1].data = [40, 43, 35, 26, 22];
        option.yAxis[1].data = [36, 42, 54, 635, 80];
        option.yAxis[2].data = [40, 43, 33, 26, 20];
        option.yAxis[3].data = ['重庆(基站)', '北京(基站)', '上海(基站)', 'Seattle(基站)', 'Los(基站)'];
        option.series[2].data = [36, 42, 34, 63, 80];
        option.series[3].data = [40, 43, 35, 26, 20];
        option.yAxis[4].data = [36, 42, 53, 63, 80];
        option.yAxis[5].data = [40, 43, 33, 26, 22];
        
        function commonEchartOption_4(
            titleobj,
            gridobj,
            xaisobj,
            yaisobj,
            seriesobj,
            datalength,
            dwval,
            pmimgbool,
            serieslabobj
        ) {
            var option = {};
            option['backgroundColor'] = {
                type: 'radial',
                x: 0.5,
                y: 0.5,
                r: 0.5,
                colorStops: [
                    {
                        offset: 0,
                        color: 'rgba(15, 38, 96, 0.6)',
                    },
                    {
                        offset: 1,
                        color: 'rgba(15, 38, 96, 0.1)',
                    },
                ],
                global: false,
              };
            var gridarr = [];
            for (var i = 0; i < gridobj.length; i++) {
                gridarr.push({ top: 15, left: gridobj[i][1], right: gridobj[i][2], bottom: gridobj[i][3] });
            }
            option['grid'] = gridarr;
            option['tooltip'] = { show: false };
            var xaisarr = [];
            for (var i = 0; i < xaisobj.length; i++) {
                xaisarr.push({
                    type: 'value',
                    gridIndex: xaisobj[i][1],
                    axisLine: { show: false },
                    max: xaisobj[i][0],
                    splitLine: { show: false },
                    axisLabel: { show: false },
                    axisTick: { show: false },
                });
            }
            option['xAxis'] = xaisarr;
            serieslabobj = serieslabobj ? serieslabobj : [];
            var yaisarr = [];
            for (var i = 0; i < yaisobj.length; i++) {
                yaisarr.push({
                    type: yaisobj[i][0],
                    offset: yaisobj[i][6],
                    splitLine: { show: false },
                    axisLine: { show: false },
                    axisLabel: {
                        show: true,
                        align: yaisobj[i][1],
                        padding: yaisobj[i][2],
                        textStyle: { color: yaisobj[i][4], fontSize: yaisobj[i][5] },
                        formatter: function (params, index) {
                            if (index == datalength - 1) {
                                return '{b|}' + '{name|' + params + '}';
                            } else {
                                return '{c|' + (datalength - index) + '}' + '{name|' + params + '}';
                            }
                        },
                        rich: {
                            b: {
                                backgroundColor: {
                                    image:
                                        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAZCAYAAAAxFw7TAAAB2ElEQVQ4jaWVX0tUQRjGX7fSG5liMZHtvOdLJPWFMuzDmH/BRYUgyUAQROumjv82dWfGY0Fl3kQXIgXZrtBFxDovjxfS6u45Z3fWBp6bmXd+8Dy88w6Rx0Jp4C7iQp9PbWvQIt0Qy0/EcMUZrkjMwwDlrgeLg4diOHaGcVViOMZe8KADUKHPGZ4Ty9IMq8uyOBPOtowBoJzEPOwu7KWDkqqISYmhVk6314H26jE4E866Vvb8JWLDGfIpPniRw8fnXV5gL+C3JYWvi72dA2v6XqLg704/NscJG2OEP9v9ifPmOw3ArQnC8apqstuDaIQQjRA+zfc0nP14rbA1TtnA0zWFd1OEw4VuVN8qVKN8HfZPv97cQTW6jcOX3ShNEqqRygY6w7Azl5fXn1ICeHWvXKREBAngl4VbCUiWPs/fbA88XlHewKNl1R74e8MfeLrmATzTQUOOWdJFSm2z1MY+0wG+v1L48IywPXXRg+ujhNIEIZ4jHC33olYuZDb2ic8L8JFY/knYDfJieNqZ/xoQ4gxPYzfIX44ww4NOs7kGTNd0eD9zyDobDnnGcOJM8AigrvbfwEGQFxMWM2IQabbnu/CeB51tiEFjP8OeNxSUEx0+djYc8vlCzwEjfRpEh+5lrwAAAABJRU5ErkJggg==',
                                },
                                width: 29,
                                height: 29,
                                align: 'center',
                            },
                            c: {
                                color: '#FFFFFF',
                                width: 29,
                                height: 29,
                                align: 'center',
                                verticalAlign: 'center',
                                backgroundColor: {
                                    image:
                                        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAZCAYAAAAxFw7TAAAA+0lEQVQ4je3VPW7CQBAF4GfBAVzFxyA1cA3qQIeimbWPwBmcA4SchCbU5gQgPLMSrnyAIG9KfhzwGlJ6pNetPmleMQv4TFKGSHah19u741wAsjOQFiApwDoFXPAYlugrWNYgcRdh/QbroAW0C8HyAZJjDTvlCJK0oQYXgHUKkuIOdBU9wOhbvYb3G+v5w2c1kKQN6/mF9QckKZ6GrtOBHdiBnmD5j2AJxNsIlC9BUj0BVWD9xPzwcjphZEcg2bTHNIOxw79v7MT1YCx71lCCLWHies3fQFxEoPzrRg0VKF8i3kbNUA3ejy9r0AxkR+2h81ms+mAxMJZ91vsFh2hnzEe9YUgAAAAASUVORK5CYII=',
                                },
                                fontSize: yaisobj[i][5],
                            },
                            name: { color: '#9FB9E3', fontSize: yaisobj[i][5], padding: yaisobj[i][3] },
                        },
                    },
                    axisTick: { show: false },
                    gridIndex: yaisobj[i][7] ? yaisobj[i][7] : 0,
                    position: yaisobj[i][8] ? yaisobj[i][8] : 'left',
                });
                yaisarr.push({
                    type: 'category',
                    gridIndex: yaisobj[i][7] ? yaisobj[i][7] : 0,
                    position: 'right',
                    axisTick: { show: false },
                    axisLine: { show: false },
                    axisLabel: {
                        show: true,
                        align: 'right',
                        fontSize: yaisobj[i][5],
                        formatter: function (params) {
                            return '{name|' + params + dwval + '}';
                        },
                        rich: { name: { color: '#9FB9E3', width: 100, fontSize: yaisobj[i][10], padding: yaisobj[i][9] } },
                    },
                });
                if (yaisobj[i][11] && yaisobj[i][11][0]) {
                    yaisarr.push({
                        type: 'category',
                        gridIndex: yaisobj[i][7] ? yaisobj[i][7] : 0,
                        position: 'right',
                        axisTick: { show: false },
                        axisLine: { show: false },
                        axisLabel: {
                            show: true,
                            align: 'right',
                            fontSize: yaisobj[i][5],
                            formatter: function (params) {
                                return '{name|' + params + dwval + '}';
                            },
                            rich: {
                                name: { color: '#9FB9E3', width: 100, fontSize: yaisobj[i][10], padding: yaisobj[i][11][1] },
                            },
                        },
                    });
                }
            }
            option['yAxis'] = yaisarr;
            var seriesarr = [];
            for (var i = 0; i < seriesobj.length; i++) {
                var objseriesv = {
                    name: seriesobj[i][0],
                    xAxisIndex: seriesobj[i][4],
                    yAxisIndex: seriesobj[i][5],
                    barGap: '220%',
                    barCategoryGap: '5%',
                    barWidth: seriesobj[i][1],
                    type: 'pictorialBar',
                    xAxisIndex: seriesobj[i][4],
                    yAxisIndex: seriesobj[i][5],
                    symbol: 'rect',
                    symbolMargin: seriesobj[i][6][0],
                    symbolSize: seriesobj[i][6][1],
                    symbolOffset: seriesobj[i][6][2],
                    symbolRepeat: true,
                    itemStyle: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 1,
                            y2: 0,
                            colorStops: [
                                { offset: 0, color: seriesobj[i][2] },
                                { offset: 1, color: seriesobj[i][3] },
                            ],
                            global: false,
                        },
                    },
                    z: 2,
                };
                if (seriesobj[i][7] && seriesobj[i][7][0]) {
                    objseriesv['label'] = {
                        show: seriesobj[i][7][0],
                        position: 'left',
                        offset: serieslabobj[0] ? serieslabobj[0] : [-64, 0],
                        borderWidth: 1,
                        borderColor: serieslabobj[2] ? serieslabobj[2] : '#1F2C83',
                        distance: serieslabobj[3] ? serieslabobj[3] : -235,
                        color: seriesobj[i][7][2] ? seriesobj[i][7][2] : '#9FB9E3',
                        fontSize: serieslabobj[4] ? serieslabobj[4] : 13,
                        formatter: seriesobj[i][7][1],
                    };
                }
                seriesarr.push(objseriesv);
            }
            option['series'] = seriesarr;
            if (pmimgbool && option.yAxis.length >= 2) {
                for (var j = 1; j < option.yAxis.length; j++) {
                    if (option.yAxis[j].position == 'left') {
                        option.yAxis[j].axisLabel.formatter = function (params, index) {
                            return '{name|' + params + '}';
                        };
                    }
                }
            }
            return option;
        }
        

 myChart.setOption(option)

    }, [])


    return(
        <div id="rs-chart1" ref={chartRef}></div>
    )
}

export default RsChart1