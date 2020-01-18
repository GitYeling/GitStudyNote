const Router = require('koa-router')
const router = new Router()

router.get('/classic/latest', async (ctx, next) => {
    ctx.body = { name:ctx.url}
})

module.exports = router