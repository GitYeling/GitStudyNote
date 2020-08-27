// components/like1/like.js
/* 
  父子组件通信与事件分析：
  1）父向子传递：我喜欢与否的状态、被喜欢数量
  2）子向父传递（如果用户点击）：本次点击是取消还是喜欢
*/
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    favNums:Number,
    likeStatus:Boolean,
    readOnly:Boolean
  },
  
  /**
   * 组件的初始数据
   */
  data: {
    imgDis:'./images/like.png',
    imgHid:'./images/like@hid.png',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleTap(e){
      let readOnly = this.properties.readOnly;

      if (readOnly){
        return;
      }

      let favNums = this.properties.favNums;
      let likeStatus = this.properties.likeStatus;
      likeStatus = !likeStatus;

      console.log(likeStatus)
      favNums = likeStatus?favNums + 1:favNums - 1;
      
      this.setData({
        favNums,
        likeStatus
      })
      let operation = likeStatus?'like':'cancal';

      this.triggerEvent('MyLikeTap',{
        operation
      },{})
    }
  }
})
