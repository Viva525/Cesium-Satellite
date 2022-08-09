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
      });
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
        addToggleButton: function (
          text: string,
          checked: boolean,
          onchange: (arg0: boolean) => void,
          toolbarID: any
        ) {
          //@ts-ignore
          Sandcastle.declare(onchange);
          const input = document.createElement("input");
          input.checked = checked;
          input.type = "checkbox";
          input.style.pointerEvents = "none";
          const label = document.createElement("label");
          label.appendChild(input);
          label.appendChild(document.createTextNode(text));
          label.style.pointerEvents = "none";
          const button = document.createElement("button");
          button.type = "button";
          button.className = "cesium-button";
          button.appendChild(label);

          button.onclick = function () {
            Sandcastle.reset();
            //@ts-ignore
            Sandcastle.highlight(onchange);
            input.checked = !input.checked;
            onchange(input.checked);
          };

          //@ts-ignore
          document.getElementById(toolbarID || "toolbar").appendChild(button);
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
        console.log(111);

        viewer.dataSources.add(
          // CM.CzmlDataSource.load("D:/Project/SatVis/Cesium-Satellite/src/data/simple.czml")
          CM.CzmlDataSource.load("./data/simple.czml")
        );

        viewer.camera.flyHome(0);
      });
    }
  }, [init]);

  return (
    <>
    <style>
      {
        `
        .cesium-button {
          display: inline-block;
          position: relative;
          background: #303336;
          border: 1px solid #444;
          color: #edffff;
          fill: #edffff;
          border-radius: 4px;
          padding: 5px 12px;
          margin: 2px 3px;
          cursor: pointer;
          overflow: hidden;
          -moz-user-select: none;
          -webkit-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
      `
      }
    </style>
      <div id="toolbar"></div>
      <div id="cesiumContainer"></div>
      <div id="loadingOverlay">
        <h1>Loading...</h1>
      </div>
    </>
  );
};


export default CesiumComponent;
