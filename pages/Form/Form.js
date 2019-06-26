// pages/Text/Text.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    processId: "123",  //流程ID
    taskId: null, //流程节点ID
    assigneeId: "202", //流程执行人ID
    formName: null, //表单名称
    form: null, //表单内容

    pickerBox: null //表单选择框索引
  },

  //下拉框选择事件
  bindPickerChange: function(obj){
    var indexList = JSON.parse(JSON.stringify(this.data.pickerBox))
    indexList[obj.currentTarget.dataset.index] = JSON.parse(obj.detail.value)
    this.setData({
      pickerBox: indexList
    })
  },

  //提交表单
  submitForm: function(obj){
    var integrity = true  //是否完整
    //检查必填项
    for(let item of this.data.form){
      if (item.required){
        if (obj.detail.value[item.itemName] == '' || obj.detail.value[item.itemName] == null){
          integrity = false
          wx.showToast({
            title: item.itemName + '未填写',
            icon: 'none'
          })
          break
        }
      }
    }

    //提交表单数据
    if (integrity){
      var that = this
      console.log(obj.detail)
      var submittedForm = {
        "processId": that.data.processId,
        "taskId": that.data.taskId,
        "assigneeId": that.data.assigneeId,
        "form": obj.detail.value
      }
      //请求向后台提交表单数据
      wx.request({
        url: 'http://localhost:8080/form/submitForm',
        data: JSON.stringify(submittedForm),
        method: 'POST',
        header: {
          'content-type': 'application/json',
        },
        success: function (res) {
          if(res.errMsg == 'request:ok'){
            wx.showToast({
              title: '提交成功',
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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var requestData = {
      "processId": this.data.processId,
      "assigneeId": this.data.assigneeId
    }
    //请求获取表单内容
    wx.request({
      url: 'http://localhost:8080/form/getForm',
      data: requestData,
      method: 'POST',
      header: {
        'content-type': 'application/json',
      },
      success: function(res){
        //读取表单格式
        console.log(res)
        that.setData({
          taskId: res.data.taskId,
          formName: res.data.formName,
          form: res.data.form
        })
        //读取全部选择框
        var indexList = []
        for(var i = 0, length = res.data.form.length; i < length; i++){
          var index = 0
          //选择框若有默认值则设置默认值
          if (res.data.form[i].defaultValue != '' && res.data.form[i].defaultValue != null){
            for(var j = 0, valueNum = res.data.form[i].values.length; j < valueNum; j++){
              if (res.data.form[i].values[j] == res.data.form[i].defaultValue){
                index = j
                break
              }
            }
          }
          indexList.push(index)
        }
        that.setData({
          pickerBox: JSON.parse(JSON.stringify(indexList))
        })
        //设置标题
        wx.setNavigationBarTitle({
          title: res.data.formName
        })
      },
      fail: function(res){
        console.log("fail")
      }
    })
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