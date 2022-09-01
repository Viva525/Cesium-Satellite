import React, { useEffect, useState } from 'react';
import "./css/dashboard.css"
import LineChart from './dashboardComponents/lineChart';
import TextCard from './dashboardComponents/textCard';


const SatelliteDashboard: React.FC<{}> = () => {
    const [init, setInit] = useState<boolean>(false);
    const [groundBusinessState, setGroundBusiniessState] = useState<any>(null);
    useEffect(()=>{
        setInit(true);
    },[])

    useEffect(()=>{
        if(init){
            fetch("./data/groundData/groundBusiness.json").then((res)=>res.json()).then((data)=>{
                console.log(data);
                setGroundBusiniessState(data);
            });
        }
    },[init]);

  return (<div className='dashboard-container' style={{ width: '100%', height: '100%' }}>
    <header className='dashboard-title'>
        <p>卫星态势分析</p>
        <button className='dashboard-button' onClick={()=>{
            //@ts-ignore
            window.location="http://localhost:3000"
        }}>返回监测平台</button>
    </header>
    <div className='charts-container'>
        <div className='ground-info'>
            <p>地面节点运行效能</p>
            <div className='chart-list'>
                {groundBusinessState===null?<></>:
                <LineChart title={'123'} type={"Bar"}
                width={550} 
                height={'100%'}
                xData={groundBusinessState["DateTime"]}
                yData={[groundBusinessState["Time percent"],groundBusinessState["SendTeraBytes"],groundBusinessState["RecTeraBytes"]]}
                />}
                <TextCard title={'平均在网时长'} width={300} height={"100%"} content={"19.24 小时"}/>
                <TextCard title={'平均入网次数'} width={300} height={"100%"} content={"2.54 次"}/>
                <TextCard title={'平均退网次数'} width={300} height={"100%"} content={"1.82 次"}/>
  

            </div>
        </div>
        
        <div className='satellite-info'>
            <p>卫星节点运行效能</p>
            <div className='chart-list'>

            </div>
        </div>
    </div>
  </div>)
};

export default SatelliteDashboard;
