const Router = require('koa-router')
const router = new Router({
    prefix:'/v1/user'
})
const { RegisterValidator } = require('../../validators/validator')
const Models = require('../../../DBModule/models')
const {Sequelize} = require('sequelize')

router.post('/register', async (ctx, next) => {
    var valiData = await new RegisterValidator().validate(ctx)
    var user = {
        username: valiData.get('body.username'),
        nickname: valiData.get('body.nickname'),
        email: valiData.get('body.email'),
        password: valiData.get('body.password'),        
    }
    var dbReturn =  await Models.User.create(user)
    throw new global.errs.Success()
    ctx.body = dbReturn 
})

module.exports = router