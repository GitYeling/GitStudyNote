// pages/classic/classic.js
import {ClassicModel} from '../../models/classic'
import {LikeModel} from '../../models/like'

const classicModel = new ClassicModel()
const likeModel = new LikeModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    Classic:{},
    lastestIndex:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onLoad')
    this.getLatestClassic()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /* 获取最新期刊 */
  async getLatestClassic(){
    let Classic = await classicModel.getLastestClassic()
    let lastestIndex = Classic.index
    this.setData({
      Classic,
      lastestIndex
    })
  },

  /* 调用点赞接口 */
  async Like(){
    let res = await likeModel.Like(this.data.Classic.id,this.data.Classic.type)
  },

  /* 调用取消点赞接口 */
  async DisLike(){
    let res = await likeModel.LikeCancel(this.data.Classic.id,this.data.Classic.type)
  },

  /* 点赞或取消点赞 */
  LikeAction(e){
    // console.log(operation)
    let operation = e.detail.operation
    if (operation === 'like'){
      this.Like()
    }else if(operation === 'cancel'){
      this.DisLike()
    }
  },

  /* 请求前一期期刊 */
  async onPrevious(){
    console.log('onPrevious')
    let res = await classicModel.GetPriviousClassic(this.data.Classic.index);
    console.log(res)
    this.setData({
      Classic:res
    })
  },

  /* 请求后一期期刊 */
  async onNext(){
    console.log('onNext')
    let res = await classicModel.GetNextClassic(this.data.Classic.index);
    console.log(res)
    this.setData({
      Classic:res
    })    
  }
})