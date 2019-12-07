var that
class Tab {
    constructor(id){ 
        that = this
        this.main = document.querySelector(id)
        this.addBtn = this.main.querySelectorAll('header .addBtn')
        // console.log(this.addBtn)
        this.init()
    }
    //初始化函数，给所有的tab栏的li设置点击事件
    init(){
        console.log('进入了init函数')
        this.UpdateNode()        
        this.addBtn[0].onclick = this.AddTab
        for (let i=0;i<this.lis.length;i++){
            this.lis[i].index = i
            this.lis[i].onclick = this.ToggleTab
        }
    }
    // 获取所有的li和contentBox
    UpdateNode(){
        this.lis = this.main.querySelectorAll('header ul li')
        this.contentBox = this.main.querySelectorAll('footer .contentBox')
    }
    // tab切换
    ToggleTab(){
        that.ClearClass()
        this.className = 'bgcSelected';
        that.contentBox[this.index].className = 'contentBox SelectedBox';
    }
    //定义ClearClass
    ClearClass(){
        for (var i=0;i<this.lis.length;i++){
            this.lis[i].className = ''
            this.contentBox[i].className = 'contentBox'
        }
    }
    // tab添加
    AddTab(){
        var num = Math.random()
        that.ClearClass()
        var li = `<li class="bgcSelected"><span>新选项卡</span><span class="tab-icon">x</span></li>`
        var content = `<div class="contentBox SelectedBox">新contentBox`+num+`</div>`
        var ul = that.main.querySelectorAll('header ul')[0]
        var footer = that.main.querySelectorAll('footer')[0]
        ul.insertAdjacentHTML('beforeend',li)
        footer.insertAdjacentHTML('beforeend',content)
        that.init()
    }
    // tab删除
    RemoveTab(){

    }
    //文字修改
    Update(){
        
    }
}
new Tab('#app');