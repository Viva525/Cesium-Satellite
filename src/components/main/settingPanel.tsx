import React, { Ref, useEffect } from 'react';
import {
  Button,
  Col,
  Input,
  InputNumber,
  notification,
  Row,
  Select,
  Slider,
  Switch,
  Upload,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { settingPanelProps } from '../../types/type';
import SatelliteList from '../left/satelliteList/index';

const { Option } = Select;

const SettingPanel: React.FC<settingPanelProps> = (props) => {
  const { setting, setSetting, satelliteList, setSatelliteList, setScanes} = props;
  const openNotification = (message:string) => {
    notification.open({
      message: '提示',
      description: message
    });
  };
  const sceneNameRef = React.useRef<string>('');
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Row gutter={12}>
        <Col span={10}>
          <header className='sceneEditTitle'>卫星加载</header>
          <SatelliteList  satelliteList={satelliteList} setSatelliteList={setSatelliteList}/>
        </Col>
        <Col span={14}>
          <header className='sceneEditTitle'>场景配置</header>
          <div className='scenceSetting'>
            <div>
              <p
                style={{
                  fontSize: '16px',
                  color: '#017efc',
                  borderBottom: '2px solid #017efc',
                }}
              >
                基本设置
              </p>
              <ul className='settingList'>
                <li>
                  <header
                    style={{
                      marginRight: '20px',
                      marginBottom: '20px',
                      color: '#017efc',
                    }}
                  >
                    画布设置
                  </header>
                  <label style={{ marginRight: '20px' }}>画布大小</label>
                  <label style={{ marginRight: '8px' }}>宽</label>
                  <InputNumber
                    style={{ width: '4vw' }}
                    size='small'
                    min={1}
                    max={100000}
                    defaultValue={1920}
                    controls={false}
                  />
                  <label style={{ marginRight: '8px', marginLeft: '1.6vw' }}>
                    高
                  </label>
                  <InputNumber
                    style={{ width: '4vw' }}
                    size='small'
                    min={1}
                    max={100000}
                    controls={false}
                    defaultValue={1080}
                  />
                </li>
                <li>
                  <label style={{ marginRight: '20px' }}>画布位置</label>
                  <InputNumber
                    style={{ width: '5vw' }}
                    size='small'
                    min={1}
                    max={100000}
                    defaultValue={244}
                    controls={false}
                  />
                  <InputNumber
                    style={{ width: '5vw', marginLeft: '40px' }}
                    size='small'
                    min={1}
                    max={100000}
                    controls={false}
                    defaultValue={180}
                  />
                </li>
                <li>
                  <label style={{ marginRight: '20px' }}>页面缩放</label>
                  <Select
                    defaultValue='等比例缩放'
                    style={{
                      width: '11.6vw',
                      color: '#fff',
                      background: '#262c33',
                    }}
                    size='small'
                    allowClear
                  >
                    <Option value='等比例缩放'>等比例缩放</Option>
                    <Option value='宽度缩放'>宽度缩放</Option>
                    <Option value='高度缩放'>高度缩放</Option>
                  </Select>
                </li>
                <li>
                  <label style={{ marginRight: '20px' }}>背景颜色</label>
                  <Input
                    style={{
                      width: '11.6vw',
                      background: '#262c33',
                      color: '#fff',
                    }}
                    size='small'
                    placeholder='请输入16进制颜色代码'
                  />
                </li>
                <li>
                  <label style={{ marginRight: '20px' }}>透明度</label>
                  <Slider
                    min={1}
                    max={100}
                    style={{ width: '15vw' }}
                    defaultValue={80}
                  />
                </li>
                <li>
                  <header
                    style={{
                      marginRight: '20px',
                      marginBottom: '20px',
                      color: '#017efc',
                    }}
                  >
                    卫星参数设置
                  </header>
                  <label style={{ marginRight: '20px' }}>显示卫星图标</label>
                  <Switch
                    checkedChildren='开启'
                    unCheckedChildren='关闭'
                    defaultChecked={setting.icon?.val}
                    onChange={(val, e) => {
                      setSetting((prev) => {
                        return {
                          ...prev,
                          ...{
                            icon: { val: val, name: '卫星图标' },
                            currEdit: { val: val, name: 'icon' },
                          },
                        };
                      });
                    }}
                  />
                  <label style={{ marginLeft: '20px', marginRight: '20px' }}>
                    卫星图标上传
                  </label>
                  <Upload>
                    <Button
                      size='small'
                      style={{ background: '#262c33', color: '#fff' }}
                      icon={<UploadOutlined />}
                    >
                      Click to Upload
                    </Button>
                  </Upload>
                </li>
                <li>
                  <label style={{ marginRight: '20px' }}>显示卫星轨迹</label>
                  <Switch
                    checkedChildren='开启'
                    unCheckedChildren='关闭'
                    defaultChecked={setting.track?.val}
                    onChange={(val, e) => {
                      setSetting((prev) => {
                        return {
                          ...prev,
                          ...{
                            track: { val: val, name: '卫星轨迹' },
                            currEdit: { val: val, name: 'track' },
                          },
                        };
                      });
                    }}
                  />
                  <label style={{ marginLeft: '20px', marginRight: '20px' }}>
                    卫星数据上传
                  </label>
                  <Upload>
                    <Button
                      size='small'
                      style={{ background: '#262c33', color: '#fff' }}
                      icon={<UploadOutlined />}
                    >
                      Click to Upload
                    </Button>
                  </Upload>
                </li>
                <li>
                  <label style={{ marginRight: '20px' }}>显示卫星名称</label>
                  <Switch
                    checkedChildren='开启'
                    unCheckedChildren='关闭'
                    defaultChecked={setting.label?.val}
                    onChange={(val, e) => {
                      setSetting((prev) => {
                        return {
                          ...prev,
                          ...{
                            label: { val: val, name: '卫星标注' },
                            currEdit: { val: val, name: 'label' },
                          },
                        };
                      });
                    }}
                  />
                </li>
              </ul>
              <p
                style={{
                  fontSize: '16px',
                  color: '#017efc',
                  borderBottom: '2px solid #017efc',
                }}
              >
                系统设置
              </p>
              <ul className='settingList'>
                <li>
                  <header
                    style={{
                      marginRight: '20px',
                      marginBottom: '20px',
                      color: '#017efc',
                    }}
                  >
                    场景设置
                  </header>
                  <label style={{ marginRight: '20px' }}>场景名称</label>
                  <Input
                    style={{
                      width: '11.6vw',
                      background: '#262c33',
                      color: '#fff',
                    }}
                    size='small'
                    onChange={(e) => {
                      sceneNameRef.current = e.target.value;
                    }}
                    placeholder='请输入场景名称'
                  />
                </li>
                <li>
                  <label style={{ marginRight: '20px' }}>地球自转</label>
                  <Switch
                    checkedChildren='开启'
                    unCheckedChildren='关闭'
                    defaultChecked={setting.rotate?.val}
                    onChange={(val, e) => {
                      setSetting((prev) => {
                        return {
                          ...prev,
                          ...{
                            rotate: { val: val, name: '地球自转' },
                            currEdit: { val: val, name: 'rotate' },
                          },
                        };
                      });
                    }}
                  />
                  <label style={{ marginLeft: '20px', marginRight: '10px' }}>
                    自转速度
                  </label>
                  <Slider
                    min={1}
                    max={50}
                    style={{
                      width: '10vw',
                      float: 'right',
                      marginRight: '25%',
                    }}
                    defaultValue={20}
                  />
                </li>
                <li>
                  <label style={{ marginRight: '20px' }}>显示光照</label>
                  <Switch
                    checkedChildren='开启'
                    unCheckedChildren='关闭'
                    defaultChecked={setting.light?.val}
                    onChange={(val, e) => {
                      setSetting((prev) => {
                        return {
                          ...prev,
                          ...{
                            light: { val: val, name: '显示光照' },
                            currEdit: { val: val, name: 'light' },
                          },
                        };
                      });
                    }}
                  />
                  <label style={{ marginLeft: '20px', marginRight: '10px' }}>
                    光照强度
                  </label>
                  <Slider
                    min={1}
                    max={10}
                    style={{
                      width: '10vw',
                      float: 'right',
                      marginRight: '25%',
                    }}
                    defaultValue={5}
                  />
                </li>
                <li>
                  <label style={{ marginRight: '20px' }}>显示太阳</label>
                  <Switch
                    checkedChildren='开启'
                    unCheckedChildren='关闭'
                    defaultChecked={setting.sun?.val}
                    onChange={(val, e) => {
                      setSetting((prev) => {
                        return {
                          ...prev,
                          ...{
                            sun: { val: val, name: '显示太阳' },
                            currEdit: { val: val, name: 'sun' },
                          },
                        };
                      });
                    }}
                  />
                </li>
                <li>
                  <label style={{ marginRight: '20px' }}>显示星空</label>
                  <Switch
                    checkedChildren='开启'
                    unCheckedChildren='关闭'
                    defaultChecked={setting.star?.val}
                    onChange={(val, e) => {
                      setSetting((prev) => {
                        return {
                          ...prev,
                          ...{
                            star: { val: val, name: '显示星空' },
                            currEdit: { val: val, name: 'star' },
                          },
                        };
                      });
                    }}
                  />
                </li>
                <li>
                  <label style={{ marginRight: '20px' }}>显示时间</label>
                  <Switch
                    checkedChildren='开启'
                    unCheckedChildren='关闭'
                    defaultChecked={setting.time?.val}
                    onChange={(val, e) => {
                      setSetting((prev) => {
                        return {
                          ...prev,
                          ...{
                            time: { val: val, name: '显示时间轴' },
                            currEdit: { val: val, name: 'time' },
                          },
                        };
                      });
                    }}
                  />
                </li>
              </ul>
              <Button
                type='primary'
                style={{ width: '8vw', marginLeft: '10vw', marginTop: '2vh' }}
                shape='round'
                size='large'
                onClick={() => {
                  if(sceneNameRef.current == ""){
                    openNotification('请输入场景名!');
                  }else{
                    let nowUseSatelliteList = []
                    for(let i of satelliteList){
                      nowUseSatelliteList.push([...i])
                    }
                    let scene = {
                      satelliteList: [...nowUseSatelliteList],
                      setting: setting,
                      sceneName: sceneNameRef.current
                    }
                    console.log(scene)
                    //@ts-ignore
                    setScanes((prev)=>{
                      return [...prev, ...[scene]]
                    });
                    openNotification('添加场景成功!');
                  }
                }}
              >
                保存场景
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default SettingPanel;
