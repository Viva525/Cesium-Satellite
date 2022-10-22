//@ts-nocheck
import { Avatar, List, Checkbox } from 'antd';
import './table.css'
// import Item from 'antd/lib/list/Item';
import React, { useEffect, useState } from 'react';
import { StatelliteCardType } from "../../../types/type"
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import StatelliteCard from './card';


const SatelliteList: React.FC<StatelliteCardType> = (props) => {
  const { satelliteList, setSatelliteList } = props
  const [nowSatellite, setNowSatellite] = useState<any[]>([])
  const [value, setValue] = useState("all");
  const plainOptions = ["BEIDOU", "GPS", "STARLINK"]
  const onChange = (checkedValues: CheckboxValueType[]) => {
    console.log(checkedValues)
    setValue(checkedValues);
  };
  useEffect(() => {
    let nowSatelliteList = satelliteList
    for (let i in nowSatelliteList) {
      if (nowSatelliteList[i][0] == nowSatellite[0]) {
        nowSatelliteList[i] = nowSatellite
      }
    }
    setSatelliteList([...nowSatelliteList])
  }, [nowSatellite])
  return <>
    <Checkbox.Group options={plainOptions} defaultValue={plainOptions} onChange={onChange} style={{ "color": "rgb(44, 79, 172)" }} />
    <List
      itemLayout="horizontal"
      className='satelliteList'
      dataSource={satelliteList}
      style={{
        height: 800,
        overflowY: "scroll"
      }}
      renderItem={item => {
        for(let i of value){
          if (item[0].indexOf(i) >= 0) {
            return (
              <List.Item style={{ 'height': "80px" }}>
                <List.Item.Meta
                  avatar={<Avatar src="./images/statellite.png" />}
                  description={<StatelliteCard
                    nowStatelliteName={item}
                    setNowSatellite={setNowSatellite}
                  />}
                />
              </List.Item>
            )
          }
        }
        return 
        
      }
      }
    />
  </>

};

export default SatelliteList;