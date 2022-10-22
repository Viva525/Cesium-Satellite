//@ts-nocheck
import { Col, Dropdown, Menu, Row, Space, Typography } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { type } from "os";
import React, { useEffect, useState } from "react";

import "./satelliteInfo.css";
import { SetState } from "../../types/type";

type SatelliteInfoProp = {
  sateName: string;
  launch?: string;
  status?: string;
  activity?: string;
  type: string;
  setWeather?: SetState<any>;
  weatherKey?: string;
};

const SatelliteInfo: React.FC<SatelliteInfoProp> = (props) => {
  var { sateName, launch, status, activity, type, setWeather, weatherKey } =
    props;
  const [bgImg, setBgImg] = useState<string>("");
  const [weatherKey1, setWeatherKey1] = useState<string>(weatherKey);

  useEffect(() => {
    if (sateName.includes("BEIDOU")) {
      setBgImg("BEIDOU.png");
    } else if (sateName.includes("GPS")) {
      setBgImg("GPS.png");
    } else if (sateName.includes("STARLINK")) {
      setBgImg("STARLINK.png");
    } else if (sateName.includes("Place/") && sateName !== "Place/undefined") {
      setBgImg("BASESTATION.jpg");
    }
  }, [sateName]);

  if (sateName === "") {
    return <div id="satellite-info"></div>;
  }

  const onWeatherClick = ({ key }: any) => {
    setWeatherKey1(key);
    if (key === "0") {
      setWeather({ type: "", strong: 0.3 });
    } else if (key === "1") {
      setWeather({ type: "rain", strong: 0.3 });
    } else if (key === "2") {
      setWeather({ type: "rain", strong: 0.8 });
    } else if (key === "3") {
      setWeather({ type: "snow", strong: 0.3 });
    } else if (key === "4") {
      setWeather({ type: "snow", strong: 0.8 });
    } else if (key === "5") {
      setWeather({ type: "fog", strong: 0.8 });
    }
  };

  const menu = (
    <Menu
      selectable
      defaultSelectedKeys={[{ weatherKey1 }]}
      onClick={onWeatherClick}
      items={[
        {
          key: "0",
          label: "晴",
          icon: <UserOutlined />,
        },
        {
          key: "1",
          label: "小雨",
          icon: <UserOutlined />,
        },
        {
          key: "2",
          label: "大雨",
          icon: <UserOutlined />,
        },
        {
          key: "3",
          label: "小雪",
          icon: <UserOutlined />,
        },
        {
          key: "4",
          label: "大雪",
          icon: <UserOutlined />,
        },
        {
          key: "5",
          label: "雾",
          icon: <UserOutlined />,
        },
      ]}
    />
  );

  return (
    <div id="satellite-info">
      <div
        id="sate-model"
        style={{ backgroundImage: `url(./images/${bgImg})` }}
      ></div>
      <div id="sate-info">
        <div id="up">
          <div className="name-item">
            {type === "satellite" ? "卫星名称" : "基站名称"}
          </div>
          <div className="name-weather">
            <div className="name-sate">
              {sateName === "Place/undefined" ? "——" : sateName}
            </div>
            {type !== "satellite" ? (
              <div className="weather-icon">
                <Dropdown overlay={menu}>
                  <div className="weather-wrap">
                    <div
                      className={
                        weatherKey1 === "-1"
                          ? `weather weather${weatherKey}`
                          : `weather weather${weatherKey1}`
                      }
                    />
                    <DownOutlined />
                  </div>
                </Dropdown>
              </div>
            ) : null}
          </div>
        </div>
        <div id="bottom">
          <div id="launch-time-container">
            <div className="item-value">
              {sateName === "Place/undefined" ? "——" : launch}
            </div>
            <img className="sate-info-img" src="./images/a.png" alt="" />
            <div className="item">
              {type === "satellite" ? "发射时间" : "建设时间"}
            </div>
          </div>
          <div id="status-container">
            <div className="item-value">
              {sateName === "Place/undefined" ? "——" : status}
            </div>
            <img className="sate-info-img" src="./images/b.png" alt="" />
            <div className="item">状态</div>
          </div>
          <div id="activity-container">
            <div className="item-value">
              {sateName === "Place/undefined" ? "——" : activity}
            </div>
            <img className="sate-info-img" src="./images/c.png" alt="" />
            <div className="item">活动</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SatelliteInfo;
