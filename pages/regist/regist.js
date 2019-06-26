// pages/regist.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null
  },

  //注册
  regist: function(obj){
    //检查是否为空
    for(var key in obj.detail.value){
      if (obj.detail.value[key] == '' || obj.detail.value[key] == null){
        wx.showToast({
          title: '请确认信息填写完整!',
          icon: 'none'
        })
        return
      }
    }
    //检查密码和确认密码是否一致
    if(obj.detail.value['password'] != obj.detail.value['password_confirm']){
      wx.showToast({
        title: '密码和确认密码不一致!',
        icon: 'none'
      })
      return
    }
    console.log(obj.detail)
    //检查非法输入值
    var checkId = /^[0-9a-zA-Z]{8,}$/; //账号密码格式
    if(!checkId.test(obj.detail.value['username'])){
      wx.showToast({
        title: '账号只能由字母和数字组成，且长度必须不小于8位!',
        icon: 'none'
      })
      return
    }
    if (!checkId.test(obj.detail.value['password'])) {
      wx.showToast({
        title: '密码只能由字母和数字组成，且长度必须不小于8位!',
        icon: 'none'
      })
      return
    }
    if(!/^[1-9][0-9]*$/.test(obj.detail.value['phoneNumber'])){ //检查电话号码输入
      wx.showToast({
        title: '电话号码只能输入数字!',
        icon: 'none'
      })
      return
    }

    //发送数据
    delete obj.detail.value['password_confirm']
    wx.request({
      url: 'http://localhost:8080/form/regist',
      data: obj.detail.value,
      method: 'POST',
      success: function(res){
        if(res.data.status == 0){
          wx.showToast({
            title: "已提交审核"
          })
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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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