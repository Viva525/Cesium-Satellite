//@ts-nocheck
import { Col, Dropdown, Menu, Row, Space, Typography } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { type } from "os";
import React, { useEffect, useState } from "react";

import "./satelliteInfo.css";
import { BaseStation, SetState } from "../../types/type";
import { ExecOptionsWithStringEncoding } from "child_process";

type SatelliteInfoProp = {
  sateName: string;
  launch?: string;
  status?: string;
  activity?: string;
  type: string;
  curBaseStation?:BaseStation;
  weatherKey?:string;
  setCurBaseStation?: SetState<BaseStation>
  weatherIcon?:string;
  setWeatherIcon?:SetState<string>
};

const SatelliteInfo: React.FC<SatelliteInfoProp> = (props) => {
  var { sateName, launch, status, activity, type, curBaseStation, setCurBaseStation, weatherIcon, setWeatherIcon } =
    props;
  const [bgImg, setBgImg] = useState<string>("");
  console.log(curBaseStation);
  

  useEffect(() => {
    if (sateName.includes("BEIDOU")) {
      setBgImg("BEIDOU.png");
    } else if (sateName.includes("GPS")) {
      setBgImg("GPS.png");
    } else if (sateName.includes("STARLINK")) {
      setBgImg("STARLINK.png");
    } else if (sateName.includes("Place/") && sateName !== "Place/undefined") {
      setBgImg("BASESTATION.jpg");
    }

  }, [sateName]);

  if (sateName === "") {
    return <div id="satellite-info"></div>;
  }


  const onWeatherClick = ({ key }: any) => {
    setWeatherIcon(key);
    let weatherTemp, strongTemp;
    if (key === "0") {
      weatherTemp = '0'
      strongTemp=0.3
    } else if (key === "1") {
      weatherTemp = '1'
      strongTemp=0.3
    } else if (key === "2") {
      weatherTemp = '2'
      strongTemp=0.8
    } else if (key === "3") {
      weatherTemp = '3'
      strongTemp=0.3
    } else if (key === "4") {
      weatherTemp = '4'
      strongTemp=0.8
    } else if (key === "5") {
      weatherTemp = '5'
      strongTemp=0.8
    }

    let curBasestationTemp= curBaseStation;
    curBasestationTemp.weatherKey = weatherTemp;
    curBasestationTemp.strong = strongTemp;
    setCurBaseStation({...curBasestationTemp})
  };

  const menu = (
    <Menu
      selectable
      defaultSelectedKeys={[{ weatherIcon }]}
      onClick={onWeatherClick}
      items={[
        {
          key: "0",
          label: "晴",
          icon: <svg t="1666464751173" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9135" width="32" height="32"><path d="M522.666667 362.666667c76.458667 0 138.666667 62.208 138.666666 138.666666S599.125333 640 522.666667 640 384 577.792 384 501.333333s62.208-138.666667 138.666667-138.666666m0-64c-111.936 0-202.666667 90.730667-202.666667 202.666666s90.730667 202.666667 202.666667 202.666667 202.666667-90.730667 202.666666-202.666667-90.730667-202.666667-202.666666-202.666666zM522.666667 256c-17.6 0-32-14.4-32-32v-85.333333c0-17.6 14.4-32 32-32s32 14.4 32 32v85.333333c0 17.6-14.4 32-32 32z" fill="#F9A825" p-id="9136"></path><path d="M522.666667 896c-17.6 0-32-14.4-32-32v-85.333333c0-17.6 14.4-32 32-32s32 14.4 32 32v85.333333c0 17.6-14.4 32-32 32z" fill="#FBB03B" p-id="9137"></path><path d="M696.554667 327.850667a32.106667 32.106667 0 0 1 0-45.248l60.330666-60.330667a32.106667 32.106667 0 0 1 45.248 0 32.106667 32.106667 0 0 1 0 45.248l-60.330666 60.330667a32.064 32.064 0 0 1-45.248 0zM244.010667 780.394667a32.106667 32.106667 0 0 1 0-45.248l60.330666-60.330667a32.106667 32.106667 0 0 1 45.248 0 32.106667 32.106667 0 0 1 0 45.248l-60.330666 60.330667a32.064 32.064 0 0 1-45.248 0zM349.184 327.850667a32.106667 32.106667 0 0 1-45.248 0l-60.330667-60.330667a32.106667 32.106667 0 0 1 0-45.248 32.106667 32.106667 0 0 1 45.248 0l60.330667 60.330667a32.064 32.064 0 0 1 0 45.248zM801.728 780.394667a32.106667 32.106667 0 0 1-45.248 0l-60.330667-60.330667a32.106667 32.106667 0 0 1 0-45.248 32.106667 32.106667 0 0 1 45.248 0l60.330667 60.330667a32.064 32.064 0 0 1 0 45.248zM277.333333 501.333333c0 17.6-14.4 32-32 32h-85.333333c-17.6 0-32-14.4-32-32S142.4 469.333333 160 469.333333h85.333333c17.6 0 32 14.4 32 32zM917.333333 501.333333c0 17.6-14.4 32-32 32h-85.333333c-17.6 0-32-14.4-32-32s14.4-32 32-32h85.333333c17.6 0 32 14.4 32 32z" fill="#F9A825" p-id="9138"></path></svg>,
        },
        {
          key: "1",
          label: "小雨",
          icon: <svg t="1666464552567" className="icon" viewBox="0 0 1154 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2793" width="32" height="32"><path d="M780.288 0q73.728 0 141.312 29.184t119.296 78.848 81.92 115.712 30.208 139.776q0 60.416-19.456 122.88t-46.08 111.616q-13.312 23.552-37.376 43.008t-51.712 33.28-54.272 22.016-45.056 8.192l-714.752 0q-39.936 0-73.216-12.8t-57.856-36.864-38.4-57.344-13.824-73.216q0-55.296 13.312-103.936t40.448-85.504 68.608-58.368 97.792-21.504q24.576 0 42.496 3.072t34.304 8.704 32.256 14.848 34.304 21.504q10.24-63.488 44.032-118.784t87.552-96.256 125.44-64.512 158.72-23.552zM861.184 579.584q32.768 0 62.976-14.336t53.76-41.984 37.376-67.584 13.824-91.136-18.432-95.232-51.2-75.776-77.312-49.664-95.744-17.92-89.6 8.192-66.56 20.48-47.616 27.136-32.768 28.16q-14.336 14.336-27.648 34.304t-23.04 41.472-14.848 42.496-3.072 38.4q4.096 29.696-11.264 50.176t-39.424 28.672-50.688 3.584-44.032-25.088q-19.456-20.48-45.568-31.232t-65.024-10.752q-31.744 0-51.2 12.288t-30.72 30.72-15.36 40.448-4.096 41.472q0 16.384 7.168 29.696t18.944 23.04 26.112 14.848 28.672 5.12l656.384 0zM257.024 769.024q26.624 0 45.056 18.944t18.432 45.568l0 63.488q0 26.624-18.432 45.568t-45.056 18.944-45.568-18.944-18.944-45.568l0-63.488q0-26.624 18.944-45.568t45.568-18.944zM769.024 769.024q26.624 0 45.568 18.944t18.944 45.568l0 63.488q0 26.624-18.944 45.568t-45.568 18.944-45.056-18.944-18.432-45.568l0-63.488q0-26.624 18.432-45.568t45.056-18.944z" p-id="2794" fill="#1296db"></path></svg>,
        },
        {
          key: "2",
          label: "大雨",
          icon: <svg t="1666464587771" className="icon" viewBox="0 0 1151 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3044" width="32" height="32"><path d="M242.07913 773.619507c-33.770496 0-62.424269 27.629261-62.424269 62.421709l0 61.398372c0 34.792448 28.653773 61.398323 62.424269 61.398323 32.747213 0 60.3776-26.605978 60.3776-61.398323l0-61.398372C302.45673 801.248768 274.826342 773.619507 242.07913 773.619507L242.07913 773.619507zM474.379469 773.619507c-35.817267 0-62.424269 27.629261-62.424269 62.421709l0 61.398372c0 34.792448 26.607104 61.398323 62.424269 61.398323 32.747213 0 59.354214-26.605978 59.354214-61.398323l0-61.398372C533.733683 801.248768 507.126579 773.619507 474.379469 773.619507L474.379469 773.619507zM698.492928 773.619507c-34.793882 0-62.424269 27.629261-62.424269 62.421709l0 61.398372c0 34.792448 27.630387 61.398323 62.424269 61.398323 32.747213 0 62.424269-26.605978 62.424269-61.398323l0-61.398372C760.917197 801.248768 731.240038 773.619507 698.492928 773.619507L698.492928 773.619507zM754.777088 0c-161.68919 0-308.028109 98.23744-370.452378 245.593498-7.163494 14.326272-12.280218 33.769062-19.44361 53.211955-38.887219-20.466074-85.961318-39.908966-140.19881-39.908966-61.400986 0-115.638477 24.559309-162.712474 73.678029-9.210163 8.18647-45.027328 46.048768-56.28416 108.470477-18.420326 97.214054 11.256832 180.101939 84.937933 230.243942 19.44361 13.302989 72.657818 35.815731 111.545037 35.815731l700.994168 0c5.116723 0 8.186778 0 12.280218-3.069952 8.186778-1.023283 89.031373-16.372941 145.315533-78.794547 58.330931-63.444992 90.054758-149.402726 90.054758-240.476979C1150.813184 171.915469 973.773824 0 754.777088 0L754.777088 0zM977.867162 549.515469c-24.560333 28.652544-66.517709 39.908966-78.797926 42.978816l-696.900771 0c-11.256832 0-40.93399-10.233037-49.120768-14.326272-12.280218-9.209754-52.190822-35.815731-36.84055-115.633562 6.140109-30.699213 24.560333-49.11872 22.513664-49.11872 2.046669 0 2.046669-1.023283 2.046669-1.023283 25.583718-27.629261 55.260877-41.955533 83.91465-41.955533 46.050714 0 89.031373 29.67593 112.568422 47.072051 1.023386 0 1.023386 3.069952 3.070054 3.069952l24.560333 18.419507c16.373555 10.233037 34.793882 12.279706 52.190822 5.116518 18.420326-5.116518 30.700442-19.44279 33.770496-36.839014 8.186778-32.745779 26.607104-94.144205 35.817267-117.68023 46.050714-106.423808 152.479027-177.031987 268.117504-177.031987 156.572467 0 283.467674 121.773466 283.467674 272.199475C1038.244762 448.208077 1017.777869 507.559834 977.867162 549.515469L977.867162 549.515469zM910.32617 773.619507c-35.817267 0-63.447654 27.629261-63.447654 62.421709l0 61.398372c0 34.792448 27.630387 61.398323 63.447654 61.398323 32.747213 0 60.3776-26.605978 60.3776-61.398323l0-61.398372C970.70377 801.248768 943.073382 773.619507 910.32617 773.619507z" p-id="3045" fill="#1296db"></path></svg>,
        },
        {
          key: "3",
          label: "小雪",
          icon: <svg t="1666464617243" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4269" width="32" height="32"><path d="M873.450667 309.141333a199.381333 199.381333 0 0 1 134.805333 188.629334v11.733333a199.296 199.296 0 0 1-199.317333 199.296H199.296A199.296 199.296 0 0 1 0 509.504v-11.733333a199.466667 199.466667 0 0 1 118.293333-182.165334 152.426667 152.426667 0 0 1 207.786667-123.562666A304.725333 304.725333 0 0 1 574.464 64c147.925333 0 271.232 105.386667 298.986667 245.141333z m0 0a199.04 199.04 0 0 0-64.512-10.666666v70.336z m-577.024-53.12a81.28 81.28 0 0 1 6.144 2.432l28.266666-64.426666a151.68 151.68 0 0 0-4.757333-1.984z" fill="#1296db" opacity=".15" p-id="4270"></path><path d="M483.754667 890.794667l-31.168 17.706666a20.629333 20.629333 0 0 1-27.818667-7.338666 19.84 19.84 0 0 1 7.466667-27.328l31.146666-17.706667-31.146666-17.706667a19.84 19.84 0 0 1-7.466667-27.349333 20.629333 20.629333 0 0 1 27.818667-7.338667l31.168 17.706667v-35.392a20.266667 20.266667 0 0 1 20.373333-20.010667 20.266667 20.266667 0 0 1 20.352 20.010667v35.392l31.189333-17.706667a20.608 20.608 0 0 1 27.818667 7.338667 19.84 19.84 0 0 1-7.466667 27.349333l-31.168 17.706667 31.168 17.706667a19.84 19.84 0 0 1 7.466667 27.349333 20.629333 20.629333 0 0 1-27.818667 7.317333l-31.189333-17.706666v35.413333a20.266667 20.266667 0 0 1-20.352 20.010667 20.266667 20.266667 0 0 1-20.373333-20.010667v-35.413333z m389.696-582.848c78.421333 26.666667 134.805333 100.629333 134.805333 187.712v11.669333c0 109.525333-89.237333 198.314667-199.317333 198.314667H199.296C89.216 705.642667 0 616.853333 0 507.328v-11.669333c0-80.384 48.277333-150.272 118.293333-181.269334 8.917333-75.306667 73.28-133.717333 151.36-133.717333a152.746667 152.746667 0 0 1 56.426667 10.730667A305.194667 305.194667 0 0 1 574.464 64c147.925333 0 271.232 104.853333 298.986667 243.946667z m-64.512 59.370666c0-128.853333-104.96-233.322667-234.453334-233.322666a234.56 234.56 0 0 0-215.466666 141.12c-0.64 1.472-1.493333 3.157333-2.218667 4.544l-0.085333 0.149333-60.288-24.704a82.261333 82.261333 0 0 0-26.773334-4.437333c-45.290667 0-82.005333 36.48-82.069333 81.536l2.496 35.434666a130.56 130.56 0 0 0-4.053333 0.362667c-65.429333 6.634667-115.690667 61.696-115.690667 127.658667v11.669333c0 70.869333 57.749333 128.32 128.96 128.32H808.96c71.232 0 128.96-57.450667 128.96-128.32v-11.669333c0-70.869333-57.728-128.341333-128.96-128.341334z" fill="#1296db" p-id="4271"></path></svg>,
        },
        {
          key: "4",
          label: "大雪",
          icon: <svg t="1666464675526" className="icon" viewBox="0 0 1239 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5917" width="32" height="32"><path d="M1168.961931 286.525821c-44.00404-42.978812-100.288195-67.53822-160.665789-71.631455-19.443608-3.069952-39.910601-1.023283-59.354208 2.046566-36.840547-121.773453-168.852566-216.940932-313.144801-216.940932l-1.023349 0c-220.019997 1.023283-320.308294 144.286194-352.032118 257.873177-12.280216-2.046566-25.583716-3.069952-37.863932-3.069952-85.96131 0-165.782511 44.002197-212.856606 115.63355 0 1.023283 0 1.023283-1.023385 3.069952-32.74721 60.375034-66.517702 202.614559 55.260871 293.688803 35.817264 29.675927 92.101418 32.745776 113.591694 32.745776l1.023349 0 2.046698 0c0 0 0 0 202.623161 0 29.677155 0 53.2141-23.536023 53.2141-52.188564 0-31.722493-23.537047-54.235233-53.2141-54.235233l-202.623111 0-4.093396 0c-22.513662 0-42.980655-5.116518-48.097378-9.209753-74.704479-57.305185-32.74721-145.309477-24.56033-158.612464 35.817264-59.351751 95.171472-65.491552 118.708519-65.491552 22.513662 0 37.863932 6.139801 42.980655 9.209753 15.35027 11.256319 35.817264 16.372939 54.237486 7.163186 17.396939-7.163186 30.700439-23.536023 31.723824-44.002197 0-9.209753 23.537047-225.127299 260.953984-226.150685l1.023349 0c120.755188 0 215.92666 95.167478 218.996714 177.031969 1.023385 15.349554 9.210162 31.722493 22.513662 39.908962 13.303499 9.209753 31.723824 12.279704 47.074094 6.139801 22.513662-7.163186 42.980655-10.233036 64.471034-10.233036 5.116723 0 12.280216 1.023283 19.443608 1.023283 31.723824 3.069952 62.424263 17.396222 83.914641 40.932246 25.583716 24.559306 39.910601 57.305185 39.910601 91.074244 0 105.400514-94.148087 136.099724-118.708519 141.216242l-5.116745 0 0 1.023306c-2.046669 0-2.046669 0-2.046669 0l0-1.023306-6.140094 0-201.599762 0-6.140094 0 0 1.023306c-26.607101 3.069952-46.050709 24.559306-46.050709 53.21195 0 25.582692 19.443608 48.095432 46.050709 51.165281l0 1.023306 6.140094 0 201.599762 0 6.140094 0 0-1.023306c0 0 0 0 2.046669 0l0 1.023306 12.280189 0c3.070054 0 6.140108-1.023283 10.233445-1.023283 72.65781-13.302987 207.739883-83.911057 207.739883-246.616756C1238.549687 391.926335 1211.942586 329.504633 1168.961931 286.525821L1168.961931 286.525821zM512.995174 675.382102c6.140108 9.209753 15.35027 13.302987 26.607101 13.302987 6.140108 0 11.256831-1.023283 17.396939-6.139801l19.443608-11.256319 0 18.41951c0 17.396222 12.280216 30.69921 29.677155 30.69921s30.700439-13.302987 30.700439-30.69921l0-17.396204 16.373554 9.209753c6.140108 4.093235 10.233445 5.116518 16.373554 5.116518 10.233445 0 19.443608-6.139801 26.607101-14.326271 8.186777-15.349554 4.09344-32.745776-11.256831-41.955529l-24.56033-17.396222 23.537047-15.349554c15.35027-9.209753 17.396939-28.652541 8.186777-41.955529-9.210162-15.349554-28.65377-18.419505-41.957269-9.209753l-13.303499 8.18647 0-15.349591c0-17.396222-13.303499-29.675927-30.700439-29.675927s-29.677155 12.279704-29.677155 29.675927l0 20.466122-16.373554-10.233036c-13.303499-10.233036-34.793878-4.093235-44.00404 9.209753-6.140108 14.326271-3.070054 34.792445 11.256831 42.978812l21.490379 13.302987-27.630384 18.419505C508.901837 641.613043 503.785114 660.032548 512.995174 675.382102L512.995174 675.382102zM701.29145 914.835774l-38.887215-26.605975 37.863932-23.536023c13.303499-9.209753 16.373554-30.69921 8.186777-44.002197-9.210162-13.302987-29.677155-18.419505-44.00404-8.18647l-24.56033 16.372939 0-29.675877c0-17.396222-13.303499-31.722493-31.723824-31.722493-15.35027 0-29.677155 14.326271-29.677155 31.722493l0 34.792407-29.677155-19.442788c-14.326885-7.163186-33.770493-4.093235-41.957269 9.209753-8.186777 15.349554-5.116723 35.815728 9.210162 44.002197l33.770493 21.489457-39.910601 28.652541c-14.326885 9.209753-17.396939 26.605975-8.186777 40.932246 5.116723 9.209753 14.326885 13.302987 23.537047 13.302987 8.186777 0 14.326885-1.023283 18.420325-6.139801l34.793878-21.489457 0 36.839019c0 17.396222 14.326885 30.69921 29.677155 30.69921 18.420325 0 31.723824-13.302987 31.723824-30.69921l0-34.792407 28.65377 18.419505c5.116723 3.069952 11.256831 5.116518 15.35027 5.116518 12.280216 0 22.513662-5.116518 27.630384-14.326271C720.735058 942.465032 716.641618 923.022244 701.29145 914.835774L701.29145 914.835774zM946.895163 880.04333l-25.583716-15.349554 23.537047-15.349554c10.233445-8.18647 13.303499-25.582692 7.163494-35.815728-8.186777-12.279704-24.56033-14.326271-35.817264-6.139801l-13.303499 7.163186 0-14.326285c0-16.372939-12.280216-26.605975-25.583716-26.605975-14.326885 0-25.583716 10.233036-25.583716 26.605975l0 18.41951-16.373554-10.233036c-11.256831-7.163186-28.65377-4.093235-35.817264 8.18647-6.140108 12.279704-3.070054 29.675927 8.186777 35.815728l21.490379 13.302987-25.583716 18.419505c-11.256831 6.139801-15.35027 22.51274-7.163494 34.792445 5.116723 7.163186 12.280216 11.256319 21.490379 11.256319 5.116723 0 11.256831-2.046566 14.326885-4.093235l19.443608-14.326271 0 21.489428c0 13.302987 11.256831 25.582692 25.583716 25.582692 13.303499 0 25.583716-12.279704 25.583716-25.582692l0-19.442816 16.373554 10.233036c2.046669 3.069952 8.186777 3.069952 11.256831 3.069952 11.256831 0 18.420325-3.069952 23.537047-10.233036C962.245433 903.579353 957.128711 888.229799 946.895163 880.04333L946.895163 880.04333zM399.40348 880.04333l-25.583716-15.349554 24.56033-15.349554c11.256831-8.18647 16.373554-25.582692 7.163494-35.815728-8.186777-12.279704-24.56033-14.326271-36.840547-6.139801l-14.326885 7.163186 0-14.326285c0-16.372939-11.256831-26.605975-24.56033-26.605975-14.326885 0-26.607101 10.233036-26.607101 26.605975l0 18.41951-15.35027-10.233036c-11.256831-7.163186-26.607101-4.093235-33.770493 8.18647-8.186777 12.279704-5.116723 29.675927 7.163494 35.815728l20.466993 13.302987-25.583716 18.419505c-11.256831 6.139801-15.35027 22.51274-6.140108 34.792445 5.116723 7.163186 13.303499 11.256319 20.466993 11.256319 5.116723 0 9.210162-2.046566 13.303499-4.093235l19.443608-14.326271 0 21.489428c0 13.302987 12.280216 25.582692 26.607101 25.582692 13.303499 0 24.56033-12.279704 24.56033-25.582692l0-19.442816 17.396939 10.233036c4.09344 3.069952 9.210162 3.069952 13.303499 3.069952 9.210162 0 17.396939-3.069952 22.513662-10.233036C415.777034 903.579353 412.70698 888.229799 399.40348 880.04333z" p-id="5918" fill="#1296db"></path></svg>,
        },
        {
          key: "5",
          label: "雾",
          icon: <svg t="1666464704691" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7979" width="32" height="32"><path d="M128.977513 730.527039c3.897773 0 7.515161-0.958838 10.82658-2.413979l0.127913 0.182149c1.452071-0.986467 107.524922-86.857207 279.880385-42.869367l0.229221-0.675382c1.223874 0.155543 2.317789 0.675382 3.566222 0.675382 14.111392 0 25.549909-10.794857 25.549909-24.134677 0-9.263991-5.731538-17.075911-13.83203-21.096481l0.051165-0.182149c-0.204661-0.051165-0.382717-0.104377-0.585331-0.155543-2.828418-1.324158-5.936199-2.075265-9.247618-2.308579-170.699754-45.102221-272.161586 25.846668-306.474067 46.036499-0.663102 0.258896-1.171686 0.753153-1.809205 1.089821-3.464915 2.075265-6.062066 3.710508-6.750751 4.178159l0.101307 0.128937c-4.611018 4.41045-7.489578 10.431583-7.489578 17.127076C103.121636 719.602222 114.688065 730.527039 128.977513 730.527039z" p-id="7980" fill="#1296db"></path><path d="M659.44512 794.754852c-0.076748 0-0.127913 0.026606-0.204661 0.026606-45.750997-4.334725-74.358545-12.898775-139.086755-37.914518-199.944821-82.522482-362.900194 1.713015-401.084864 24.445762-0.663102 0.25992-1.171686 0.779759-1.809205 1.089821-3.464915 2.128477-6.062066 3.76372-6.750751 4.230348l0.101307 0.130983c-4.611018 4.462638-7.489578 10.586103-7.489578 17.334807 0 13.649881 11.56643 24.704658 25.855878 24.704658 3.897773 0 7.515161-0.958838 10.82658-2.438539l0.127913 0.181125c1.604544-1.089821 161.860435-106.578364 360.505657-24.65247 70.587662 27.299763 105.003496 37.083593 156.306952 41.677215l0.024559-0.518816c0.917906 0.104377 1.732457 0.518816 2.674922 0.518816 14.086833 0 25.52535-10.924817 25.52535-24.419156C684.969447 805.679669 673.531953 794.754852 659.44512 794.754852z" p-id="7981" fill="#1296db"></path><path d="M517.861498 679.767981c0-13.337773-11.438517-24.133653-25.549909-24.133653-14.086833 0-25.52535 10.794857-25.52535 24.133653 0 13.313214 11.438517 24.133653 25.52535 24.133653C506.422981 703.901635 517.861498 693.081195 517.861498 679.767981z" p-id="7982" fill="#1296db"></path><path d="M888.862183 657.268548c-6.903224 0-13.118785 2.647293-17.756409 6.825452l-0.202615-0.207731c-0.942465 0.829901-91.069135 76.18924-298.680567 13.208836-3.463891-1.635243-7.18361-2.777253-11.30958-2.777253-14.112416 0-25.549909 10.794857-25.549909 24.133653 0 9.447163 5.884011 17.412578 14.264888 21.383006l-0.382717 0.777713c71.250764 22.811542 126.732379 29.894867 176.049598 29.894867 104.671944 0 161.401993-36.744879 176.431292-48.111764 7.617491-4.25593 12.966313-11.755742 12.966313-20.708648C914.691455 668.219971 903.126049 657.268548 888.862183 657.268548z" p-id="7983" fill="#1296db"></path><path d="M801.588491 380.844891C767.632121 255.348666 657.966443 168.855756 530.546402 168.855756c-105.334024 0-202.134697 61.398372-250.279207 157.570735C164.590616 338.494341 75.839269 438.480566 75.839269 559.876404c0 27.611871 5.121648 53.900607 13.704117 78.526471 0.458441 3.269463 1.477654 6.228865 3.082198 8.952906 0 0 0 0.026606 0.026606 0.053212 4.049223 6.773264 10.979052 11.546987 19.257599 11.546987 12.710486 0 22.976294-10.612709 22.976294-23.719214 0-2.620687-0.686638-5.059226-1.452071-7.421017l0.026606 0c-0.026606-0.051165-0.026606-0.103354-0.051165-0.155543-0.254803-0.804319-0.433882-1.583055-0.789992-2.360767-7.463995-20.449751-12.048407-42.324968-12.048407-65.422012 0-99.986225 74.994018-181.730994 171.361833-187.984419 55.685253 2.802836 111.421672 34.618449 140.233881 78.266551l0.151449-0.077771c3.872191 6.955412 10.877745 11.860119 19.208481 11.860119 12.431124 0 22.493294-10.380418 22.493294-23.174815 0-3.294023-0.688685-6.40999-1.910513-9.237385l0.152473-0.077771c-0.892323-1.426489-1.937119-2.647293-2.852978-4.047176-0.76441-1.089821-1.349741-2.310625-2.267647-3.244904-34.006512-50.577932-80.114642-81.379449-137.583518-91.63093 42.922578-71.001077 118.80892-115.505687 200.98757-115.505687 110.887506 0 205.753107 77.851089 230.691079 189.334159l3.031033 13.545504 13.043061 3.555989c70.614268 19.333324 119.931486 85.428671 119.931486 160.736844 0 18.190291-3.209088 35.603893-8.53335 52.055586l0.382717 0.104377c-0.332575 1.583055-0.917906 3.061732-0.917906 4.722558 0 12.845563 10.087753 23.277146 22.543436 23.277146 10.087753 0 18.317181-6.955412 21.194718-16.374946l0.229221 0.053212c7.998161-22.603811 9.831926-38.485523 9.831926-63.837934C941.973822 490.61597 884.913245 409.702126 801.588491 380.844891z" p-id="7984" fill="#1296db"></path><path d="M727.535915 794.754852c-14.086833 0-25.52535 10.924817-25.52535 24.393573 0 13.494339 11.438517 24.419156 25.52535 24.419156 14.111392 0 25.549909-10.924817 25.549909-24.419156C753.085824 805.679669 741.64833 794.754852 727.535915 794.754852z" p-id="7985" fill="#1296db"></path><path d="M888.862183 754.713904c-6.903224 0-13.118785 2.671852-17.756409 6.877641l-0.202615-0.208754c-0.535189 0.467651-24.379247 24.835641-86.4837 34.748409l0.076748 0.338714c-9.655917 3.477194-16.584724 12.247952-16.584724 22.680559 0 13.494339 11.412934 24.419156 25.52535 24.419156 0.917906 0 1.707898-0.414439 2.599198-0.493234l0.12689 0.493234c63.124689-10.69048 94.050026-34.409694 105.563244-43.208081 7.617491-4.308119 12.966313-11.884678 12.966313-20.967544C914.691455 765.767658 903.126049 754.713904 888.862183 754.713904z" p-id="7986" fill="#1296db"></path></svg>,
        },
      ]}
    />
  );
  return (
    <div id="satellite-info">
      <div
        id="sate-model"
        style={{ backgroundImage: `url(./images/${bgImg})` }}
      ></div>
      <div id="sate-info">
        <div id="up">
          <div className="name-item">
            {type === "satellite" ? "卫星名称" : "基站名称"}
          </div>
          <div className="name-weather">
            <div className="name-sate">
              {sateName === "Place/undefined" ? "——" : sateName}
            </div>
            {type !== "satellite" ? (
              <div className="weather-icon">
                <Dropdown overlay={menu}>
                  <div className="weather-wrap">
                    <div
                      className={`weather weather${weatherIcon}`}
                    />
                    <DownOutlined />
                  </div>
                </Dropdown>
              </div>
            ) : null}
          </div>
        </div>
        <div id="bottom">
          <div id="launch-time-container">
            <div className="item-value">
              {sateName === "Place/undefined" ? "——" : launch}
            </div>
            <img className="sate-info-img" src="./images/a.png" alt="" />
            <div className="item">
              {type === "satellite" ? "发射时间" : "建设时间"}
            </div>
          </div>
          <div id="status-container">
            <div className="item-value">
              {sateName === "Place/undefined" ? "——" : status}
            </div>
            <img className="sate-info-img" src="./images/b.png" alt="" />
            <div className="item">状态</div>
          </div>
          <div id="activity-container">
            <div className="item-value">
              {sateName === "Place/undefined" ? "——" : activity}
            </div>
            <img className="sate-info-img" src="./images/c.png" alt="" />
            <div className="item">活动</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SatelliteInfo;
