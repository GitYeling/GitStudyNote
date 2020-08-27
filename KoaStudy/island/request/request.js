const tips = {
    1:'出现了一个错误',
    1000:'输入参数错误',
    1001:'输入的json格式不正确',
    1002:'找不到资源',
    1003:'未知错误',
    1004:'禁止访问',
    1005:'不正确的开发者key',
    1006:'服务器内部错误'
}

 class Request {

    /* API请求函数 */
    static request(params){
        return new Promise((resolve,reject)=>{
            wx.request({
                ...params,
                success: (result)=>{
                    let code = result.statusCode.toString()
                    console.log(code)
                    if (code.slice(0,1) === '2'){
                        resolve(result.data)
                    }else{
                        let errCode = result.data.error_code
                        this._showErrorInfo(errCode)
                    }
                },
                fail: (err)=>{
                    console.log('err')
                    console.log(err)
                    this._showErrorInfo(1)
                },
            });
        })
    }  

    /* 显示错误信息函数 */
    static _showErrorInfo(errCode){
       if (!errCode){
           errCode = 1
       }
       const tip = tips[errCode]
       wx.showLoading({
           title: tip,
           mask: true,
           duration:2000
       });
    }
}

export {Request}