Page({
  onLoad() {
    console.log('Hello World!');
    wx.request({
      url: 'https://test-miniprogram.com/api/weather/now?city=上海市',
      data: {
      }, 
      success: res => console.log(res)
    })
  }
})