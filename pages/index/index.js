const weatherMap = {
  sunny: '晴天'
  , cloudy: '多云'
  , overcase: '阴天'
  , lightrain: '小雨'
  , heavyraid: '中雨'
  , snow: '雪'
}

Page({
  data: {
    now: {
      temp: 15,
      weather: '阴天'
    }
  },
  onLoad() {
    console.log('Hello World!');
    wx.request({
      url: 'https://test-miniprogram.com/api/weather/now?city=上海市',
      data: {
      }, 
      success: res => {
        let result = res.data.result;
        let temp = result.now.temp;
        let weather = result.now.weather;
        console.log(temp, weather);
        this.setData({
          'now.temp': temp
          , 'now.weather': weatherMap[weather]
        })
      }
    })
  }
})