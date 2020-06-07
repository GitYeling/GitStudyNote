const {HttpException} = require('../core/http-exception')

const catchError = async (ctx, next) => {
    try {
        await next()
    } catch (error) {
        const IS_HTTPException = error instanceof HttpException
        const IS_DEV = global.config.environment == 'dev'
        if (IS_DEV && !IS_HTTPException){
            throw error;
        }       
        if (error instanceof HttpException){
            ctx.body =  {
                "msg":error.msg,
                "error_Code":error.errorCode,
            }
        }else{
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