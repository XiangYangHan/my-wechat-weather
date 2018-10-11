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
      }
    })
  }
})