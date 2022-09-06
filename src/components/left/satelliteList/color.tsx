//@ts-nocheck
import { SketchPicker } from "react-color";
import reactCSS from "reactcss";
import React, { Dispatch, SetStateAction, useState } from "react";

export type SetState<T> = Dispatch<SetStateAction<T>>;

type satelliteColor = {
  satellityKey: React.Key;
  setSelectSatelliteList: SetState<any[]>;
};
const ColorSelect: React.FC<satelliteColor> = (props) => {
  const [color, setColor] = useState({ r: "241", g: "112", b: "19", a: "1" });
  const [displayColorPicker, setDisplayColorPicker] = useState<boolean>(false);
  const { satellityKey, setSelectSatelliteList } = props;

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

  const handleChange = (color: { rgb: any }) => {
    setColor(color.rgb);
    setSelectSatelliteList([[1, satellityKey, color.rgb]]);
  };

  return (
    // <SketchPicker
    //   color= {color}
    //   // width={"100%"}
    //   onChange={(color: any) => {
    //     setColor(color.rgb)
    //     setSelectSatelliteList([[1, satellityKey, color.rgb]])
    //   }}
    // />
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
