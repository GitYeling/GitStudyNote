import {Request} from './request'
 
/* 请求最新一期期刊 */
class ClassicAPI {
    static async getClassicLatest(params){
        console.log('1')
        return await Request.request(params)
    }
}

export {ClassicAPI}