// pages/classic/classic.js
import {ClassicAPI} from '../../request/classic'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    favNums:0,
    likeStatus:false,
    readOnly:false,
    name:'1',
    imgUrl:'',
    content:'',
    title:'',
    type:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    let res = await ClassicAPI.getClassicLatest({
        url: 'http://bl.7yue.pro/v1/classic/200/2',
        header: {
          appkey:"AbhC31IG7ruCDp57"
        },
    })
    console.log(res)
    let favNums = res.fav_nums
    let likeStatus = res.like_status?true:false;
    let title = res.title
    let image = res.image
    console.log(image)
    let content = res.content
    let type = res.type
    this.setData({
      favNums,
      likeStatus,
      readOnly:false,
      title,
      image,
      content,
      type
    })

  },

  likeTap(e){
    let operation = e.detail.operation
  }
})