import React, { ReactElement, useEffect, useRef } from "react";
import "./css/box.css";

type BoxProps = {
  component?: ReactElement<any, any>;
  title: string;
};

/**
 * 包装每个组件，统一样式
 * @param props
 * @returns
 */
const Box: React.FC<BoxProps> = (props) => {
  const boxRef = React.useRef(null);
  /**
   * 获取每个box的大小，传给子组件
   */
  useEffect(() => {
    // const { clientWidth, clientHeight }: any = boxRef.current;
    // console.log(clientWidth, clientHeight);
  });
  return (
    <div id="box" ref={boxRef}>
      <div className="boxTitle">
        <span className="cube">&nbsp;</span>
        {props.title}
      </div>
      <div className="boxContent">{props.component}</div>
    </div>
  );
};

export default Box;
