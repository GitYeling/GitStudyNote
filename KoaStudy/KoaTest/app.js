const Koa = require('koa')
const app = new Koa()
const InitManager = require('./core/init')
const catchError = require('./middlewares/exception')
const parser = require('koa-bodyparser')

app.use(parser())
app.use(catchError)
InitManager.Init(app)
app.listen(3000)
console.log('server is running...')