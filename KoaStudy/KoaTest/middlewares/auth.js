const basicAuth = require('basic-auth')
const jwt = require('jsonwebtoken')

class Auth {
    constructor(level) {
        this.level = level || 1
        Auth.USER = 8
        Auth.ADMIN = 16
        Auth.SUPER_ADMIN = 32
    }
    get m() {
        return async (ctx, next) => {
            const userToken = basicAuth(ctx.req)
            try {
                var decode = jwt.verify(userToken.name, global.config.security.securityKey)
            } catch (error) {
                if (error.name == 'TokenExpiredError') {
                    throw new global.errs.Forbbiden('token已过期')
                }
                throw new global.errs.Forbbiden('token不合法')
            }
            if (decode.scope < this.level) {
                throw new global.errs.Forbbiden('用户权限不够')
            }
            ctx.auth = {
                uid: decode.uid,
                scope: decode.scope
            }
            await next()
        }
    }
}

module.exports = {
    Auth
}