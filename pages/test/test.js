
const QQMapWX = require('../../libs/qqmap-wx-jssdk.js')

Page({
  onLoad() {
    this.qqmapsdk = new QQMapWX({
      key: 'ISXBZ-QQECU-TSOVP-2RKEK-AJKMH-NCFQ4'
    })
  }, 
  onTapLocation() {
    console.log(this);
    wx.getLocation({
      success: function(res) {
        this.qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: res => {
            console.log(res.result.address_component.city);
          }, 
          fail: res => {
            console.error(res);
          }
        })
      },
    })
  }
})