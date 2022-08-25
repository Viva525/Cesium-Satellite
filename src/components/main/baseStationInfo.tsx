import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { SetState } from '../left/satelliteList';
import { BaseStation } from './types/type';

type BaseStationInfoProp = {
    baseStationList : BaseStation[],
    setBaseStation: SetState<BaseStation|null>
}

const BaseStationInfo: React.FC<BaseStationInfoProp> = (props) => {
    const {baseStationList, setBaseStation} = props;
    const [init, setInit] = useState<boolean>(false);

    useEffect(()=>{
        setInit(true);
    },[])

    useEffect(()=>{
    },[init])

return (<div id='baseStationList' style={{ width: '100%', height: '39vh', overflowY:"scroll"}}>
    {
       baseStationList.map((baseStation:BaseStation, index)=>{
        return(
            <Row className='row-style' onClick={()=>{
                setBaseStation(baseStation);
            }}  key={index} style={{cursor:"pointer", borderBottom:"2px solid rgba(255, 255, 255, 0.5)"}}>
                <Col span={4} >
                    <div className='baseStationIcon'></div>
                </Col>
                <Col span={20} style={{paddingLeft:"5px"}}>
                    <p className='baseStationText'>基站名: &nbsp;{baseStation.name}</p>
                    <p className='baseStationText'>基站描述: &nbsp;{baseStation.desc}</p>
                    <p className='baseStationText'> 基站状态:&nbsp;
                        <span style={{color:baseStation.state=="working"?"green":"yellow"}}>{baseStation.state}</span>
                    </p>
                </Col>
            </Row>)
       })
    }
</div>);
};

export default BaseStationInfo;
