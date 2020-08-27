// components/date/date.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index:Number
  },

  /**
   * 组件的初始数据
   */
  data: {
    year:0,
    mouthList:['一 月','二 月','三 月','四 月','五 月','六 月','七 月','八 月','九 月','十 月','十一月','十二月'],
    mouth:''
  },

  /**
   * 组件的方法列表
   */

  attached(){
    let year = new Date().getFullYear();
    let mouthList = this.properties.mouthList
    let mouth = mouthList[new Date().getMonth()]
    this.setData({
      year,
      mouth
    })
  },
  methods: {
    
  }
})
