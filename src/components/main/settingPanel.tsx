import React, { useEffect } from 'react';
import {
  Button,
  Input,
  InputNumber,
  Select,
  Slider,
  Switch,
  Upload,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { settingPanelProps } from '../../types/type';
const { Option } = Select;


const SettingPanel: React.FC<settingPanelProps> = (props) => {
  const {setting, setSetting} = props;

  useEffect(()=>{
    console.log(setting);
  },[])
  return (
    <div style={{ width: '100%', height: '100%' }}>
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
              <label style={{ marginRight: '20px' }}>地球自转</label>
              <Switch
                checkedChildren='开启'
                unCheckedChildren='关闭'
                defaultChecked={setting.rotate?.val}
              />
              <label style={{ marginLeft: '20px', marginRight: '10px' }}>
                自转速度
              </label>
              <Slider
                min={1}
                max={50}
                style={{ width: '10vw', float: 'right', marginRight: '25%' }}
                defaultValue={20}
              />
            </li>
            <li>
              <label style={{ marginRight: '20px' }}>显示光照</label>
              <Switch
                checkedChildren='开启'
                unCheckedChildren='关闭'
                defaultChecked={setting.light?.val}
              />
              <label style={{ marginLeft: '20px', marginRight: '10px' }}>
                光照强度
              </label>
              <Slider
                min={1}
                max={10}
                style={{ width: '10vw', float: 'right', marginRight: '25%' }}
                defaultValue={5}
              />
            </li>
            <li>
              <label style={{ marginRight: '20px' }}>显示太阳</label>
              <Switch
                checkedChildren='开启'
                unCheckedChildren='关闭'
                defaultChecked={setting.sun?.val}
              />
            </li>
            <li>
              <label style={{ marginRight: '20px' }}>显示星空</label>
              <Switch
                checkedChildren='开启'
                unCheckedChildren='关闭'
                defaultChecked={setting.star?.val}
              />
            </li>
            <li>
              <label style={{ marginRight: '20px' }}>显示时间</label>
              <Switch
                checkedChildren='开启'
                unCheckedChildren='关闭'
                defaultChecked={setting.time?.val}
              />
            </li>
          </ul>
          <Button
            type='primary'
            style={{ width: '8vw', marginLeft: '10vw', marginTop: '2vh' }}
            shape='round'
            size='large'
          >
            保存场景
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SettingPanel;
