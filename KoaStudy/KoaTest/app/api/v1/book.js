const Router = require('koa-router')
const router = new Router()
const {HttpException} = require('../../../core/http-exception')
const { PositiveIntegerValidator } = require('../../validators/validator')

router.get('/name',async(ctx,next)=>{
    var valiData = await new PositiveIntegerValidator().validate(ctx)
    // var exception = new HttpException('请求参数不能为空',10001,400)
    // throw exception
    // throw new Error('api error!')
    ctx.body =  '请求 /name 成功'
})

router.get('/book',async(ctx,next)=>{
    ctx.body = '请求 /book  成功'
})
module.exports = router