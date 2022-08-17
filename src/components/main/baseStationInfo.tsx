import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { SetState } from '../satelliteList';
import { BaseStation } from './types/type';

type BaseStationInfoProp = {
    baseStationList : BaseStation[],
    setBaseStationPos: SetState<number[]>
}

const BaseStationInfo: React.FC<BaseStationInfoProp> = (props) => {
    const {baseStationList, setBaseStationPos} = props;
    const [init, setInit] = useState<boolean>(false);

    useEffect(()=>{
        setInit(true);
    },[])

    useEffect(()=>{
        if(init){
            console.log(baseStationList)
        }
    },[init])

return (<div id='baseStationList' style={{ width: '100%', height: '100%', overflowY:"scroll"}}>
    {
       baseStationList.map((baseStation:BaseStation, index)=>{
        return(
            <Row className='row-style' onClick={()=>{
                setBaseStationPos(baseStation.pos);
            }}  key={index} style={{cursor:"pointer", borderBottom:"2px solid #4488bb"}}>
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
