import { Row } from "antd";
import React, { useEffect, useState } from "react";
import "./css/dashboard.css";
import DashBoardChart from "./dashboardComponents/dashboardChart";
import HourChart from "./dashboardComponents/hourChart";
import TextCard from "./dashboardComponents/textCard";
import {Dashboard} from "../../types/type"

const SatelliteDashboard: React.FC<Dashboard> = (props) => {
  const [init, setInit] = useState<boolean>(false);
  const [groundBusinessState, setGroundBusiniessState] = useState<any>(null);
  const [groundReliabilityState, setGroundReliabilityState] =
    useState<any>(null);
  const [groundStabilityState, setGroundStabilityState] = useState<any>(null);
  const [satelliteCoverageState, setSatelliteCoverage] = useState<any>(null);
  const [satelliteStabilityState, setSatelliteStability] = useState<any>(null);
  const [satelliteUseRateState, setSatelliteUseRate] = useState<any>(null);
  const { type, id } = props;

  useEffect(() => {
    setInit(true);
  }, []);

  useEffect(() => {
    if (init) {
      fetch("./data/groundData/groundBusiness.json")
        .then((res) => res.json())
        .then((data) => {
          setGroundBusiniessState(data);
        });
      fetch("./data/groundData/groundReliability.json")
        .then((res) => res.json())
        .then((data) => {
          setGroundReliabilityState(data);
        });
      fetch("./data/groundData/groundStability.json")
        .then((res) => res.json())
        .then((data) => {
          setGroundStabilityState(data);
        });
      fetch("./data/satelliteData/satelliteCoverage.json")
        .then((res) => res.json())
        .then((data) => {
          setSatelliteCoverage(data);
        });
      fetch("./data/satelliteData/satelliteStability.json")
        .then((res) => res.json())
        .then((data) => {
          setSatelliteStability(data);
        });
      fetch("./data/satelliteData/satelliteUseRate.json")
        .then((res) => res.json())
        .then((data) => {
          setSatelliteUseRate(data);
        });
    }
  }, [init]);

  function aaa() {}

  return (
    <div
      className="dashboard-container"
      style={{ width: "100%", height: "100%" }}
    >
      <header className="dashboard-title">
        <p>卫星态势分析</p>
        <button
          className="dashboard-button"
          onClick={() => {
            //@ts-ignore
            window.location = "http://localhost:3000";
          }}
        >
          返回监测平台
        </button>
      </header>
      <div className="charts-container">
        {type === "baseStation" && (
          <div className="ground-info">
            <div className="chart-list-up">
              <div className="subtitle">
                <p>地面节点运行效能</p>
              </div>
              <div className="chart-list">
                <HourChart
                  title={"平均在网时长"}
                  data={19.24}
                  width={"20%"}
                  height={"100%"}
                />
                <TextCard
                  title={"平均入网次数"}
                  width={"15%"}
                  height={"100%"}
                  content={"2.54 次"}
                />
                <TextCard
                  title={"平均退网次数"}
                  width={"15%"}
                  height={"100%"}
                  content={"1.82 次"}
                />
                {groundBusinessState === null ? (
                  <></>
                ) : (
                  <DashBoardChart
                    title={"groundBusiness"}
                    type={"Bar"}
                    width={"50%"}
                    height={"100%"}
                    xData={groundBusinessState["DateTime"]}
                    yData={[
                      groundBusinessState["Time percent"],
                      groundBusinessState["SendTeraBytes"],
                      groundBusinessState["RecTeraBytes"],
                    ]}
                    legend={["Time percent", "SendTeraBytes", "RecTeraBytes"]}
                  />
                )}
              </div>
            </div>
            <div className="chart-list-bottom">
              <div className="subtitle">
                <p>运行历史</p>
              </div>
              <div className="chart-list">
                {groundReliabilityState === null ? (
                  <></>
                ) : (
                  <>
                    <DashBoardChart
                      title={"可靠性"}
                      type={"Line"}
                      width={"24%"}
                      height={"100%"}
                      xData={groundStabilityState["DateTime"]}
                      yData={[groundReliabilityState["normal"]]}
                      legend={["normal"]}
                    />
                    <DashBoardChart
                      title={"可靠性"}
                      type={"Line"}
                      width={"24%"}
                      height={"100%"}
                      xData={groundStabilityState["DateTime"]}
                      yData={[groundReliabilityState["major fault"]]}
                      legend={["major fault"]}
                    />
                    <DashBoardChart
                      title={"可靠性"}
                      type={"Line"}
                      width={"24%"}
                      height={"100%"}
                      xData={groundStabilityState["DateTime"]}
                      yData={[groundReliabilityState["minor fault"]]}
                      legend={["minor fault"]}
                    />
                  </>
                )}
                {groundStabilityState === null ? (
                  <></>
                ) : (
                  <DashBoardChart
                    title={"稳定性"}
                    type={"Line"}
                    width={"24%"}
                    height={"100%"}
                    xData={groundStabilityState["DateTime"]}
                    yData={[groundStabilityState["AvgTime"]]}
                    legend={["AvgTime"]}
                  />
                )}
              </div>
            </div>
          </div>
        )}
        {type === "satellite" && (
          <div className="satellite-info">
            <div className="chart-list-up">
              <div className="subtitle">
                <p>卫星节点运行效能</p>
              </div>
              <div className="chart-list">
                <HourChart
                  title={"无故障工作时间"}
                  width={"20%"}
                  height={"100%"}
                  data={22.31}
                />
                <TextCard
                  title={"自我恢复能力"}
                  width={"15%"}
                  height={"100%"}
                  content={"92.54"}
                />
                {satelliteStabilityState === null ? (
                <></>
              ) : (
                <DashBoardChart
                  title={"稳定性"}
                  type={"Line"}
                  width={"65%"}
                  height={"100%"}
                  xData={satelliteStabilityState["DateTime"]}
                  yData={[
                    satelliteStabilityState["normal"],
                    satelliteStabilityState["major fault"],
                    satelliteStabilityState["minor fault"],
                  ]}
                  legend={["normal", "major fault", "minor fault"]}
                />
              )}
              </div>
            </div>
            <div className="chart-list-bottom">
            <div className="subtitle">
              <p>运行历史</p>
            </div>
            <div className="chart-list">
              {satelliteCoverageState === null ? (
                <></>
              ) : (
                <DashBoardChart
                  title={"恢复能力"}
                  type={"Bar"}
                  width={"40%"}
                  height={"100%"}
                  xData={satelliteCoverageState["DateTime"]}
                  yData={[
                    satelliteCoverageState["GlobalBeamCoverage"],
                    satelliteCoverageState["RegionalBeamCoverage"],
                    satelliteCoverageState["SpotBeamCoverage"],
                    satelliteCoverageState["RegionalBeamMobility"],
                    satelliteCoverageState["SpotBeamMobility"],
                  ]}
                  legend={[
                    "GlobalBeamCoverage",
                    "RegionalBeamCoverage",
                    "SpotBeamCoverage",
                    "RegionalBeamMobility",
                    "SpotBeamMobility",
                  ]}
                />
              )}
              
              {satelliteUseRateState === null ? (
                <></>
              ) : (
                <>
                <DashBoardChart
                  title={"使用率"}
                  type={"Bar"}
                  width={"30%"}
                  height={"100%"}
                  xData={satelliteUseRateState["DateTime"]}
                  yData={[
                    satelliteUseRateState["WorkTimePercent"],
                    satelliteUseRateState["SatelliteFrequencyUtilization"],
                    satelliteUseRateState["TransponderFrequencyUtilization"],
                    satelliteUseRateState["BeamFrequencyUtilization"]
                  ]}
                  legend={[
                    "WorkTimePercent",
                    "SatelliteFrequencyUtilization",
                    "TransponderFrequencyUtilization",
                    "BeamFrequencyUtilization"
                  ]}
                />
                <DashBoardChart
                  title={"使用率"}
                  type={"Bar"}
                  width={"30%"}
                  height={"100%"}
                  xData={satelliteUseRateState["DateTime"]}
                  yData={[
                    satelliteUseRateState["BandFrequencyUtilization"],
                    satelliteUseRateState["SatellitePowerUtilization"],
                    satelliteUseRateState["AmplifierPowerUtilization"],
                  ]}
                  legend={[
                    "BandFrequencyUtilization",
                    "SatellitePowerUtilization",
                    "AmplifierPowerUtilization",
                  ]}
                />
                </>
              )}
            </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SatelliteDashboard;
