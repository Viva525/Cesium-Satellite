import { StatelliteCardType } from "../../../types/type"
import ColorSelect from './color';
import './table.css'
import React, { useEffect, useState } from 'react';

const StatelliteCard: React.FC<StatelliteCardType> = (props) => {
  const { nowStatelliteName, setNowSatellite } = props
  const [satelliteColor, setSatelliteColor] = useState("")
  const [satelliteState, setSatelliteState] = useState<any[]>([])
  const stateList = ["2D", "3D", "mark", "locus", "point"]
  const buttonClick = function (e: any) {
    let targetId = e.target.id
    let nowStatelliteState = nowStatelliteName
    for (let i in stateList) {
      if (targetId.indexOf(stateList[i]) >= 0) {
        if (i == "0") {
          nowStatelliteState[1] = true
          nowStatelliteState[2] = false
        }
        else if (i == "1") {
          nowStatelliteState[1] = false
          nowStatelliteState[2] = true
        }
        else {
          nowStatelliteState[parseInt(i) + 1] = !nowStatelliteState[parseInt(i) + 1]
        }
      }
    }
    nowStatelliteState[8] = true
    setNowSatellite([...nowStatelliteState])
    setSatelliteState([...nowStatelliteState])
  }
  useEffect(() => {
    let nowStatelliteState = nowStatelliteName
    nowStatelliteState[7] = satelliteColor
    nowStatelliteState[8] = true

    setNowSatellite([...nowStatelliteState])
    setSatelliteState([...nowStatelliteState])
  }, [satelliteColor])

  useEffect(() => {
    if (satelliteState.length > 0) {
      for (let i in stateList) {
        let buttonId = document.getElementById(satelliteState[0] + stateList[i]);
        //@ts-ignore
        buttonId.style.color = satelliteState[parseInt(i) + 1] ? "rgb(255,255,255)" : "rgb(44, 79, 172)"
      }
    }
  }, [satelliteState])
  return (
    <>
      <div>
        <button type="button" id={nowStatelliteName[0] + stateList[0]} className="statelliteButton" onClick={e => buttonClick(e)}>2D</button>
        <button type="button" id={nowStatelliteName[0] + stateList[1]} className="statelliteButton" onClick={e => buttonClick(e)}>3D</button>
        <button type="button" id={nowStatelliteName[0] + stateList[2]} className="statelliteButton" onClick={e => buttonClick(e)}>标注</button>
        <button type="button" id={nowStatelliteName[0] + stateList[3]} className="statelliteButton" onClick={e => buttonClick(e)}>轨迹</button>
        <button type="button" id={nowStatelliteName[0] + stateList[4]} className="statelliteButton" onClick={e => buttonClick(e)}>
          星下点
        </button>
        <button type="button" value="statelliteType" className="statelliteButton" style={{ 'color': "rgb(255,255,255)" }}>
          {nowStatelliteName[6]}
        </button>
        <button type="button" value="轨迹" className="statelliteButton">
          <ColorSelect
            //@ts-ignore
            initColor={nowStatelliteName[7] == "" ? (nowStatelliteName[0].includes("BD") | nowStatelliteName[0].includes("BEIDOU") ? { r: "13", g: "126", b: "222", a: "1" } : nowStatelliteName[0].includes("GPS") ? { r: "210", g: '51', b: '90', a: "1" } : { r: '255', g: '255', b: '255', a: "1" }) : nowStatelliteName[7]}
            setSatelliteColor={setSatelliteColor}
            satellityKey={nowStatelliteName[0]}
          />
        </button>

      </div>
    </>
  );
}

export default StatelliteCard;