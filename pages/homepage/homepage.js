//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: null,

    process: null,
    flowImages: ["/images/title_picture.jpg", "/images/title_picture.jpg", "/images/title_picture.jpg", "/images/title_picture.jpg",            "/images/title_picture.jpg", "/images/title_picture.jpg", "/images/title_picture.jpg"],
    flowTexts: ["流程1", "流程2", "流程3", "流程4", "流程5", "流程6", "流程7"]
  },
  //填流程表格
  toFormPage: function(){
    wx.navigateTo({
      url: '../form/form',
    })
  },
  //跳转个人主页
  toProfilePage: function(){
    wx.navigateTo({
      url: '../profile/profile',
    })
  },
  //注销账号
  logout: function(obj){
    delete app.globalData.userInfo
    wx.removeStorageSync('userInfo')
    console.log(app.globalData.userInfo)

    wx.redirectTo({
      url: '../index/index',
    })
  },
  onLoad: function () {
    this.setData({
      userInfo: app.globalData.userInfo
    })
    //查找用户有权限参与的流程
    var that = this
    var requestData = {
      'username': this.data.userInfo['username']
    }
    wx.request({
      url: 'http://localhost:8080/form/getProcess',
      data: requestData,
      method: 'POST',
      header: {
        'content-type': 'application/json',
      },
      success: function(res){
        if(res.data.status == 0)
        {
          that.setData({
            process: res.data.process
          })
          console.log(res.data)
        }
        else{
          wx.showToast({
            title: res.data.message,
            icon: 'none'
          })
        }
      },
      fail: function (res) {
        wx.showToast({
          title: '错误:' + res.errMsg,
          icon: 'none'
        })
      }
    })
  }
})
