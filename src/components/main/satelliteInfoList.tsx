import { Table } from 'antd';
import { type } from 'os';
import React, { useEffect, useState } from 'react';

type sateLLiteInfoList = {
    satelliteList: string[]
}

const SatelliteInfoList: React.FC<sateLLiteInfoList> = (props) => {
    const {satelliteList} = props;
    const [init, setInit] = useState<boolean>(false);
    const [data, setData] = useState<any[]>([]);
    const satelliteName = [
        "BEIDOU-17_40549",
        "BEIDOU-18_40748",
        "BEIDOU-19_40749",
        "BEIDOU-2-G7_41586",
        "BEIDOU-20_40938",
        "BEIDOU-2_G8_44231",
        "BEIDOU-3_G1_43683",
        "BEIDOU-3_G2_45344",
        "BEIDOU-3_G3_45807",
        "BEIDOU-3_IGSO-1__C38__44204",
        "BEIDOU-3_IGSO-2__C39__44337",
        "BEIDOU-3_IGSO-3_44709",
        "BEIDOU-3_M10_43582",
        "BEIDOU-3_M11_43602",
        "BEIDOU-3_M12_43603",
        "BEIDOU-3_M1_43001",
        "BEIDOU_10_37948",
        "BEIDOU_11_38091",
        "BEIDOU_12_38250",
        "BEIDOU_13_38251",
        "BEIDOU_15_38775",
        "BEIDOU_16_38953",
        "BEIDOU_3_36287",
        "BEIDOU_5_36828",
        "BEIDOU_6_37210",
        "BEIDOU_7_37256",
        "BEIDOU_8_37384",
        "BEIDOU_9_37763",
        "BEIDOU_IGSO-6_41434",
        "BEIDOU_IGSO-7_43539",
        "GPS_2F-10_40730",
        "GPS_2F-11_41019",
        "GPS_2F-12_41328",
        "GPS_2F-1_36585",
        "GPS_2F-2_37753",
        "GPS_2F-3_38833",
        "GPS_2F-4_39166",
        "GPS_2F-5_39533",
        "GPS_2F-6_39741",
        "GPS_2F-7_40105",
        "GPS_2F-8_40294",
        "GPS_2F-9_40534",
        "GPS_2R-14_28874",
        "GPS_2R-15_29486",
        "GPS_2R-16_29601",
        "GPS_2R-17_32260",
        "GPS_2R-18_32384",
        "GPS_2R-19_32711",
        "GPS_2R-21_35752",
        "GPS_3-1_43873",
        "STARLINK-3350_51105",
        "STARLINK-3352_51147",
        "STARLINK-3353_50807",
        "STARLINK-3354_51146",
        "STARLINK-3355_50808",
        "STARLINK-3356_51133",
        "STARLINK-3357_51150",
        "STARLINK-3358_51109",
        "STARLINK-3359_51148",
        "STARLINK-3360_51149",
        "STARLINK-3361_51151",
        "STARLINK-3362_51108",
        "STARLINK-3363_51135",
        "STARLINK-3364_51152",
        "STARLINK-3365_51145",
        "STARLINK-3366_51104",
        "STARLINK-3368_51107",
        "STARLINK-3369_51142",
        "STARLINK-3370_51127",
        "STARLINK-3372_51113",
        "STARLINK-3373_51122",
        "STARLINK-3374_51112",
        "STARLINK-3375_51114",
        "STARLINK-3386_51126",
        "STARLINK-3387_51125",
        "STARLINK-3388_51131",
        "STARLINK-3389_51124",
        "STARLINK-3390_51119",
        "STARLINK-3391_51117",
        "STARLINK-3392_51123"
    ]
    const columns = [
        {
            title:"Satellite",
            dataIndex: "satellite",
            key: "satellite"
        },
        {
            title:"Az",
            dataIndex: "az",
            key: "az"
        },
        {
            title:"EI",
            dataIndex: "ei",
            key: "ei"
        },
        {
            title:"Dir",
            dataIndex: "dir",
            key: "dir"
        },
        {
            title:"Range",
            dataIndex: "range",
            key: "range"
        },
        {
            title:"Alt",
            dataIndex: "alt",
            key: "alt"
        },
        {
            title:"Orbit",
            dataIndex: "orbit",
            key: "orbit"
        }
    ]

    useEffect(()=>{
        setInit(true);
    },[]);

    useEffect(()=>{
       if(init){
        setInterval(()=>{
            let dataTemp: any = [];
            satelliteName.forEach((satellite, idx)=>{
            let az = (Math.random()*360).toFixed(2).toString()+"°";
            let ei = (-Math.random()*90).toFixed(2).toString()+"°";
            let dir = Math.random()>0.5?"↑":"↓";
            let range = Math.round(Math.random()*10000);
            let alt = Math.round(Math.random()*1000);
            let orbit = Math.round(Math.random()*10000);
            dataTemp.push({
                key: idx.toString(),
                satellite: satellite,
                az:az,
                ei:ei,
                dir:dir,
                range:range,
                alt:alt,
                orbit:orbit
            })
        });
        setData([...dataTemp]);
        },1000)
       }
    },[init]);

    return (
        <div style={{width:'100%', height:'100%'}}>
            <Table columns={columns} dataSource={data}></Table>
       </div>);
};

export default SatelliteInfoList