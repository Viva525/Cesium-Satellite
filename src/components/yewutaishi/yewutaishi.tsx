import React, { useEffect, useState } from 'react';
import "./yewutaishi.css"
import UseTimeDay from './useTimeDay';
import UseTimeMonth from './useTimeMonth';
import UseTimeYear from './useTimeYear';
import UseMap from './useMap';
import Box from '../main/box';
import UseRank from './useRank';
import UseMapClass from './useMapClass';
const Yewurtaishi: React.FC<{}> = () => {
  const [useRegionData, setUseRegionData] = useState<any[]>([])

  return (
    <div className='allBack'>
      <div className='title'>业务态势</div>
      <div className="content">
      <div className='business-mask-left'></div>
      <div className='business-mask-right'></div>
        <div className='Left'>
          <div className='useTime'>
            <Box
              title="年均使用次数"
              component={
                <UseTimeYear nowData={30} />
              }
            />
          </div>
          <div className='useTime'>
            <Box
              title="月均使用次数"
              component={
                <UseTimeMonth nowData={30} />
              }
            />
          </div>
          <div className='useTime'>
            <Box
              title="日均使用次数"
              component={
                <UseTimeDay nowData={1} />
              }
            />
          </div>

        </div>
        <div className='useMap'>
          <Box
            title="使用地区"
            component={
              <UseMap nowData={1}  setUseRegionData = {setUseRegionData}/>
            }
          />
        </div>
        <div className='right'>
          <div className='useRank'>
            <Box
              title="地区排名"
              component={
                <UseRank nowData={useRegionData} />
              }
            />
          </div>
          <div className='useRegionMap'>
            <Box
              title="时间分布"
              component={
                <UseMapClass nowData={1} />
              }
            />

          </div>
        </div>

      </div>

    </div>
  );
}

export default Yewurtaishi;