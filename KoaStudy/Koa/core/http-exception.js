class HttpException extends Error {
    constructor(msg = '服务器异常', errorCode = 10000, status = 400) {
        super()
        this.errorCode = errorCode;
        this.msg = msg;
        this.status = status;
    }
}

class ParameterException extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.status = 400
        this.msg = msg || '参数异常'
        this.errorCode = errorCode || 10000
    }
}
module.exports = { HttpException,ParameterException }