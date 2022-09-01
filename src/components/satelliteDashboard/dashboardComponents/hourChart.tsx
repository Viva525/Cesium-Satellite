import React, { useEffect, useState } from 'react';

type HourChartProps = {
  title: string;
  data?: number;
  width: number | string;
  height: number | string;
};

const HourChart: React.FC<HourChartProps> = (props) => {
  const { title, data, width, height } = props;
  const [init, setInit] = useState<boolean>(false);

  useEffect(() => {
    setInit(init);
  }, []);

  useEffect(() => {
    if (init) {
      // do something
    }
  }, [init]);

  return (
    <div
      style={{
        width: `${typeof width === 'string' ? width : width + 'px'}`,
        height: `${typeof height === 'string' ? height : height + 'px'}`,
        background: '#212124',
        border: '1px solid #333',
        boxShadow: '2px 8px 16px rgba(0,0,0,0.2)',
        margin: '10px',
      }}
    >
      <div
        style={{
          height: '20%',
          width: '100%',
          textAlign: 'center',
          color: '#fff',
          fontSize: '24px',
          paddingTop: '10%',
        }}
      >
        {title}
      </div>
      <div
        style={{
          height: '80%',
          width: '100%',
        }}
      ></div>
    </div>
  );
};

export default HourChart;
