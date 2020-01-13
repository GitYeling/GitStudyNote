const Koa = require('koa');
const app = new Koa();
const parser = require('koa-bodyparser');
const InitManager = require('./core/init');
const catchError = require('./middlewares/exception')

app.use(catchError)
app.use(parser())
InitManager.Init(app)

app.listen(3000);
console.log('server is running...')