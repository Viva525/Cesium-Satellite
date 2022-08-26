import { Col, Row } from "antd";
import { type } from "os";
import React, { useEffect, useState } from "react";

import "./satelliteInfo.css";

type SatelliteInfoProp = {
  sateName: String;
  launch?: String;
  status?: String;
  activity?: String;
};

const SatelliteInfo: React.FC<SatelliteInfoProp> = (props) => {
  const { sateName, launch, status, activity } = props;
  const [bgImg, setBgImg] = useState<String>("");

  useEffect(() => {
    if (sateName.includes("BEIDOU")) {
      setBgImg("BEIDOU");
    } else if (sateName.includes("GPS")) {
      setBgImg("GPS");
    } else if (sateName.includes("STARLINK")) {
      setBgImg("STARLINK");
    }
  }, [sateName]);

  if (sateName === "") {
    return <div id="satellite-info"></div>;
  }
  return (
    <div id="satellite-info">
      <div
        id="sate-model"
        style={{ backgroundImage: `url(./images/${bgImg}.png)` }}
      ></div>
      <div id="sate-info">
        <div id="up">
          <div className="name-item">卫星名称</div>
          <div className="name-sate">{sateName}</div>
        </div>
        <div id="bottom">
          <div id="launch-time-container">
            <div className="item-value">{launch}</div>
            <img className="sate-info-img" src="./images/a.png" alt="" />
            <div className="item">发射时间</div>
          </div>
          <div id="status-container">
            <div className="item-value">{status}</div>
            <img className="sate-info-img" src="./images/b.png" alt="" />
            <div className="item">状态</div>
          </div>
          <div id="activity-container">
            <div className="item-value">{activity}</div>
            <img className="sate-info-img" src="./images/c.png" alt="" />
            <div className="item">活动</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SatelliteInfo;
