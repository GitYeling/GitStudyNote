const Router = require('koa-router')
const router = new Router()
const { ParameterException } = require('../../../core/http-exception')

router.post('/v1/:id/book/latest', async (ctx, next) => {
    const path = ctx.params.id
    const query = ctx.query
    const headers = ctx.header
    const body = ctx.request.body
    if (true) {
        var exception = new ParameterException();
        throw exception;
    } else {
        ctx.body = '请求成功'
    }
})

module.exports = router