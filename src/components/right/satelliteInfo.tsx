import { Col, Row } from "antd";
import { type } from "os";
import React, { useEffect, useState } from "react";

import "./satelliteInfo.css";

type SatelliteInfoProp = {
  sateName: string;
  launch?: string;
  status?: string;
  activity?: string;
  type:string;
};

const SatelliteInfo: React.FC<SatelliteInfoProp> = (props) => {
  var { sateName, launch, status, activity, type } = props;
  const [bgImg, setBgImg] = useState<string>("");

  useEffect(() => {
    if (sateName.includes("BEIDOU")) {
      setBgImg("BEIDOU.png");
    } else if (sateName.includes("GPS")) {
      setBgImg("GPS.png");
    } else if (sateName.includes("STARLINK")) {
      setBgImg("STARLINK.png");
    }else if(sateName.includes("Place/") && sateName !== "Place/undefined"){
      setBgImg("BASESTATION.jpg")
    }
  }, [sateName]);

  if (sateName === "") {
    return <div id="satellite-info"></div>;
  }
  return (
    <div id="satellite-info">
      <div
        id="sate-model"
        style={{ backgroundImage: `url(./images/${bgImg})` }}
      ></div>
      <div id="sate-info">
        <div id="up">
          <div className="name-item">{type === "satellite"?"卫星名称": "基站名称"}</div>
          <div className="name-sate">{sateName === "Place/undefined"?'——': sateName}</div>
        </div>
        <div id="bottom">
          <div id="launch-time-container">
            <div className="item-value">{sateName === "Place/undefined"? '——':launch}</div>
            <img className="sate-info-img" src="./images/a.png" alt="" />
            <div className="item">{type === "satellite"?"发射时间": "建设时间"}</div>
          </div>
          <div id="status-container">
            <div className="item-value">{sateName === "Place/undefined"? '——':status}</div>
            <img className="sate-info-img" src="./images/b.png" alt="" />
            <div className="item">状态</div>
          </div>
          <div id="activity-container">
            <div className="item-value">{sateName === "Place/undefined"? '——':activity}</div>
            <img className="sate-info-img" src="./images/c.png" alt="" />
            <div className="item">活动</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SatelliteInfo;
