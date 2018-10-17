// pages/list/list.js

const weekMap = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']

Page({
  data: {

  },
  onLoad() {
    this.updateForecast();
  }, 
  onPullDownRefresh() {
    this.updateForecast(wx.stopPullDownRefresh);
  }, 
  updateForecast(callback) {
    wx.request({
      url: 'https://test-miniprogram.com/api/weather/future',
      data: {
        city: '上海市'
        , time: new Date().getTime()
      }, 
      success: (res) => {
        let result = res.data.result;
        this.setWeekWeather(result);
      }, 
      complete: () => callback && callback()
    })
  }, 
  setWeekWeather(result) {
    let weekWeather = [];
    let day = new Date();
    for(let i = 0; i < result.length; i++) {
      day.setDate(day.getDate() + 1); // 从今往后的日期
      weekWeather.push({
        day: weekMap[day.getDay()]
        , date: `${day.getFullYear()}-${day.getMonth() + 1}-${day.getDate()}`
        , temp: `${result[i].minTemp}° - ${result[i].maxTemp}°`
        , iconPath: `/images/${result[i].weather}-icon.png`
      })
    }
    weekWeather[0].day = '今天'
    this.setData({weekWeather: weekWeather})
  }
})