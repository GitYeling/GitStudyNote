import {HTTP} from '../utils/http'

class LikeModel extends HTTP{

    async Like(art_id,type){
        let res = await this.request({
            url:'/like',
            data:{
                art_id:this.data.Classic.art_id,
                type:this.data.Classic.type,
            },            
            method:'post'
        })
        return res
    }
    async LikeCancel(art_id,type){
        let res = await this.request({
            url:'/like/cancel',
            data:{
              art_id:art_id,
              type:type,
            },
            method:'post'
          })
        return res
    }
}

export {LikeModel}