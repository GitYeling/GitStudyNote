const { HttpException } = require('../core/http-exception')

const catchError = async (ctx, next) => {
    try {
        await next()
    } catch (error) {
        const IS_HTTPException = error instanceof HttpException
        const IS_DEV = global.config.environment == 'dev'
        if (IS_DEV && !IS_HTTPException){
            throw error;
        }
        if (IS_HTTPException) {
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