import React, { useEffect, useState } from 'react';
import * as echarts from "echarts";

const SatelliteWorkTime: React.FC<{}> = () => {
const [init, setInit] = useState<boolean>(false);
const chartRef = React.useRef<HTMLDivElement|null>(null);
const spirit = 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAxCAYAAADEIbk7AAAAAXNSR0IArs4c6QAABE5JREFUWEe1mF1sFFUUx/9ntttuNQi0lSgktjO1IX6FaB+gMwNW0aCGqDGSBgyJgaQxYXebPviBklghBh4koZ32RfyK8SvwQASJGENa0p0taiQ+SDXqzhZJav1o14jph9vOMXdgtZWdzp21va/zP+d3Tu69554zBInV0dxbNpavewLMjzNhDYAqAGMAzjHxkZqyH4909N0zPZ8rCuLsWj90lzLjfgBCg7+WB4m5pSt989d+mnlBbbqzwSWcAlAZFBCAP+FiozWgfV5M6wtKrP/+eriRbwBUS0AKkpFIlG451Kf+/l8bf5DpdIKRDAHxpAza322rz0uBxOaP5mt/AbA8LAjAT5atrgKIZ9sWzSjRNHQnFPdcCRDPxCVe3ZOq/y4QlDQyDzHoZKkgKNRs9atnAkFx/Yd7iZTTpYIUonWdKfWzQFDSyNzEoAslgrg8ml9xsG/1b4EgIUgYzleAVwXCrgHL1nSpUydEcTOzjZjeDUth4JFuWzsuDQKYknr2OBM2h4AdsWytJVRlEOJnjG+XTHD5MRA2BsGI8dHkVKzl1S9XjocGCYMtWzhy43C2nYEXACwr4mQUTHtHVtX1HD1KM34BBVbvguEu3amNKPQig+8HowbAeQJZVbnx9zsGb/srMOMgQdwYepDgitpl+mj72aWXuwfUT+bz5ZtRa+PwNbHY1GEGbwsKRnwnojerxsaf8suuKKi96WLltJL/FIAhA/lXw73VuckHisGKF1U9+zqId4SDFNR8yLLr2wPvUZuZXesyny0N4lkxlMjtVn/t4GwfV2WU0LPvgXjr/wABhMNWSmv1BYk7c8NwVhTDYvclDHvEstWVsx+/ORkljOw6gAfCePS9oOzeMbsrmgOKG5nnCLR/YUBIdqU1q+BrbkamcwqMTQsBAvChZWuPXgXquPV8+ejyStEmyfRwMrHkqm21pgPkehe6YJE0MiaD+mU8yGpcRWns6a/zmpx/QAnT2QPGPlknMjoCnu6ytVfmgnSnD4S7ZRxIawgnrZTmPZxeRk82Z2NL8iz2p0LaiZzwUnX0QpWYNDxQ3Mw2E3OvnG1YFTVZtnrWAyV0Zx8Ie8K6kNEzeHe3XX/gMshwUuGfBBmMV2JPW2ntPhIPXEVsUuxPVNI0rGyiOjexjOJN2U2ksBi2FnNtoISeOQCiZxeTQsQvUdxwxIlYu5ggMM5QwnDENB1ZVBAwLkC/Al6ftmiLAYcSZmYHmF6bXfcWmDgNxtbL98h01hBgMlOUmK+FwlFm2g2gPCQ0B9Degg0BOebplJVuyPg2kEndORFykhADyBtWWt1ZLDh/kOlsZ8bboTIiPGyltBOhQO1NF6umlfzPAMokYX/gupkV1scNU6FAV/ZOuocg4J0uW9vuF9S8Y0vccHYSIE5k4CJSHutK1R0rCdTamFlaEfOm86UBpJFLUVLf6lMnSwIJoyt/uA4Cvr/RBhXmts50/RfzBfM3UTt1iz4UtK8AAAAASUVORK5CYII=';
const lists = [
    {
        name: "北斗",
        value: 241
    },{
        name: "GPS",
        value: 387
    },{
        name: "星链",
        value: 188
    }
]

useEffect(()=>{
    setInit(true);
},[])

useEffect(()=>{
    if(init){
        chartInit();
    }
},[init])

const chartInit = () => {
    
    let yName1 = lists.map((item) => item.name)
    let xData1 = lists.map((item) => item.value)
    let maxData1 = 1;
    let option = {
        backgroundColor: '#0000',
        grid: {
            top: '5%',
            left: '0%',
            right: '3%',
            bottom: '10%',
            containLabel: true,
        },
        xAxis: {
            type: 'value',
            axisLine: {
                show: false,
            },
            splitLine: {
                show: false,
            },
            axisLabel: {
                show: false,
            },
            axisTick: {
                show: false,
            },
        },
        yAxis: [
            {
                type: 'category',
                inverse: true,
                data: ['北斗', 'GPS', '星链'],
                axisLine: {
                    show: false,
                },
                axisTick: {
                    show: false,
                },
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#fff',
                        fontSize: 14,
                    },
                },
            },
        ],
        series: [
            {
                type: 'pictorialBar',
                emphasis: {
                    focus: 'none',
                    itemStyle: {
                        color: 'rgba(13, 126, 222, 1)',
                    },
                    disabled: true
                },
                legendHoverLink: false,
                itemStyle: {
                    normal: {
                        color: 'rgba(13, 126, 222, 1)',
                    },
                },
                symbol: 'rect',
                symbolRepeat: 'fixed',
                // symbolBoundingData: 1,
                symbolMargin: 5,
                symbolClip: true,
                symbolSize: [14, 18],
                symbolPosition: 'start',
                symbolOffset: [0, 0],
                data: [1, 2, 3],
                label:{
                    show: false
                },
                z: 2,
            },
            {
                type: 'pictorialBar',
                emphasis: {
                    focus: 'none',
                    itemStyle: {
                        color: 'rgba(255,255,255,0.2)',
                    },
                },
                legendHoverLink: false,
                itemStyle: {
                    normal: {
                        color: 'rgba(255,255,255,0.2)',
                    },
                },
                label: {
                    normal: {
                        show: false,
                    },
                },
                animationDuration: 0,
                symbolRepeat: 'true',
                symbolMargin: 5,
                symbol: 'rect',
                symbolSize: [14, 18],
                symbolPosition: 'start',
                symbolOffset: [0, 0],
                data: [10, 10, 10],
                z: 1,
            },
        ],
    };
    let myChart = echarts.getInstanceByDom(
        chartRef.current as unknown as HTMLDivElement
    );
    if (myChart == null) {
        myChart = echarts.init(chartRef.current as unknown as HTMLDivElement);
    }
    myChart?.setOption(option)
}


    return (
        <div style={{width:'100%', height:'18vh'}} ref={chartRef}>
       </div>);
};

export default SatelliteWorkTime