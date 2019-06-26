// pages/index/index.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null
  },

  //登录
  login: function(obj){
    if (obj.detail.value['username'] == '' || obj.detail.value['username'] == null){
      wx.showToast({
        title: '账号不能为空!',
        icon: 'none'
      })
    }
    else if (obj.detail.value['password'] == '' || obj.detail.value['password'] == null){
      wx.showToast({
        title: '密码不能为空!',
        icon: 'none'
      })
    }
    else{
      console.log(obj)
      wx.request({
        url: 'http://localhost:8080/form/login',
        data: obj.detail.value,
        method: 'POST',
        header: {
          'content-type': 'application/json',
        },
        success: function (res) {
          if (res.errMsg == 'request:ok') {
            if(res.data.status == 0){  //身份验证正确
              wx.showToast({
                title: '登录成功',
              })
              //登录信息保存本地缓存
              var userInfo = res.data.userInfo
              userInfo['username'] = obj.detail.value['username']
              userInfo['avatarUrl'] = '/images/Download.jpg'
              app.globalData.userInfo = JSON.parse(JSON.stringify(userInfo))
              wx.setStorageSync('userInfo', userInfo)
              console.log(app.globalData.userInfo);

              //跳转至主页
              wx.navigateTo({
                url: '../homepage/homepage'
              })
            }
            else{
              wx.showToast({
                title: res.data.message,
                icon: 'none'
              })
            }
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
  },
  //注册
  regist: function(obj){
    wx.navigateTo({
      url: '../regist/regist'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //若已登录，直接跳转至主页
    console.log(app.globalData.userInfo)
    if (app.globalData.userInfo != '' && app.globalData.userInfo != null){
      wx.navigateTo({
        url: '../homepage/homepage',
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})