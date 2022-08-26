import { HuePicker } from 'react-color'
import React, { Dispatch, SetStateAction, useState } from 'react';

export type SetState<T> = Dispatch<SetStateAction<T>>;

type satelliteColor = {
  satellityKey: React.Key
  setSelectSatelliteList: SetState<any[]>
}
const ColorSelect: React.FC<satelliteColor> = (props) => {
  const [color, setColor] = useState("#f00")
  const { satellityKey, setSelectSatelliteList } = props
  return (
    <HuePicker
      color= {color}
      onChange={(color: any) => {
        setColor(color.rgb)
        setSelectSatelliteList([[1, satellityKey, color.rgb]])
      }}
    />
  )

}

export default ColorSelect;