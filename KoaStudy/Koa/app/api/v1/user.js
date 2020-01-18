const Router = require('koa-router')
const { RegisterValidator } = require('../../validators/validator')
const Models = require('../../DBModule/models')
const {Sequelize} = require('sequelize')

const router = new Router({
    prefix: '/v1/user'
})

router.post('/register', async (ctx, next) => {
    var valiData = new RegisterValidator().validate(ctx)
    //username,nickname,email,password
    var user = {
        username: valiData.get('body.username'),
        nickname: valiData.get('body.nickname'),
        email: valiData.get('body.email'),
        password: valiData.get('body.password'),
    }
    var dbReturn =  await Models.User.create(user)
    
    ctx.body = dbReturn
})

module.exports = router