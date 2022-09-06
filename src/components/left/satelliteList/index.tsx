//@ts-nocheck
import { Table, Image} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { TableRowSelection } from 'antd/es/table/interface';
import './table.css'
// import Item from 'antd/lib/list/Item';
import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import ColorSelect, { SetState } from './color';
import {DataType, satelliteListType} from "../../../types/type"


const SatelliteList: React.FC<satelliteListType> = (props) => {
  const {statelliteList, setSelectSatelliteList, setSelectedSatelliteList } = props
  const [satelliteColor, setSatelliteColor] = useState({})
  const columns: ColumnsType<DataType> = [
    {
      title: 'satelliteName',
      dataIndex: 'key',
      width:"60%",
      filters: [
        {
          text: '星链',
          value: 'STARLINK',
        },
        {
          text: '北斗',
          value: 'BD',
        },
        {
          text: 'gps',
          value: 'GPS',
        }
      ],
      //@ts-ignore
      onFilter: (value, record) => record.key.includes(value),
    },
    {
      title: 'color',
      width:"30%",
      align:'center',
      dataIndex: 'color',
      render: (_: any, record: DataType) => {
        return (
          <ColorSelect
            initColor={satelliteColor[record.key]==undefined?(record.key.includes("BD") | record.key.includes("BEIDOU")  ? { r: "13", g: "126", b: "222", a: "1" }: record.key.includes("GPS") ?{ r: "210", g: '51', b: '90', a: "1" } : { r: '255', g: '255', b: '255',a: "1" }):satelliteColor[record.key]}
            setSatelliteColor = {setSatelliteColor}
            satellityKey={record.key}
            setSelectSatelliteList={setSelectSatelliteList}
          />)
      }
    },
    {
      title:'info',
      width:"10%",
      align:'center',
      dataIndex: 'JumpImage',
      render:(_: any, record: DataType) =>{
        return(
          <Image
            width={30}
            src="./images/dot_32.png"
            preview={{
              visible: false,
            }}
            onClick={() => {
              window.open(
                //@ts-ignore
                `/satelliteDashboard/satellite/${record.key.split('/').slice(1).join('-')}`,
                "_blank"
              );
            }}
          />
        )
      }
    }
  ];

  const data: DataType[] = []
  for (let i = 0; i < statelliteList.length; i++) {
    data.push({
      key: statelliteList[i],
    })
  }
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {

    let nowSelectList = []
    if (selectedRowKeys.length < newSelectedRowKeys.length) {
      let nowSelectKey = newSelectedRowKeys.concat(selectedRowKeys).filter(item => !selectedRowKeys.includes(item))
      for (let i of nowSelectKey) {
        nowSelectList.push([0, i, true])
      }
    }
    else {
      let nowSelectKey = selectedRowKeys.concat(newSelectedRowKeys).filter(item => !newSelectedRowKeys.includes(item))
      for (let i of nowSelectKey) {
        nowSelectList.push([0, i, false])
      }
    }

    setSelectSatelliteList(nowSelectList)
    setSelectedSatelliteList(newSelectedRowKeys)
    setSelectedRowKeys(newSelectedRowKeys);

  };

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
    preserveSelectedRowKeys: true,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: 'BEIDOU',
        text: 'Select BEIDOU',
        onSelect: changableRowKeys => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((item, index) => {
            if (item.toString().indexOf("BEIDOU") > 0) {
              return true
            }
            return false;
          });
          onSelectChange(newSelectedRowKeys);
        },
      },
      {
        key: 'GPS',
        text: 'Select GPS',
        onSelect: changableRowKeys => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((item, index) => {
            if (item.toString().indexOf("GPS") > 0) {
              return true
            }
            return false;
          });
          onSelectChange(newSelectedRowKeys);
        },
      },
    ],
  };
  return <>
    {/* <div className='box-title'>
    <span className='box-title-font'>卫星列表</span>
  </div> */}
    <Table rowSelection={rowSelection} columns={columns} dataSource={data} size='small' pagination={{ simple: true, position: ['bottomCenter'] }} />
  </>;
};

export default SatelliteList;