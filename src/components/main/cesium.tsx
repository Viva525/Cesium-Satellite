import React, { useEffect, useState, useRef } from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { TableRowSelection } from 'antd/es/table/interface';
//@ts-ignore
import * as CM from "cesium/Cesium";
import { assert } from "console";
import * as echarts from 'echarts';
import SatelliteList from "../satelliteList"


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
let nowPicksatellite: any
// let satelliteList: {[key:string]:any []} = {};
// let satelliteList: string[] = []
const CesiumComponent: React.FC<{}> = () => {
  const [init, setInit] = useState<boolean>(false);
  const [isDrawLine, setIsDrawLine] = useState<boolean>(false);
  const [isDrawPolygon, setIsDrawPolygon] = useState<boolean>(false);
  const [definitionChanged, setDefinitionChanged] = useState<any>(
    new CM.Event()
  );
  const [colorSubscription, setColorSubscription] = useState<any>(undefined);
  const [duration, setDuration] = useState<any>(undefined);
  const [color1, setColor1] = useState<any>(undefined);
  const [color2, setColor2] = useState<any>(undefined);
  const [count, setCount] = useState<any>(undefined);
  const [gradient, setGradient] = useState<any>(undefined);
  const [time, setTime] = useState<any>(undefined);

  const [satellitePostionData, setSatellitePostionData] = useState<number[]>([])
  const [nowSystemDate, setNowSystemDate] = useState<string[]>([])
  const [isPostion, setIsPostion] = useState<boolean>(false);
  const [satelliteList, setSatelliteList] = useState<string[]>([]);
  const [selectSatelliteList, setSelectSatelliteList] = useState<any[]>([])
  const chartRef = useRef(null)
  useEffect(() => {
    setInit(true);
  }, []);

  useEffect(() => {
    if (isDrawPolygon) {
      //@ts-ignore
      document.getElementById("measureArea").classList.add("btnSelected");
      //@ts-ignore
      document.getElementById("measureDistance").disabled = true;
      //@ts-ignore
      measureArea(viewer)
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
      document.getElementById('measureArea').disabled = false
      if (handler) {
        handler.destroy()
      }
    }
  }, [isDrawLine]);

  useEffect(() => {
    if (init) {
      CM.Ion.defaultAccessToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiYTg4MTUyNy0zMTA2LTRiMDktOGE1My05ZDA4OTRmOTE3YzciLCJpZCI6MTAzMjg1LCJpYXQiOjE2NTk0MDcyODB9.sfpT8e4oxun23JG--UmUN9ZD4SbQfU-Ljvh2MsPTTcY";
      viewer = new CM.Viewer("cesiumContainer", {
        shouldAnimate: true,
        // 去掉地球表面的大气效果黑圈问题
        skyAtmosphere: false, // 关闭地球光环
        orderIndependentTranslucency: false,
        contextOptions: {
          webgl: {
            alpha: true,
          },
        },
      });
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

      // 去掉黑色星空背景
      // viewer.scene.skyBox.show = false;
      // viewer.scene.backgroundColor = new CM.Color(0.0, 0.0, 0.0, 0.0);

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
        // addToggleButton: function (
        //   text: string,
        //   checked: boolean,
        //   onchange: (arg0: boolean) => void,
        //   toolbarID: any
        // ) {
        //   //@ts-ignore
        //   Sandcastle.declare(onchange);
        //   const input = document.createElement('input');
        //   input.checked = checked;
        //   input.type = 'checkbox';
        //   input.style.pointerEvents = 'none';
        //   const label = document.createElement('label');
        //   label.appendChild(input);
        //   label.appendChild(document.createTextNode(text));
        //   label.style.pointerEvents = 'none';
        //   const button = document.createElement('button');
        //   button.type = 'button';
        //   button.className = 'cesium-button';
        //   button.appendChild(label);

        //   button.onclick = function () {
        //     Sandcastle.reset();
        //     //@ts-ignore
        //     Sandcastle.highlight(onchange);
        //     input.checked = !input.checked;
        //     onchange(input.checked);
        //   };

        //   //@ts-ignore
        //   document.getElementById(toolbarID || 'toolbar').appendChild(button);
        // },
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
          //   debugger;
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
        let dronePromise = CM.CzmlDataSource.load("./data/starlink-50.czml");
        const stripeMaterial = new CM.StripeMaterialProperty({
          evenColor: CM.Color.WHITE.withAlpha(0.5),
          oddColor: CM.Color.BLUE.withAlpha(0.5),
          repeat: 5.0,
        });
        // 加载实体
        dronePromise.then((dataSource: any) => {
          viewer.dataSources.add(dronePromise);
          let entities = viewer.entities;
          // 通过ID选择需要轨迹的实体

          let nowSatelliteList: string[] = []
          dataSource.entities._entities._array.forEach((ele: any) => {
            // let drone = dataSource.entities.getById(ele.id);
            let id = ele.id

            // satelliteList[id] = []
            nowSatelliteList.push(id)
            viewer.entities.add(ele)

            // let cartographic = null
            // viewer.clock.onTick.addEventListener((clock: any) => {
            //   let positon = drone.position.getValue(clock.currentTime);
            //   cartographic = CM.Cartographic.fromCartesian(positon);
            //   let x = CM.Math.toDegrees(cartographic.longitude);
            //   let y = CM.Math.toDegrees(cartographic.latitude);
            //   let z = cartographic.height / 1000;
            //   satelliteList[id] = [x,y,z]
            // })


            // 1. 改成点
            if (ele.path != undefined) {
              ele.billboard = undefined;
              // 1. 改成点
              ele.point = {
                show: true,
                color: CM.Color.WHITE,
                // outlineWidth: 4,
                pixelSize: 5,
              };
            }

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
              ele.path.show = false; // 设置路径不可看
              ele.path.material.color = CM.Color.WHITE;
            }

            // 4. 集站附近绘制网格
            var Radius = 50;
            if (ele.id === "Facility/AGI") {
              //@ts-ignore
              let [lon, lat] = GetWGS84FromDKR(ele.position._value, 1)
              //主体
              // debugger;
              // let center =CM.Cartesian3.fromDegrees(parseFloat(lon),parseFloat(lat), 0);
              // //局部坐标系   右手坐标系
              // //x->东
              // //y->上
              // //z->南
              // let L2W = CM.Transforms.localFrameToFixedFrameGenerator('east', 'up')(center);//中心点
              // //函数
              // //计算点位
              // const computedposition =(L2W: any,x: number,y: number,z: number)=>{
              //   let temp = CM.Matrix4.multiplyByPoint(L2W,CM.Cartesian3.fromElements(x,y,z),new CM.Cartesian3())
              //   return temp
              // }
              // //获取长方形的四个顶点
              // const CreateRange = (L2W: any)=>{
              //   let LT = computedposition(L2W,-650,0,-350) ; 
              //   let LB = computedposition(L2W,-650,0,350) ; 
              //   let RT = computedposition(L2W,650,0,-350) ; 
              //   let RB = computedposition(L2W,650,0,350) ; 
              //   return [LT,LB,RB,RT]
              // }

              // let range = CreateRange(L2W);
              // console.log(range);
              //添加Entity
              let radius = 1
              lon = parseFloat(lon);
              lat = parseFloat(lat);
              viewer.entities.add({
                id: "ShowRange",
                name: "选取范围",
                polygon: {
                  hierarchy: new CM.PolygonHierarchy(
                    CM.Cartesian3.fromDegreesArray([
                      lon - radius,
                      lat + radius,
                      lon + radius,
                      lat + radius,
                      lon + radius,
                      lat - radius,
                      lon - radius,
                      lat - radius
                    ])
                  ),
                  outline: true,
                  outlineColor: CM.Color.RED,
                  outlineWidth: 4,
                  fill: false,
                  material: CM.Color.fromCssColorString("rgba(5, 39, 175, 0.3)").withAlpha(0.1),
                },
              });
              // var scene = viewer.scene;
              // var instance = new CM.GeometryInstance({
              //   geometry : new CM.RectangleGeometry({
              //     rectangle : CM.Rectangle.fromDegrees(-100.0, 20.0, -90.0, 30.0),
              //     vertexFormat : CM.EllipsoidSurfaceAppearance.VERTEX_FORMAT
              //   })
              // });

              // scene.primitives.add(new CM.Primitive({
              //   geometryInstances : instance,
              //   appearance : new CM.EllipsoidSurfaceAppearance({
              //     material : CM.Material.fromType('Stripe')
              //   })
              // }));

              // entities.add({
              //   rectangle: {
              //     coordinates: CM.Rectangle.fromDegrees(
              //       lon - 15 ,  // 西 [-Pi, Pi]
              //       lat - 15,  // 南 [-Pi/2, Pi/2]
              //       lon + 100,  // 东 [-Pi, Pi]
              //       lat  // 北 [-Pi/2, Pi/2] 
              //     ),
              //     heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
              //     material: CM.Color.fromRandom({ alpha: 0.5 }),
              //   },
              // });
            }
          });
          setSatelliteList(nowSatelliteList)
        });
        viewer.camera.flyHome(0);
      });

      // 鼠标事件
      var handler = new CM.ScreenSpaceEventHandler(viewer.scene.canvas);
      handler.setInputAction(function (click: { position: any }) {
        var pick = viewer.scene.pick(click.position);
        if (pick && pick.id) {
          if (pick.id._path != undefined) {
            pick.id._path.show = true;
            setIsPostion(true)
            if (nowPicksatellite) {
              if (pick.id !== nowPicksatellite.id) {
                nowPicksatellite = pick
                setNowSystemDate([])
                setSatellitePostionData([])
              }
            }
            else {
              nowPicksatellite = pick
            }
            viewer.clock.onTick.addEventListener(nowSatellitePostion, false)
          }
        }
      }, CM.ScreenSpaceEventType.LEFT_CLICK);
      handler.setInputAction(function (click: { position: any }) {
        var pick = viewer.scene.pick(click.position);
        if (pick && pick.id) {
          if (pick.id._path != undefined) {
            pick.id._path.show = false;
            setIsPostion(false)
            setNowSystemDate([])
            setSatellitePostionData([])
            viewer.clock.onTick.removeEventListener(nowSatellitePostion, false)
          }
        }
      }, CM.ScreenSpaceEventType.RIGHT_CLICK);

      // specialEffects()
      // getEllipseModel2()
    }
  }, [init]);
  // 笛卡尔坐标系转经纬度
  const GetWGS84FromDKR = (coor: any, type: number) => {
    let cartographic = CM.Cartographic.fromCartesian(coor);
    let x = CM.Math.toDegrees(cartographic.longitude);
    let y = CM.Math.toDegrees(cartographic.latitude);
    if (type === 0) return `(经度 :${x.toFixed(2)}, 纬度 : ${y.toFixed(2)})`
    else if (type === 1) return [x.toFixed(2) as number, y.toFixed(2) as number]
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
      // debugger;
      if (1) {
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
      }
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
    handler.setInputAction(function (movement: { position: any; }) {
      let ray = viewer.camera.getPickRay(movement.position);
      cartesian = viewer.scene.globe.pick(ray, viewer.scene);
      if (positions.length == 0) {
        positions.push(cartesian.clone());
      }
      positions.push(cartesian);
      let curPositions = positions.slice(0)
      //在三维场景中添加点
      var cartographic = CM.Cartographic.fromCartesian(curPositions[curPositions.length - 1]);
      var longitudeString = CM.Math.toDegrees(cartographic.longitude);
      var latitudeString = CM.Math.toDegrees(cartographic.latitude);
      var heightString = cartographic.height;
      var labelText = "(" + longitudeString.toFixed(2) + "," + latitudeString.toFixed(2) + ")";
      // @ts-ignore
      tempPoints.push({ lon: longitudeString, lat: latitudeString, hei: heightString });
      floatingPoint = viewer.entities.add({
        name: '多边形面积',
        position: curPositions[curPositions.length - 1],
        point: {
          pixelSize: 5,
          color: CM.Color.RED,
          outlineColor: CM.Color.WHITE,
          outlineWidth: 2,
          heightReference: CM.HeightReference.CLAMP_TO_GROUND
        },
        label: {
          text: labelText,
          font: '18px sans-serif',
          fillColor: CM.Color.GOLD,
          style: CM.LabelStyle.FILL_AND_OUTLINE,
          outlineWidth: 2,
          verticalOrigin: CM.VerticalOrigin.BOTTOM,
          pixelOffset: new CM.Cartesian2(20, -20),
        }
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
    function Angle(p1: { lat: number; lon: number; }, p2: { lat: number; lon: number; }, p3: { lat: number; lon: number; }) {
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
        }
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
      s = Math.sqrt(Math.pow(s, 2) + Math.pow(point2cartographic.height - point1cartographic.height, 2));
      return s;
    }
  };

  // const drawPolygon = () => {

  // }

  //   const specialEffects = () => {
  //     function CircleWaveMaterialProperty (color: any, duration: any, count: any, gradient: any) {
  //       setColor2(color)
  //       setDuration(CM.defaultValue(duration, 1e3))
  //       setCount(CM.defaultValue(count, 2))
  //       if (count <= 0) setCount(1)
  //       setGradient(CM.defaultValue(gradient, 0.1))
  //       if (gradient < 0) setGradient(0)
  //       else if (gradient > 1) setGradient(1)
  //       setTime(performance.now())

  //     }
  //     Object.defineProperties(CircleWaveMaterialProperty.prototype, {
  //       isConstant: {
  //         get: function () {
  //           return false
  //         }
  //       },
  //       definitionChanged: {
  //         get: function () {
  //           return definitionChanged
  //         }
  //       },
  //       color: CM.createPropertyDescriptor('color')
  //     })
  //     CircleWaveMaterialProperty.prototype.getType = function () {
  //       return CM.Material.CircleWaveMaterialType
  //     }
  //     CircleWaveMaterialProperty.prototype.getValue = function (time_1: any, result: { color?: any; time?: any; count?: any; gradient?: any; }) {
  //       if (!CM.defined(result)) {
  //         result = {}
  //       }
  //       result.color = CM.Property.getValueOrClonedDefault(color1, time_1, CM.Color.WHITE, result.color)
  //       result.time = (((new Date()).getTime() - time) % duration) / duration
  //       result.count = count
  //       result.gradient = 1 + 10 * (1 - gradient)
  //       return result
  //     }
  //     CircleWaveMaterialProperty.prototype.equals = function (other: { _color: any; }) {
  //       return this === other ||
  //         (other instanceof CircleWaveMaterialProperty &&
  //           CM.Property.equals(color1, other._color))
  //     }
  //     //@ts-ignore
  //     CM.CircleWaveMaterialProperty = CircleWaveMaterialProperty
  //     CM.Material.CircleWaveMaterialType = 'CircleWaveMaterial'
  //     CM.Material.CircleWaveSource = `czm_material czm_getMaterial(czm_materialInput materialInput)\n
  //   {\n
  //       czm_material material = czm_getDefaultMaterial(materialInput);\n
  //       material.diffuse = 1.5 * color.rgb;\n
  //       vec2 st = materialInput.st;\n
  //       vec3 str = materialInput.str;\n
  //       float dis = distance(st, vec2(0.5, 0.5));\n
  //       float per = fract(time);\n
  //       if (abs(str.z) > 0.001) {\n
  //           discard;\n
  //       }\n
  //       if (dis > 0.5) { \n
  //           discard; \n
  //       } else { \n
  //           float perDis = 0.5 / count;\n
  //           float disNum; \n
  //           float bl = .0; \n
  //           for (int i = 0; i <= 999; i++) { \n
  //               if (float(i) <= count) { \n
  //                 disNum = perDis *
  //   float(i) - dis + per / count; \n
  //                   if (disNum > 0.0) { \n
  //                       if (disNum < perDis) { \n
  //                           bl = 1.0 - disNum / perDis;\n
  //                       }\n
  //                     else if
  //   (disNum - perDis < perDis) { \n
  //                               bl = 1.0 - abs(1.0 - disNum / perDis); \n
  //                       } \n
  //                       material.alpha = pow(bl, gradient); \n
  //                   } \n
  //               } \n
  //           } \n
  //       } \n
  //   return material; \n
  //   } \n`
  //     CM.Material._materialCache.addMaterial(CM.Material.CircleWaveMaterialType, {
  //       fabric: {
  //         type: CM.Material.CircleWaveMaterialType,
  //         uniforms: {
  //           color: new CM.Color(1.0, 0.0, 0.0, 1.0),
  //           time: 1,
  //           count: 1,
  //           gradient: 0.1
  //         },
  //         source: CM.Material.CircleWaveSource
  //       },
  //       translucent: function () {
  //         return !0
  //       }
  //     })
  //   }

  const nowSatellitePostion = () => {

    let cartographic = null
    cartographic = CM.Cartographic.fromCartesian(nowPicksatellite.primitive._actualPosition);

    let x = CM.Math.toDegrees(cartographic.longitude);
    let y = CM.Math.toDegrees(cartographic.latitude);
    let z = cartographic.height / 1000;
    let nowDate = (new Date(viewer.clock.currentTime)).toUTCString()

    if (viewer.clock.shouldAnimate) {
      setNowSystemDate((prev) => {
        return [...prev, nowDate]
      })
      setSatellitePostionData((prev) => {
        return [...prev, z]
      })
    }
  }



  useEffect(() => {
    if (satellitePostionData.length !== 0) {

      let myChart = echarts.getInstanceByDom(chartRef.current as unknown as HTMLDivElement);
      if (myChart == null) {
        myChart = echarts.init(chartRef.current as unknown as HTMLDivElement, 'dark');
      }
      let option = {
        xAxis: {
          type: 'category',
          data: nowSystemDate
        },
        yAxis: {
          type: 'value',
          min: (value: any) => {
            return value.min - 1
          },
          max: (value: any) => {
            return value.max + 1
          }
        },
        dataZoom: [{
          type: 'inside',
          orient: 'vertical'
        }],
        series: [
          {
            data: satellitePostionData,
            type: 'line'
          }
        ]
      };
      myChart.setOption(option);
      myChart.resize()
    }

  }, [satellitePostionData, nowSystemDate])

  useEffect(() => {
    for(let i of selectSatelliteList){
      console.log(selectSatelliteList)
      var pick = viewer.entities.getById(i[0]);
      if (pick.id) {
        if (pick._path != undefined) {
          pick._path.show = i[1];
        }
      }
    }
  }, [selectSatelliteList])
  setInterval(function () {
  })
  return (
    <>
      <style>
        {`.cesium-button {
          background: #303336;
          border: 1px solid #444;
          color: #edffff;
          fill: #edffff;
          border-radius: 4px;
          padding: 5px 12px;
          margin: 10px 10px;
          cursor: pointer;
          overflow: hidden;
          -moz-user-select: none;
          -webkit-user-select: none;
          -ms-user-select: none;
          user-select: none;
          z-index:999;
        }
        #toolbar{
          position:absolute;
        }
        #satellite{
          height: 15vh;
          width:20vw;
          background:#fff;
          position:absolute;
          z-index:999;
        }
        #satelliteList{
          height: 100vh;
          width:15vw;
          background:#fff;
          z-index:999;
          position:absolute;
          float:left;
        }

        // #cesiumContainer{
        //   background-repeat:no-repeat ;
        //   background-size: cover;
        // }

        .btnSelected{
          background:#4488bb
        }

      `}
      </style>
      <div id="satelliteList">
        <SatelliteList
          statelliteList={satelliteList}
          setSelectSatelliteList={setSelectSatelliteList}
        />
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
      {
        isPostion === true &&
        <div id="satellite" className="charts" ref={chartRef}></div>
      }
      <div
        id="cesiumContainer"
        style={{
          height: "100%",
          width: "100%",
          // backgroundImage: "url(./images/star.jpg)",
        }}
      ></div>
    </>
  );
};

export default CesiumComponent;
