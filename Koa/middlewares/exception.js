const { HttpException } = require('../core/http-exception')

const catchError = async (ctx, next) => {
    try {
        await next()
    } catch (error) {
        if (global.config.environment == 'dev'){
            throw error;
        }
            if (error instanceof HttpException) {
                ctx.body = {
                    msg: error.msg,
                    errorCode: error.errorCode,
                    requestUrl: `${ctx.method} ${ctx.path}`
                }
                ctx.status = error.status
            } else {
                ctx.body = {
                    msg: '服务器未知异常',
                    errorCode: 999,
                    requestUrl: `${ctx.method} ${ctx.path}`
                }
                ctx.status = 500
            }
    }
}

module.exports = catchError