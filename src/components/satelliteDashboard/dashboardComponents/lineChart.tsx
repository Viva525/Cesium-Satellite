import React, { useEffect, useRef, useState } from 'react';
import * as echarts from "echarts";

type LineChartProps = {
    title:string,
    type: "Bar"|"Line",
    xData?: Array<string>,
    yData?: Array<number>|Array<Array<number>>,
    width: number|string,
    height: number|string
}

const LineChart: React.FC<LineChartProps> = (props) => {
    const {title, type, xData, yData, width, height} = props;
    const [init, setInit] = useState<boolean>(false);
    const chartRef = useRef(null);

    useEffect(()=>{
        setInit(true)
    })

    useEffect(()=>{
        if(init){
            let myChart = echarts.getInstanceByDom(chartRef.current as unknown as HTMLDivElement)
            if(type === 'Bar'){
                initBarChart()
            }else if(type === 'Line'){
                initLineChart()
            }
            console.log(xData);
            console.log(yData);
        }
    },[init])

    const initBarChart = ()=>{

    }

    const initLineChart = () => {

    }

    return (
        <div ref={chartRef} style={{width: `${typeof(width)==="string"?width:width+"px"}`, height: `${typeof(height)==="string"?height:height+"px"}`, background:"#212124", border:"1px solid #333", boxShadow:"2px 8px 16px rgba(0,0,0,0.2)", margin:"10px"}}>
       </div>);
};

export default LineChart