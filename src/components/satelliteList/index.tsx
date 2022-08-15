import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { TableRowSelection } from 'antd/es/table/interface';
import Item from 'antd/lib/list/Item';
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
      console.log(nowSelectKey)

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
    ],
  };

  return <Table rowSelection={rowSelection} columns={columns} dataSource={data} />;
};

export default SatelliteList;