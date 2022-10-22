//@ts-nocheck
import { Avatar, List } from 'antd';
import './table.css'
// import Item from 'antd/lib/list/Item';
import React, {useEffect, useState } from 'react';
import {StatelliteCardType } from "../../../types/type"
import StatelliteCard from './card';


const SatelliteList: React.FC<StatelliteCardType> = (props) => {
  const { satelliteList, setSatelliteList } = props
  const [nowSatellite, setNowSatellite] = useState<any[]>([])
  useEffect(() => {
    let nowSatelliteList = satelliteList
    for(let i in nowSatelliteList){
      if(nowSatelliteList[i][0] == nowSatellite[0]){
        nowSatelliteList[i] = nowSatellite
      }
    }
    setSatelliteList([...nowSatelliteList])
  }, [nowSatellite])
  return <>
    <List
      itemLayout="horizontal"
      dataSource={satelliteList}
      style={{
        height: 800,
        overflowY: "scroll"
      }}
      renderItem={item => (
        <List.Item style={{ 'height': "80px" }}>
          <List.Item.Meta
            avatar={<Avatar src="./images/statellite.png" />}
            title={item[0]}
            description={<StatelliteCard
              nowStatelliteName={item}
              setNowSatellite = {setNowSatellite}
            />}
          />
        </List.Item>
      )}
    />
  </>

};

export default SatelliteList;