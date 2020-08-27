import {config} from '../config'

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

class HTTP {
    request({url,data,method='get'}){
        console.log(url)
        return new Promise((resolve,reject)=>{
            wx.request({
                url:`${config.api_base_url}${url}`,
                header: {
                    appkey:"AbhC31IG7ruCDp57"
                },  
                data:data,   
                method:method,                
                success: (result)=>{
                    // console.log(result)
                    resolve(result.data)
                },
                fail: (err)=>{
                    reject(err)
                },
                complete: ()=>{}
            });
        })
    }

    _ShowErrorInfo(code){
        if (!code){
            code = 1
        }
        wx.showToast({
            title: tips[code],
            duration: 1500,
        });
    }
}

export {HTTP}