import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { TableRowSelection } from 'antd/es/table/interface';
import "antd/dist/antd.min.css"
import './table.css'
// import Item from 'antd/lib/list/Item';
import React, { Dispatch, SetStateAction, useState } from 'react';
import ColorSelect from './color';
import {DataType, satelliteListType} from "../../../types/type"


const SatelliteList: React.FC<satelliteListType> = (props) => {

  const { statelliteList, setSelectSatelliteList } = props
  const columns: ColumnsType<DataType> = [
    {
      title: 'satelliteName',
      dataIndex: 'key',
      filters: [
        {
          text: '星链',
          value: 'STARLINK',
        },
        {
          text: '北斗',
          value: 'BEIDOU',
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
      dataIndex: 'color',
      render: (_: any, record: DataType) => {
        return (
          <ColorSelect
            satellityKey={record.key}
            setSelectSatelliteList={setSelectSatelliteList}
          />)
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
    setSelectedRowKeys(newSelectedRowKeys);

  };



  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
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