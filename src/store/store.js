import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const myStore = new Vuex.Store({
  state: {
    rank: '优',
    color: '00e400',
    mapZom: '贵阳白云',
    city: '贵阳市',
    Pm25: 0,
    Pm10: 0,
    Co: 0,
    O3: 0,
    No2: 0,
    So2: 0,
    Aqi: 0,
    Co2: 0,
    FengS: 0,
    FengX: 0,
    FengL: 0,
    Rank: '优',
    aqiRank: '优',
    mapTypes: ['china'],
    inChinaMap: '',
    monitor: {
      Point: '贵阳市',
      Fomes: {
        Pm25: 0,
        Pm25s: [],
        Pm10s: [],
        Cos: [],
        O3s: [],
        No2s: [],
        Sos: [],
        So2s: [],
        Aqis: [15, 17, 12, 16, 18, 20, 24, 22, 18, 23, 19, 18, 21, 16, 14, 18, 22],
        Co2s: [],
        Pm10: 0,
        Co: 0,
        O3: 0,
        No2: 0,
        So2: 0,
        Aqi: 0,
        Co2: 0,
        FengS: 0,
        FengX: 0,
        FengL: 0,
        Rank: '优'
      },
      UrbanScale: {
        population: '223 万',
        acreage: '7343 km²',
        cars: '923 万',
        hospital: '800 间',
        road: '1600 Km',
        architecture: '820 万',
        factory: '200 间'
      }
    },
    traceability: {
      Aqi: [15, 25, 24, 17, 15, 24, 17, 30, 24, 17, 15, 24, 17, 17, 15, 24, 25, 17, 15, 25, 17, 15, 24, 17],
      Pm25: [15, 25, 17, 15, 25, 17, 15, 24, 17, 24, 30, 24, 17, 15, 24, 17, 30, 24, 17, 15, 24, 17, 17, 15],
      Pm10: [15, 25, 24, 30, 24, 25, 24, 30, 17, 15, 17, 15, 24, 17, 24, 17, 24, 17, 17, 15, 24, 25, 17, 15],
      O3: [15, 17, 15, 30, 24, 24, 17, 25, 24, 17, 15, 24, 17, 24, 17, 25, 24, 17, 15, 24, 17, 30, 24, 17],
      So2: [15, 25, 24, 30, 24, 17, 15, 24, 17, 17, 15, 24, 17, 24, 17, 15, 17, 15, 24, 17, 24, 17, 25, 24],
      No2: [15, 25, 24, 30, 24, 17, 15, 17, 15, 24, 17, 24, 17, 24, 17, 15, 15, 24, 17, 17, 15, 24, 17, 24],
      Co2: [15, 25, 17, 15, 25, 17, 15, 24, 17, 24, 30, 24, 17, 15, 24, 17, 30, 24, 17, 15, 24, 17, 17, 15],
      Co: [1, 0, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1]
    },
    cityPoins: [
      {city: '碧云窝', lng: 106.669011, lat: 26.43962, pm25s: 18},
      {city: '马鞍山', lng: 106.686743, lat: 26.719737, pm25s: 15},
      {city: '鉴湖路', lng: 106.633473, lat: 26.633268, pm25s: 22},
      {city: '红边门', lng: 106.720454, lat: 26.597594, pm25s: 45},
      {city: '市环保站', lng: 106.709177, lat: 26.629907, pm25s: 118},
      {city: '燕子冲', lng: 106.761906, lat: 26.636276, pm25s: 158},
      {city: '新华路', lng: 106.724856, lat: 26.572529, pm25s: 228},
      {city: '太慈桥', lng: 106.695077, lat: 26.560502, pm25s: 358},
      {city: '中院村', lng: 106.695151, lat: 26.525205, pm25s: 458},
      {city: '桐木岭', lng: 106.686075, lat: 26.400228, pm25s: 1}
    ]
  },
  mutations: {
    addPoins (state, type) {
      if (type === '贵阳') {
        axios.post('http://119.23.160.82:8763/hjjc-api/pmData/getGYBYPmData').then(resp => {
          if (resp.data.success) {
            let data = resp.data.data
            for (let i = 0; i < data.length; i++) {
              state.cityPoins.push(data[i])
            }
          }
        })
        // axios.post('/hjjc-api/pmData/getStationPmByCity', {
        //   city: '贵阳'
        // }).then(resp => {
        //   if (resp.data.success) {
        //     let data = resp.data.data
        //     for (let i = 0; i < data.length; i++) {
        //       state.cityPoins.push(data[i])
        //     }
        //   }
        // })
      }
    },
    addMaptypes (state, city) {
      state.mapTypes.push(city)
    },
    removeMaptypes (state) {
      state.mapTypes.pop()
    },
    getRank (state, value) {
      if (value <= 35) {
        state.rank = '优'
        state.color = '00e400'
      } else if (value <= 75 && value > 35) {
        state.rank = '良'
        state.color = 'ecec00'
      } else if (value <= 115 && value > 75) {
        state.rank = '轻度污染'
        state.color = 'ff7e00'
      } else if (value <= 150 && value > 115) {
        state.rank = '中度污染'
        state.color = 'ff0000'
      } else if (value <= 250 && value > 150) {
        state.rank = '重度污染'
        state.color = '99004c'
      } else if (value >= 251) {
        state.rank = '严重污染'
        state.color = '7e0023'
      }
    },
    monitorChange (state, city) {
      let str = ''
      if (city.pm25s <= 35) {
        str = '优'
      } else if (city.pm25s <= 75 && city.pm25s > 35) {
        str = '良'
      } else if (city.pm25s <= 115 && city.pm25s > 75) {
        str = '轻度污染'
      } else if (city.pm25s <= 150 && city.pm25s > 115) {
        str = '中度污染'
      } else if (city.pm25s <= 250 && city.pm25s > 150) {
        str = '重度污染'
      } else if (city.pm25s >= 251) {
        str = '严重污染'
      }
      state.monitor = {
        Point: city.city,
        Fomes: {
          Pm25: city.pm25s,
          Pm10: 10,
          Co: 1,
          O3: city.o3,
          No2: city.no2,
          So2: city.so2,
          Aqi: city.aqi,
          Co2: 34,
          FengS: 4,
          Pm25s: [12, 14, 20, 18, 16, 15, 24],
          Pm10s: [10, 8, 16, 14, 18, 15, 10],
          Cos: [110, 120, 113, 143, 153, 134, 140],
          O3s: [89, 80, 73, 70, 78, 85, 94],
          No2s: [24, 32, 14, 54, 34, 45, 23],
          Sos: [24, 25, 32, 24, 25, 45, 34],
          So2s: [24, 25, 32, 24, 25, 45, 34],
          Aqis: [12, 14, 20, 18, 16, 15, 24],
          Co2s: [110, 120, 113, 143, 153, 134, 140],
          FengX: 110,
          FengL: 4,
          Rank: str
        },
        UrbanScale: {
          population: '23 万',
          acreage: '733 km²',
          cars: '93 万',
          hospital: '80 间',
          road: '100 Km',
          architecture: '80 万',
          factory: '20 间'
        }
      }
    },
    changeCity (state, city) {
      state.mapZom = city
      state.city = city
      axios.post('http://119.23.160.82:8763/hjjc-api/pmData/findByCity', {
        'city': city
      }).then(resp => {
        if (resp.data.success) {
          state.Pm25 = resp.data.data.pm25
          state.Pm10 = resp.data.data.pm10
          state.Co = resp.data.data.co
          state.O3 = resp.data.data.o3
          state.No2 = resp.data.data.no2
          state.So2 = resp.data.data.so2
          state.Aqi = resp.data.data.aqi
          state.aqiRank = resp.data.data.aqistr
          state.Co2 = 10
          state.FengS = 3
          state.FengX = 10
          state.FengL = 4
          state.monitor.Fomes.Pm25 = resp.data.data.pm25
          state.monitor.Fomes.Pm10 = resp.data.data.pm10
          state.monitor.Fomes.Co = resp.data.data.co
          state.monitor.Fomes.O3 = resp.data.data.o3
          state.monitor.Fomes.No2 = resp.data.data.no2
          state.monitor.Fomes.So2 = resp.data.data.so2
          state.monitor.Fomes.Aqi = resp.data.data.aqi
        }
      })
    }
  },
  getters: {
  // getAge (state) {
  // return state.age
  // }
  },
  actions: {
  }
})

export default myStore
