// @ts-nocheck
import React, { useEffect, useState, useRef, useCallback } from "react";
import Jsonp from "jsonp";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { TableRowSelection } from "antd/es/table/interface";
//@ts-ignore
// import * as Cesium from 'cesium/Cesium';
import SatelliteList from "../left/satelliteList";
import "antd/dist/antd.css";
import "./css/cesium.css";
import { BaseStation, PolarEarthProps } from "../../types/type";
import BaseStationInfo from "./baseStationInfo";
import Box from "./box";
import HeightChart from "../right/heightChart";
import SatelliteBar from "../left/satelliteBar";
import SatelliteNumberChart from "../left/satelliteNumberChart";
import PolarEarth from "../right/palarEarth";
import SatelliteInfo from "../right/satelliteInfo";
import "./LineFlowMaterialProperty";
import "./Spriteline1MaterialProperty";
import { CesiumComponentType } from "../../types/type";
import { BlockPicker } from "react-color";

//@ts-ignore
let viewer: any;
let linkToBaseStation: any = {};
var handler: {
  setInputAction: (
    arg0: {
      (movement: { endPosition: any }): void;
      (movement: { position: any }): void;
      (): void;
    },
    arg1: any
  ) => void;
  destroy: () => void;
};

// let c = true;
let nowPicksatellite: any;
let rain: any, snow: any, fog: any;
let stages: any;
let previousTime: any;
let timeID: any;
let polarTimeId: any;
let clicked = false;
let timerOpen, timerClose;
const CesiumComponent: React.FC<CesiumComponentType> = (props) => {
  const { setDashboard } = props;
  const [init, setInit] = useState<boolean>(false);
  const [isDrawLine, setIsDrawLine] = useState<boolean>(false);
  const [isDrawPolygon, setIsDrawPolygon] = useState<boolean>(false);
  const [definitionChanged, setDefinitionChanged] = useState<any>(
    new Cesium.Event()
  );
  const [isRotate, setIsRotate] = useState<boolean>(false);
  const [colorSubscription, setColorSubscription] = useState<any>(undefined);
  const [duration, setDuration] = useState<any>(undefined);
  const [color1, setColor1] = useState<any>(undefined);
  const [color2, setColor2] = useState<any>(undefined);
  const [count, setCount] = useState<any>(undefined);
  const [gradient, setGradient] = useState<any>(undefined);
  const [time, setTime] = useState<any>(undefined);
  const [satellitePostionData, setSatellitePostionData] = useState<number[]>(
    []
  );
  const [nowSystemDate, setNowSystemDate] = useState<string[]>([]);
  const [isPostion, setIsPostion] = useState<boolean>(false);
  const [satelliteList, setSatelliteList] = useState<string[]>([]);
  const [selectSatelliteList, setSelectSatelliteList] = useState<any[]>([]);
  const [selectedSatelliteList, setSelectedSatelliteList] = useState<any[]>([]);
  const [start, setStart] = useState(
    Cesium.JulianDate.fromIso8601("2022-09-06T04:00:00Z")
  );
  const [stop, setStop] = useState(
    Cesium.JulianDate.fromIso8601("2022-09-07T04:00:00Z")
  );
  const [baseStationList, setBaseStationList] = useState<BaseStation[]>([]);
  const [curSatellite, setCurSatellite] = useState<String>("");
  const [curBaseStation, setCurBaseStation] = useState<BaseStation | null>(
    null
  );
  const curBaseStationRef = useRef(curBaseStation)
  const [polarPosition, setPolarPosition] = useState<PolarEarthProps>(null);
  const [satelliteStatus, setSatelliteStatus] = useState<string>("关");
  const buildList = [
    "build/BeiJing",
    "build/ChongQing",
    "build/Los",
    "build/Seattle",
    "build/ShangHai",
  ];

  useEffect(() => {
    setInit(true);
  }, []);

  useEffect(() => {
    if (viewer !== undefined) {
      if (isRotate) {
        viewer.clock.onTick.addEventListener(earthRotate);
      } else {
        viewer.clock.onTick.removeEventListener(earthRotate);
      }
    }
  }, [isRotate]);

  useEffect(() => {
    if (isDrawPolygon) {
      //@ts-ignore
      document.getElementById("measureArea").classList.add("btnSelected");
      //@ts-ignore
      document.getElementById("measureDistance").disabled = true;
      //@ts-ignore
      measureArea(viewer);
    } else {
      //@ts-ignore
      document.getElementById("measureArea").classList.remove("btnSelected");
      //@ts-ignore
      document.getElementById("measureDistance").disabled = false;
      if (handler) {
        handler.destroy();
      }
    }
  }, [isDrawPolygon]);

  useEffect(() => {
    if (isDrawLine) {
      //@ts-ignore
      document.getElementById("measureDistance").classList.add("btnSelected");
      //@ts-ignore
      document.getElementById("measureArea").disabled = true;
      //@ts-ignore
      measureDistance();
    } else {
      //@ts-ignore
      document
        .getElementById("measureDistance")
        .classList.remove("btnSelected");
      //@ts-ignore
      document.getElementById("measureArea").disabled = false;
      if (handler) {
        handler.destroy();
      }
    }
  }, [isDrawLine]);
  useEffect(() => {
    if (init) {
      Cesium.Ion.defaultAccessToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiYTg4MTUyNy0zMTA2LTRiMDktOGE1My05ZDA4OTRmOTE3YzciLCJpZCI6MTAzMjg1LCJpYXQiOjE2NTk0MDcyODB9.sfpT8e4oxun23JG--UmUN9ZD4SbQfU-Ljvh2MsPTTcY";
      viewer = new Cesium.Viewer("cesiumContainer", {
        shouldAnimate: true,
        infoBox: false, // 是否显示点击要素之后显示的信息
        // 去掉地球表面的大气效果黑圈问题
        orderIndependentTranslucency: true,
        // terrainProvider : Cesium.createWorldTerrain(),
        // terrainProvider: new Cesium.CesiumTerrainProvider({
        //   url: Cesium.IonResource.fromAssetId(1),
        // }),
        contextOptions: {
          webgl: {
            alpha: true,
          },
        },
        timeline: true,
        animation: true,
      });
      // const Melbourne_tileset = new Cesium.Cesium3DTileset({
      //   url: Cesium.IonResource.fromAssetId(69380),
      // });
      // const Washington_tileset = new Cesium.Cesium3DTileset({
      //   url: Cesium.IonResource.fromAssetId(57588),
      // });
      // const KangJuXinCheng_tileset = new Cesium.Cesium3DTileset({
      //   url: "./KangJuXinCheng-3dtiles/tileset.json"
      // })
      // viewer.scene.primitives.add(Melbourne_tileset);
      // viewer.scene.primitives.add(Washington_tileset);
      // viewer.scene.primitives.add(KangJuXinCheng_tileset);
      // // 添加高德影像图
      const imageryLayers = viewer.imageryLayers;
      //  // 显示帧率
      // viewer.scene.debugShowFramesPerSecond = true;

      // 添加地形数据
      // viewer.terrainProvider = Cesium.createWorldTerrain();

      // let imageryProvider = new Cesium.UrlTemplateImageryProvider({
      //   url: "https://webst02.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",
      //   layer: "tdtVecBasicLayer",
      //   style: "default",
      //   format: "image/png",
      //   tileMatrixSetID: "GoogleMapsCompatible",
      //   show: false,
      // });
      // imageryLayers.addImageryProvider(imageryProvider);

      stages = viewer.scene.postProcessStages;

      //  GetWGS84FromDKR(new Cesium.Cartesian3(-2180335.9039053465, 4388094.640359055, 4069400.047373593),1)

      //  place1
      // wgs84ToCartesign(
      //   116.42145182931263,
      //   39.8978797042195,
      //   0
      // )

      // place2
      // wgs84ToCartesign(
      //   144.92242809864345,
      //   -37.79837165450737,
      //   19
      // )

      // 开启光照 & 亮度设置: 两种方式
      viewer.scene.globe.enableLighting = false;
      viewer.shadows = false;

      let layer = imageryLayers.get(0);
      layer["brightness"] = 1;

      // 背景切换为图片
      // 去掉黑色星空背景
      viewer.scene.skyBox.show = false;
      // viewer.scene.sun.show = true
      // viewer.scene.moon.show = true
      viewer.scene.backgroundColor = new Cesium.Color(0.0, 0.0, 0.0, 0.0);

      // 尝试提高分辨率
      viewer._cesiumWidget._supportsImageRenderingPixelated =
        Cesium.FeatureDetection.supportsImageRenderingPixelated();
      viewer._cesiumWidget._forceResize = true;
      if (Cesium.FeatureDetection.supportsImageRenderingPixelated()) {
        var vtxf_dpr = window.devicePixelRatio;
        // 适度降低分辨率
        while (vtxf_dpr >= 2.0) {
          vtxf_dpr /= 2.0;
        }
        //alert(dpr);
        viewer.resolutionScale = vtxf_dpr;
      }
      // 生成轨迹线
      let defaultAction: (() => void) | undefined;
      let Sandcastle = {
        // bucket: bucket,
        declare: function () {},
        highlight: function () {},
        registered: [],
        finishedLoading: function () {
          Sandcastle.reset();
          if (defaultAction) {
            //@ts-ignore
            Sandcastle.highlight(defaultAction);
            defaultAction();
            defaultAction = undefined;
          }
          document.body.className = document.body.className.replace(
            /(?:\s|^)sandcastle-loading(?:\s|$)/,
            " "
          );
        },
        addToolbarButton: function (
          text: string | null,
          onclick: () => void,
          toolbarID: any
        ) {
          //@ts-ignore
          Sandcastle.declare(onclick);
          const button = document.createElement("button");
          button.type = "button";
          button.className = "cesium-button";
          button.onclick = function () {
            Sandcastle.reset();
            //@ts-ignore
            Sandcastle.highlight(onclick);
            onclick();
          };
          button.textContent = text;
          //@ts-ignore
          document.getElementById(toolbarID || "toolbar").appendChild(button);
        },
        addDefaultToolbarButton: function (
          text: string | null,
          onclick: (() => void) | undefined,
          toolbarID: any
        ) {
          //@ts-ignore
          Sandcastle.addToolbarButton(text, onclick, toolbarID);
          // debugger;
          defaultAction = onclick;
        },
        addDefaultToolbarMenu: function (
          options: { onselect: (() => void) | undefined }[],
          toolbarID: any
        ) {
          Sandcastle.addToolbarMenu(options, toolbarID);
          defaultAction = options[0].onselect;
        },
        addToolbarMenu: function (options: string | any[], toolbarID: any) {
          const menu = document.createElement("select");
          menu.className = "cesium-button";
          menu.onchange = function () {
            Sandcastle.reset();
            const item = options[menu.selectedIndex];
            if (item && typeof item.onselect === "function") {
              item.onselect();
            }
          };
          //@ts-ignore
          document.getElementById(toolbarID || "toolbar").appendChild(menu);
          if (!defaultAction && typeof options[0].onselect === "function") {
            defaultAction = options[0].onselect;
          }
          for (let i = 0, len = options.length; i < len; ++i) {
            const option = document.createElement("option");
            option.textContent = options[i].text;
            option.value = options[i].value;
            menu.appendChild(option);
          }
        },
        reset: function () {},
      };
      //@ts-ignore
      Sandcastle.addDefaultToolbarButton("Satellites", function () {
        if (clicked) return;
        clicked = true;
        // 读取轨迹数据
        let dronePromise = Cesium.CzmlDataSource.load(
          "./data/star-beidou-gps.czml"
        );
        let nowSatelliteList: string[] = [];
        let baseStationTemp: BaseStation[] = [];
        // 加载实体
        dronePromise.then((dataSource: any) => {
          viewer.dataSources.add(dronePromise);
          // 通过ID选择需要轨迹的实体
          dataSource.entities._entities._array.forEach((ele: any) => {
            viewer.entities.add(ele);
            let entityColor, entityImage, imageColor;
            // 实体之间的连线
            if (ele.path === undefined && ele.polyline !== undefined) {
              let curColor = ele.polyline.material.color,
                image;
              let randomNumber = Math.floor(Math.random() * 10);
              if (6 < randomNumber && randomNumber <= 9) {
                image = "bar-line-red.png";
              } else if (3 < randomNumber && randomNumber <= 6) {
                image = "bar-line-blue.png";
              } else {
                image = "bar-line-red.png";
              }

              // ele.polyline.material =  new Cesium.Spriteline1MaterialProperty(1000, `./images/${image}`)
              // ele.polyline.width = 1

              // ele.polyline.material = new Cesium.PolylineDashMaterialProperty({
              //   color: curColor,
              //   dashLength: 8.0,
              // });

              ele.polyline.material = new Cesium.LineFlowMaterialProperty({
                color: curColor,
                speed: 50,
                percent: 0.5,
                gradient: 0.1,
              });
            }
            // 1. 配置样式与路径
            if (ele.label != undefined) {
              ele.label.show = false;
            }

            if (ele.path != undefined) {
              nowSatelliteList.push(ele.id);
              ele.path.show = false; // 设置路径不可看
              // 设置路径样式
              let re_starlink = /Satellite\/STARLINK*/;
              let re_beidou = /Satellite\/(BEIDOU*)|(BD*)/;
              let re_gps = /Satellite\/GPS*/;
              if (re_starlink.exec(ele.id) != null) {
                // 星链轨迹
                entityColor = new Cesium.Color(1, 1, 1, 1);
                // imageColor = new Cesium.Color(0,1,1,1);
                entityImage =
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAUNJREFUOE+lkzFLA0EQhd8bmyQi2ggprS3USycE7CwEwUJEiwtXCjamtQqIsRXtrC6dICj+ARHsNWdjqdgYSCnksLgd2eiFeJeEg9tuh33fzLyZJXIe5tQjMyBsu1Wl3CFio1TxL+LEmQC/Yj7+iTqIpF6q+Ff2ngKEQe1VoUWhNAtLrcvvoLYdAdeDVhVdquwUHf9hJKAXuJ8AyxQ0VHUFhvcgzuPsNLIXi1OAXuAdkmZRlXNGsS7UWSi6AI5JbcJMbQ6LR1Zgg70X9xbKraEJdWhktej478mppT1ou1X7SMEbEPMaG2WkXnL8s4mA2G0CX1DdUNKaV+4DDU+nndbRWEBiVCDxgUjWSLMPykxh2T8YtXT9FsJnb0HFvCV6/uf2uI0deBAGtRMFbInWsEzi9BifvF0bjLcsyz/JtMqTQLkBP6zMdxEeVOCBAAAAAElFTkSuQmCC";
                // 流光材质
                ele.path.material = new Cesium.LineFlowMaterialProperty({
                  color: entityColor,
                  speed: 10,
                  percent: 0.1,
                  gradient: 0.1,
                });
              } else if (re_beidou.exec(ele.id) != null) {
                // 北斗轨迹
                entityColor = new Cesium.Color(
                  13 / 255,
                  126 / 255,
                  222 / 255,
                  1
                );
                imageColor = new Cesium.Color(0, 1, 1, 1);
                entityImage =
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAWBJREFUOE+Nk01SAjEQhd/LeAB/DmCoUqo8hcNJkCV6CPQQylI4CXAKqmRhPIAUe4e01QkZZoI/ZDM/SX/z+vUbYrcunt/uxPDSo5puhjcuvf/vSj1wPl6N9EovH57sC6vBsRDmxSQdIO5YJTsArRYBtPR+oWqEGK3vux29Px0v7W+KGi3Qesi08GLFmFst1GcKRgRKT/Q2w+t57kkANH1QFSJitSioIicQPAYgq06upAY0Idq/kZN3AeYRtFvkZD28GjRVtABp4+xlNatraoA4z23vTwXRsFVpRF4FdPnX1ROgck3IgYIIQK0gKokTAtULNfvrKUEYCsB+OuiBhSoIBcE49HRfx6tJDThBmcJGnbGRYpYKQoiyXtWTFLC9gVFJaOEAkrmd0ho/ou00MOm2DRGXUtjOSUxqakXH3TJxDwFygILSHxtTioUm84cpLG3hi/LzoTvJY5sgW0OXYv0NlavRUORHSncAAAAASUVORK5CYII=";
                ele.path.material = new Cesium.LineFlowMaterialProperty({
                  color: entityColor,
                  speed: 1,
                  percent: 0.1,
                  gradient: 0.1,
                });
              } else if (re_gps.exec(ele.id) != null) {
                // gps轨迹
                entityColor = new Cesium.Color(
                  210 / 255,
                  51 / 255,
                  90 / 255,
                  1
                );
                imageColor = new Cesium.Color(210 / 255, 51 / 255, 90 / 255, 1);
                entityImage =
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAATVJREFUOE+lU1FOg0AQfbPLMfzgAiXa+i/ESygxAU5SOYixTQx6i2L8tdXQA8hBZNfMwiICxRr3Z5OZee/N7Jsl/PPQGP7t9MqVUiyrSqVn70/llMaAoAF/NKCyqlQwRTIgKBYhg92O6srbZsl+Hi45NttlabejAQEXasJtW6SRgHQEkG9iGom3y1Y2P/oGDUkMIAfA9/c5hsBWF4vrTatcy+fe9jGYHMEm9+c3vtZq01cH4aLrzrgLQviVUrmU4gXACSsDxHbacVp3fhD0VE2R4zju7PUhP+SOISjmYWwUhfC5RatEJAIGc03PnZJIJJwzBMZjIZ61VpH61HdS0iVb2SXokMQWzLGaoH6we2ik3AGRWJuladSPWuXWe42Ux/ntD4wuUtNJRBplf2UPdTG6iX/54V8KW6IRUj57xgAAAABJRU5ErkJggg==";
                ele.path.material = new Cesium.LineFlowMaterialProperty({
                  color: entityColor,
                  speed: 1,
                  percent: 0.1,
                  gradient: 0.1,
                });
              }
              ele.billboard.color = imageColor;
              ele.billboard.image = entityImage;
              // 改成点
              // ele.billboard = undefined;
              // ele.point = {
              //   show: true,
              //   color: entityColor,
              //   // outlineWidth: 4,
              //   pixelSize: 5,
              // };

              // 绘制雷达扫描
              let lineFlowPosition = [];
              let radarId = "radarScan_" + ele.id;
              let postionValues = [...ele.position._property._values];
              let cartographic = Cesium.Cartographic.fromCartesian(
                new Cesium.Cartesian3(
                  postionValues[0],
                  postionValues[1],
                  postionValues[2]
                )
              );

              let height = Math.abs(cartographic.height);
              let earthRadius = 6371393;
              // 卫星底部据地球中心的距离
              let earthHeight =
                (earthRadius * earthRadius) / (height + earthRadius);
              earthHeight = earthHeight + ((earthRadius - earthHeight) * 8) / 9;
              // 卫星底部的辐射半径
              let bottomRadius =
                Math.sqrt(
                  earthRadius * earthRadius - earthHeight * earthHeight
                ) / 20;
              // 卫星辐射的长度
              let satelliteLenght = Math.abs(
                height + earthRadius - earthHeight
              );
              var property = new Cesium.SampledPositionProperty();
              var lineProperty = new Cesium.SampledPositionProperty();
              for (var i = 0; i < postionValues.length / 3; i++) {
                let time = Cesium.JulianDate.clone(
                  ele.position._property._times[i]
                );
                let radarHeight =
                  earthHeight + satelliteLenght / 2 - earthRadius;
                let flowHeight = height;

                // @ts-ignore
                let [lng, lat] = GetWGS84FromDKR(
                  new Cesium.Cartesian3(
                    postionValues[i * 3],
                    postionValues[i * 3 + 1],
                    postionValues[i * 3 + 2]
                  ),
                  1
                );

                lineFlowPosition.push(
                  new Cesium.Cartesian3(
                    postionValues[i * 3],
                    postionValues[i * 3 + 1],
                    postionValues[i * 3 + 2]
                  )
                );

                let radarPosition = Cesium.Cartesian3.fromDegrees(
                  eval(lng),
                  eval(lat),
                  radarHeight
                );
                // 添加位置，和时间对应
                property.addSample(time, radarPosition);
                property._property._interpolationAlgorithm.type =
                  ele.position._property._interpolationAlgorithm.type;
                property._property._interpolationDegree =
                  ele.position._property._interpolationDegree;
                property._referenceFrame = Cesium.ReferenceFrame.INERTIAL;

                let flowPosition = Cesium.Cartesian3.fromDegrees(
                  eval(lng),
                  eval(lat),
                  flowHeight
                );
                lineProperty.addSample(time, flowPosition);
                lineProperty._property._interpolationAlgorithm.type =
                  ele.position._property._interpolationAlgorithm.type;
                lineProperty._property._interpolationDegree =
                  ele.position._property._interpolationDegree;
                lineProperty._referenceFrame = Cesium.ReferenceFrame.INERTIAL;
              }

              radarScanner(
                property,
                satelliteLenght,
                radarId,
                bottomRadius,
                entityColor
              );

              if (ele.model == undefined) {
                // 将点换成模型 0
                ele.model = {
                  // 引入模型
                  uri: "./satellite-model/wx.gltf",
                  // 配置模型大小的最小值
                  minimumPixelSize: 50,
                  //配置模型大小的最大值
                  maximumScale: 50,
                  //配置模型轮廓的颜色
                  silhouetteColor: Cesium.Color.WHITE,
                  //配置轮廓的大小
                  silhouetteSize: 0,
                  articulations: {
                    "satellite_back yTranslate": 0,
                  },
                };
                //设置方向,根据实体的位置来配置方向
                ele.orientation = new Cesium.VelocityOrientationProperty(
                  ele.position
                );
                //设置模型初始的位置
                ele.viewFrom = new Cesium.Cartesian3(0, -30, 30);
                //设置查看器，让模型动起来
                viewer.clock.shouldAnimate = true;
              }
            }

            // 地面基站
            let re_Place = /^Place\/(?:(?!-to-).)*$/;
            if (re_Place.exec(ele.id) != null) {
              let position = GetWGS84FromDKR(ele._position._value, 1).map(
                (item) => Number(item)
              );
              baseStationTemp.push({
                name: `${ele.name}`,
                desc: "baseStation",
                pos: position,
                state: "working",
              });
              ele.model = undefined;
              ele.billboard = {
                eyeOffset: new Cesium.Cartesian3(0, 0, 0),
                horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                // image:"./logo512.png",
                image:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAhhJREFUOE+lkj9oU1EUxr/zooPomvcSp3TQRYQMvpuOVm2x1IJ2EFxUcFAQ7LspiiCSZFEKbV6wgyKCRTdFFC12TF3U3DQVF106BEXSNC5CRdDmHsn7E14l0cGz3Mu55/zuvd93CP8Z1OlvuuIRgDGAWgz+SsBnBr3SpFe2bd+5Yl5c2uh3jwdYd+0ygw72KaprcCEpq/O9zj3An7E2JwawicMEHAJwqnNOoPk2qJCUb+vR+p6AaEFzJjOMmL4M0DCA9z/QHk3JWiOsCTXIEdF+rfHFIF4lg17HJyu1LaBSZgbMU0R4+WlH+/iB87Vf/ssArLlCEWBHGxioGdDXTbm8GOZDrZhxLZFVN7qA1qzYu2no3X4iliZgBOBRr5FwxnLUg862VRLHNOMFAR9b3zbS+/IffvbVoDEr8oaBnA+hhOVUmr5j4jkD42BMWFn19K8iNoviAgi3ATy0pDrtzUyQ0xqF5JTKdwENdzBF4JGErNzdKp5YBOOoQRiPO2ph3bXTDHoH4LEl1UkP0HDtswboftcaju0xs29Wgym9AmCaiCdNp3oryDED1YRUIrAx8wTgiYi3l0yp5jyHiuIcEe4RuGTKqgwBAOqWVAO+jUX7KhHdDAEaeigpl5c85V0xpoEFAM8sqU5EAN8tqXYFXxhMxcA5Bh8xCMW4o9wQ1tHGgC6DMW1l1R3fCbvcWU1ZHfrnKEcF7bX/Dd650RGhtRBUAAAAAElFTkSuQmCC",
                pixelOffset: new Cesium.Cartesian2(0, 0),
                scale: 1,
                show: true,
                verticalOrigin: Cesium.VerticalOrigin.CENTER,
              };
              let radius = 1.5;
              addHexagonAll(
                position[1],
                position[0],
                radius,
                `Hexagon/${ele.name}/`,
                1
              );
              setBaseStationList(baseStationTemp);
            }

            let re_linkToBaseStation = /^Place\/.*-to-.*$/;
            let re_linkToBaseStation2 = /^Satellite\/.*-to-Place.*$/;
            if (re_linkToBaseStation.exec(ele.id) != null) {
              let curBase = ele.id.split("-to-")[0]; // 当前基站
              if (!linkToBaseStation.hasOwnProperty(curBase)) {
                linkToBaseStation[curBase] = {};
                linkToBaseStation[curBase]["linkTimes"] = [];
              }
              ele._availability._intervals.forEach((item) => {
                let time = [
                  Cesium.JulianDate.fromIso8601(item.start.toString()),
                  Cesium.JulianDate.fromIso8601(item.stop.toString()),
                  ele.id.split("-to-")[1],
                ];
                linkToBaseStation[curBase]["linkTimes"].push(time);
              });
            }
            if (re_linkToBaseStation2.exec(ele.id) != null) {
              let curBase = ele.id.split("-to-")[1]; // 当前基站
              if (!linkToBaseStation.hasOwnProperty(curBase)) {
                linkToBaseStation[curBase] = {};
                linkToBaseStation[curBase]["linkTimes"] = [];
              }
              ele._availability._intervals.forEach((item) => {
                let time = [
                  Cesium.JulianDate.fromIso8601(item.start.toString()),
                  Cesium.JulianDate.fromIso8601(item.stop.toString()),
                  ele.id.split("-to-")[0],
                ];
                linkToBaseStation[curBase]["linkTimes"].push(time);
              });
            }
          });
          setSatelliteList((ele) => [...ele, ...nowSatelliteList]);
        });
      });

      viewer.homeButton.viewModel.duration = 0;
      viewer.homeButton.viewModel.command.afterExecute.addEventListener(
        function (e) {
          setCurBaseStation(null);
          setIsRotate(true);
          snow && viewer.scene.postProcessStages.remove(snow); // 移除
          rain && viewer.scene.postProcessStages.remove(rain); // 移除
          fog && viewer.scene.postProcessStages.remove(fog); // 移除
        }
      );

      // 鼠标事件
      var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
      handler.setInputAction(function (click: { position: any }) {
        let cartesian3 = viewer.scene.camera.pickEllipsoid(
          click.position,
          viewer.scene.globe.ellipsoid
        );
        // 防止点击到地球之外报错，加个判断
        if (cartesian3 && Cesium.defined(cartesian3)) {
          let cartographic = Cesium.Cartographic.fromCartesian(cartesian3!);
          let lng = Cesium.Math.toDegrees(cartographic.longitude);
          let lat = Cesium.Math.toDegrees(cartographic.latitude);
          let height = cartographic.height;
          console.log(Cesium.Cartesian3.fromDegrees(lng, lat, 0));
          // wgs84ToCartesign(lng, lat, height)
        }

        var pick = viewer.scene.pick(click.position);
        if (pick && pick.id) {
          if (pick.id._path != undefined) {
            pick.id._path.show = true;
            // setIsPostion(true);
            let curradarScanner = viewer.entities.getById(
              "radarScan_" + pick.id._id
            );
            curradarScanner.show = true;
            if (nowPicksatellite) {
              if (pick.id._id !== nowPicksatellite[0]) {
                nowPicksatellite = [pick.id._id, true, false];
              } else {
                nowPicksatellite = [pick.id._id, true, true];
              }
            } else {
              nowPicksatellite = [pick.id._id, true, true];
            }
            setCurSatellite(pick.id._id.split("/")[1]);
            // if (pick.id.model == undefined) {
            //   // 将点换成模型
            //   pick.id.model = {
            //     // 引入模型
            //     uri: "./satellite-model/wx.gltf",
            //     // 配置模型大小的最小值
            //     minimumPixelSize: 50,
            //     //配置模型大小的最大值
            //     maximumScale: 50,
            //     //配置模型轮廓的颜色
            //     silhouetteColor: Cesium.Color.WHITE,
            //     //配置轮廓的大小
            //     silhouetteSize: 0,
            //     articulations: {
            //       "satellite_back yTranslate": 0,
            //     }
            //   };
            //   //设置方向,根据实体的位置来配置方向
            //   pick.id.orientation = new Cesium.VelocityOrientationProperty(
            //   pick.id.position
            //   );
            //   //设置模型初始的位置
            //   pick.id.viewFrom = new Cesium.Cartesian3(0, -30, 30);
            //   //设置查看器，让模型动起来
            //   viewer.clock.shouldAnimate = true;
            // } else {
            //   pick.id.model.show = true;
            // }
          }
        }
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
      handler.setInputAction(function (click: { position: any }) {
        var pick = viewer.scene.pick(click.position);
        if (pick && pick.id) {
          // 点击的是卫星
          if (pick.id._path != undefined) {
            pick.id._path.show = false;
            nowPicksatellite = [pick.id._id, false, false];
            // setIsPostion(false);
            setNowSystemDate([]);
            setSatellitePostionData([]);
            // viewer.clock.onTick.removeEventListener(nowSatellitePostion, false);
            // 删除雷达扫描实体
            // viewer.entities.removeById('radarScan_' + pick.id._id)
            let curradarScanner = viewer.entities.getById(
              "radarScan_" + pick.id._id
            );
            curradarScanner.show = false;
          }
        }
      }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);

      //监控相机高度
      var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
      handler.setInputAction(function () {
        let height = viewer.camera.positionCartographic.height;
        // 当高度小于一定值的时候消除天气、基站模型的显示
        if (height > 1000) {
          snow && viewer.scene.postProcessStages.remove(snow); // 移除
          rain && viewer.scene.postProcessStages.remove(rain); // 移除
          fog && viewer.scene.postProcessStages.remove(fog); // 移除
        }
        if (
          curBaseStationRef.current !== null &&
          viewer.entities.getById(`build/${curBaseStationRef.current.name}`) !== undefined
        ) {
          let baseStationEntity = viewer.entities.getById(`Place/${curBaseStationRef.current.name}`);
          if (height > 1000) {
            baseStationEntity.model.show = false;
            baseStationEntity.billboard.show = true;
          } else {
            baseStationEntity.model.show = true;
            baseStationEntity.billboard.show = false;
          }
        }
        // 控制地球旋转
        if (
          height > 20000000 &&
          viewer.scene.mode == Cesium.SceneMode.SCENE3D
        ) {
          setIsRotate(true);
          clearInterval(timeID);
        } else {
          setIsRotate(false);
        }
      }, Cesium.ScreenSpaceEventType.WHEEL);

      // 地球旋转
      viewer.clock.multiplier = 100; //速度
      viewer.clock.shouldAnimate = true;
      previousTime = viewer.clock.currentTime.secondsOfDay;
      setIsRotate(true);

      // 监听2d切换事件
      viewer.sceneModePicker.viewModel.morphTo2D.afterExecute.addEventListener(
        () => {
          snow && viewer.scene.postProcessStages.remove(snow); // 移除
          rain && viewer.scene.postProcessStages.remove(rain); // 移除
          fog && viewer.scene.postProcessStages.remove(fog); // 移除
          setIsRotate(false);
          let layer = viewer.imageryLayers.get(0);
          layer["brightness"] = 1.5;
        }
      );

      viewer.sceneModePicker.viewModel.morphTo3D.afterExecute.addEventListener(
        () => {
          setTimeout(() => {
            setIsRotate(true);
            let layer = viewer.imageryLayers.get(0);
            layer["brightness"] = 1;
          }, 2000);
        }
      );
      // 抛物飞线效果
    }
  }, [init]);

  useEffect(() => {
    if (init) {
      viewer.homeButton.viewModel.command.beforeExecute.addEventListener(
        function (e: any) {
          if (curSatellite != "") {
            let curSatelliteEntity = viewer.entities.getById(
              `Satellite/${curSatellite}`
            );
            if (curSatelliteEntity.model != undefined) {
              curSatelliteEntity.model.show = false;
            }
          }
        }
      );
    }
  }, [curSatellite]);

  const earthRotate = useCallback(() => {
    var spinRate = 1;
    var currentTime = viewer.clock.currentTime.secondsOfDay;
    var delta = (currentTime - previousTime) / 1000;
    previousTime = currentTime;
    viewer.scene.camera.rotate(Cesium.Cartesian3.UNIT_Z, -spinRate * delta);
  }, []);

  // 笛卡尔坐标系转经纬度
  const GetWGS84FromDKR = (coor: any, type: number) => {
    let cartographic = Cesium.Cartographic.fromCartesian(coor);
    let x = Cesium.Math.toDegrees(cartographic.longitude);
    let y = Cesium.Math.toDegrees(cartographic.latitude);
    // console.log(x, y);

    if (type === 0) return `(经度 :${x.toFixed(2)}, 纬度 : ${y.toFixed(2)})`;
    else if (type === 1) return [x as number, y as number];
  };

  // 经纬度转笛卡尔坐标
  const wgs84ToCartesign = (lng: any, lat: any, alt: any) => {
    var ellipsoid = viewer.scene.globe.ellipsoid;
    var cartographic = Cesium.Cartographic.fromDegrees(lng, lat, alt);
    var cartesian3 = ellipsoid.cartographicToCartesian(cartographic);
    console.log([cartesian3.x, cartesian3.y, cartesian3.z]);

    return cartesian3;
  };

  // 绘制线条测量距离
  const measureDistance = () => {
    if (!isDrawLine) return;
    viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(
      Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK
    );
    handler = new Cesium.ScreenSpaceEventHandler(
      viewer.scene._imageryLayerCollection
    );
    var positions: any[] = [];
    var poly: any = null;
    var distance: string | null = "0";
    var cartesian = null;
    var floatingPoint;
    //@ts-ignore
    handler.setInputAction(function (movement: { endPosition: any }) {
      let ray = viewer.camera.getPickRay(movement.endPosition);
      cartesian = viewer.scene.globe.pick(ray, viewer.scene);
      if (positions.length >= 2) {
        if (!Cesium.defined(poly)) {
          //@ts-ignore
          poly = new PolyLinePrimitive(positions);
        } else {
          positions.pop();
          positions.push(cartesian);
        }
        let curPositions = positions.slice(0);
        distance = getSpaceDistance(curPositions);
      }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
    //@ts-ignore
    handler.setInputAction(function (movement: { position: any }) {
      let ray = viewer.camera.getPickRay(movement.position);
      cartesian = viewer.scene.globe.pick(ray, viewer.scene);
      if (positions.length == 0) {
        positions.push(cartesian.clone());
      }
      positions.push(cartesian);
      let curPositions = positions.slice(0);
      var textDisance = distance + " km";
      floatingPoint = viewer.entities.add({
        name: `${GetWGS84FromDKR(curPositions[curPositions.length - 1], 0)}`,
        position: curPositions[curPositions.length - 1],
        point: {
          pixelSize: 5,
          color: Cesium.Color.RED,
          outlineColor: Cesium.Color.WHITE,
          outlineWidth: 2,
        },
        label: {
          text: textDisance,
          font: "18px sans-serif",
          fillColor: Cesium.Color.GOLD,
          style: Cesium.LabelStyle.FILL_AND_OUTLINE,
          outlineWidth: 2,
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
          pixelOffset: new Cesium.Cartesian2(20, -20),
        },
      });
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    handler.setInputAction(function () {
      // handler.destroy(); // 关闭事件句柄
      positions.pop(); // 最后一个点无效
      positions = [];
      poly = null;
      distance = "0";
      cartesian = null;
    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
    var PolyLinePrimitive = (function () {
      function _(this: any, positions: any) {
        this.options = {
          name: "直线",
          polyline: {
            show: true,
            positions: [],
            material: Cesium.Color.CHARTREUSE,
            width: 10,
            clampToGround: true,
          },
        };
        this.positions = positions;
        this._init();
      }
      _.prototype._init = function () {
        var _self = this;
        var _update = function () {
          return _self.positions;
        };
        //实时更新polyline.positions
        this.options.polyline.positions = new Cesium.CallbackProperty(
          _update,
          false
        );
        viewer.entities.add(this.options);
      };
      return _;
    })();
    //空间两点距离计算函数
    function getSpaceDistance(positions: string | any[]) {
      var distance = 0;
      for (var i = 0; i < positions.length - 1; i++) {
        var point1cartographic = Cesium.Cartographic.fromCartesian(
          positions[i]
        );
        var point2cartographic = Cesium.Cartographic.fromCartesian(
          positions[i + 1]
        );
        /**根据经纬度计算出距离**/
        var geodesic = new Cesium.EllipsoidGeodesic();
        geodesic.setEndPoints(point1cartographic, point2cartographic);
        var s = geodesic.surfaceDistance;
        //返回两点之间的距离
        s = Math.sqrt(
          Math.pow(s, 2) +
            Math.pow(point2cartographic.height - point1cartographic.height, 2)
        );
        distance = distance + s;
      }
      return (distance / 1000).toFixed(2);
    }
  };

  const measureArea = () => {
    if (!isDrawPolygon) return;
    // 鼠标事件
    handler = new Cesium.ScreenSpaceEventHandler(
      viewer.scene._imageryLayerCollection
    );
    var positions: any[] = [];
    var tempPoints: string | any[] = [];
    var polygon = null;
    var cartesian = null;
    var floatingPoint; //浮动点
    //@ts-ignore
    handler.setInputAction(function (movement: { endPosition: any }) {
      let ray = viewer.camera.getPickRay(movement.endPosition);
      cartesian = viewer.scene.globe.pick(ray, viewer.scene);
      positions.pop(); //移除最后一个
      positions.push(cartesian);
      let curPositions = positions.slice(0);
      if (positions.length >= 2) {
        var dynamicPositions = new Cesium.CallbackProperty(function () {
          return new Cesium.PolygonHierarchy(curPositions);
          return positions;
        }, false);
        polygon = PolygonPrimitive(dynamicPositions);
      }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
    //@ts-ignore
    handler.setInputAction(function (movement: { position: any }) {
      let ray = viewer.camera.getPickRay(movement.position);
      cartesian = viewer.scene.globe.pick(ray, viewer.scene);
      if (positions.length == 0) {
        positions.push(cartesian.clone());
      }
      positions.push(cartesian);
      let curPositions = positions.slice(0);
      //在三维场景中添加点
      var cartographic = Cesium.Cartographic.fromCartesian(
        curPositions[curPositions.length - 1]
      );
      var longitudeString = Cesium.Math.toDegrees(cartographic.longitude);
      var latitudeString = Cesium.Math.toDegrees(cartographic.latitude);
      var heightString = cartographic.height;
      var labelText =
        "(" +
        longitudeString.toFixed(2) +
        "," +
        latitudeString.toFixed(2) +
        ")";
      // @ts-ignore
      tempPoints.push({
        lon: longitudeString,
        lat: latitudeString,
        hei: heightString,
      });
      floatingPoint = viewer.entities.add({
        name: "多边形面积",
        position: curPositions[curPositions.length - 1],
        point: {
          pixelSize: 5,
          color: Cesium.Color.RED,
          outlineColor: Cesium.Color.WHITE,
          outlineWidth: 2,
          heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
        },
        label: {
          text: labelText,
          font: "18px sans-serif",
          fillColor: Cesium.Color.GOLD,
          style: Cesium.LabelStyle.FILL_AND_OUTLINE,
          outlineWidth: 2,
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
          pixelOffset: new Cesium.Cartesian2(20, -20),
        },
      });
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    handler.setInputAction(function () {
      // handler.destroy();
      positions.pop();
      let curPositions = positions.slice(0);
      var textArea = getArea(tempPoints) + "平方公里";
      viewer.entities.add({
        name: "多边形面积",
        position: curPositions[curPositions.length - 1],
        label: {
          text: textArea,
          font: "18px sans-serif",
          fillColor: Cesium.Color.RED,
          style: Cesium.LabelStyle.FILL_AND_OUTLINE,
          outlineWidth: 2,
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
          pixelOffset: new Cesium.Cartesian2(20, -40),
          heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
        },
      });
      positions = [];
      tempPoints = [];
      polygon = null;
      cartesian = null;
    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
    var radiansPerDegree = Math.PI / 180.0; //角度转化为弧度(rad)
    var degreesPerRadian = 180.0 / Math.PI; //弧度转化为角度
    //计算多边形面积
    function getArea(points: string | any[]) {
      var res = 0;
      //拆分三角曲面
      for (var i = 0; i < points.length - 2; i++) {
        var j = (i + 1) % points.length;
        var k = (i + 2) % points.length;
        var totalAngle = Angle(points[i], points[j], points[k]);
        var dis_temp1 = distance(positions[i], positions[j]);
        var dis_temp2 = distance(positions[j], positions[k]);
        res += dis_temp1 * dis_temp2 * Math.abs(Math.sin(totalAngle));
      }
      return (res / 1000000.0).toFixed(4);
    }
    /*角度*/
    function Angle(
      p1: { lat: number; lon: number },
      p2: { lat: number; lon: number },
      p3: { lat: number; lon: number }
    ) {
      var bearing21 = Bearing(p2, p1);
      var bearing23 = Bearing(p2, p3);
      var angle = bearing21 - bearing23;
      if (angle < 0) {
        angle += 360;
      }
      return angle;
    }
    /*方向*/
    function Bearing(
      from: { lat: number; lon: number },
      to: { lat: number; lon: number }
    ) {
      var lat1 = from.lat * radiansPerDegree;
      var lon1 = from.lon * radiansPerDegree;
      var lat2 = to.lat * radiansPerDegree;
      var lon2 = to.lon * radiansPerDegree;
      var angle = -Math.atan2(
        Math.sin(lon1 - lon2) * Math.cos(lat2),
        Math.cos(lat1) * Math.sin(lat2) -
          Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon1 - lon2)
      );
      if (angle < 0) {
        angle += Math.PI * 2.0;
      }
      angle = angle * degreesPerRadian; //角度
      return angle;
    }
    function PolygonPrimitive(positions: any) {
      polygon = viewer.entities.add({
        polygon: {
          hierarchy: positions,
          material: Cesium.Color.GREEN.withAlpha(0.1),
        },
      });
    }
    function distance(point1: any, point2: any) {
      var point1cartographic = Cesium.Cartographic.fromCartesian(point1);
      var point2cartographic = Cesium.Cartographic.fromCartesian(point2);
      /**根据经纬度计算出距离**/
      var geodesic = new Cesium.EllipsoidGeodesic();
      geodesic.setEndPoints(point1cartographic, point2cartographic);
      var s = geodesic.surfaceDistance;
      //返回两点之间的距离
      s = Math.sqrt(
        Math.pow(s, 2) +
          Math.pow(point2cartographic.height - point1cartographic.height, 2)
      );
      return s;
    }
  };

  // 添加卫星高度数据
  const nowSatellitePostion = () => {
    if (viewer.clock.shouldAnimate && nowPicksatellite[1]) {
      let pick = viewer.entities.getById(nowPicksatellite[0]);
      let cartographic = null;
      cartographic = Cesium.Cartographic.fromCartesian(
        pick.position.getValue(viewer.clock.currentTime)
      );
      let z = Math.ceil(cartographic.height / 1000);
      let nowDate = new Date(viewer.clock.currentTime).toUTCString();
      let dataLength = 1000;
      // 时间没有暂停
      setNowSystemDate((prev) => {
        let nowData = [...prev, nowDate];
        if (nowData.length < dataLength) {
          return nowData;
        } else {
          return nowData.slice(nowData.length - dataLength, nowData.length);
        }
      });
      setSatellitePostionData((prev) => {
        let nowData = [...prev, z];
        if (nowData.length < dataLength) {
          return nowData;
        } else {
          return nowData.slice(nowData.length - dataLength, nowData.length);
        }
      });
    }
  };

  // 绘制卫星锥体
  const radarScanner = (
    position: any,
    height: number,
    radarId: string,
    bottomRadius: number,
    color: any
  ) => {
    viewer.entities.add({
      id: radarId,
      show: false,
      availability: new Cesium.TimeIntervalCollection([
        new Cesium.TimeInterval({
          start: start,
          stop: stop,
        }),
      ]),
      position: position,
      cylinder: {
        length: height,
        topRadius: 0,
        bottomRadius: bottomRadius,
        // material: Cesium.Color.RED.withAlpha(.4),
        // outline: !0,
        numberOfVerticalLines: 0,
        // outlineColor: Cesium.Color.RED.withAlpha(.8),
        material: color.withAlpha(0.4),
      },
    });
  };

  const addWeather = (type?: string, strong?: number) => {
    snow && viewer.scene.postProcessStages.remove(snow); // 移除
    rain && viewer.scene.postProcessStages.remove(rain); // 移除
    fog && viewer.scene.postProcessStages.remove(fog); // 移除

    if (type === "snow") {
      //定义下雪场景 着色器
      function FS_Snow() {
        return `uniform sampler2D colorTexture;\n\
            varying vec2 v_textureCoordinates;\n\
          \n\
            float snow(vec2 uv,float scale)\n\
            {\n\
                float time = czm_frameNumber / 60.0;\n\
                float w=smoothstep(1.,0.,-uv.y*(scale/10.));if(w<.1)return 0.;\n\
                uv+=time/scale;uv.y+=time*2./scale;uv.x+=sin(uv.y+time*.5)/scale;\n\
                uv*=scale;vec2 s=floor(uv),f=fract(uv),p;float k=3.,d;\n\
                p=.5+.35*sin(11.*fract(sin((s+p+scale)*mat2(7,3,6,5))*5.))-f;d=length(p);k=min(d,k);\n\
                k=smoothstep(0.,k,sin(f.x+f.y)*0.01);\n\
                return k*w;\n\
            }\n\
          \n\
            void main(void){\n\
                vec2 resolution = czm_viewport.zw;\n\
                vec2 uv=(gl_FragCoord.xy*2.-resolution.xy)/min(resolution.x,resolution.y);\n\
                vec3 finalColor=vec3(0);\n\
                float c = 0.0;\n\
                c+=snow(uv,30.)*.0;\n\
                c+=snow(uv,20.)*.0;\n\
                c+=snow(uv,15.)*.0;\n\
                c+=snow(uv,10.);\n\
                c+=snow(uv,8.);\n\
            c+=snow(uv,6.);\n\
                c+=snow(uv,5.);\n\
                finalColor=(vec3(c)); \n\
                gl_FragColor = mix(texture2D(colorTexture, v_textureCoordinates), vec4(finalColor,1), ${strong}); \n\
          \n\
            }\n\
          `;
      }
      let fs_snow = FS_Snow();
      snow = new Cesium.PostProcessStage({
        name: "czm_snow",
        fragmentShader: fs_snow,
      });
      stages.add(snow);
      viewer.scene.skyAtmosphere.hueShift = -0.8;
      viewer.scene.skyAtmosphere.saturationShift = -0.7;
      viewer.scene.skyAtmosphere.brightnessShift = -0.33;
      viewer.scene.fog.density = 0.001;
      viewer.scene.fog.minimumBrightness = 0.8;
    } else if (type === "rain") {
      // 定义下雨场景 着色器
      function FS_Rain() {
        return `uniform sampler2D colorTexture;\n\
            varying vec2 v_textureCoordinates;\n\
        \n\
            float hash(float x){\n\
                return fract(sin(x*133.3)*13.13);\n\
        }\n\
        \n\
        void main(void){\n\
        \n\
            float time = czm_frameNumber / 60.0;\n\
        vec2 resolution = czm_viewport.zw;\n\
        \n\
        vec2 uv=(gl_FragCoord.xy*2.-resolution.xy)/min(resolution.x,resolution.y);\n\
        vec3 c=vec3(.6,.7,.8);\n\
        \n\
        float a=-.4;\n\
        float si=sin(a),co=cos(a);\n\
        uv*=mat2(co,-si,si,co);\n\
        uv*=length(uv+vec2(0,4.9))*.3+1.;\n\
        \n\
        float v=1.-sin(hash(floor(uv.x*100.))*2.);\n\
        float b=clamp(abs(sin(20.*time*v+uv.y*(5./(2.+v))))-.95,0.,1.)*20.;\n\
        c*=v*b; \n\
        \n\
        gl_FragColor = mix(texture2D(colorTexture, v_textureCoordinates), vec4(c,1), ${strong});  \n\
        }\n\
`;
      }
      let fs_rain = FS_Rain();
      rain = new Cesium.PostProcessStage({
        name: "czm_rain",
        fragmentShader: fs_rain,
      });
      stages.add(rain);
      viewer.scene.skyAtmosphere.hueShift = -0.8;
      viewer.scene.skyAtmosphere.saturationShift = -0.7;
      viewer.scene.skyAtmosphere.brightnessShift = -0.33;
      viewer.scene.fog.density = 0.001;
      viewer.scene.fog.minimumBrightness = 0.8;
    } else if (type === "fog") {
      function FS_Fog() {
        return (
          "  uniform sampler2D colorTexture;\n" +
          "  uniform sampler2D depthTexture;\n" +
          "  varying vec2 v_textureCoordinates;\n" +
          "  void main(void)\n" +
          "  {\n" +
          "      vec4 origcolor=texture2D(colorTexture, v_textureCoordinates);\n" +
          "      vec4 fogcolor=vec4(0.8,0.8,0.8,0.1);\n" +
          "\n" +
          "      float depth = czm_readDepth(depthTexture, v_textureCoordinates);\n" +
          "      vec4 depthcolor=texture2D(depthTexture, v_textureCoordinates);\n" +
          "\n" +
          "      float f=(depthcolor.r-0.40)/0.2;\n" +
          "      if(f<0.0) f=0.0;\n" +
          `      else if(f>1.0) f=${strong};\n` +
          "      gl_FragColor = mix(origcolor,fogcolor,f);\n" +
          "   }"
        );
      }
      let fs_fog = FS_Fog();
      fog = new Cesium.PostProcessStage({
        name: "self",
        //sampleMode:PostProcessStageSampleMode.LINEAR,
        fragmentShader: fs_fog,
      });
      stages.add(fog);
    }
  };

  // 添加六边形
  function addHexagonAll(lat, lng, radius, id, index) {
    // 最大添加次数
    if (index >= 6) {
      return;
    }
    addOneHexagon(lat, lng, radius, id + index);
    // 右边的六边形
    let lng2 = lng;
    let lat2 = lat + radius * Math.sqrt(3);
    addOneHexagon(lat2, lng2, radius, id + index + "1");
    if (Math.floor(Math.random() * 5) > 2) {
      addHexagonAll(lat2, lng2, radius, id + "index" + "1", index + 1);
    }
    // 左边的六边形
    lat2 = lat - radius * Math.sqrt(3);
    addOneHexagon(lat2, lng2, radius, id + index + "2");
    if (Math.floor(Math.random() * 5) > 2) {
      addHexagonAll(lat2, lng2, radius, id + "index" + "2", index + 1);
    }
    // 左上角六边形
    lng2 = lng + (radius * 3) / 2;
    lat2 = lat - (radius * Math.sqrt(3)) / 2;
    addOneHexagon(lat2, lng2, radius, id + index + "3");
    if (Math.floor(Math.random() * 5) > 2) {
      addHexagonAll(lat2, lng2, radius, id + "index" + "3", index + 1);
    }
    //左下角六边形
    lng2 = lng - (radius * 3) / 2;
    addOneHexagon(lat2, lng2, radius, id + index + "4");
    if (Math.floor(Math.random() * 5) > 2) {
      addHexagonAll(lat2, lng2, radius, id + "index" + "4", index + 1);
    }
    //右上角六边形
    lng2 = lng + (radius * 3) / 2;
    lat2 = lat + (radius * Math.sqrt(3)) / 2;
    addOneHexagon(lat2, lng2, radius, id + index + "5");
    if (Math.floor(Math.random() * 5) > 2) {
      addHexagonAll(lat2, lng2, radius, id + "index" + "5", index + 1);
    }
    //右下角六边形
    lng2 = lng - (radius * 3) / 2;
    addOneHexagon(lat2, lng2, radius, id + index + "6");
    if (Math.floor(Math.random() * 5) > 2) {
      addHexagonAll(lat2, lng2, radius, id + "index" + "6", index + 1);
    }
  }
  // 添加一个六边形
  function addOneHexagon(lat, lng, radius, id) {
    viewer.entities.add({
      id: `ShowRange_${id}`,
      name: "选取范围",
      polygon: {
        hierarchy: new Cesium.PolygonHierarchy(
          Cesium.Cartesian3.fromDegreesArray([
            lng + radius,
            lat,
            lng + radius / 2,
            lat + (radius / 2) * Math.sqrt(3),
            lng - radius / 2,
            lat + (radius / 2) * Math.sqrt(3),
            lng - radius,
            lat,
            lng - radius / 2,
            lat - (radius / 2) * Math.sqrt(3),
            lng + radius / 2,
            lat - (radius / 2) * Math.sqrt(3),
          ])
        ),
        outline: true,
        outlineColor: new Cesium.Color(210 / 255, 51 / 255, 90 / 255, 1),
        outlineWidth: 4,
        fill: false,
        material: Cesium.Color.fromCssColorString(
          "rgba(5, 39, 175, 0.3)"
        ).withAlpha(0.1),
      },
    });
  }

  // 当前选择的卫星
  useEffect(() => {
    for (let i of selectSatelliteList) {
      let pick = viewer.entities.getById(i[1]);
      let curradarScanner = viewer.entities.getById("radarScan_" + i[1]);
      if (i[0] === 0) {
        if (i[1] === true) {
          count += 1;
          current = i[1];
        }
        curradarScanner.show = i[2];
        if (pick.id) {
          if (pick._path != undefined) {
            pick._path.show = i[2];
          }
        }
      } else if (i[0] === 1) {
        curradarScanner.cylinder.material = new Cesium.Color(
          i[2].r / 255,
          i[2].g / 255,
          i[2].b / 255,
          i[2].a
        );
      }
    }
  }, [selectSatelliteList]);

  // 当前选中的卫星
  useEffect(() => {
    // 实时展示被选中的实体的位置
    clearInterval(polarTimeId);
    if (selectedSatelliteList.length === 0) {
      setPolarPosition([]);
    } else {
      polarTimeId = setInterval(() => {
        let t = [];
        for (let i of selectedSatelliteList) {
          let curPosition = viewer.entities
            .getById(i)
            .position.getValue(viewer.clock.currentTime);
          let [lng, lat] = GetWGS84FromDKR(curPosition, 1);
          t.push([lng, lat, i]);
        }
        setPolarPosition(t);
      }, 1000);
    }
    if (selectedSatelliteList.length > 0) {
      if (nowPicksatellite) {
        if (selectedSatelliteList[0] !== nowPicksatellite[0]) {
          nowPicksatellite = [selectedSatelliteList[0], true, false];
        } else {
          nowPicksatellite = [selectedSatelliteList[0], true, true];
        }
      } else {
        nowPicksatellite = [selectedSatelliteList[0], true, true];
      }
      setCurSatellite(selectedSatelliteList[0].split("/")[1]);
    } else {
      if (nowPicksatellite) {
        nowPicksatellite = [nowPicksatellite[0], false, false];
      }
    }
  }, [selectedSatelliteList]);

  useEffect(() => {
    if (nowPicksatellite) {
      if (nowPicksatellite[1] && nowPicksatellite[2]) {
        viewer.clock.onTick.addEventListener(nowSatellitePostion, false);
      } else {
        viewer.clock.onTick.removeEventListener(nowSatellitePostion, false);
        setNowSystemDate([]);
        setSatellitePostionData([]);
      }
    }
  }, [nowPicksatellite]);

  useEffect(() => {
    if (init) {
      if (curBaseStation === null) {
        buildList.forEach((buildName) => {
          viewer.entities.removeById(buildName);
        });
        return;
      }
      // 加载城市模型
      if (
        viewer.entities.getById(`build/${curBaseStation.name}`) == undefined
      ) {
        viewer.entities.add({
          id: `build/${curBaseStation.name}`,
          position: Cesium.Cartesian3.fromDegrees(
            curBaseStation?.pos[0],
            curBaseStation?.pos[1],
            0
          ),
          model: {
            uri: "./build-model/rp.gltf",
            minimumPixelSize: 128, //最小的模型像素
            maximumScale: 20000, //最大的模型像素
          },
        });
      }
      // 加载基站模型
      let baseStationEntity = viewer.entities.getById(
        `Place/${curBaseStation?.name}`
      );
      baseStationEntity.billboard.show = false;
      // 添加基站模型
      if (baseStationEntity.model == undefined) {
        baseStationEntity.model = {
          // 引入模型
          uri: "./Telescope_2.gltf",
          // 配置模型大小的最小值
          minimumPixelSize: 1,
          //配置模型大小的最大值
          maximumScale: 50,
          scale: 1.0,
          //配置模型轮廓的颜色
          silhouetteColor: Cesium.Color.WHITE,
          //配置轮廓的大小
          silhouetteSize: 0,
          articulations: {
            "Dish DishX": 0,
            "Dish DishY": 0,
            "Dish DishZ": 0,
          },
        };
      } else {
        baseStationEntity.model.show = true;
      }

      // 监听摄像机高度变化
      // viewer.camera.changed.addEventListener(() => {
      //   // 当前高度
      //   let height = viewer.camera.positionCartographic.height;
      //   if (curBaseStation != null) {
      //     let baseStationEntity = viewer.entities.getById(
      //       `Place/${curBaseStation?.name}`
      //     );

      //     // 当高度小于一定值 显示模型
      //     if (height <= 2000) {
      //        // 添加build模型
      //       if(viewer.entities.getById(`build/${curBaseStation.name}`) == undefined){
      //         viewer.entities.add({
      //           id:`build/${curBaseStation.name}`,
      //           position: Cesium.Cartesian3.fromDegrees(curBaseStation?.pos[0],curBaseStation?.pos[1],0),
      //           model: {
      //             uri: "./build-model/rp.gltf",
      //             minimumPixelSize: 128,//最小的模型像素
      //             maximumScale: 20000,//最大的模型像素
      //           }
      //         });
      //       }
      //       baseStationEntity.billboard.show = false;
      //       // 添加基站模型
      //       if (baseStationEntity.model == undefined) {
      //         baseStationEntity.model = {
      //           // 引入模型
      //           uri: "./Telescope_2.gltf",
      //           // 配置模型大小的最小值
      //           minimumPixelSize: 1,
      //           //配置模型大小的最大值
      //           maximumScale: 50,
      //           scale: 1.0,
      //           //配置模型轮廓的颜色
      //           silhouetteColor: Cesium.Color.WHITE,
      //           //配置轮廓的大小
      //           silhouetteSize: 0,
      //           articulations: {
      //             "Dish DishX": 0,
      //             "Dish DishY": 0,
      //             "Dish DishZ": 0,
      //           },
      //         };
      //       } else {
      //         baseStationEntity.model.show = true;
      //       }
      //     } else {
      //       if (baseStationEntity.model != undefined) {
      //         baseStationEntity.model.show = false;
      //         baseStationEntity.billboard.show = true;
      //       }
      //     }
      //   }
      // });

      viewer.camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(
          curBaseStation?.pos[0],
          curBaseStation?.pos[1],
          50
        ),
      });

      setIsRotate(false);
      viewer.camera.lookAt(
        Cesium.Cartesian3.fromDegrees(
          curBaseStation?.pos[0],
          curBaseStation?.pos[1]
        ),
        new Cesium.Cartesian3(0.0, -50.0, 50.0)
      );
      // viewer.camera.moveBackward(100);

      // 生成雨雪天气
      // let randomNumber = Math.floor(Math.random() * 10);
      // if (randomNumber >= 8) {
      //   addWeather("fog", 0.8);
      // } else if (randomNumber >= 5) {
      //   addWeather("snow", 0.3);
      // } else if (randomNumber >= 3) {
      //   addWeather("rain", 0.3);
      // } else {
      //   addWeather();
      // }
      //   Jsonp(
      //     `https://api.caiyunapp.com/v2.5/8PdoZBYiEPf3PT7C/${curBaseStation?.pos[0]},${curBaseStation?.pos[1]}/realtime.json"`,
      //     {},
      //     function (err, res) {
      //       let curWeather = res.result.realtime.skycon;
      //       if (["CLEAR_DAY", "CLEAR_NIGHT"].includes(curWeather)) {
      //         addWeather();
      //       } else if (["HEAVY_RAIN", "STORM_RAIN"].includes(curWeather)) {
      //         addWeather("rain", 0.7);
      //       } else if (
      //         ["LIGHT_RAIN", "MODERATE_RAIN"].includes(curWeather)
      //       ) {
      //         addWeather("rain", 0.3);
      //       } else if (["HEAVY_SNOW", "STORM_SNOW"].includes(curWeather)) {
      //         addWeather("snow", 0.7);
      //       } else if (
      //         ["LIGHT_SNOW", "MODERATE_SNOW"].includes(curWeather)
      //       ) {
      //         addWeather("snow", 0.3);
      //       } else if (["FOG"].includes(curWeather)) {
      //         addWeather("fog");
      //       } else {
      //         addWeather();
      //       }
      //     }
      //   );
      clearInterval(timeID);
      timeID = setInterval(() => {
        let currTime = viewer.clock.currentTime;
        let baseStation = `Place/${curBaseStation?.name}`;

        linkToBaseStation[baseStation].linkTimes.forEach((interval) => {
          if (
            Cesium.JulianDate.lessThanOrEquals(interval[0], currTime) &&
            Cesium.JulianDate.greaterThanOrEquals(interval[1], currTime)
          ) {
            // 旋转基站
            let baseStationEntity = viewer.entities.getById(baseStation);
            let baseStationCar = baseStationEntity._position._value;
            let satelliteCar = viewer.entities
              .getById(interval[2])
              .position.getValue(viewer.clock.currentTime);
            let m = getModelMatrix(baseStationCar, satelliteCar);
            let hpr = getHeadingPitchRoll(m);
            hpr.heading = hpr.heading + 3.14 / 2 + 3.14;
            if (baseStationEntity.model != undefined) {
              baseStationEntity.model.articulations["Dish DishX"] =
                ((-hpr.roll * 180) / Math.PI) % 360;
              baseStationEntity.model.articulations["Dish DishY"] =
                ((-hpr.heading * 180) / Math.PI) % 360;
              baseStationEntity.model.articulations["Dish DishZ"] =
                ((-hpr.pitch * 180) / Math.PI) % 360;
            }
          }
        });
      });
    }
    curBaseStationRef.current = curBaseStation
  }, [curBaseStation?.pos[0], curBaseStation?.pos[1]]);

  const getModelMatrix = (pointA, pointB) => {
    //向量AB
    const vector2 = Cesium.Cartesian3.subtract(
      pointB,
      pointA,
      new Cesium.Cartesian3()
    );
    //归一化
    const normal = Cesium.Cartesian3.normalize(
      vector2,
      new Cesium.Cartesian3()
    );
    //旋转矩阵 rotationMatrixFromPositionVelocity源码中有，并未出现在cesiumAPI中
    const rotationMatrix3 =
      Cesium.Transforms.rotationMatrixFromPositionVelocity(
        pointA,
        normal,
        Cesium.Ellipsoid.WGS84
      );
    const modelMatrix4 = Cesium.Matrix4.fromRotationTranslation(
      rotationMatrix3,
      pointA
    );
    return modelMatrix4;
  };

  const getHeadingPitchRoll = (m) => {
    var m1 = Cesium.Transforms.eastNorthUpToFixedFrame(
      Cesium.Matrix4.getTranslation(m, new Cesium.Cartesian3()),
      Cesium.Ellipsoid.WGS84,
      new Cesium.Matrix4()
    );
    // 矩阵相除
    var m3 = Cesium.Matrix4.multiply(
      Cesium.Matrix4.inverse(m1, new Cesium.Matrix4()),
      m,
      new Cesium.Matrix4()
    );
    // 得到旋转矩阵
    var mat3 = Cesium.Matrix4.getMatrix3(m3, new Cesium.Matrix3());
    // 计算四元数
    var q = Cesium.Quaternion.fromRotationMatrix(mat3);
    // 计算旋转角(弧度)
    var hpr = Cesium.HeadingPitchRoll.fromQuaternion(q);
    return hpr;
  };

  // 卫星动画
  const satelliteAnimate = () => {
    let curEntity = viewer.entities.getById(`Satellite/${curSatellite}`);
    if (
      curEntity !== undefined &&
      curEntity.model.articulations !== undefined
    ) {
      if (satelliteStatus === "关") {
        setSatelliteStatus("开");
        let dis = -0.5;
        clearInterval(timerClose);
        timerOpen = setInterval(() => {
          if (
            curEntity.model.articulations["satellite_back yTranslate"] > dis
          ) {
            curEntity.model.articulations["satellite_back yTranslate"] -= 0.01;
          } else {
            clearInterval(timerOpen);
          }
        }, 30);
      } else {
        setSatelliteStatus("关");
        clearInterval(timerOpen);
        timerClose = setInterval(() => {
          if (curEntity.model.articulations["satellite_back yTranslate"] < 0) {
            curEntity.model.articulations["satellite_back yTranslate"] += 0.01;
          } else {
            clearInterval(timerClose);
          }
        }, 30);
      }
    }
  };

  return (
    <>
      <div id="title">卫星态势仿真监控平台</div>
      <div className="left-wrap">
        <Box
          title="卫星列表"
          component={
            <SatelliteList
              statelliteList={satelliteList}
              setSelectSatelliteList={setSelectSatelliteList}
              setSelectedSatelliteList={setSelectedSatelliteList}
            />
          }
        />
        <Box title="卫星数量统计图" component={<SatelliteBar />} />
        <Box title="卫星数量变化图" component={<SatelliteNumberChart />} />
      </div>
      <div
        id="cesiumContainer"
        style={{
          height: "100%",
          width: "100%",
          // backgroundRepeat: "no-repeat ",
          // backgroundSize: "cover",
          // backgroundImage: "url(./images/star_blue.png)",
          background: "#000",
        }}
      ></div>
      <div className="right-wrap">
        <Box
          title="卫星信息"
          component={
            <SatelliteInfo
              sateName={curSatellite}
              launch={"2021-08"}
              status={"service"}
              activity={"stable"}
            />
          }
        />
        <Box
          title="极地图"
          component={<PolarEarth position={polarPosition}></PolarEarth>}
        ></Box>
        <Box
          title="卫星实时高度图"
          component={
            <HeightChart
              satellitePostionData={satellitePostionData}
              nowSystemDate={nowSystemDate}
            />
          }
        />
        <Box
          title="地面基站信息列表"
          component={
            <BaseStationInfo
              baseStationList={baseStationList}
              setBaseStation={setCurBaseStation}
              setDashboard={setDashboard}
            />
          }
        />
      </div>
      {/* <div className="bottom-wrap">
        <Box title="卫星数量变化图" component={<SatelliteNumberChart />} />
      </div> */}
      <div id="toolbar">
        <button
          type="button"
          id="measureDistance"
          onClick={() => {
            setIsDrawLine(!isDrawLine);
          }}
          className="cesium-button"
        >
          MeasureDistance
        </button>
        <button
          type="button"
          id="measureArea"
          onClick={() => {
            setIsDrawPolygon(!isDrawPolygon);
          }}
          className="cesium-button"
        >
          MeasureArea
        </button>
        <button
          type="button"
          id="animation"
          onClick={satelliteAnimate}
          className="cesium-button"
        >
          {`Animation：${satelliteStatus}`}
        </button>
      </div>
      <div id="left-border-line"></div>
      <div id="right-border-line"></div>
    </>
  );
};
export default CesiumComponent;
