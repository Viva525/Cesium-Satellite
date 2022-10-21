import { Col, Row, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BaseStation, Dashboard, SetState } from "../../types/type";
import { CloseCircleOutlined, SyncOutlined } from "@ant-design/icons";

type BaseStationInfoProp = {
  baseStationList: BaseStation[];
  setBaseStation: SetState<BaseStation | null>;
  setDashboard: SetState<Dashboard | undefined>;
};

const BaseStationInfo: React.FC<BaseStationInfoProp> = (props) => {
  const { baseStationList, setBaseStation, setDashboard } = props;
  const [init, setInit] = useState<boolean>(false);
  const to = useNavigate();

  useEffect(() => {
    setInit(true);
  }, []);

  useEffect(() => {}, [init]);

  return (
    <div
      id="baseStationList"
      style={{ width: "100%", height: "15vh", overflowY: "scroll" }}
    >
      {baseStationList.map((baseStation: BaseStation, index) => {
        if (baseStation.name.includes("1")) {
          return;
        }
        return (
          <Row
            className="row-style"
            key={index}
            style={{
              cursor: "pointer",
            }}
          >
            <Col span={4}>
              <div className="baseStationIcon"></div>
            </Col>
            <Col
              span={16}
              style={{ paddingLeft: "5px" }}
              onClick={() => {
                setBaseStation(baseStation);
              }}
            >
              <Row style={{ width: "100%", height: "100%" }}>
                <Col span={16}>
                  <p className="baseStationText_title">基站名</p>
                  <p className="baseStationText_content" id={baseStation.name}>
                    {baseStation.name}
                  </p>
                </Col>
                <Col span={8}>
                  <p className="baseStationText_title">
                    基站状态
                    {/* <span
                  style={{
                    color: baseStation.state == "working" ? "green" : "rgba(210, 51, 90, 1)",
                  }}
                >
                  {baseStation.state}
                </span> */}
                  </p>
                  <div>
                    {baseStation.state == "working" ? (
                      <Tag icon={<SyncOutlined spin />} color="success">
                        Working
                      </Tag>
                    ) : (
                      <Tag icon={<CloseCircleOutlined spin />} color="error">
                        Stopped
                      </Tag>
                    )}
                  </div>
                </Col>
              </Row>
            </Col>
            <Col
              span={4}
              onClick={() => {
                // setDashboard({ type: "baseStation", id: baseStation.name });

                // 使用useNavigator解决;
                //@ts-ignore
                // to("/satelliteDashboard/", {
                //   state: { type: "baseStation", id: baseStation.name },
                // });

                // 打开新标签的方式
                window.open(
                  `/satelliteDashboard/baseStation/${baseStation.name}`,
                  "_blank"
                );
              }}
            >
              {/* 创建Link跳转 */}
              {/* <Link target="_blank" to="/satelliteDashboard/baseStation/age">
                信息
              </Link> */}
              <div className="dashboardIcon"></div>
            </Col>
          </Row>
        );
      })}
    </div>
  );
};

export default BaseStationInfo;
