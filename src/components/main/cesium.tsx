import React, { useEffect, useState, useRef, useCallback } from "react";
import Jsonp from "jsonp";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { TableRowSelection } from "antd/es/table/interface";
//@ts-ignore
import * as CM from "cesium/Cesium";
import SatelliteList from "../left/satelliteList";
import "antd/dist/antd.css";
import "./css/cesium.css";
import { BaseStation } from "./types/type";
import BaseStationInfo from "./baseStationInfo";
import Box from "./box";
import HeightChart from "../right/heightChart";
import SatelliteBar from "../left/satelliteBar";
import SatelliteNumberChart from "../right/satelliteNumberChart";
import { randomInt } from "crypto";

//@ts-ignore
let viewer: any;
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
let nowPicksatellite: any;
let rain: any, snow: any, fog: any;
let stages: any;
let previousTime: any;
// let satelliteList: {[key:string]:any []} = {};
// let satelliteList: string[] = []
const CesiumComponent: React.FC<{}> = () => {
  const [init, setInit] = useState<boolean>(false);
  const [isDrawLine, setIsDrawLine] = useState<boolean>(false);
  const [isDrawPolygon, setIsDrawPolygon] = useState<boolean>(false);
  const [definitionChanged, setDefinitionChanged] = useState<any>(
    new CM.Event()
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
  const [start, setStart] = useState(
    CM.JulianDate.fromIso8601("2022-08-17T07:10:35.930703+00:00")
  );
  const [stop, setStop] = useState(
    CM.JulianDate.fromIso8601("2022-08-18T07:10:35.930703+00:00")
  );
  const [baseStationList, setBaseStationList] = useState<BaseStation[]>([]);
  const [curBaseStation, setCurBaseStation] = useState<BaseStation | null>(
    null
  );
  useEffect(() => {
    setInit(true);
  }, []);

  useEffect(() => {
    if (viewer !== undefined) {
      if (isRotate) {
        // viewer.clock.onTick.addEventListener(earthRotate)
      } else {
        // viewer.clock.onTick.removeEventListener(earthRotate)
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
      CM.Ion.defaultAccessToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiYTg4MTUyNy0zMTA2LTRiMDktOGE1My05ZDA4OTRmOTE3YzciLCJpZCI6MTAzMjg1LCJpYXQiOjE2NTk0MDcyODB9.sfpT8e4oxun23JG--UmUN9ZD4SbQfU-Ljvh2MsPTTcY";
      viewer = new CM.Viewer("cesiumContainer", {
        shouldAnimate: true,
        infoBox: false, // 是否显示点击要素之后显示的信息
        // 去掉地球表面的大气效果黑圈问题
        orderIndependentTranslucency: false,
        contextOptions: {
          webgl: {
            alpha: true,
          },
        },
      });
      // 添加高德影像图
      let atLayer = new CM.UrlTemplateImageryProvider({
        url: "https://webst02.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",
        minimumLevel: 3,
        maximumLevel: 18,
      });
      // viewer.imageryLayers.addImageryProvider(atLayer);
      // 开启光照
      viewer.scene.globe.enableLighting = true;
      viewer.shadows = true;
      // 亮度设置
      stages = viewer.scene.postProcessStages;
      viewer.scene.brightness =
        viewer.scene.brightness ||
        stages.add(CM.PostProcessStageLibrary.createBrightnessStage());
      viewer.scene.brightness.enabled = true;
      viewer.scene.brightness.uniforms.brightness = Number(1.2);
      // 更换天空盒
      let spaceSkybox = new CM.SkyBox({
        sources: {
          negativeX: "./images/Space_Skybox/starmap_2020_16k_mx.jpg",
          positiveX: "./images/Space_Skybox/starmap_2020_16k_px.jpg",
          negativeY: "./images/Space_Skybox/starmap_2020_16k_my.jpg",
          positiveY: "./images/Space_Skybox/starmap_2020_16k_py.jpg",
          negativeZ: "./images/Space_Skybox/starmap_2020_16k_mz.jpg",
          positiveZ: "./images/Space_Skybox/starmap_2020_16k_pz.jpg",
        },
      });
      viewer.scene.skyBox = spaceSkybox;
      // 尝试提高分辨率
      viewer._cesiumWidget._supportsImageRenderingPixelated =
        CM.FeatureDetection.supportsImageRenderingPixelated();
      viewer._cesiumWidget._forceResize = true;
      if (CM.FeatureDetection.supportsImageRenderingPixelated()) {
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
        declare: function () { },
        highlight: function () { },
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
        reset: function () { },
      };
      //@ts-ignore
      Sandcastle.addDefaultToolbarButton("Satellites", function () {
        // 读取轨迹数据
        let dronePromise = CM.CzmlDataSource.load(
          './data/star-beidou-gps.czml'
        );
        let dronePromise_beidou = CM.CzmlDataSource.load('./data/beidou.czml');
        let dronePromise_GPS = CM.CzmlDataSource.load('./data/gps.czml');
        let nowSatelliteList: string[] = [];
        // 加载星链实体
        dronePromise.then((dataSource: any) => {
          // 配置时间轴
          // dataSource.clock.startTime = start.clone();   // 给cesium时间轴设置开始的时间，也就是上边的东八区时间
          // dataSource.clock.stopTime = stop.clone();     // 设置cesium时间轴设置结束的时间
          // dataSource.clock.currentTime = start.clone(); // 设置cesium时间轴设置当前的时间

          viewer.dataSources.add(dronePromise);
          // 通过ID选择需要轨迹的实体
          dataSource.entities._entities._array.forEach((ele: any) => {
            nowSatelliteList.push(ele.id);
            viewer.entities.add(ele);
            let entityColor;

            // 1. 配置样式与路径
            if (ele.label != undefined) {
              ele.label.show = false;
            }
            if (ele.path != undefined) {
              // 设置路径样式
              let re_starlink = /Satellite\/STARLINK*/;
              let re_beidou = /Satellite\/BEIDOU*/;
              let re_gps = /Satellite\/GPS/;
              if (re_starlink.exec(ele.id) != null) {
                // 星链轨迹
                entityColor = CM.Color.RED;
                ele.path.width = 5;
                ele.path.material = new CM.PolylineGlowMaterialProperty({
                  glowPower: 0.2,
                  color: entityColor,
                });
                // ele.path.material.color = CM.Color.RED;
                // ele.path.material.glowPower = 0.8
              }
              if (re_beidou.exec(ele.id) != null) {
                // 北斗轨迹
                entityColor = CM.Color.GREEN;
                ele.path.width = 5;
                ele.path.material = new CM.PolylineGlowMaterialProperty({
                  glowPower: 0.2,
                  color: entityColor,
                });
                // ele.path.material.color = CM.Color.GREEN;
                // ele.path.material.glowPower = 0.8
              }
              if (re_gps.exec(ele.id) != null) {
                // gps轨迹
                entityColor = CM.Color.YELLOW;
                ele.path.width = 5;
                ele.path.material = new CM.PolylineGlowMaterialProperty({
                  glowPower: 0.2,
                  color: entityColor,
                });
                // ele.path.material.color = CM.Color.YELLOW;
                // ele.path.material.glowPower = 0.8
              }
              ele.path.show = false; // 设置路径不可看
              //ele.path.material.color = CM.Color.WHITE;
            }

            // 2. 改成点
            if (ele.path != undefined) {
              ele.billboard = undefined;
              ele.point = {
                show: true,
                color: entityColor,
                // outlineWidth: 4,
                pixelSize: 5,
              };
            }

            // 绘制雷达扫描
            let radarId = "radarScan_" + ele.id;
            let postionValues = [...ele.position._property._values];
            let cartographic = CM.Cartographic.fromCartesian(
              new CM.Cartesian3(
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
            earthHeight = earthHeight + (earthRadius - earthHeight) * 2 / 3
            // 卫星底部的辐射半径
            let bottomRadius =
              Math.sqrt(earthRadius * earthRadius - earthHeight * earthHeight)
            // 卫星辐射的长度
            let satelliteLenght = Math.abs(height + earthRadius - earthHeight);
            var property = new CM.SampledPositionProperty();
            let radarHeight: number = 0;
            for (var i = 0; i < postionValues.length / 3; i++) {
              let time = CM.JulianDate.clone(ele.position._property._times[i]);
              let radarHeight = earthHeight + satelliteLenght / 2 - earthRadius;
              // @ts-ignore
              let [lng, lat] = GetWGS84FromDKR(
                new CM.Cartesian3(
                  postionValues[i * 3],
                  postionValues[i * 3 + 1],
                  postionValues[i * 3 + 2]
                ),
                1
              );
              let radarPosition = CM.Cartesian3.fromDegrees(
                eval(lng),
                eval(lat),
                radarHeight
              ); // 添加位置，和时间对应
              property.addSample(time, radarPosition);
              property._property._interpolationAlgorithm.type =
                ele.position._property._interpolationAlgorithm.type;
              property._property._interpolationDegree =
                ele.position._property._interpolationDegree;
              property._referenceFrame = CM.ReferenceFrame.INERTIAL;
            }
            radarScanner(
              property,
              satelliteLenght,
              radarId,
              bottomRadius,
              entityColor
            );
            // 更改显示的时间
            // var timeInterval = new CM.TimeInterval({
            //   start: start,
            //   stop: stop,
            //   isStartIncluded: true,
            //   isStopIncluded: true,
            // });
            // ele.availability = new CM.TimeIntervalCollection([timeInterval])
            // // 2. 添加和配置运动实体的模型
            // ele.model = {
            //   // 引入模型
            //   uri: "./Satellite.gltf",
            //   // 配置模型大小的最小值
            //   minimumPixelSize: 50,
            //   //配置模型大小的最大值
            //   maximumScale: 50,
            //   //配置模型轮廓的颜色
            //   silhouetteColor: CM.Color.WHITE,
            //   //配置轮廓的大小
            //   silhouetteSize: 0,
            // };
            // //设置方向,根据实体的位置来配置方向
            // ele.orientation = new CM.VelocityOrientationProperty(ele.position);
            // //设置模型初始的位置
            // ele.viewFrom = new CM.Cartesian3(0, -30, 30);
            // //设置查看器，让模型动起来
            // viewer.clock.shouldAnimate = true;
            // 3. 配置样式与路径
            if (ele.label != undefined) {
              ele.label.show = false;
            }
            if (ele.path != undefined) {
              // 设置路径样式
              let re_starlink = /Satellite\/STARLINK*/;
              let re_beidou = /Satellite\/BEIDOU*/;
              let re_gps = /Satellite\/GPS/;
              if (re_starlink.exec(ele.id) != null) {
                // 星链轨迹
                ele.path.material.color = CM.Color.RED;
              }
              if (re_beidou.exec(ele.id) != null) {
                // 北斗轨迹
                ele.path.material.color = CM.Color.GREEN;
              }
              if (re_gps.exec(ele.id) != null) {
                // gps轨迹
                ele.path.material.color = CM.Color.YELLOW;
              }
              ele.path.show = false; // 设置路径不可看
              //ele.path.material.color = CM.Color.WHITE;
            }
          });

          setSatelliteList((ele) => [...ele, ...nowSatelliteList]);
        });
        // // 随机生成基站
        viewer.camera.flyHome(0);
        const lngMin = -180;
        const lngMax = 180;
        const latMin = -90;
        const latMax = 90;
        let baseStationTemp: BaseStation[] = [];
        for (let i = 0; i < 10; i++) {
          let lng = Math.random() * (lngMax - lngMin + 1) + lngMin;
          let lat = Math.random() * (latMax - latMin + 1) + latMin;
          createBaseStation(lng, lat, i);
          baseStationTemp.push({
            name: `baseStation_${i}`,
            desc: "baseStation",
            pos: [lng, lat],
            state: Math.random() > 0.5 ? "working" : "stoped",
          });
        }
        setBaseStationList(baseStationTemp);
      });
      // 鼠标事件
      var handler = new CM.ScreenSpaceEventHandler(viewer.scene.canvas);
      handler.setInputAction(function (click: { position: any }) {
        var pick = viewer.scene.pick(click.position);
        if (pick && pick.id) {
          if (pick.id._path != undefined) {
            pick.id._path.show = true;
            setIsPostion(true);
            let curradarScanner = viewer.entities.getById(
              "radarScan_" + pick.id._id
            );
            curradarScanner.show = true;
            if (nowPicksatellite) {
              if (pick.id !== nowPicksatellite.id) {
                nowPicksatellite = pick;
                setNowSystemDate([]);
                setSatellitePostionData([]);
              }
            } else {
              nowPicksatellite = pick;
            }
            viewer.clock.onTick.addEventListener(nowSatellitePostion, false);
          }
        }
      }, CM.ScreenSpaceEventType.LEFT_CLICK);
      handler.setInputAction(function (click: { position: any }) {
        var pick = viewer.scene.pick(click.position);
        if (pick && pick.id) {
          // 点击的是卫星
          if (pick.id._path != undefined) {
            pick.id._path.show = false;
            setIsPostion(false);
            setNowSystemDate([]);
            setSatellitePostionData([]);
            viewer.clock.onTick.removeEventListener(nowSatellitePostion, false);
            // 删除雷达扫描实体
            // viewer.entities.removeById('radarScan_' + pick.id._id)
            let curradarScanner = viewer.entities.getById(
              "radarScan_" + pick.id._id
            );
            curradarScanner.show = false;
          }
        }
      }, CM.ScreenSpaceEventType.RIGHT_CLICK);

      //监控相机高度
      var handler = new CM.ScreenSpaceEventHandler(viewer.scene.canvas);
      handler.setInputAction(function () {
        let height = viewer.camera.positionCartographic.height;
        if (height > 500) {
          snow && viewer.scene.postProcessStages.remove(snow); // 移除
          rain && viewer.scene.postProcessStages.remove(rain); // 移除
          fog && viewer.scene.postProcessStages.remove(fog); // 移除
        }
        if (height > 10000000) {
          // setIsRotate(true);
        } else {
          // setIsRotate(false);
        }
      }, CM.ScreenSpaceEventType.WHEEL);

      // 地球旋转
      // viewer.clock.multiplier = 100; //速度
      // viewer.clock.shouldAnimate = true;
      // previousTime = viewer.clock.currentTime.secondsOfDay;
      // setIsRotate(true);

      // 配置时间轴
      // viewer.clock.startTime = start.clone();   // 给cesium时间轴设置开始的时间，也就是上边的东八区时间
      // viewer.clock.stopTime = stop.clone();     // 设置cesium时间轴设置结束的时间
      // viewer.clock.currentTime = start.clone(); // 设置cesium时间轴设置当前的时间
    }
  }, [init]);

  const earthRotate = useCallback(() => {
    // var spinRate = 1;
    // var currentTime = viewer.clock.currentTime.secondsOfDay;
    // var delta = (currentTime - previousTime) / 1000;
    // previousTime = currentTime;
    // viewer.scene.camera.rotate(CM.Cartesian3.UNIT_Z, -spinRate * delta);
  }, []);

  // 笛卡尔坐标系转经纬度
  const GetWGS84FromDKR = (coor: any, type: number) => {
    let cartographic = CM.Cartographic.fromCartesian(coor);
    let x = CM.Math.toDegrees(cartographic.longitude);
    let y = CM.Math.toDegrees(cartographic.latitude);
    if (type === 0) return `(经度 :${x.toFixed(2)}, 纬度 : ${y.toFixed(2)})`;
    else if (type === 1)
      return [x.toFixed(2) as number, y.toFixed(2) as number];
  };
  // 经纬度转笛卡尔坐标
  const wgs84ToCartesign = (lng: any, lat: any, alt: any) => {
    var ellipsoid = viewer.scene.globe.ellipsoid;
    var cartographic = CM.Cartographic.fromDegrees(lng, lat, alt);
    var cartesian3 = ellipsoid.cartographicToCartesian(cartographic);
    return cartesian3;
  };
  // 创建基站
  const createBaseStation = (lng: any, lat: any, id: number) => {
    var timeInterval = new CM.TimeInterval({
      start: start,
      stop: stop,
      isStartIncluded: true,
      isStopIncluded: true,
    });
    let baseStation = {
      id: `Facility/baseStation_${id}`,
      name: `baseStation_${id}`,
      availability: new CM.TimeIntervalCollection([timeInterval]),
      description: `baseStation_${id}`,
      billboard: {
        eyeOffset: new CM.Cartesian3(0, 0, 0),
        horizontalOrigin: CM.HorizontalOrigin.CENTER,
        // image:"./logo512.png",
        image:
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAhhJREFUOE+lkj9oU1EUxr/zooPomvcSp3TQRYQMvpuOVm2x1IJ2EFxUcFAQ7LspiiCSZFEKbV6wgyKCRTdFFC12TF3U3DQVF106BEXSNC5CRdDmHsn7E14l0cGz3Mu55/zuvd93CP8Z1OlvuuIRgDGAWgz+SsBnBr3SpFe2bd+5Yl5c2uh3jwdYd+0ygw72KaprcCEpq/O9zj3An7E2JwawicMEHAJwqnNOoPk2qJCUb+vR+p6AaEFzJjOMmL4M0DCA9z/QHk3JWiOsCTXIEdF+rfHFIF4lg17HJyu1LaBSZgbMU0R4+WlH+/iB87Vf/ssArLlCEWBHGxioGdDXTbm8GOZDrZhxLZFVN7qA1qzYu2no3X4iliZgBOBRr5FwxnLUg862VRLHNOMFAR9b3zbS+/IffvbVoDEr8oaBnA+hhOVUmr5j4jkD42BMWFn19K8iNoviAgi3ATy0pDrtzUyQ0xqF5JTKdwENdzBF4JGErNzdKp5YBOOoQRiPO2ph3bXTDHoH4LEl1UkP0HDtswboftcaju0xs29Wgym9AmCaiCdNp3oryDED1YRUIrAx8wTgiYi3l0yp5jyHiuIcEe4RuGTKqgwBAOqWVAO+jUX7KhHdDAEaeigpl5c85V0xpoEFAM8sqU5EAN8tqXYFXxhMxcA5Bh8xCMW4o9wQ1tHGgC6DMW1l1R3fCbvcWU1ZHfrnKEcF7bX/Dd650RGhtRBUAAAAAElFTkSuQmCC",
        pixelOffset: new CM.Cartesian2(0, 0),
        scale: 1,
        show: true,
        verticalOrigin: CM.VerticalOrigin.CENTER,
      },
      label: {
        fillColor: new CM.Color(244, 164, 96, 1),
        font: "18px Lucida Console",
        horizontalOrigin: CM.HorizontalOrigin.LEFT,
        // outlineColor: CM.Color.BLUE,
        outlineWidth: 0,
        pixelOffset: new CM.Cartesian2(12, 0),
        show: false,
        // style: CM.LabelStyle.FILL_AND_OUTLINE,
        text: `baseStation_${id}`,
        verticalOrigin: CM.VerticalOrigin.CENTER,
      },
      position: new CM.Cartesian3.fromDegrees(lng, lat),
    };
    viewer.entities.add(baseStation);
    // setSatelliteList(ele => [...ele, `baseStation_${id}`])
    //添加矩形Entity
    let radius = 1;
    viewer.entities.add({
      id: `ShowRange_${id}`,
      name: "选取范围",
      polygon: {
        hierarchy: new CM.PolygonHierarchy(
          CM.Cartesian3.fromDegreesArray([
            lng + radius,
            lat,
            lng + radius / 2,
            lat + radius / 2 * Math.sqrt(3),
            lng - radius / 2,
            lat + radius / 2 * Math.sqrt(3),
            lng - radius,
            lat,
            lng - radius / 2,
            lat - radius / 2 * Math.sqrt(3),
            lng + radius / 2,
            lat - radius / 2 * Math.sqrt(3),
          ])
        ),
        outline: true,
        outlineColor: CM.Color.RED,
        outlineWidth: 4,
        fill: false,
        material: CM.Color.fromCssColorString(
          "rgba(5, 39, 175, 0.3)"
        ).withAlpha(0.1),
      },
    });
    // 右边的六边形
    let lng2 = lng
    let lat2 = lat + radius * Math.sqrt(3)
    viewer.entities.add({
      id: `ShowRange_${id}1`,
      name: "选取范围",
      polygon: {
        hierarchy: new CM.PolygonHierarchy(
          CM.Cartesian3.fromDegreesArray([
            lng2 + radius,
            lat2,
            lng2 + radius / 2,
            lat2 + radius / 2 * Math.sqrt(3),
            lng2 - radius / 2,
            lat2 + radius / 2 * Math.sqrt(3),
            lng2 - radius,
            lat2,
            lng2 - radius / 2,
            lat2 - radius / 2 * Math.sqrt(3),
            lng2 + radius / 2,
            lat2 - radius / 2 * Math.sqrt(3),
          ])
        ),
        outline: true,
        outlineColor: CM.Color.RED,
        outlineWidth: 4,
        fill: false,
        material: CM.Color.fromCssColorString(
          "rgba(5, 39, 175, 0.3)"
        ).withAlpha(0.1),
      },
    });
    // 左边的六边形
    lat2 = lat - radius * Math.sqrt(3)
    viewer.entities.add({
      id: `ShowRange_${id}2`,
      name: "选取范围",
      polygon: {
        hierarchy: new CM.PolygonHierarchy(
          CM.Cartesian3.fromDegreesArray([
            lng2 + radius,
            lat2,
            lng2 + radius / 2,
            lat2 + radius / 2 * Math.sqrt(3),
            lng2 - radius / 2,
            lat2 + radius / 2 * Math.sqrt(3),
            lng2 - radius,
            lat2,
            lng2 - radius / 2,
            lat2 - radius / 2 * Math.sqrt(3),
            lng2 + radius / 2,
            lat2 - radius / 2 * Math.sqrt(3),
          ])
        ),
        outline: true,
        outlineColor: CM.Color.RED,
        outlineWidth: 4,
        fill: false,
        material: CM.Color.fromCssColorString(
          "rgba(5, 39, 175, 0.3)"
        ).withAlpha(0.1),
      },
    });
    // 左上角六边形
    lng2 = lng + radius * 3 / 2
    lat2 = lat - radius * Math.sqrt(3) / 2
    viewer.entities.add({
      id: `ShowRange_${id}3`,
      name: "选取范围",
      polygon: {
        hierarchy: new CM.PolygonHierarchy(
          CM.Cartesian3.fromDegreesArray([
            lng2 + radius,
            lat2,
            lng2 + radius / 2,
            lat2 + radius / 2 * Math.sqrt(3),
            lng2 - radius / 2,
            lat2 + radius / 2 * Math.sqrt(3),
            lng2 - radius,
            lat2,
            lng2 - radius / 2,
            lat2 - radius / 2 * Math.sqrt(3),
            lng2 + radius / 2,
            lat2 - radius / 2 * Math.sqrt(3),
          ])
        ),
        outline: true,
        outlineColor: CM.Color.RED,
        outlineWidth: 4,
        fill: false,
        material: CM.Color.fromCssColorString(
          "rgba(5, 39, 175, 0.3)"
        ).withAlpha(0.1),
      },
    });
    //左下角六边形
    lng2 = lng - radius * 3 / 2
    viewer.entities.add({
      id: `ShowRange_${id}4`,
      name: "选取范围",
      polygon: {
        hierarchy: new CM.PolygonHierarchy(
          CM.Cartesian3.fromDegreesArray([
            lng2 + radius,
            lat2,
            lng2 + radius / 2,
            lat2 + radius / 2 * Math.sqrt(3),
            lng2 - radius / 2,
            lat2 + radius / 2 * Math.sqrt(3),
            lng2 - radius,
            lat2,
            lng2 - radius / 2,
            lat2 - radius / 2 * Math.sqrt(3),
            lng2 + radius / 2,
            lat2 - radius / 2 * Math.sqrt(3),
          ])
        ),
        outline: true,
        outlineColor: CM.Color.RED,
        outlineWidth: 4,
        fill: false,
        material: CM.Color.fromCssColorString(
          "rgba(5, 39, 175, 0.3)"
        ).withAlpha(0.1),
      },
    });
    //右上角六边形
    lng2 = lng + radius * 3 / 2
    lat2 = lat + radius * Math.sqrt(3) / 2
    viewer.entities.add({
      id: `ShowRange_${id}5`,
      name: "选取范围",
      polygon: {
        hierarchy: new CM.PolygonHierarchy(
          CM.Cartesian3.fromDegreesArray([
            lng2 + radius,
            lat2,
            lng2 + radius / 2,
            lat2 + radius / 2 * Math.sqrt(3),
            lng2 - radius / 2,
            lat2 + radius / 2 * Math.sqrt(3),
            lng2 - radius,
            lat2,
            lng2 - radius / 2,
            lat2 - radius / 2 * Math.sqrt(3),
            lng2 + radius / 2,
            lat2 - radius / 2 * Math.sqrt(3),
          ])
        ),
        outline: true,
        outlineColor: CM.Color.RED,
        outlineWidth: 4,
        fill: false,
        material: CM.Color.fromCssColorString(
          "rgba(5, 39, 175, 0.3)"
        ).withAlpha(0.1),
      },
    });
    //右下角六边形
    lng2 = lng - radius * 3 / 2
    viewer.entities.add({
      id: `ShowRange_${id}6`,
      name: "选取范围",
      polygon: {
        hierarchy: new CM.PolygonHierarchy(
          CM.Cartesian3.fromDegreesArray([
            lng2 + radius,
            lat2,
            lng2 + radius / 2,
            lat2 + radius / 2 * Math.sqrt(3),
            lng2 - radius / 2,
            lat2 + radius / 2 * Math.sqrt(3),
            lng2 - radius,
            lat2,
            lng2 - radius / 2,
            lat2 - radius / 2 * Math.sqrt(3),
            lng2 + radius / 2,
            lat2 - radius / 2 * Math.sqrt(3),
          ])
        ),
        outline: true,
        outlineColor: CM.Color.RED,
        outlineWidth: 4,
        fill: false,
        material: CM.Color.fromCssColorString(
          "rgba(5, 39, 175, 0.3)"
        ).withAlpha(0.1),
      },
    });

  };
  // 绘制线条测量距离
  const measureDistance = () => {
    if (!isDrawLine) return;
    viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(
      CM.ScreenSpaceEventType.LEFT_DOUBLE_CLICK
    );
    handler = new CM.ScreenSpaceEventHandler(
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
        if (!CM.defined(poly)) {
          //@ts-ignore
          poly = new PolyLinePrimitive(positions);
        } else {
          positions.pop();
          positions.push(cartesian);
        }
        let curPositions = positions.slice(0);
        distance = getSpaceDistance(curPositions);
      }
    }, CM.ScreenSpaceEventType.MOUSE_MOVE);
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
          color: CM.Color.RED,
          outlineColor: CM.Color.WHITE,
          outlineWidth: 2,
        },
        label: {
          text: textDisance,
          font: "18px sans-serif",
          fillColor: CM.Color.GOLD,
          style: CM.LabelStyle.FILL_AND_OUTLINE,
          outlineWidth: 2,
          verticalOrigin: CM.VerticalOrigin.BOTTOM,
          pixelOffset: new CM.Cartesian2(20, -20),
        },
      });
    }, CM.ScreenSpaceEventType.LEFT_CLICK);
    handler.setInputAction(function () {
      // handler.destroy(); // 关闭事件句柄
      positions.pop(); // 最后一个点无效
      positions = [];
      poly = null;
      distance = "0";
      cartesian = null;
    }, CM.ScreenSpaceEventType.RIGHT_CLICK);
    var PolyLinePrimitive = (function () {
      function _(this: any, positions: any) {
        this.options = {
          name: "直线",
          polyline: {
            show: true,
            positions: [],
            material: CM.Color.CHARTREUSE,
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
        this.options.polyline.positions = new CM.CallbackProperty(
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
        var point1cartographic = CM.Cartographic.fromCartesian(positions[i]);
        var point2cartographic = CM.Cartographic.fromCartesian(
          positions[i + 1]
        );
        /**根据经纬度计算出距离**/
        var geodesic = new CM.EllipsoidGeodesic();
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
    handler = new CM.ScreenSpaceEventHandler(
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
        var dynamicPositions = new CM.CallbackProperty(function () {
          return new CM.PolygonHierarchy(curPositions);
          return positions;
        }, false);
        polygon = PolygonPrimitive(dynamicPositions);
      }
    }, CM.ScreenSpaceEventType.MOUSE_MOVE);
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
      var cartographic = CM.Cartographic.fromCartesian(
        curPositions[curPositions.length - 1]
      );
      var longitudeString = CM.Math.toDegrees(cartographic.longitude);
      var latitudeString = CM.Math.toDegrees(cartographic.latitude);
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
          color: CM.Color.RED,
          outlineColor: CM.Color.WHITE,
          outlineWidth: 2,
          heightReference: CM.HeightReference.CLAMP_TO_GROUND,
        },
        label: {
          text: labelText,
          font: "18px sans-serif",
          fillColor: CM.Color.GOLD,
          style: CM.LabelStyle.FILL_AND_OUTLINE,
          outlineWidth: 2,
          verticalOrigin: CM.VerticalOrigin.BOTTOM,
          pixelOffset: new CM.Cartesian2(20, -20),
        },
      });
    }, CM.ScreenSpaceEventType.LEFT_CLICK);
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
          fillColor: CM.Color.RED,
          style: CM.LabelStyle.FILL_AND_OUTLINE,
          outlineWidth: 2,
          verticalOrigin: CM.VerticalOrigin.BOTTOM,
          pixelOffset: new CM.Cartesian2(20, -40),
          heightReference: CM.HeightReference.CLAMP_TO_GROUND,
        },
      });
      positions = [];
      tempPoints = [];
      polygon = null;
      cartesian = null;
    }, CM.ScreenSpaceEventType.RIGHT_CLICK);
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
          material: CM.Color.GREEN.withAlpha(0.1),
        },
      });
    }
    function distance(point1: any, point2: any) {
      var point1cartographic = CM.Cartographic.fromCartesian(point1);
      var point2cartographic = CM.Cartographic.fromCartesian(point2);
      /**根据经纬度计算出距离**/
      var geodesic = new CM.EllipsoidGeodesic();
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
  const nowSatellitePostion = () => {
    let cartographic = null;
    cartographic = CM.Cartographic.fromCartesian(
      nowPicksatellite.primitive._actualPosition
    );
    let x = CM.Math.toDegrees(cartographic.longitude);
    let y = CM.Math.toDegrees(cartographic.latitude);
    let z = Math.ceil(cartographic.height / 1000);
    let nowDate = new Date(viewer.clock.currentTime).toUTCString();
    // 时间没有暂停
    if (viewer.clock.shouldAnimate) {
      setNowSystemDate((prev) => {
        return [...prev, nowDate];
      });
      setSatellitePostionData((prev) => {
        return [...prev, z];
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
      availability: new CM.TimeIntervalCollection([
        new CM.TimeInterval({
          start: start,
          stop: stop,
        }),
      ]),
      position: position,
      cylinder: {
        length: height,
        topRadius: 0,
        bottomRadius: bottomRadius,
        // material: CM.Color.RED.withAlpha(.4),
        // outline: !0,
        numberOfVerticalLines: 0,
        // outlineColor: CM.Color.RED.withAlpha(.8),
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
      snow = new CM.PostProcessStage({
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
      rain = new CM.PostProcessStage({
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
      let FogStage = CM.PostProcessStageLibrary.createBrightnessStage();
      //this.FogStage.uniforms.brightness=2;//整个场景通过后期渲染变亮 1为保持不变 大于1变亮 0-1变暗 uniforms后面为对应glsl里面定义的uniform参数
      var fs_fog = FS_Fog();
      FogStage = new CM.PostProcessStage({
        name: "self",
        //sampleMode:PostProcessStageSampleMode.LINEAR,
        fragmentShader: fs_fog,
      });
      stages.add(FogStage);
    }
  };

  useEffect(() => {
    for (let i of selectSatelliteList) {
      console.log(selectSatelliteList);
      var pick = viewer.entities.getById(i[0]);
      let curradarScanner = viewer.entities.getById("radarScan_" + i[0]);
      curradarScanner.show = i[1];
      if (pick.id) {
        if (pick._path != undefined) {
          pick._path.show = i[1];
        }
      }
    }
  }, [selectSatelliteList]);
  useEffect(() => {
    if (init) {
      // 监听摄像机高度变化
      viewer.camera.changed.addEventListener(() => {
        // 当前高度
        let height = viewer.camera.positionCartographic.height;
        let baseStationEntity = viewer.entities.getById(
          `Facility/${curBaseStation?.name}`
        );

        // 当高度小于一定值 显示模型
        if (height <= 2000) {
          baseStationEntity.billboard.show = false;
          if (baseStationEntity.model == undefined) {
            baseStationEntity.model = {
              // 引入模型
              uri: "./baseStation.gltf",
              // 配置模型大小的最小值
              minimumPixelSize: 0.05,
              //配置模型大小的最大值
              maximumScale: 0.05,
              //配置模型轮廓的颜色
              silhouetteColor: CM.Color.WHITE,
              //配置轮廓的大小
              silhouetteSize: 0,
            };
          } else {
            baseStationEntity.model.show = true;
          }
        } else {
          if (baseStationEntity.model != undefined) {
            baseStationEntity.model.show = false;
            baseStationEntity.billboard.show = true;
          }
        }

        if (height <= 1000) {
          Jsonp(
            `https://api.caiyunapp.com/v2.5/8PdoZBYiEPf3PT7C/${curBaseStation?.pos[0]},${curBaseStation?.pos[1]}/realtime.json"`,
            {},
            function (err, res) {
              let curWeather = res.result.realtime.skycon;

              if (["CLEAR_DAY", "CLEAR_NIGHT"].includes(curWeather)) {
                addWeather();
              } else if (["HEAVY_RAIN", "STORM_RAIN"].includes(curWeather)) {
                addWeather("rain", 0.7);
              } else if (["LIGHT_RAIN", "MODERATE_RAIN"].includes(curWeather)) {
                addWeather("rain", 0.3);
              } else if (["HEAVY_SNOW", "STORM_SNOW"].includes(curWeather)) {
                addWeather("snow", 0.7);
              } else if (["LIGHT_SNOW", "MODERATE_SNOW"].includes(curWeather)) {
                addWeather("snow", 0.3);
              } else if (["FOG"].includes(curWeather)) {
                addWeather("fog");
              } else {
                addWeather();
              }
            }
          );
        }
      });

      viewer.camera.setView({
        destination: CM.Cartesian3.fromDegrees(
          curBaseStation?.pos[0],
          curBaseStation?.pos[1],
          0
        ),

        // orientation: {
        //   heading: CM.Math.toRadians(286.69615060171867),
        //   pitch: CM.Math.toRadians(-5.205762977472191),
        //   roll: CM.Math.toRadians(360 || 0)
        // },
      });

      // setIsRotate(false);
      viewer.camera.lookDown(5000);
      viewer.camera.moveBackward(500);
    }
  }, [curBaseStation?.pos[0], curBaseStation?.pos[1]]);
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
            />
          }
        />
        <Box title="卫星数量统计图" component={<SatelliteBar />} />
      </div>
      <div
        id="cesiumContainer"
        style={{
          height: "100%",
          width: "100%",
          // backgroundImage: "url(./images/star.jpg)",
        }}
      ></div>
      <div className="right-wrap">
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
            />
          }
        />
        <Box title="卫星数量变化图" component={<SatelliteNumberChart />} />
      </div>
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
            //debugger;
            setIsDrawPolygon(!isDrawPolygon);
          }}
          className="cesium-button"
        >
          MeasureArea
        </button>
      </div>
      <div id="left-border-line"></div>
      <div id="right-border-line"></div>
    </>
  );
};
export default CesiumComponent;
