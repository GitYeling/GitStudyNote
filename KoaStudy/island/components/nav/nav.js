// components/nav/nav.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title:String,
    fisrt:Boolean,
    last:Boolean,    
  },

  /**
   * 组件的初始数据
   */
  data: {

    imgList:{
      1:'./images/triangle@left.png',
      2:'./images/triangle.dis@left.png',
      3:'./images/triangle@right.png',
      4:'./images/triangle.dis@right.png'
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
