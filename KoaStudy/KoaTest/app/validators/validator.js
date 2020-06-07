const {
    LinValidator,
    Rule
} = require('../../core/lin-validator-v2')
const LoginType = require('../../core/userType')
const Models = require('../../DBModule/models')
const {
    Sequelize
} = require('sequelize')

class RegisterValidator extends LinValidator {
    constructor() {
        super()
        //username nickname password confirm_password email
        this.username = [
            new Rule('isLength', '用户名长度至少4个字符，最多20个字符', {
                min: 4,
                max: 20
            })
        ]
        this.email = [
            new Rule('isEmail', '不符合Email规范')
        ]
        this.nickname = [
            new Rule('isLength', '昵称不符合长度规范', {
                min: 4,
                max: 20
            })
        ]
        this.password = [
            new Rule('isLength', '密码长度至少6个字符，最多30个字符', {
                min: 6,
                max: 30
            }),
            new Rule('matches', '密码不符合规范', '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]')
        ]
        this.confirm_password = this.password
    }

    validateConfirmPassword(data) {
        if (!data.body.password || !data.body.confirm_password) {
            throw new Error("密码不能为空")
        }
        let ok = data.body.password === data.body.confirm_password;
        if (ok) {
            return ok;
        } else {
            throw new Error("两次输入的密码不一致，请重新输")
        }
    }
    async validateEmailExist(data) {
        var email = data.body.email;
        var user = await Models.User.findOne({
            where: {
                email: email
            }
        })
        if (user) {
            throw new Error('email已存在')
        }
    }
}

class PositiveIntegerValidator extends LinValidator {
    constructor() {
        super()
        this.id = [
            new Rule('isInt', '需要是正整数', {
                min: 1
            })
        ]
    }
    validateFun(vals) {
        if (vals.query.id == '3') {
            throw new Error("3不合法")
            // return [false, "3不合法"];
        }
    }
}
class TokenValidator extends LinValidator {
    constructor() {
        super()
        this.account = [
            new Rule('isLength', '账号不符合长度规范', {
                min: 4,
                max: 20
            })
        ]
        this.secret = [
            new Rule('isOptional'),
            new Rule('isLength', '至少6个字符', {
                min: 6,
                max: 32
            })
        ]
    }
    validateLoginType(data) {
        if (!data.body.type) {
            throw new Error('type是必须参数')
        }
        if (!LoginType.isConcludeType(data.body.type)) {
            throw new Error('type参数不合法')
        }
    }
}
module.exports = {
    RegisterValidator,
    PositiveIntegerValidator,
    TokenValidator
}