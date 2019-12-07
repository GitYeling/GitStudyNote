$(function(){
    var notes = ['吃饭','睡觉'];
    var count = 2;
    //初始化列表
    addAll()    

    //记录输入完成
    $('.input input').keyup(function(event){
        if (event.code == 'Enter'){
            var note = $('.input input').val()
            notes.push(note)
            //每次新增记录，都要刷新列表
            addAll()
            $('.input input').val('')
        }   
    })
    //点击删除图标，删除单条记录
    console.log($('footer .notes .delete'))
    $('footer').on('click',' .notes .delete',function(){
        console.log('进入了点击事件')
        var index = $(this).siblings().eq(0).text()
        index = parseInt(index)
        console.log(index)
        notes.splice(index-1,1)
        console.log(notes)
        addAll()
        // $(this).parent().remove()
        $('.bottomBar span strong').text(notes.length)
    })
    //点击清除字体，清除所有记录
    $('.bottomBar span:last').on('click',function(){
        notes = []
        $('.bottomBar span strong').text(notes.length)
        $('footer .notes').remove()
    })
    //便利数组，添加所有记录
    function addAll(){
        console.log(notes)
        if (notes.length != 0){
            $('footer .notes').remove()
        }
        console.log('进入addall函数')
        for (let i=0;i < notes.length;i++){
            addNote(notes[i],i)
        }
    }
    //添加一条记录
    function addNote(note,index){
        var spanIndex =  document.createElement('span')
        $(spanIndex).text(index+1)
        var spanContent = document.createElement('span')
        $(spanContent).text(note)
        var spanDelete = $('<span>x</span>')
        spanDelete.addClass('delete')
        var div = $('<div></div>')
        div.addClass('notes')

        div.append(spanIndex)
        div.append(spanContent)
        div.append(spanDelete)

        $('footer .bottomBar').before(div)
        $('.bottomBar span strong').text(notes.length)
    }
})