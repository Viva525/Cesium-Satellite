//@ts-nocheck
import { RGBColor, SketchPicker } from "react-color";
import reactCSS from "reactcss";
import React, { Dispatch, SetStateAction, useState, memo } from "react";
import ColumnGroup from "antd/lib/table/ColumnGroup";

export type SetState<T> = Dispatch<SetStateAction<T>>;

type satelliteColor = {
  initColor: RGBColor
  setSatelliteColor:SetState<any>;
  satellityKey: React.Key;
  setSelectSatelliteList: SetState<any[]>;
};
const ColorSelect: React.FC<satelliteColor> = (props) => {
  const {initColor, satellityKey, setSelectSatelliteList } = props;
  const [color, setColor] = useState(initColor);
  const [displayColorPicker, setDisplayColorPicker] = useState<boolean>(false);


  const styles = reactCSS({
    default: {
      color: {
        width: "50px",
        height: "15px",
        borderRadius: "1px",
        background: `rgba(${color.r }, ${color.g }, ${ color.b }, ${color.a })`,
      },
      swatch: {
        padding: "2px",
        background: "#fff",
        borderRadius: "1px",
        boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
        display: "inline-block",
        cursor: "pointer",
        verticalAlign: "middle"
      },
      popover: {
        position: "absolute",
        zIndex: "2",
      },
      cover: {
        position: "fixed",
        top: "0px",
        right: "0px",
        bottom: "0px",
        left: "0px",
      },
    },
  });

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const handleChange = (color: { rgb: RGBColor }) => {
    setColor(color.rgb);
    setSelectSatelliteList([[1, satellityKey, color.rgb]]);
    // setSatelliteColor({...ele, satellityKey: ColumnGroup.rgb})
  };

  return (
    <div>
      <div style={styles.swatch} onClick={handleClick}>
        <div style={styles.color} />
      </div>
      {displayColorPicker ? (
        <div style={styles.popover}>
          <div style={styles.cover} onClick={handleClose} />
          <SketchPicker color={color} onChange={handleChange} />
        </div>
      ) : null}
    </div>
  );
};

export default ColorSelect;
