// components/episode/episode.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index:{
      type:Number
    },
    pubdate:{
      type:String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    mouth:'',
    year:'',
    mouthList:{
      '01':'一月',
      '02':'二月',
      '03':'三月',
      '04':'四月',
      '05':'五月',
      '06':'六月',
      '07':'七月',
      '08':'八月',
      '09':'九月',
      '10':'十月',
      '11':'十一月',
      '12':'十二月',
    }
  },

  observers:{
    'pubdate':function(pubdate){
      this.setData({
        year:pubdate.slice(0,4),
        mouth:pubdate.slice(5,7),
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
  
})
