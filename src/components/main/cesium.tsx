import React, { useEffect, useState } from "react";
//@ts-ignore
import * as CM from "cesium/Cesium";
// import "../../css/button.css";

const CesiumComponent: React.FC<{}> = () => {
  const [init, setInit] = useState<boolean>(false);

  useEffect(() => {
    setInit(true);
  }, []);

  useEffect(() => {
    if (init) {
      CM.Ion.defaultAccessToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiYTg4MTUyNy0zMTA2LTRiMDktOGE1My05ZDA4OTRmOTE3YzciLCJpZCI6MTAzMjg1LCJpYXQiOjE2NTk0MDcyODB9.sfpT8e4oxun23JG--UmUN9ZD4SbQfU-Ljvh2MsPTTcY";
      const viewer = new CM.Viewer("cesiumContainer", {
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
        reset: function () {}, 
      };

      //@ts-ignore
      Sandcastle.addDefaultToolbarButton("Satellites", function () {
        // 读取轨迹数据
        let dronePromise = CM.CzmlDataSource.load("./data/starlink-3.czml");
        // 加载实体
        let drone;
        dronePromise.then((dataSource: any) => {
          viewer.dataSources.add(dronePromise);
          // 通过ID选择需要轨迹的实体
          drone = dataSource.entities.getById("Satellite/ISS");
          // console.log(dataSource.entities._entities._array[0]);
          // console.log(dataSource.entities);

          dataSource.entities._entities._array.forEach((ele: any) => {
            ele.billboard = undefined;
            // 1. 改成点
            ele.point = {
              show: true,
              color: CM.Color.WHITE,
              // outlineWidth: 4,
              pixelSize: 5,
            };

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
            // var baseStationRadius = 50
            // if(ele.id === 'Facility/AGI'){
            //   let wgsPosition = GetWGS84FromDKR(ele.position.cartesian)
            //   console.log(wgsPosition);
              
            // }
          });
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
          }
        }
      }, CM.ScreenSpaceEventType.LEFT_CLICK);
      handler.setInputAction(function (click: { position: any }) {
        var pick = viewer.scene.pick(click.position);
        if (pick && pick.id) {
          if (pick.id._path != undefined) {
            pick.id._path.show = false;
          }
        }
      }, CM.ScreenSpaceEventType.RIGHT_CLICK);
      drawDistanceLine(viewer);
    }
  }, [init]);

  // 绘制线条测量距离
const drawDistanceLine = (viewer: any) => {
  // 笛卡尔坐标系转经纬度
  const GetWGS84FromDKR = (coor: any) => {
    let cartographic = CM.Cartographic.fromCartesian(coor);
    let x=CM.Math.toDegrees(cartographic.longitude);
    let y=CM.Math.toDegrees(cartographic.latitude);
    let wgs84=`(经度 :${x.toFixed(2)}, 纬度 : ${y.toFixed(2)})`;
    return wgs84;
  }

  viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(
    CM.ScreenSpaceEventType.LEFT_DOUBLE_CLICK
  );

  let handler = new CM.ScreenSpaceEventHandler(
    viewer.scene._imageryLayerCollection
  );
  var positions: any[] = [];
  var poly: any = null;
  var distance: string | null = '0';
  var cartesian = null;
  var floatingPoint;

  handler.setInputAction(function (movement: { endPosition: any; }) {
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
      distance = getSpaceDistance(positions);
    }
  }, CM.ScreenSpaceEventType.MOUSE_MOVE);

  handler.setInputAction(function (movement: { position: any; }) {
    let ray = viewer.camera.getPickRay(movement.position);
    cartesian = viewer.scene.globe.pick(ray, viewer.scene);
    if (positions.length == 0) {
      positions.push(cartesian.clone());
    }
    positions.push(cartesian);
    var textDisance = distance + ' km';
    floatingPoint = viewer.entities.add({
      name: `${GetWGS84FromDKR(positions[positions.length - 1])}`,
      position: positions[positions.length - 1],
      point: {
        pixelSize: 5,
        color: CM.Color.RED,
        outlineColor: CM.Color.WHITE,
        outlineWidth: 2,
      },
      label: {
        text: textDisance,
        font: '18px sans-serif',
        fillColor: CM.Color.GOLD,
        style: CM.LabelStyle.FILL_AND_OUTLINE,
        outlineWidth: 2,
        verticalOrigin: CM.VerticalOrigin.BOTTOM,
        pixelOffset: new CM.Cartesian2(20, -20),
      },
    });
  }, CM.ScreenSpaceEventType.LEFT_CLICK);

  handler.setInputAction(function () {
    handler.destroy();  // 关闭事件句柄
    positions.pop();  // 最后一个点无效
  }, CM.ScreenSpaceEventType.RIGHT_CLICK);
  var PolyLinePrimitive = (function () {
    function _(this: any, positions: any) {
      this.options = {
        name: '直线',
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
      var point1cartographic = CM.Cartographic.fromCartesian(
        positions[i]
      );
      var point2cartographic = CM.Cartographic.fromCartesian(
        positions[i + 1]
      );
      /**根据经纬度计算出距离**/
      var geodesic = new CM.EllipsoidGeodesic();
      geodesic.setEndPoints(point1cartographic, point2cartographic);
      var s = geodesic.surfaceDistance;
      //console.log(Math.sqrt(Math.pow(distance, 2) + Math.pow(endheight, 2)));
      //返回两点之间的距离
      s = Math.sqrt(
        Math.pow(s, 2) +
          Math.pow(point2cartographic.height - point1cartographic.height, 2)
      );
      distance = distance + s;
    }
    return (distance/1000).toFixed(2);
  }
}

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

        // #cesiumContainer{
        //   background-repeat:no-repeat ;
        //   background-size: cover;
        // }
      `}
      </style>
      <div id="toolbar"></div>
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
