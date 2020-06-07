const Router = require('koa-router')
const {
    TokenValidator
} = require('../../validators/validator')
const LoginType = require('../../../core/userType')
const Model = require('../../../DBModule/models')
const bcrypt = require('bcryptjs')
const {
    generateToken
} = require('../../../core/util')
const router = new Router({
    prefix: '/v1/token'
})
const {
    Auth
} = require('../../../middlewares/auth')
router.post('/', async (ctx) => {
    var val = await new TokenValidator().validate(ctx)
    let token;
    switch (val.get('body.type')) {
        case LoginType.USER_EMAIL:
            token = await emailLogin(val.get('body.account'), val.get('body.secret'))
            break;
        case LoginType.USER_MINI_PROGRAM:

            break;
        default:
            throw new global.errs.ParameterException('没有相应的处理函数!')
            break;
    }
    ctx.body = {
        token
    }
    // throw new global.errs.Success()
})
async function emailLogin(account, secret) {
    var user = await Model.User.findOne({
        where: {
            email: account
        }
    })
    if (!user) {
        throw new global.errs.AuthFailed('用户不存在！')
    }
    var corrent = bcrypt.compareSync(secret, user.password)
    if (!corrent) {
        throw new global.errs.AuthFailed('密码不正确！')
    }
    return generateToken(user.id, Auth.USER)
}

module.exports = router