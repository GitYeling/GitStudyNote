// components/navi/navi.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title:{
      type:String
    },
    next:{
      type:Boolean
    },
    previous:{
      type:Boolean
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    icons:{
      'left':"./images/triangle@left.png",
      'leftHidden':"./images/triangle.dis@left.png",
      'right':"./images/triangle@right.png",
      'rightHidden':"./images/triangle.dis@right.png",
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    PreviousTap(){  
      if (!this.properties.previous) {
        return;
      }
      this.triggerEvent('onPrevious',{})
    },
    NextTap(){
      if (!this.properties.next) {
        return;
      }
      this.triggerEvent('onNext',{})
    }
  }
})
