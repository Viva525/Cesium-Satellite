import React from 'react';
import "./shixutu.css";
const shixutu: React.FC<{}> = () => {
    const data = ["一级点火","一二级分离","二级点火","二三级点火","二三级分离"];

    return (
        <div className='lineWrapper' style={{width:'100%', height:'100%'}}>
            <div className='line'></div>
            {
                data.reverse().map((item, idx)=>{
                    if(idx == 0){
                        return (
                        <div className='msg'style={{position:'absolute',top:`${idx*15+10}vh`}}>
                            <div className='nowCircle'></div>
                            <span className='nowText'>{item}</span>
                            <p className='nowTime'>10.45.11</p>
                        </div>)
                    }else{
                        return (
                            <div className='msg'style={{position:'absolute',top:`${idx*15+10}vh`}}>
                                <div className='circle'></div>
                                <span className='text'>{item}</span>
                                <p className='time'>10.45.11</p>
                            </div>
                        )
                    }
                })
            }
       </div>);
};

export default shixutu