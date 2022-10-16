import { Dispatch, SetStateAction } from "react";

export type SetState<T> = Dispatch<SetStateAction<T>>;
export type DataType = {
    key: React.Key;
  }
  
export type satelliteListType = {
    statelliteList: string[]
    setSelectSatelliteList: SetState<any[]>
    setSelectedSatelliteList: SetState<any[]>
  }
export type BaseStation = {
    name: string,
    desc?: string,
    pos: number[],
    state?: string
}
export type Dashboard = {
    type: "satellite"|"baseStation"|undefined;
    id: string|undefined;
  };
  
export type CesiumComponentType ={
    setDashboard: SetState<Dashboard|undefined>
}

export type PolarEarthProps = {
  position: []
}

export type CesiumSettingType = {
  mode: number
}

  /////////////////////////场景数据类型///////////////////////////////
export type SceneDataType = {
  selectedSatelliteList: string[],
  curBaseStation: BaseStation,
  cesiumSetting: CesiumSettingType,
  isEdit: boolean,
  sceneName: string
}