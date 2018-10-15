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

        //set forcast
        let forecast = [];
        let nowHour = new Date().getHours();
        for (let i = 0; i < 24; i += 3) {
          forecast.push({
            time : (i + nowHour) % 24 + '时'
            , iconPath: '/images/sunny-icon.png'
            , temp: '12°'
          })
        }
        forecast[0].time = '现在';
        this.setData({'forecast': forecast})
      }, 
      complete: () => stopPullDownCallback && stopPullDownCallback()
    })
  }
})