import { Dispatch, SetStateAction } from "react";

export type SetState<T> = Dispatch<SetStateAction<T>>;
export type DataType = {
    key: React.Key;
  }
  
export type satelliteListType = {
    statelliteList: string[]
    setSatelliteList: SetState<any[]>
  }
export type BaseStation = {
    name: string,
    desc?: string,
    pos: number[],
    state?: string,
    weatherKey?:string;
    strong?:number;
}
export type Dashboard = {
    type: "satellite"|"baseStation"|undefined;
    id: string|undefined;
  };
  
export type CesiumComponentType ={
}

export type PolarEarthProps = {
  position: []
}

export type CesiumSettingType = {
  mode?: number,
}
export type SettingType = {
  mode?: number,
  light?: {val: boolean, name: string},
  sun?: {val: boolean, name: string},
  star?:{val: boolean, name: string},
  time?: {val: boolean, name: string},
  rotate?: {val: boolean, name: string}
  label?: {val: boolean, name: string},
  icon?: {val: boolean, name: string},
  model?:{val: boolean, name: string},
  track?:{val: boolean, name: string},
}

export type StatelliteCardType = {
  nowStatelliteName: any[]
  statelliteType: string
  setNowSatellite : SetState<any[]>
}

  /////////////////////////场景数据类型///////////////////////////////
export type SceneDataType = {
  selectedSatelliteList: string[],
  curBaseStation: BaseStation,
  cesiumSetting: CesiumSettingType,
  isEdit: boolean,
  sceneName: string
}
