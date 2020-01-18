const { LinValidator, Rule } = require('../../core/lin-validator')

class PositiveIntegerValidator extends LinValidator {
    constructor() {
        super()
        this.id = [
            new Rule('isInt', '需要是正整数', { min: 1 })
        ]
    }
}

class RegisterValidator extends LinValidator {
    constructor() {
        super()
        //username nickname password confirm_password email
        this.username = [
            new Rule('isLength','用户名长度至少4个字符，最多20个字符',{
                min:4,
                max:20
            })
        ]
        this.email = [
            new Rule('isEmail','不符合Email规范')
        ]
        this.nickname = [
            new Rule('isLength','昵称不符合长度规范',{
                min:4,
                max:20
            })
        ]
        this.password = [
            new Rule('isLength','密码长度至少6个字符，最多30个字符',{
                min:6,
                max:30
            }),        
            new Rule('matches','密码不符合规范','^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]')                
        ]
        this.confirm_password = this.password
    }

    validateConfirmPassword(data) {
        if (!data.body.password || !data.body.confirm_password) {
          return [false, "密码不能为空"];
        }
        let ok = data.body.password === data.body.confirm_password;
        if (ok) {
          return ok;
        } else {
          return [false, "两次输入的密码不一致，请重新输入"];
        }
      }    
}

module.exports = { PositiveIntegerValidator,RegisterValidator }