//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: null,

    process: null,
    flowImages: ["/images/title_picture.jpg", "/images/title_picture.jpg", "/images/title_picture.jpg", "/images/title_picture.jpg",            "/images/title_picture.jpg", "/images/title_picture.jpg", "/images/title_picture.jpg"],
    flowTexts: ["流程1", "流程2", "流程3", "流程4", "流程5", "流程6", "流程7"],

    loadingCompleted: false //页面加载完成
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
      url: '../login/login',
    })
  },
  onLoad: function () {
    //若未登录，重定向至登录页面
    console.log(app.globalData.userInfo)
    if (app.globalData.userInfo == null || app.globalData.userInfo == '') {
      wx.redirectTo({
        url: '../login/login',
      })
      return
    }
    //页面加载中
    wx.showLoading({
      title: ''
    })

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
        // wx.showToast({
        //   title: '错误:' + res.errMsg,
        //   icon: 'none'
        // })

        //假数据
        that.setData({
          process: [{
              "processId": "2",
              "processName": "流程2"
            },
            {
              "processId": "5",
              "processName": "流程5"
            },
            {
              "processId": "7",
              "processName": "流程7"
            },
            {
              "processId": "8",
              "processName": "流程8"
          }]
        })
      },
      complete: function(res){
        that.setData({loadingCompleted: true})
        //页面加载完毕
        wx.hideLoading()
      }
    })
  }
})
