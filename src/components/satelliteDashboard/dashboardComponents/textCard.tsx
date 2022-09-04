import React from 'react';

type textCardProps = {
  title: string;
  width: number|string;
  height: number|string;
  content?: string;
};

const TextCard: React.FC<textCardProps> = (props) => {
  const { title, width, height, content } = props;
  return (
    <div style={{ width: `${typeof(width)==="string"?width:width+"px"}`, height: `${typeof(height)==="string"?height:height+"px"}`, background:"#212124", border:"1px solid #333", boxShadow:"2px 8px 16px rgba(0,0,0,0.2)", marginRight:"10px"}}>
      <div
        style={{
          height: '20%',
          width:'100%',
          textAlign: 'center',
          color: '#fff',
          fontSize: '24px',
          paddingTop:"10%"
        }}
      >
        {title}
      </div>
      <div
        style={{
          height: '80%',
          width:'100%',
        }}
      >
        <p style={{paddingTop:"30%",color: '#fff', fontSize: '50px',textAlign: 'center', margin:0, letterSpacing:"2px"}}>{content}</p>
      </div>
    </div>
  );
};

export default TextCard;
