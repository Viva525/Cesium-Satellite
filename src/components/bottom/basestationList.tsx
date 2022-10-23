//@ts-nocheck
import { Col, Divider, Row, Tag, Progress } from "antd";
import React, { useEffect, useState } from "react";

import { CloseCircleOutlined, SyncOutlined } from "@ant-design/icons";
import { BaseStation, Dashboard, SetState } from "../../types/type";
import "./basestationList.css";

type BaseStationInfoProp = {
  baseStationList: BaseStation[];
  setBaseStation: SetState<BaseStation | null>;
};

const BasestationList: React.FC<BaseStationInfoProp> = (props) => {
  const { baseStationList, setBaseStation } = props;
  const [init, setInit] = useState<boolean>(false);
  const basestationColorList = [['#007acc', 50], ['#2bcf7b', 37], ['#5da8b6', 80], ['#ffca00', 65], ['#00ffff', 17]]

  useEffect(() => {
    setInit(true);
  }, []);

  return (
    <div id="base-list" style={{ width: "100%", height: "100%" }}>
      <div className="base-list-title">
        基站列表
        <hr className="baseHr" />
      </div>
      <Row
        key={0}
        justify="space-around"
        style={{ width: "100%", height: "70%" }}
      >
        {baseStationList === undefined ? (
          <>111</>
        ) : (
          baseStationList.map((ele: BaseStation, index) => {
            if (ele.name.includes("1")) {
              return;
            }
            return (
              <Col className="single-basestation" span={4}
              onClick={() => {
                setBaseStation(ele);
              }}>
                <div className="col-up">
                  <div className="basestation-title" id={ele.name}>·{ele.name}</div>
                  <div className="basestation-icon">
                    <Tag icon={<SyncOutlined spin />} color="success">
                      Working
                    </Tag>
                  </div>
                </div>
                <div className="col-bottom">
                    <Progress className="bar-container" percent={basestationColorList[index][1]} strokeColor={basestationColorList[index][0]} trailColor={'rgba(229, 229, 229, 0.1)'} size="small"/>
                </div>
              </Col>
            );
          })
        )}
      </Row>
    </div>
  );
};

export default BasestationList;
