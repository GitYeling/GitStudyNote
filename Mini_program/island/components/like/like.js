// components/like/like.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    fav_nums:{type:Number},
    like_status:{type:Boolean}
  },

  /**
   * 组件的初始数据
   */
  data: {
    img_dis:'./images/like.png',
    img_hid:'./images/like@dis.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    LikeAction(e){
      let like_status = this.properties.like_status;
      let fav_nums = this.properties.fav_nums;
      
      like_status = !like_status;
      // console.log(fav_nums)
      like_status?++fav_nums:--fav_nums;
      // console.log(fav_nums)
      this.setData({
        like_status,
        fav_nums
      })
      // console.log(this.data.fav_nums)
      this.triggerEvent('LikeAction',{
        operation:like_status?'like':'cancel'
      },{})
    }
  }
})
