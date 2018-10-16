const weatherMap = {
  sunny: '晴天'
  , cloudy: '多云'
  , overcast: '阴天'
  , lightrain: '小雨'
  , heavyrain: '中雨'
  , snow: '雪'
}

const backgroundMap = {
  sunny: '#CDEEFD'
  , cloudy: '#DEEEF6'
  , overcast: '#C6CED2'
  , lightrain: '#BDD5E1'
  , heavyrain: '#C5CCD0'
  , snow: '#AAE1FC'
}

Page({
  data: {
  },
  onLoad() {
    this.updateNow();
  }, 
  onPullDownRefresh() {
    this.updateNow(wx.stopPullDownRefresh);
  }, 
  updateNow(stopPullDownCallback) {
    wx.request({
      url: 'https://test-miniprogram.com/api/weather/now?city=上海市',
      data: {
      },
      success: res => {
        let result = res.data.result;
        this.setNow(result);
        this.setForecast(result);
        this.setToday(result);
      }, 
      complete: () => stopPullDownCallback && stopPullDownCallback()
    })
  },
  setNow(result) {
    let temp = result.now.temp;
    let weather = result.now.weather;
    console.log(temp, weather, result);
    this.setData({
      'now.temp': temp + '°'
      , 'now.weather': weatherMap[weather]
      , 'now.weatherBackground': '/images/' + weather + '-bg.png'
    })
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: backgroundMap[weather],
    })
  },
  setForecast(result) {
    let forecast = [];
    let nowHour = new Date().getHours();
    for (let i = 0; i < 8; i += 1) {
      forecast.push({
        time: (i * 3 + nowHour) % 24 + '时'
        , iconPath: '/images/' + result.forecast[i].weather + '-icon.png'
        , temp: result.forecast[i].temp + '°'
      })
    }
    forecast[0].time = '现在';
    this.setData({ 'forecast': forecast })    
  },
  setToday(result) {
    let today = new Date();
    this.setData({
      todayDate: `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()} 今天`
      , todayTemp: `${result.today.minTemp}° - ${result.today.maxTemp}°`
    });
  }, 
  onTapDayWeather() {
    wx.navigateTo({
      url: '/pages/list/list',
    })
  }
})