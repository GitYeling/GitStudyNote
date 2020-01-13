const requireDirectory = require('require-directory')
const Router = require('koa-router')
class InitManager {
    static Init(app) {
        InitManager.app = app;
        InitManager.InitLoadRouter()
        InitManager.loadConfig()
    }

    static InitLoadRouter() {

        const apiDirectory = `${process.cwd()}/app/api`
        // 参数：第一个参数固定参数module，第二个参数要加载的模块的文件路径，第三个参数：每次加载一个参数执行的函数(回调函数)
        const modules = requireDirectory(module, apiDirectory, {
            visit: whenModuleLoad
        })

        function whenModuleLoad(obj) {
            if (obj instanceof Router) {
                InitManager.app.use(obj.routes())
            }
        }
    }

    static loadConfig(path = '') {
        const configPath = path || process.cwd() + '/config/config.js'
        const config = require(configPath)
        global.config = config
    }
}

module.exports = InitManager