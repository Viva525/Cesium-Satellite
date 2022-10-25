//@ts-nocheck
import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import geoWorld from "../../../public/data/world.json";

const RsEarth: React.FC<any> = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    let myChart = echarts.init(chartRef.current as unknown as HTMLDivElement); //@ts-ignore
    echarts.registerMap("world", geoWorld);

    // 为防止各个国家写法不兼容，从而采用国家地区编码的方式编写数据。
    // 国家地理坐标点，取国家中间位置而非国家首都
    const geoCoordMap = {
      Seattle: [-122.20, 47.36],
      Los: [-118.22, 34.05],
      CHONGQING:[106.33, 29.35],
      BEIJING:[116.20, 39.56],
      SHANGHAI:[121.12, 31.40],
      SETTLE:[47.37, 122.19],
      AND: [1.601554, 42.546245],
      ARE: [53.847818, 23.424076],
      AFG: [67.709953, 33.93911],
      ATG: [-61.796428, 17.060816],
      AIA: [-63.068615, 18.220554],
      ALB: [20.168331, 41.153332],
      ARM: [45.038189, 40.069099],
      AGO: [17.873887, -11.202692],
      ATA: [-0.071389, -75.250973],
      ARG: [-63.616672, -38.416097],
      ASM: [-170.132217, -14.270972],
      AUT: [14.550072, 47.516231],
      AUS: [133.775136, -25.274398],
      ABW: [-69.968338, 12.52111],
      AZE: [47.576927, 40.143105],
      BIH: [17.679076, 43.915886],
      BRB: [-59.543198, 13.193887],
      BGD: [90.356331, 23.684994],
      BEL: [4.469936, 50.503887],
      BFA: [-1.561593, 12.238333],
      BGR: [25.48583, 42.733883],
      BHR: [50.637772, 25.930414],
      BDI: [29.918886, -3.373056],
      BEN: [2.315834, 9.30769],
      BMU: [-64.75737, 32.321384],
      BRN: [114.727669, 4.535277],
      BOL: [-63.588653, -16.290154],
      BRA: [-51.92528, -14.235004],
      BHS: [-77.39628, 25.03428],
      BTN: [90.433601, 27.514162],
      BVT: [3.413194, -54.423199],
      BWA: [24.684866, -22.328474],
      BLR: [27.953389, 53.709807],
      BLZ: [-88.49765, 17.189877],
      CAN: [-106.346771, 56.130366],
      CCK: [96.870956, -12.164165],
      COD: [21.758664, -4.038333],
      CAF: [20.939444, 6.611111],
      COG: [15.827659, -0.228021],
      CHE: [8.227512, 46.818188],
      CIV: [-5.54708, 7.539989],
      COK: [-159.777671, -21.236736],
      CHL: [-71.542969, -35.675147],
      CMR: [12.354722, 7.369722],
      CHN: [104.195397, 35.86166],
      COL: [-74.297333, 4.570868],
      CRI: [-83.753428, 9.748917],
      CUB: [-77.781167, 21.521757],
      CPV: [-24.013197, 16.002082],
      CXR: [105.690449, -10.447525],
      CYP: [33.429859, 35.126413],
      CZE: [15.472962, 49.817492],
      DEU: [10.451526, 51.165691],
      DJI: [42.590275, 11.825138],
      DNK: [9.501785, 56.26392],
      DMA: [-61.370976, 15.414999],
      DOM: [-70.162651, 18.735693],
      DZA: [1.659626, 28.033886],
      ECU: [-78.183406, -1.831239],
      EST: [25.013607, 58.595272],
      EGY: [30.802498, 26.820553],
      ESH: [-12.885834, 24.215527],
      ERI: [39.782334, 15.179384],
      ESP: [-3.74922, 40.463667],
      ETH: [40.489673, 9.145],
      FIN: [25.748151, 61.92411],
      FJI: [179.414413, -16.578193],
      FLK: [-59.523613, -51.796253],
      FSM: [150.550812, 7.425554],
      FRO: [-6.911806, 61.892635],
      FRA: [2.213749, 46.227638],
      GAB: [11.609444, -0.803689],
      GBR: [-3.435973, 55.378051],
      GRD: [-61.604171, 12.262776],
      GEO: [43.356892, 42.315407],
      GUF: [-53.125782, 3.933889],
      GGY: [-2.585278, 49.465691],
      GHA: [-1.023194, 7.946527],
      GIB: [-5.345374, 36.137741],
      GRL: [-42.604303, 71.706936],
      GMB: [-15.310139, 13.443182],
      GIN: [-9.696645, 9.945587],
      GLP: [-62.067641, 16.995971],
      GNQ: [10.267895, 1.650801],
      GRC: [21.824312, 39.074208],
      SGS: [-36.587909, -54.429579],
      GTM: [-90.230759, 15.783471],
      GUM: [144.793731, 13.444304],
      GNB: [-15.180413, 11.803749],
      GUY: [-58.93018, 4.860416],
      HKG: [114.109497, 22.396428],
      HMD: [73.504158, -53.08181],
      HND: [-86.241905, 15.199999],
      HRV: [15.2, 45.1],
      HTI: [-72.285215, 18.971187],
      HUN: [19.503304, 47.162494],
      IDN: [113.921327, -0.789275],
      IRL: [-8.24389, 53.41291],
      ISR: [34.851612, 31.046051],
      IMN: [-4.548056, 54.236107],
      IND: [78.96288, 20.593684],
      IOT: [71.876519, -6.343194],
      IRQ: [43.679291, 33.223191],
      IRN: [53.688046, 32.427908],
      ISL: [-19.020835, 64.963051],
      ITA: [12.56738, 41.87194],
      JEY: [-2.13125, 49.214439],
      JAM: [-77.297508, 18.109581],
      JOR: [36.238414, 30.585164],
      JPN: [138.252924, 36.204824],
      KEN: [37.906193, -0.023559],
      KGZ: [74.766098, 41.20438],
      KHM: [104.990963, 12.565679],
      KIR: [-168.734039, -3.370417],
      COM: [43.872219, -11.875001],
      KNA: [-62.782998, 17.357822],
      PRK: [127.510093, 40.339852],
      KOR: [127.766922, 35.907757],
      KWT: [47.481766, 29.31166],
      CYM: [-80.566956, 19.513469],
      KAZ: [66.923684, 48.019573],
      LAO: [102.495496, 19.85627],
      LBN: [35.862285, 33.854721],
      LCA: [-60.978893, 13.909444],
      LIE: [9.555373, 47.166],
      LKA: [80.771797, 7.873054],
      LBR: [-9.429499, 6.428055],
      LSO: [28.233608, -29.609988],
      LTU: [23.881275, 55.169438],
      LUX: [6.129583, 49.815273],
      LVA: [24.603189, 56.879635],
      LBY: [17.228331, 26.3351],
      MAR: [-7.09262, 31.791702],
      MCO: [7.412841, 43.750298],
      MDA: [28.369885, 47.411631],
      MNE: [19.37439, 42.708678],
      MDG: [46.869107, -18.766947],
      MHL: [171.184478, 7.131474],
      MKD: [21.745275, 41.608635],
      MLI: [-3.996166, 17.570692],
      MMR: [95.956223, 21.913965],
      MNG: [103.846656, 46.862496],
      MAC: [113.543873, 22.198745],
      MNP: [145.38469, 17.33083],
      MTQ: [-61.024174, 14.641528],
      MRT: [-10.940835, 21.00789],
      MSR: [-62.187366, 16.742498],
      MLT: [14.375416, 35.937496],
      MUS: [57.552152, -20.348404],
      MDV: [73.22068, 3.202778],
      MWI: [34.301525, -13.254308],
      MEX: [-102.552784, 23.634501],
      MYS: [101.975766, 4.210484],
      MOZ: [35.529562, -18.665695],
      NAM: [18.49041, -22.95764],
      NCL: [165.618042, -20.904305],
      NER: [8.081666, 17.607789],
      NFK: [167.954712, -29.040835],
      NGA: [8.675277, 9.081999],
      NIC: [-85.207229, 12.865416],
      NLD: [5.291266, 52.132633],
      NOR: [8.468946, 60.472024],
      NPL: [84.124008, 28.394857],
      NRU: [166.931503, -0.522778],
      NIU: [-169.867233, -19.054445],
      NZL: [174.885971, -40.900557],
      OMN: [55.923255, 21.512583],
      PAN: [-80.782127, 8.537981],
      PER: [-75.015152, -9.189967],
      PYF: [-149.406843, -17.679742],
      PNG: [143.95555, -6.314993],
      PHL: [121.774017, 12.879721],
      PAK: [69.345116, 30.375321],
      POL: [19.145136, 51.919438],
      SPM: [-56.27111, 46.941936],
      PCN: [-127.439308, -24.703615],
      PRI: [-66.590149, 18.220833],
      PSE: [35.233154, 31.952162],
      PRT: [-8.224454, 39.399872],
      PLW: [134.58252, 7.51498],
      PRY: [-58.443832, -23.442503],
      QAT: [51.183884, 25.354826],
      REU: [55.536384, -21.115141],
      ROU: [24.96676, 45.943161],
      SRB: [21.005859, 44.016521],
      RUS: [105.318756, 61.52401],
      RWA: [29.873888, -1.940278],
      SAU: [45.079162, 23.885942],
      SLB: [160.156194, -9.64571],
      SYC: [55.491977, -4.679574],
      SDN: [30.217636, 12.862807],
      SWE: [18.643501, 60.128161],
      SGP: [103.819836, 1.352083],
      SHN: [-10.030696, -24.143474],
      SVN: [14.995463, 46.151241],
      SJM: [23.670272, 77.553604],
      SVK: [19.699024, 48.669026],
      SLE: [-11.779889, 8.460555],
      SMR: [12.457777, 43.94236],
      SEN: [-14.452362, 14.497401],
      SOM: [46.199616, 5.152149],
      SUR: [-56.027783, 3.919305],
      STP: [6.613081, 0.18636],
      SLV: [-88.89653, 13.794185],
      SYR: [38.996815, 34.802075],
      SWZ: [31.465866, -26.522503],
      TCA: [-71.797928, 21.694025],
      TCD: [18.732207, 15.454166],
      ATF: [69.348557, -49.280366],
      TGO: [0.824782, 8.619543],
      THA: [100.992541, 15.870032],
      TJK: [71.276093, 38.861034],
      TKL: [-171.855881, -8.967363],
      TLS: [125.727539, -8.874217],
      TKM: [59.556278, 38.969719],
      TUN: [9.537499, 33.886917],
      TON: [-175.198242, -21.178986],
      TUR: [35.243322, 38.963745],
      TTO: [-61.222503, 10.691803],
      TUV: [177.64933, -7.109535],
      TWN: [120.960515, 23.69781],
      TZA: [34.888822, -6.369028],
      UKR: [31.16558, 48.379433],
      UGA: [32.290275, 1.373333],
      UMI: ["", ""],
      USA: [-95.712891, 37.09024],
      URY: [-55.765835, -32.522779],
      UZB: [64.585262, 41.377491],
      VAT: [12.453389, 41.902916],
      VCT: [-61.287228, 12.984305],
      VEN: [-66.58973, 6.42375],
      VGB: [-64.639968, 18.420695],
      VIR: [-64.896335, 18.335765],
      VNM: [108.277199, 14.058324],
      VUT: [166.959158, -15.376706],
      WLF: [-177.156097, -13.768752],
      WSM: [-172.104629, -13.759029],
      YEM: [48.516388, 15.552727],
      MYT: [45.166244, -12.8275],
      ZAF: [22.937506, -30.559482],
      ZMB: [27.849332, -13.133897],
      ZWE: [29.154857, -19.015438],
    };
    // 地理映射
    const nameMap = {
      China: "中国",
      Afghanistan: "阿富汗",
      Angola: "安哥拉",
      Albania: "阿尔巴尼亚",
      "United Arab Emirates": "阿拉伯联合酋长国",
      Argentina: "阿根廷",
      Armenia: "亚美尼亚",
      Antarctica: "南极洲",
      "French Southern and Antarctic Lands": "法国南部和南极地",
      Australia: "澳大利亚",
      Austria: "奥地利",
      Azerbaijan: "阿塞拜疆",
      Burundi: "布隆迪",
      Belgium: "比利时",
      Benin: "贝宁",
      "Burkina Faso": "布基纳法索",
      Bangladesh: "孟加拉国",
      Bulgaria: "保加利亚",
      "The Bahamas": "巴哈马",
      "Bosnia and Herzegovina": "波斯尼亚和黑塞哥维那",
      Belarus: "白俄罗斯",
      Belize: "伯利兹",
      Bermuda: "百慕大",
      Bolivia: "玻利维亚",
      Brazil: "巴西",
      Brunei: "文莱",
      Bhutan: "不丹",
      Botswana: "博茨瓦纳",
      "Central African Republic": "中非共和国",
      Canada: "加拿大",
      Switzerland: "瑞士",
      Chile: "智利",
      "Ivory Coast": "海牙",
      Cameroon: "喀麦隆",
      "Democratic Republic of the Congo": "刚果民主共和国",
      "Republic of the Congo": "刚果共和国",
      Colombia: "哥伦比亚",
      "Costa Rica": "哥斯达黎加",
      Cuba: "古巴",
      "Northern Cyprus": "塞浦路斯北部",
      Cyprus: "塞浦路斯",
      "Czech Republic": "捷克共和国",
      Germany: "德国",
      Djibouti: "吉布提",
      Denmark: "丹麦",
      "Dominican Republic": "多明尼加共和国",
      Algeria: "阿尔及利亚",
      Ecuador: "厄瓜多尔",
      Egypt: "埃及",
      Eritrea: "厄立特里亚",
      Spain: "西班牙",
      Estonia: "爱沙尼亚",
      Ethiopia: "埃塞俄比亚",
      Finland: "芬兰",
      Fiji: "斐济",
      "Falkland Islands": "福克兰群岛",
      France: "法国",
      Gabon: "加蓬",
      "United Kingdom": "英国",
      Georgia: "格鲁吉亚",
      Ghana: "加纳",
      Guinea: "几内亚",
      Gambia: "冈比亚",
      "Guinea Bissau": "几内亚比绍",
      "Equatorial Guinea": "赤道几内亚",
      Greece: "希腊",
      Greenland: "格陵兰",
      Guatemala: "危地马拉",
      "French Guiana": "法属圭亚那",
      Guyana: "圭亚那",
      Honduras: "洪都拉斯",
      Croatia: "克罗地亚",
      Haiti: "海地",
      Hungary: "匈牙利",
      Indonesia: "印度尼西亚",
      India: "印度",
      Ireland: "爱尔兰",
      Iran: "伊朗",
      Iraq: "伊拉克",
      Iceland: "冰岛",
      Israel: "以色列",
      Italy: "意大利",
      Jamaica: "牙买加",
      Jordan: "约旦",
      Japan: "日本",
      Kazakhstan: "哈萨克斯坦",
      Kenya: "肯尼亚",
      Cambodia: "柬埔寨",
      "South Korea": "韩国",
      Kosovo: "科索沃",
      Kuwait: "科威特",
      Laos: "老挝",
      Lebanon: "黎巴嫩",
      Liberia: "利比里亚",
      Libya: "利比亚",
      "Sri Lanka": "斯里兰卡",
      Lesotho: "莱索托",
      Lithuania: "立陶宛",
      Luxembourg: "卢森堡",
      Latvia: "拉脱维亚",
      Morocco: "摩洛哥",
      Moldova: "摩尔瓦西亚",
      Madagascar: "马达加斯加",
      Mexico: "墨西哥",
      Macedonia: "马其顿",
      Mali: "马里",
      Malta: "马耳他",
      Myanmar: "缅甸",
      Montenegro: "黑山",
      Mongolia: "蒙古",
      Mozambique: "莫桑比克",
      Mauritania: "毛里塔尼亚",
      Malawi: "马拉维",
      Malaysia: "马来西亚",
      Namibia: "纳米比亚",
      "New Caledonia": "新喀里多尼亚",
      Niger: "尼日尔",
      Nigeria: "尼日利亚",
      Nicaragua: "尼加拉瓜",
      Netherlands: "荷兰",
      Norway: "挪威",
      Nepal: "尼泊尔",
      "New Zealand": "新西兰",
      Oman: "阿曼",
      Pakistan: "巴基斯坦",
      Panama: "巴拿马",
      Peru: "秘鲁",
      Philippines: "菲律宾",
      "Papua New Guinea": "巴布亚新几内亚",
      Poland: "波兰",
      "Puerto Rico": "波多黎各",
      "North Korea": "朝鲜",
      Portugal: "葡萄牙",
      Paraguay: "巴拉圭",
      Qatar: "卡塔尔",
      Romania: "罗马尼亚",
      Russia: "俄罗斯",
      Rwanda: "卢旺达",
      "Western Sahara": "西撒哈拉",
      "Saudi Arabia": "沙特阿拉伯",
      Sudan: "苏丹",
      "South Sudan": "南苏丹",
      Senegal: "塞内加尔",
      "Solomon Islands": "所罗门群岛",
      "Sierra Leone": "塞拉利昂",
      "El Salvador": "萨尔瓦多",
      Somaliland: "索马里兰",
      Somalia: "索马里",
      "Republic of Serbia": "塞尔维亚共和国",
      Suriname: "苏里南",
      Slovakia: "斯洛伐克",
      Slovenia: "斯洛文尼亚",
      Swaziland: "斯威士兰",
      Sweden: "瑞典",
      Syria: "叙利亚",
      Chad: "乍得",
      Togo: "多哥",
      Thailand: "泰国",
      Tajikistan: "塔吉克斯坦",
      Turkmenistan: "土库曼斯坦",
      "East Timor": "东帝汶",
      "Trinidad and Tobago": "特立尼达和多巴哥",
      Tunisia: "哈萨克突尼斯斯坦",
      Turkey: "土耳其",
      "Taiwan(China)": "台湾",
      "United Republic of Tanzania": "坦桑尼亚",
      Uganda: "乌干达",
      Ukraine: "乌克兰",
      Uruguay: "乌拉圭",
      "United States of America": "美国",
      Uzbekistan: "乌兹别克斯坦",
      Venezuela: "委内瑞拉",
      Vietnam: "越南",
      Vanuatu: "瓦努阿图",
      "West Bank": "约旦河西岸",
      Yemen: "也门",
      "South Africa": "南非",
      "S. Sudan": "南苏丹",
      Tanzania: "坦桑尼亚",
      "Central African Rep.": "中非共和国",
      Zambia: "赞比亚",
      Zimbabwe: "津巴布韦",
      Congo: "刚果",
      "Eq. Guinea": "几内亚",
    };

    const convertData = (data) => {
      let res = [];
      for (var i = 0; i < data.length; i++) {
        let dataIndex = data[i];
        var fromCoord = geoCoordMap[dataIndex[0].name];
        var toCoord = geoCoordMap[dataIndex[1].name];
        if (fromCoord && toCoord) {
          res.push([
            {
              coord: fromCoord,
            },
            {
              coord: toCoord,
            },
          ]);
        }
      }
      return res;
    };

    let series = [];

    // 飞线数据
    let toData = [
      [
        { name: "CHONGQING" },
        {
          name: "BEIJING",
          value: {
            tradingCountry: "北京"
          },
        },
      ],
      [
        { name: "BEIJING" },
        {
          name: "SHANGHAI",
          // 这里为自定义数据，tooltip会用到
          value: {
            tradingCountry: "上海"
          },
        },
      ],
      [
        { name: "Los" },
        {
          name: "Los",
          value: {
            tradingCountry: "洛杉矶"
          },
        },
      ],
      [
        { name: "Seattle" },
        {
          name: "Seattle",
          value: {
            tradingCountry: "西雅图"
          },
        },
      ],
      [
        { name: "SHANGHAI" },
        {
          name: "CHONGQING",
          value: {
            tradingCountry: "重庆"
          },
        },
      ],
    ];

    let datas = [["Peking", toData]];

    datas.forEach((item, i) => {
      series.push(
        // {
        //   name: item[0],
        //   type: "lines",
        //   zlevel: 1,
        //   // 飞行线特效
        //   effect: {
        //     show: true, // 是否显示
        //     period: 6, // 特效动画时间
        //     trailLength: 0, // 特效尾迹长度。取从 0 到 1 的值，数值越大尾迹越长
        //     symbol: 'arrow', // 特效图形标记
        //     // symbolSize: 15
        //     symbolSize: [8,20,0,0,30,40,50]
        //   },
        //   // 线条样式
        //   lineStyle: {
        //     curveness: -0.2, // 飞线弧度
        //     type: "solid", // 飞线类型
        //     color: "rgb(255,236,61)", // 飞线颜色
        //     width: 2, // 飞线宽度
        //   },
        //   data: convertData(item[1]),
        // },
        {
          type: "effectScatter", // 带有涟漪特效动画的散点（气泡）图
          coordinateSystem: "geo",
          zlevel: 2,
          symbol: "circle",
          symbolSize: 10,
          // 涟漪特效
          rippleEffect: {
            period: 4,
            scale: 4,
            brushType: "stroke",
          },
          itemStyle: {
            color: "rgb(255,236,61)",
          },
          label: {
            show: true,
            color: "#fff",
            position: "bottom",
            fontSize: 16,
            formatter: function (item) {
              return item.data.datas.tradingCountry;
            },
          },
          // 这里用来组装自定义数据，以便在tooltip中取得。
          data: item[1].map((dataItem) => {
            return {
              name: dataItem[1].name,
              value: geoCoordMap[dataItem[1].name],
              datas: dataItem[1].value,
            };
          }),
        }
      );
    });

    let option = {
      // 底图样式
      geo: {
        map: "world", // 地图类型
        roam: true, // 是否开启缩放
        zoom: 1.5, // 初始缩放大小
        // center:[],
        center: [11.3316626, 19.5845024], // 地图中心点
        scaleLimit: {
          // 缩放等级
          min: 1,
          max: 100,
        },
        nameMap: nameMap, // 自定义地区的名称映射
        // 三维地理坐标系样式
        itemStyle: {
          color: "rgba(0,116,177, .6)",
          borderColor: "rgb(79,228,255)",
          borderWidth: 0.5,
        },
        // 鼠标悬浮样式
        emphasis: {
          itemStyle: {
            areaColor: "rgba(0,162,248, 6)",
          },
          label: {
            show: true,
            color: "#90d9ff",
            fontSize: 16,
          },
        },
      },

      series: series,
      tooltip: {
        trigger: "none"
      },
    };

    myChart.setOption(option);
  }, []);

  return <div id="earth-chart" ref={chartRef}></div>;
};

export default RsEarth;
