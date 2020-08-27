import {HTTP} from '../utils/http'

class ClassicModel extends HTTP{
    async getLastestClassic(){
        let lastestClassicIndex = wx.getStorageSync('lastestIndex');
        if (lastestClassicIndex){
            let lastestClassic = wx.getStorageSync('Classic-'+lastestClassicIndex);
            if (lastestClassic){
                return lastestClassic
            }
        }
        let res = await this.request({url:'/classic/latest'})
        let key = this._getKey(res.index)
        wx.setStorageSync(key, res);
        this._setLastestIndex(res.index)
        return res
    }

    async GetPriviousClassic(index){
        let classic = wx.getStorageSync('Classic-'+(index-1));
        if (classic){
            let favor = await this.request({
                url:`/classic/${classic.type}/${classic.id}/favor`
            })
            classic.fav_nums = favor.fav_nums
            classic.like_status = favor.like_status
            
            let key = this._getKey(classic.index)
            wx.setStorageSync(key, classic);  
        }else{
            classic = await this.request({
                url:`/classic/${index}/previous`

            })
        }

        let key = this._getKey(classic.index)
        wx.setStorageSync(key, classic);        
        return classic
    }

    async GetNextClassic(index){
        let classic = wx.getStorageSync('Classic-'+(index+1));
        if (classic){
            let favor =await this.request({
                url:`/classic/${classic.type}/${classic.id}/favor`
            })
            classic.fav_nums = favor.fav_nums
            classic.like_status = favor.like_status
            
            let key = this._getKey(classic.index)
            wx.setStorageSync(key, classic);  
        }else{
            classic = await this.request({
                url:`/classic/${index}/next`
            })
        }

        let key = this._getKey(classic.index)
        wx.setStorageSync(key, classic);        
        return classic       
    }

    _getKey(index){
        return 'Classic-' + index
    }
    _setLastestIndex(index){
        wx.setStorageSync('lastestIndex',index)
    }

}

export {ClassicModel}