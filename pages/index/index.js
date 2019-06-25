//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: null,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

    flowImages: ["/images/title_picture.jpg", "/images/title_picture.jpg", "/images/title_picture.jpg", "/images/title_picture.jpg",            "/images/title_picture.jpg", "/images/title_picture.jpg", "/images/title_picture.jpg"],
    flowTexts: ["流程1", "流程2", "流程3", "流程4", "流程5", "流程6", "流程7"]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  //填流程表格
  toFormPage: function(){
    wx.navigateTo({
      url: '../Form/Form',
    })
  },
  //跳转个人主页
  toProfilePage: function(){
    wx.navigateTo({
      url: '../Profile/Profile',
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  //注册按钮
  toRegistPage: function (e) {
    if (e.detail.userInfo) {  //用户允许授权
      wx.navigateTo({
        url: '../regist/regist'
      })  //跳转注册

      console.log(e)
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
    }
  },
  // 登录时获取微信信息
  getUserInfo: function(e) {
    if(e.detail.userInfo){  //用户允许授权
      console.log(e)
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
      console.log(e.detail)
      console.log(e.detail.userInfo)
    }
  }
})
