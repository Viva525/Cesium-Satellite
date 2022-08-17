import { Table} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { TableRowSelection } from 'antd/es/table/interface';
import "antd/dist/antd.min.css"
import './table.css'
// import Item from 'antd/lib/list/Item';
import React, { Dispatch, SetStateAction, useState } from 'react';
export type SetState<T> = Dispatch<SetStateAction<T>>;

type DataType = {
  key: React.Key;
}
type satelliteListType = {
  statelliteList: string[]
  setSelectSatelliteList: SetState<any[]>
}

const columns: ColumnsType<DataType> = [
  {
    title: 'satelliteName',
    dataIndex: 'key',
  },
];

const SatelliteList: React.FC<satelliteListType> = (props) => {

  const { statelliteList, setSelectSatelliteList } = props
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
        nowSelectList.push([i, true])
      }
    }
    else {
      let nowSelectKey = selectedRowKeys.concat(newSelectedRowKeys).filter(item => !newSelectedRowKeys.includes(item))
      console.log(nowSelectKey)
      for (let i of nowSelectKey) {
        nowSelectList.push([i, false])
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
        key: 'even',
        text: 'Select BEIDOU',
        onSelect: changableRowKeys => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((item, index) => {
            if(item.toString().indexOf("BEIDOU") > 0){
              return true
            }
            return false;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: 'even',
        text: 'Select GPS',
        onSelect: changableRowKeys => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((item, index) => {
            if(item.toString().indexOf("GPS") > 0){
              return true
            }
            return false;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };

  return <>
  <div className='box-title'>
    <span className='box-title-font'>卫星列表</span>
  </div>
  <Table rowSelection={rowSelection} columns={columns} dataSource={data} pagination={{simple: true, position:['bottomCenter']}}/>
  </>;
};

export default SatelliteList;