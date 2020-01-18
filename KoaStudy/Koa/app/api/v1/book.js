const Router = require('koa-router')
const router = new Router()
const { PositiveIntegerValidator } = require('../../validators/validator')

router.post('/v1/:id/book/latest', async (ctx, next) => {

    var valiData = new PositiveIntegerValidator().validate(ctx)
    const path = valiData.data.path
    const query = valiData.data.query
    const headers = valiData.data.header.token 
    const body = valiData.data.body   
    ctx.body = 'succsess'
    
})

module.exports = router