import { Row, Col } from "antd";
import React, { FC, useEffect, useState } from "react";
import "./css/resourceMain.css";
import RsEarth from "./rsEarth";
import RsChart3 from "./rsChart3";
import RsChart4 from "./rsChart4";
import RsChart1 from "./rsChart1";
import RsChart2 from "./rsChart2";
import RsChart5 from "./rsChart5";
import RsChart6 from "./rsChart6";

const ResourcePanel: React.FC<any> = () => {
  const [curTime, setCurTime] = useState<any>(null);

  useEffect(() => {
    let time = new Date();
    let timeStr = time.toLocaleDateString(); // 转化后的时间：2020/4/22 下午6:54:25
    setCurTime(timeStr);
  }, []);

  return (
    <div id="rs-container">
      <div className="rs-title">
        资源态势管理平台
        <div id="rs-time">{curTime}</div>
      </div>
      <div id="charts">
        <div className="rs-left">
          <div className="chart-container">
            <div className="chart-title">
              全球分布
              <hr className="rsHr" />
            </div>
            <RsEarth />
          </div>
        </div>
        <div className="rs-right">
          <Row style={{ width: "100%", height: "100%" }}>
            <Col span={12}>
              <Row>
                <Col span={24}>
                  <div className="chart-container">
                    <div className="chart-title">
                      卫星平均速度
                      <hr className="rsHr" />
                    </div>
                    <RsChart3 />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <div className="chart-container">
                    <div className="chart-title">
                      机器运行状态
                      <hr className="rsHr" />
                    </div>
                    <RsChart6 />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <div className="chart-container">
                    <div className="chart-title">
                      资源分布
                      <hr className="rsHr" />
                    </div>
                    <RsChart2 />
                  </div>
                </Col>
              </Row>
            </Col>
            <Col span={12}>
              <Row>
                <Col span={24}>
                  <div className="chart-container">
                    <div className="chart-title">
                      种类占比
                      <hr className="rsHr" />
                    </div>
                    <RsChart4 />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <div className="chart-container">
                    <div className="chart-title">
                      工作效能
                      <hr className="rsHr" />
                    </div>
                    <RsChart5 />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <div className="chart-container">
                    <div className="chart-title">
                      通信链路
                      <hr className="rsHr" />
                    </div>
                    <RsChart1 />
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default ResourcePanel;
