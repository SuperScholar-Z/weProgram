// pages/Profile/Profile.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,

    userName: "XXX",
    phoneNumber: "XXXXXXXXXXX",
    position: "XX",
  },
  // 修改个人信息
  editDetails: function(button){
    var formName = button.currentTarget.dataset.formname
    var content
    if(formName == '姓名'){
      content = this.data.userName
    }
    else if(formName=='电话号码'){
      content = this.data.phoneNumber
    }
    else{
      content = this.data.position
    }
    
    wx.navigateTo({
      url: '../DetailsEdit/DetailsEdit?formName=' + formName + '&content=' + content
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo
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