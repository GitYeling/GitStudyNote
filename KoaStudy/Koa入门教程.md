# Koa入门教程

> 思考：为什么开发分为前端和后端？

前端：

后端：比如读写数据库、读写文件、提供api



> 思考：为什么不用Node直接开发Koa？

基于Node.js的专业web开发框架：express、koa

koa框架的特点：洋葱圈模型、精简

## 安装

npm init -y

npm install koa --save

## 利用Koa创建一个服务器

在项目根目录下，新建一个 `app.js` 文件

~~~shell
const Koa = require('koa')
const app = new Koa()

app.listen(3000)
console.log('server is running...')
~~~

服务器程序创建好之后，我们如何确定接收了来自客户端的请求呢？

我们猜想，是否可以在服务器程序中定义一个函数?

~~~javascript
function test() {
    console.log('接收到来自客户端的请求!!!')
}
test()
~~~

但是我们发现，这样写的函数在服务器启动时就会执行。要想让我们定义的函数在接收到请求后执行，我们需要对编写的函数进行注册中间件：

~~~javascript
app.use(test)
~~~

通常我们是不会单独定义一个函数，然后对这个函数进行注册的。我们可以使用使用匿名函数，借助箭头符号来创建一个函数，直接放进 `use()` 方法里进行注册：

~~~javascript
app.use(() => {
    console.log('接收到来自客户端的请求...')
})
~~~

## 洋葱模型

了解过koa的朋友可能听说过koa的洋葱模型，那什么是洋葱模型呢？

我们在上一节中注册了一个中间件来接收来自客户端的请求，我们再通过 `use()` 方法来注册一个中间件：

~~~javascript
app.use(() => {
    console.log('hello Jack!!!')
})

app.use(() => {
    console.log('hello Bob!!!')
})
~~~

如上注册完之后，我们会发现，我们注册的第二个中间件不会被执行， 那有些朋友可能想到说，我们在第一个中间件中调用第二个中间件就行了呀。但是我们怎么来调用呢，我们的中间件也没有名字。

以上问题，其实koa已经帮我们想好了，我们在注册中间件时，koa会自动给注册的函数传入两个参数：`ctx`、 `next`。ctx中koa中表示上下文，next表示下一个中间件函数。所以我们在第一个中间件中调用`next()`就可以触发下一个中间件：

~~~javascript
app.use((ctx,next) => {
    console.log('hello Jack!!!')
    next()
})

app.use(() => {
    console.log('hello Bob!!!')
    //按照默认的惯例，我们需要在每一个中间件中调用下一个中间件
    next()
})
~~~

理解了中间件之间的调用后，我们来思考下面一段程序，说出当请求到来时，服务器的输出应该是什么：

~~~javascript
const Koa = require('koa')
const app = new Koa()

app.use((ctx,next) => {
    console.log('1111')
    next()
    console.log('2222')
})

app.use((ctx,next) => {
    console.log('3333')
    next()
    console.log('4444')
})

app.listen(3000)
console.log('server is running...')
~~~

根据程序执行的结果，服务器输出应该是：

~~~javascript
// 1111
// 3333
// 4444
// 2222
~~~

那为什么会这样输出呢？这就是因为在koa中，中间件的调用符号洋葱模型。

在koa中，中间件的排列方式好比洋葱的包裹，每一层都是一个中间件，请求到来之后，中间件的调用过程如下图所示。我们上面的代码好比一个两层的洋葱，所以执行结果会如上所示。

![1591670095276](F:\Study\GitStudyNote\KoaStudy\media\洋葱模型.png)

怎么样，理解koa中的洋葱模型了吧？

## 深入理解async和await

我们在上面完成了一个多中间件的服务器，但是标准的写法应该是加上 `async` 和 `await`：

~~~javascript
const Koa = require('koa')	
const app = new Koa()

app.use(async (ctx,next) => {
    console.log('1111')
    await next()
    console.log('2222')
})

app.use(async (ctx,next) => {
    console.log('3333')
    await next()
    console.log('4444')
})

app.listen(3000)
console.log('server is running...')
~~~

以上这种写法是 koa 的标准写法，你如果不想深入了解 async 和 await，可以直接去用，当然，我建议深入了解其原理，我在这节会对其细述。

> 思考：next()函数会有返回结果吗？

 答：`next()` 函数一定会有返回结果，这歌结果一定是一个 `Promise`,我们先省去 `async` 和 `await` 来检验一下，我们定义一个变量  `value` 来接收 `next()` 的返回结果。当服务器请求到来时，控制台打印的结果证实了我们的猜想。

~~~javascript
app.use((ctx,next) => {
    console.log('1111')
    var value = next()
    console.log(value)
    console.log('2222')
})
~~~

打印结果：

![1591671056986](F:\Study\GitStudyNote\KoaStudy\media\没有await的打印结果.png)

这个 `Promise` 是下一个中间件返回的值，我们可以在下一个中间件返回值，然后在第一个中间件用 `then()` 方法来取出这个返回的值：

~~~javascript
app.use((ctx,next) => {
    console.log('1111')
    var value = next()
    value.then((res) => {
        console.log(res)
    })
    console.log('2222')
})

app.use((ctx,next) => {
    console.log('3333')
    next()
    console.log('4444')
    return 'abc'
})
~~~

打印结果：

![1591672030131](F:\Study\GitStudyNote\KoaStudy\media\打印promise返回值.png)

我们现在可以从下一个中间件返回值了，但是只能采用 `then` 方法里面写回调函数的方法，那有没有一种简便的方法让我们实现同样的操作呢？没错，那就是 `async` 和 `await`，加入二者之后，`next()` 会直接返回值，而不是一个包裹值的 `Promise`：

~~~javascript
app.use(async(ctx,next) => {
    console.log('1111')
    var value = await next()
    // value.then((res) => {
    //     console.log(res)
    // })
    console.log(value)
    console.log('2222')
})

app.use(async (ctx,next) => {
    console.log('3333')
    await next()
    console.log('4444')
    return 'abc'
})
~~~

打印结果：

![1591672208809](F:\Study\GitStudyNote\KoaStudy\media\await方式打印值.png)

### await的意义

- 求值（对Promise求值、对表达式求值）
- 阻塞当前线程

求值操作比较好理解，至于**阻塞当前线程**，通常在耗时操作中会有体现，我们可以结合 `axios` 来理解，我们安装`axios` 后，引入 `axios` 来请求接口，在请求前后，我们分别获取时间戳，然后在打印出时间戳的差值，如果代码在请求接口时被阻塞了，那么这个差值就会很大，如果没有被阻塞，那么这个差值就不大。

~~~javascript
const koa = require('koa')
const app = new koa()
const axios = require('axios')

app.use((ctx,next) => {
    const start = Date.now()
    var res = axios.get('https://api-hmugo-web.itheima.net/api/public/v1/categories')
    const end = Date.now()
    console.log(end - start)
    console.log(res)
})

app.listen(3000)
console.log('server is running...')
~~~

我们来看代码的运行结果，可以看到时间差值并不大，也就是说我们请求接口操作并没有被阻塞。并且我们不能打印出 `res` 取到的接口值。

![1591672782179](F:\Study\GitStudyNote\KoaStudy\media\无阻塞.png)

当我们对耗时操作（通常是异步操作）加上 `await` ，当然，你需要给中间件加上 `async` ，因为 `await` 是需要放在 `async` 里面。

~~~javascript
const koa = require('koa')
const app = new koa()
const axios = require('axios')

app.use(async(ctx,next) => {
    const start = Date.now()
    var res = await axios.get('https://api-hmugo-web.itheima.net/api/public/v1/categories')
    const end = Date.now()
    console.log(end - start)
    console.log(res)
})

app.listen(3000)
console.log('server is running...')
~~~

打印结果：

![1591672912119](F:\Study\GitStudyNote\KoaStudy\media\有阻塞.png)

从运行结果可以看出，加上 `await` 之后，代码在请求接口的时候被阻塞了。并且我们能够取到接口返回数据。

可以看出 `await` 是非常强大的，可以把异步操作用同步的方式来写。当该线程在耗时操作时被阻塞，但是该线程可以切换去做别的事，也就不会出现过多的资源浪费。

### async的意义

`async` 的意义不仅仅是为了搭配 `await` 而强行写在前面的关键字， 它也有自己的意义。`async` 的意义是，如果你在一个函数的前面加上 `async` ，这个函数任何的返回值都会被包装成一个 `Promise`。我们新建一个文件，写上如何一段代码来测试：

~~~javascript
async function start(){
        return 'abc'
}
var value = start()
console.log(value)

//输出 Promise { 'abc' }
~~~

## 保证洋葱模型

上一节提到，我们讲到，`await` 可以方便我们获取 `Promise` 对象包裹的值。但是，Koa 中使用 `await` 并不是为了方便返回下一个中间件的值，而是为了**保证洋葱模型**。在很多情况下，如果不遵循 `async-await` 的处理方式，中间件的执行可能会打破洋葱模型，比如下面这种：

~~~javascript
const Koa = require('koa')
const app = new Koa()
const axios = require('axios')

app.use((ctx,next) => {
    console.log('1111')
    next()
    console.log('2222')
})

app.use(async(ctx,next) => {
    console.log('3333')
   var res =await axios.get('https://api-hmugo-web.itheima.net/api/public/v1/categories')
    console.log('4444')
})

app.listen(3000)
console.log('server is running...')

//输出
1111
3333
2222
4444
~~~

按照洋葱模型，我们的程序输出应该为：

~~~javascript
// 按照洋葱模型运行代码的输出
1111
3333
4444
2222
~~~

真实的输出意味着洋葱模型的打破。这是因为我们在第二个中间件中因使用 `await` 而出现阻塞操作，当线程被阻塞时，线程会被切换去别的地方做计算操作，这这段代码中也就是被切换回了第一个中间件，顺理成章，有了那个输出结果。

## ctx参数

`ctx` 是上下文。我们知道每一个中间件在执行的时候，koa 会向中间件中传递两个参数，其中一个就是 `ctx`。可以这么说，我们在 koa 中编程的时候，绝大多数时候都在操作 `ctx`，比如中间件之间需要传递参数。我们如果需要在自己编写的两个中间件中传递参数，当然可以使用 `return` 的方式，在第二个中间件中返回值，然后在第一个中间件中接收 `await` 返回值，但是，koa 非常精简，它需要用到大量的第三方中间件，你无法知道这些第三方中间件的执行顺序，那么这个时候的传参，你就不能通过 `return` 进行传参。

举个例子：你自己编写了两个中间件，然后二者之间插入了一个第三方中间件，当你把参数从第三个中间件传给第二个中间件时，这个第三方中间件是不会按你的逻辑来给你传参的。

因此，我们传参就要用到 `ctx` 上下文：

~~~javascript
app.use(async(ctx,next) => {

  await next()
  console.log(ctx.name)
})

app.use(async(ctx,next) => {

  ctx.name = '张三'
  await next()
})
// 输出
// 张三
~~~

我们编写两个中间件，以如上的方式实现ctx传值。在这里需要注意的是，我们第一个中间件取值的过程一定要在`await next()` 之后，因为我们需要满足洋葱模型。同理，如果我们第一个中间件的 `next()` 前面没有写`await`，那么也是无法取到我们想要的值的。

## 路由

在前几节我们了解了 koa 的核心基础，创建的服务器能够接受客户端的请求，但是我们该如何给出响应呢？我们可以在中间件中通过 `ctx.body` 来向客户端响应内容：

~~~javascript
app.use(async(ctx,next) => {

  await next()
  ctx.body = ctx.name
})
~~~

如果有不同的请求路径，可以通过 `ctx.url` 对这些路径做出区分，比如下面代码，将请求路径响应给客户端：

~~~javascript
app.use(async(ctx,next) => {
  await next()
  ctx.body = ctx.url
})
~~~

在实际的开发中，得到不同的请求路径之后，不可能只是给客户端响应请求路径，而根据请求路径做复杂处理，然后在响应，这儿我们就需要用到一个中间件：`koa-router`

安装 `koa-router` ：**npm install koa-router**

使用方法如下：

~~~javascript
// 引入koa-router，再实例化对象
const Router = require('koa-router')
const router = new Router()

// 配置路由
router.get('/name',async(ctx,next) => {
  ctx.body = {name:ctx.student.name}
})
router.get('/class',async(ctx,next) => {
  ctx.body = {class:ctx.student.class}
})

// 注册路由中间件
app.use(router.routes())
~~~

以上需要注意的是，路由配置的时候，网络请求方法常用的有：get、post、put、delete，这些请求方法接收两个参数，一个是请求路径，另外一个也是中间件函数，只不过这个中间件不需要你自己来注册，router已经帮我们注册好了。

## 多路由拆分

在工程项目中，我们的业务逻辑实际上是非常复杂的，不可能所有的处理过程都放在一个文件里面，因此我们需要将怎么项目代码结构化，不同的功能部分放到不同的文件夹中。比如我们应该新建一个目录做路由工作。

在一个实际应用中，可能涉及多个版本，对应的，我们的服务器api也应该有多个版本。首先我们可以在请求路径中加入版本号：

~~~javascript
// version1/classic
// version2/classic
~~~

其次，在项目目录结构中，我们app目录，然后在APP目录下面再创建一个api目录，然后在该目录下再分别创建v1和v2目录，这两个目录页分别对应着不同版本的接口：

![1591693709184](F:\Study\GitStudyNote\KoaStudy\media\api目录.png)

现在我们的代码改写情况如下：

~~~javascript
// app.js
const Koa = require('koa');
const app = new Koa();
var book = require('./app/api/v1/book')
var classic = require('./app/api/v1/classic')

app.use(async(ctx,next) => {
  await next()
})

app.use(book.routes())
app.use(classic.routes())
app.listen(3000);
console.log('server is running...')
~~~

~~~javascript
// book.js
const Router = require('koa-router')
const router = new Router()

router.get('/book/latest', async (ctx, next) => {
    ctx.body = { name:ctx.url}
})

module.exports = router
~~~

~~~javascript
// classic.js
const Router = require('koa-router')
const router = new Router()

router.get('/classic/latest', async (ctx, next) => {
    ctx.body = { name:ctx.url}
})

module.exports = router
~~~

## 自动重启与断点调试

我们可以安装  `nodemon` 实现自动重启：**npm install nodemon -g**

然后运行：**nodemon app.js**

这样一来，一旦我们的项目发生了变化，我们的项目便会自动重启。

我们也可以在 `package.json` 中的 `script` 中配置运行脚本：

~~~json
  "scripts": {
    "dev":"nodemon app.js"
  },
~~~

在 VScode 开发环境中可以在设置断点之后，按 `F5` 进行调试。默认情况下，`launch.json` 的配置如下：

~~~json
{
    "type": "node",
    "request": "launch",
    "name": "启动程序",
    "skipFiles": [
        "<node_internals>/**"
    ],
    "program": "${workspaceFolder}\\app.js"
},
~~~

默认的配置文件是从项目根目录的主文件开始运行项目，进行调试。如果我们只想调试项目中任意一个单独的文件，则需要添加额外的配置，比如我添加一种名为 **”当前文件“ **的启动方式：

~~~json
{
    "type": "node",
    "request": "launch",
    "name": "当前文件",
    "skipFiles": [
        "<node_internals>/**"
    ],
    "program": "${file}"
}
~~~

我们也可以将断点调试和自动重启结合起来，使得断点调试时可以自动重启，实现步骤如下：

点击 VScode 左边栏的小爬虫，然后点击设置按钮：

在打开的 `launch.json` 文件中，通过 `Add Configuration` 按钮选中2号红色圈中的选项，然后会在文件中生成一段代码，这表示你配置成功。接下来需要你在3号红色圈的位置选中 `nodemon`，再次调试你就会发现断点调试和自动重启就结合起来了。

## 自动注册路由

在上文中，我们路由的使用过程大概是，先编写一个路由文件，然后在 `app.js` 中引入这个文件，然后注册，这样一来如果我们的路由文件过多，那么我们每一个路由文件都需要在入口文件 `app.js` 手动引入并且注册。我们可不可以用自动化的方式实现这一过程。当然可以，我们可以写一段代码，然后让这段代码自动帮助我们扫描所有的 `router` 文件，然后导入，自动注册。在这里，我介绍一个第三方组件（`require-directory`），可以帮组我们实现这一过程：

- 安装 `require-directory`：**npm install require-directory**

- 在 `app.js` 中使用：

  ~~~javascript
  const requireDirectory = require('require-directory')
  const Router = require('koa-router')
  
  // 参数：第一个参数固定参数module，第二个参数要加载的模块的文件路径，第三个参数：每次加载一个参数执行的函数(回调函数)
  const modules = requireDirectory(module,'./api',{
    visit:whenModuleLoad
  })
  
  function whenModuleLoad(obj){
    if (obj instanceof Router){
      app.use(obj.routes())
    }
  }
  ~~~

-  因为 `app.js` 是入口文件，所以我们为了以后的便于维护，我们需要把其中的逻辑运算都单独提取出来 。我们在在根目录下创建一个 `core` 文件夹，在 `core` 文件夹下创建一个文件 `init.js`，将自动导入注册代码写到该文件中：

  ~~~javascript
  const requireDirectory = require('require-directory')
  const Router = require('koa-router')
  class InitManager {
      static Init(app) {
          InitManager.app = app;
          InitManager.InitLoadRouter()
      }
  
      static InitLoadRouter (){
          // 参数：第一个参数固定参数module，第二个参数要加载的模块的文件路径，第三个参数：每次加载一个参数执行的函数(回调函数)
          const modules = requireDirectory(module,'../app/api/',{
              visit:whenModuleLoad
          })
          
          function whenModuleLoad(obj){
              if (obj instanceof Router){
                  InitManager.app.use(obj.routes())
              }
          }        
      }
  }
  
  module.exports = InitManager
  ~~~

- 在 `app.js` 中引入刚才编写的模块，并执行它：

  ~~~javascript
  const Koa = require('koa');
  const app = new Koa();
  const InitManager = require('./core/init')
  
  InitManager.Init(app)
  
  app.listen(3000);
  console.log('server is running...')
  ~~~

这样也就完成了自动注册功能，并且保持一个简洁的 `app.js` 入口文件。

但是 `init.js` 代码中还有一个地方最好做一些调整，那就是 `requireDirectory()` 方法中api的路径，因为我们的 `init.js` 所在目录有可能会影响这个相对路径的写法，如果我们写成绝对路径，肯定就没有问题了：

~~~javascript
        const apiDirectory = `${process.cwd()}/app/api`
        // 参数：第一个参数固定参数module，第二个参数要加载的模块的文件路径，第三个参数：每次加载一个参数执行的函数(回调函数)
       	const modules = requireDirectory(module,apiDirectory,{
            visit:whenModuleLoad
        })
~~~

在上面的代码中，`process.cwd()`可以获取当前工作路径，然后再拼接上 `/app/api`，在这里用到了 ES6 的模板字符串。

## 参数获取

这小节讲解一下网络请求的传参与参数获取。

常见的网络请求中的参数传递方式有四种：

- URL 路径中传参：/v1/{param}/classic/latest
- url 路径后面传参：/v1/classic/latest?param=
- http 的 `header` 中传参
- http 的 `body` 中传参（只有 post 才能使用这种方式）

想要测试这四种传参方式，不能直接在 URL 地址栏中进行输入了，可以使用 `postman` 工具进行测试。使用 `postman` 在 http 的 `body` 中进行传参时，一定要严格按照 `json` 的格式规范。在下图中，四种编号表示四种传参方式：

![1591750156368](F:\Study\GitStudyNote\KoaStudy\media\四种传参方式.png)

传参测试完成之后，主要是我们如何在服务器代码中来获取到四种方式传递的参数。前三种传参方式我们都能很容易获取到，如下面的代码所示：

~~~javascript
router.post('/v1/:id/book/latest', async (ctx, next) => {
    const path    = ctx.params.id
    const query   = ctx.query
    const headers = ctx.header
    ctx.body = { name:ctx.url}
})
~~~

获取 http 的 `body` 中的参数相比麻烦一些，首先我们需要安装 `koa-bodyparser`，然后在 `app.js` 中引入、注册。

~~~js
const parser = require('koa-bodyparser')
app.use(parser());
~~~

:heart:*注意：注册代码一定要写在路由注册之前*

然后就可以使用了，使用也非常简单：

~~~javascript
const body = ctx.request.body
~~~

获取参数没问题了，那我们如何来校验参数呢？

## 异常处理

我们对自己编写的代码，或者接收第三方返回值的代码进行异常处理的原因主要有：

- 给用户一个良好的提示，让用户遇到一些异常时能冷静行事，尽量降低用户放弃该应用的几率
- 让程序员能更好的调整自己的代码，提高开发效率和工程质量质量。

异常处理使用的机制是  `try...catch...finally`，书写方式如下：

~~~javascript
function func3() {
        try {
                console.log('这是第三个函数')
                1 / a
        } catch (e) {
                console.log(e)
        } finally {
                console.log('finally')
        }
}
~~~

在上面这段代码中，我们用  `try` 关键字将可能出现异常的代码包裹在随后的  `{ }` 中，然后在 `catch` 关键字后面的 `{ }` 中进行处理，如果没有出现异常，将不会执行 `catch` 部分的内容，但是 `finally` 后面 `{ }` 中的代码一定会执行。

**异常传播**

在 JavaScript 中，处处都是函数调用。函数调用链中任意一个环节出现异常，都会将异常向上抛出，直到被 js 解释器捕获，也就是当我们写代码的时候，可以在一个合适的地方捕获异常、然后处理就行了。

我们也可以通过 `throw` 关键字在合适的地方，自己抛出异常，然后再捕获。这样的好处是，我们可以自定义抛出的内容，比如：

~~~javascript
function func1() {
        try {
                console.log('这是第一个函数')
                func2()
        } catch (e) {
                console.log(e)
        }
}

function func2() {
        try {
                console.log('这是第二个函数')
                func3()
        } catch (e) {
                throw e
        }

}

function func3() {
        try {
                console.log('这是第三个函数')
                1 / a
        } catch (e) {
                throw e.message
        } finally {
                console.log('finally')
        }
}

func1()
~~~

在上面这段代码中，我定义了三个函数，`func1` 调用 `func2` ，`func2` 调用  `func3`，然后执行 `func1`，这样就形成了一个函数调用链，如果我们不对异常做处理，那么在 `func3` 中的异常会 `func2` ，`func2` 再传播到 `func1` ，然后 `fun1` 抛给js解释器捕获，并且给出异常信息。

我再 `func3` 中将异常捕获并且将异常的 `message` 抛出，当异常传播到 `func1` 时被捕获然后打印。

**常见异常类型：**

- SyntaxError：      语法错误
- TypeError：         数据类型错误或者调用不存在的函数，比如传递给函数的参数类型与预期类型不相符
- RangeError：       数值超出相应范围
- ReferenceError：找不到对象，通常，在访问不存在的变量时，就会发生这种错误。

**异步异常处理**

JavaScript 引擎也好，node.js 运行环境也好，代码总是单线程执行的，为了避免被阻塞，常常会使用一些异步的手段，回调函数就是一种。当我我给一段异步代码使用 `try...catch...` 来处理异常时，我们会发现我没有办法 通过 `catch` 来捕获异常。你说看到的关于 a 未定义的异常是 js解释器 捕获的，并不是你自己写的异常处理捕获到的。对应于下面这段代码就是 不会输出`'error'`

~~~javascript
try {
    setTimeout(function () {
        1 / a
    }, 1000)
    console.log('start...')
} catch (e) {
    console.log('error')
}
~~~

那我们如何才能自己捕获住异常呢？可以像下面这样写，将 `try...catch...`  放在回调函数里面：

~~~javascript
setTimeout(function () {
    try {
        1 / a
    }catch(e){
        console.log('error')
    }
}, 1000)
console.log('start...')
~~~

问题是我们常常调用第三方的函数，我们是不用也没办法在别人的代码中进行异常控制的，我们需要做的是如何根据别人返回的结果做异常处理，比如下面代码中，假设 `start()` 函数为第三方库中的函数，`end()`  函数为我们自己编写的函数，我们需要做的是在我们自己编写的代码中进行异常控制。我使用 `async-await` 方案来实现异常的捕获，`await` 会将 `Promise` 中的异常 `throw` 出来。如何我在调用 `start` 函数之前没有加上 `await`，那么我们无法做异常控制，只能让异常抛出，被 js 解释器捕获。

需要注意的是，我们要想使用 `async-await` 方案来实现异常的捕获，就必须保证 `start` 函数执行后返回的是`Promise` 对象，所以在 `start` 函数中，我返回的是 `Promise` 对象。

好在 Koa 编程中，我们调用的库或者是包，都会给我们返回 Promise 。

~~~javascript
async function end() {
    try {
        await start()
    } catch (e) {
        console.log(e)
    }
}
function start() {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            const r = Math.random()
            if (r < 0.5) {
                reject('error async!!!')
            }
        }, 1000)
        console.log('start...')
    })

}
end()
~~~

## 全局异常处理中间件

通过以上的学习，你懂得了如何处理异步函数抛出的异常，但是有没有一种方法，让我们能够避免在整个代码中到处书写 `try...catch...`  呢，答案是有的。我们可以编写一个中间件，用来对全局抛出的异常进行处理，然后在其他地方，我们只需要抛出异常即可。

首先，在根目录下创建一个 `middlewares` 文件夹，然后在这个文件夹中创建一个文件 `exception.js` ，这个文件将作为我们的全局异常处理中间件：

~~~javascript
const catchError = async (ctx, next) => {
    try {
        await next()
    } catch (error) {
        ctx.body = '服务器有点问题，您稍等一下'
    }
}
module.exports = catchError
~~~

然后在 `app.js` 中进行注册：

~~~javascript
const catchError = require('./middlewares/exception')
app.use(catchError)
~~~

这样我们就完成了全局异常处理中间件的编写与注册。当我们在项目任意业务环节有异常出现，尽管抛出。比如在

`book.js` 文件中，我们抛出一个异常：

~~~javascript
throw new Error('api error')
~~~

当客户端请求  *localhost:3000/v1/123/book/latest*   时，全局异常处理中间件便会捕捉到 `book.js` 文件中抛出的异常，然后给出响应。

## 已知异常和未知异常

**已知型异常**通常是指一些 在执行之前可以被检查出来的异常，或者说能被校验器检测出的异常，比如：参数类型错误

**未知型异常**是程序潜在性的异常，在执行之前无法检测出来，比如连接数据库的用户名或者密码错误。

## 定义异常返回格式

在出现异常时，不能直接将堆栈调用信息这种杂乱的异常信息返回给客户端，也不能只是返回一句报错描述，而应该是格式化的异常返回格式，其中包括：

- http status             如： 2xx、4xx 、5xx
- message                异常描述文字
- error_code             开发者自己定义的错误码，如：10001、20003
- request_url            当前请求的URL

在下面这段代码中，当获取到的 query 参数为空时，创建一个异常类，这个异常定义了四种属性，也就是上面例举出来的四种异常信息，然后将这异常返回格式抛出。等待全局异常处理中间件捕获，然后响应给客户端。

~~~javascript
router.post('/v1/:id/book/latest', async (ctx, next) => {
    const path = ctx.params.id
    const query = ctx.query
    const headers = ctx.header
    const body = ctx.request.body

    if (!query) {
        const error = new Error('服务器错误')
        error.errorCode = 10001;
        error.status = 400;
        error.requestUrl = `${ctx.method} ${ctx.path}`
        throw error;
    }else{
        ctx.body = '请求成功'
    }
})
~~~

在全局异常处理中间件中捕获异常，通过错误码，确定响应给客户端的内容：

~~~javascript
const catchError = async (ctx, next) => {
    try {
        await next()
    } catch (error) {
        if (error.errorCode){
            ctx.body = {
                msg:error.massage,
                errorCode:error.errorCode,
                requestUrl:error.requestUrl
            }
            ctx.status = error.status
        }
    }
}

module.exports = catchError
~~~

## HTTPException异常基类

每次抛出异常时，我们都需要创建一个异常对象，然后在利用 JavaScript 动态语言的特性往异常对象中添加属性，这种做法显然太繁琐了。我们可以采用 **面向对象编程思想**，封装一个异常基类，然后在异常可能出现的地方，只需要实例化一个异常基类对象，然后抛出该对象即可。

首先，在 `core` 文件夹下新建一个 `http-exception.js` 文件，在该文件中创建一个 `HttpException` 类，该类继承于 `Error` 类。

~~~javascript
// http-exception.js
class HttpException extends Error{
    constructor(msg='服务器异常',errorCode=10000,status=500){
        super()
        this.errorCode = errorCode;
        this.msg = msg;
        this.status = status;
    }
}

module.exports = HttpException
~~~

然后在需要抛出异常的地方，实例化一个 `HttpException` 类的对象，传入相关参数，然后抛出该对象：

~~~javascript
  var exception = new HttpException('请求参数不能为空',10001,400);
  throw exception;
~~~

最后在全局异常处理中间件中，判断捕获到的异常是否为 `HTTPException`  类的实例对象，如果是的话就取出该对象的属性，添加到响应对象上就行了：

~~~javascript
if (error instanceof HttpException){
    ctx.body = {
        msg:error.msg,
        errorCode:error.errorCode,
        requestUrl:`${ctx.method} ${ctx.path}`
    }
    ctx.status = error.status
}
~~~

如果你嫌每次实例化 `HTTPException` 类的对象时，都要传入参数太麻烦，你也可以在 `http-exception.js` 文件中编写特定的异常类，给这些**特定异常类**设定默认值，则每次只需要实例化特定异常类，并且不必传参。

~~~javascript
class ParameterException extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.status = 400
        this.msg = msg || '参数异常'
        this.errorCode = errorCode || 10000
    }
}
~~~

## 未知异常

我们定义了一个基类 HTTPException 来创建以及判断已知异常，我们也可以处理未知异常。

在 exception.js 文件中书写 else 代码块：

~~~javascript
if (error instanceof HttpException) {
    ctx.body = {
        msg: error.msg,
        errorCode: error.errorCode,
        requestUrl: `${ctx.method} ${ctx.path}`
    }
    ctx.status = error.status
}else{
    ctx.body = {
        msg: '服务器未知异常',
        errorCode: 999,
        requestUrl: `${ctx.method} ${ctx.path}`
    }
    ctx.status = 500            
}
~~~

## 配置文件与在终端显示异常

我们知道，在类的构造函数中，需要加上 `super()` 才能使用 `this` 给该类创建新属性，并且赋值。当我们去掉 `super()` 之后，运行程序，理应在控制台打印出报错信息的，却因为全局异常处理中间件将所有的异常都做了处理，所以没有打印报错信息到控制台中。

我们可以在全局异常处理中间件中 `throw` 异常，然 JavaScript 解释器捕获，并且打印。但是我们知道，程序一旦抛出异常，后面的代码会终止执行。那我们如何解决这对矛盾呢？

解决方案：引入 **开发环境** 和 **生产环境**的概念

具体做法：在根目录下创建一个包好 `config.js` 配置文件的文件夹，然后在里面写入环境配置：

~~~javascript
module.exports = {
    environment:'dev'
    // this.environment:'prod'
}
~~~

可以在初始化类中，将该对象绑定到全局对象 `global` 上，之后使用便无需导入。在 `init.js` 文件中初始化全局绑定配置文件：

~~~javascript
    static loadConfig(path = '') {
        const configPath = path || process.cwd + '/config/config.js'
        const config = require(configPath)
        global.config = config
    }
~~~

然后在需要做环境区分的地方，进行判断：

~~~JavaScript
if (global.config.environment == 'dev'){
    throw error;
}
~~~

## 使用Sequelize

在项目中使用 `sequelize` 时，我们可以选择自己搭建 `sequelize`工具组，也可以使用脚手架，在本节两种方式都会被我讲到，选择一种使用即可。不过我建议两种方式都掌握。

### 快速入门

> Node.js 程序如何访问 MySQL 数据库呢？
>
> 什么是ORM？

**安装**

安装 `sequelize`：

~~~js
npm install --save sequelize
~~~

安装 `mysql` 驱动

~~~js
npm install --save mysql2
~~~

**建立连接**

要连接到数据库，必须创建一个 `Sequelize` 实例。这可以通过将连接参数分别传递到 `Sequelize` 构造函数，或通过传递单个连接URI来完成。在 `core` 文件夹中新建一个 `db.js` 文件，用来创建一个 `Sequelize` 实例：

~~~js
const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  port:'3306',
  logging:true,
  timezone:'+08:00'
  dialect: /* 'mysql' | 'mariadb' | 'postgres' | 'mssql' 之一 */
});

// 模型同步，一次性同步所有模型
sequelize.sync({
    
})

module.exports = {
    sequelize
}
~~~

以上的连接参数可以写到配置文件 `config.js` 里。

**对表建模**

模型是对 `Sequelize.Model` 类的扩展。模型可以通过两种方式定义。在此，我只给出 `init` 的方式：

~~~js
const {Sequelize,Model} = require('sequelize')
const {sequelize} = require('../core/db')

class User extends Model {}
User.init({
  // attributes
  id:{
    type: Sequelize.INTEGER,
    primaryKey:true,
      autoIncrement:true,
  }
  nickname: {
    type: Sequelize.STRING,
    //allowNull: false
    // allowNull defaults to true
  },
  email:Sequelize.STRING,
  password:Sequelize.STRING,
  openid: {
    type: Sequelize.STRING(64),
	unique:true
  }
}, {
  sequelize,// 连接实例
  modelName: 'user',
  // 不要忘记启用时间戳！
  timestamps: false,
  // 不想要 createdAt
  //createdAt: false,  
  // options
});
~~~

### 使用sequelize cli

在 `node.js` 中我们也可以直接使用 `mysql` 驱动提供的接口，之所以使用 `Sequelize` 是因为我想像操作对象一样操作数据库中的记录。在准备好数据库之后，可以通过以下步骤实现 `Sequelize` 的使用：

- 安装依赖： **npm i sequelize-cli sequelize mysql2 **

- 新建一个名为 `DBModule` 的文件夹，切换到该目录，初始化 `Sequelize`：**npx sequelize init **

  运行之后，会产生4个目录：`config` , `migrations` , `models` , `seeders`

- 修改 `config` 目录下面的 `config.json` 文件，将数据库信息修改为你将要创建的数据库信息。

- 创建数据库：**npx sequelize db:create **

- 创建 `user` 表的迁移文件和模型文件：**npx sequelize model:generate --name User --attributes username:string**，执行完成后会生成对应两个文件。

- 补全迁移文件中 `user` 表的其它字段，运行：**npx sequelize db:migrate **， 就可以在数据库中看到生成了`users` 表 。需要注意的是，我在 `user` 表中引入了 `bcryptjs` 来对用户密码进行加密处理。

  ~~~javascript
  'use strict';
  module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('Users', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
        },
        username: {
          type: DataTypes.STRING
        },
        nickname: {
          type: DataTypes.STRING
        },
        email: {
          type: DataTypes.STRING(64),
          unique: true
        },
        openid: {
          type: DataTypes.STRING(64),
          unique: true
        },
        password: {
          type: DataTypes.STRING,
          set(val) {
            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(val, salt)
            this.setDataValue('password', hash)
          }
        },
        createdAt: {
          allowNull: false,
          type: DataTypes.DATE
        },
        updatedAt: {
          allowNull: false,
          type: DataTypes.DATE
        }
      });
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('Users');
    }
  };
  ~~~

- 将 `models` 文件夹下面的 `user.js` 也按迁移文件的字段，补充完整。

- 创建 `seed` 文件：**npx sequelize seed:generate --name user**

- 在种子文件中填写需要生成的数据，在下面代码中，我使用了 `md5` 模块对用户密码进行加密：

  ~~~javascript
  'use strict';
  
  
  const md5Sign = require('md5')
  module.exports = {
    up: (queryInterface, Sequelize) => {
  
     return queryInterface.bulkInsert('Users', [
        {    
          username: 'admin',
          nickname:'张三',
          email:'875917582@qq.com',
          openid: "admin",
          password:md5Sign('123456'),
          createdAt: new Date(),
          updatedAt:new Date()        
        },
  
      ], {});   
    },
  
    down: (queryInterface, Sequelize) => {
  
     return queryInterface.bulkDelete('Users', null, {});
    }
  };
  
  ~~~

## 参数校验

由于 Koa 框架过于精简灵活，或多其他语言框架自带的功能，它都没有，比如参数校验。在我们这个项目中，我介绍一个别人写好的参数校验模块： `lin-validator`，基本使用过程如下：

- 首先需要导入模块到 `core` 文件夹中： **lin-validator**、**util**	

- 在 APP 文件夹下面新建一个 `validators` 文件夹，再创建一个 `validator.js` 文件。参数校验部分写于该文件。

- 安装 `lin-validator` 使用的依赖：**validator** 、**lodash**

- 在 `validator.js` 文件中编写参数验证代码：

  ~~~javascript
  const { LinValidator, Rule } = require('../../core/lin-v2')
  
  class PositiveIntegerValidator extends LinValidator {
      constructor() {
          super()
          this.id = [
              new Rule('isInt', '需要是正整数', { min: 1 })
          ]
      }
  }
  module.exports = PositiveIntegerValidator
  ~~~

- 再到路由文件中来使用：

  ~~~javascript
  // 引入
  const { PositiveIntegerValidator } = require('../../validators/validator')
  
  // 使用
  var v = await new PositiveIntegerValidator().validate(ctx)
  ctx.body = 'succsess'
  ~~~

- 有了 `lin-validator` 之后，我们就不用了再通过  `ctx.xxx` 的方式获取参数了，因为我们将 `ctx` 作为参数传递到 校验类中时，`LinValidator` 会将参数提取出来，包含在返回的对象中，所以我们只需要从返回对象中取参数即可：

  ~~~javascript
  var valiData = await new PositiveIntegerValidator().validate(ctx)
  const path = valiData.data.path
  const query = valiData.data.query
  const headers = valiData.data.header.token 
  const body = valiData.data.body
  ~~~

## 用户注册信息校验

上一节讲解了 `lin-validator` 的基本使用，这一节，以注册为例讲解该验证器的扩展应用，下面是  `RegisterValidator` 类，在验证类的构造函数中，设定了各字段的验证规则。验证类中有一个 `validateFunc` 方法，该方法做两个参数的比较，在这儿是比较密码和确认密码是否相等。

~~~javascript
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
~~~

**验证使用**

使用也是很方便的，先导入，然后创建一个 `RegisterValidator` 类的实例对象，调用 `validate` 方法，接收一个返回值，我们可以从这个返回值中获取通过校验的参数。在下面代码中，实例化 `Router` 对象时，传入了一个`JavaScript` 对象，该对象有一个属性 `prefix:'/v1/user'` ，该属性设定了 url 前缀。

~~~javascript
const Router = require('koa-router')
const { RegisterValidator } = require('../../validators/validator')

const router = new Router({
    prefix: '/v1/user'
})

router.post('/register', async (ctx, next) => {
    var valiData = await new RegisterValidator().validate(ctx)
    ctx.body = '注册成功'
})

module.exports = router
~~~

 **修改全局异常处理中间件**

在全局异常中间件中，我们修改抛出异常的情况，当既处于开发环境，并且捕获到下层抛出的异常不是 `HttpException` 时，才将异常继续往上层抛给 JavaScript 解释器：

~~~javascript
const IS_HTTPException = error instanceof HttpException
const IS_DEV = global.config.environment == 'dev'
if (IS_DEV && !IS_HTTPException){
    throw error;
}
~~~

运行服务器，客户端访问后，返回验证结果：

![1591975439473](F:\Study\GitStudyNote\KoaStudy\media\注册成功.png)

## 用户注册与Sequelize新增数据

上一节已经完成了用户注册信息的验证，现在需要将通过验证的注册信息持久化到系统数据库中，

首先在路由处理文件中，导入 `Sequelize` 和 `models` ：

~~~JavaScript
const Models = require('../../DBModule/models')
const {Sequelize} = require('sequelize')
~~~

然后从验证器的返回数据中，取出通过校验的数据，构建成 user 对象，然后将数据插入到数据库中，并且将插入数据时返回的对象，响应给客户端：

~~~javascript
    var user = {
        username: valiData.get('body.username'),
        nickname: valiData.get('body.nickname'),
        email: valiData.get('body.email'),
        password: valiData.get('body.password'),
    }
    var dbReturn =  await Models.User.create(user)
    ctx.body = dbReturn    
~~~

需要注意的是，我们存到数据库中的密码，不能以明文的方式进行存储，我在这儿用的**盐加密**的方式对密码进行加密。在 `models` 下面的 `user` 模型文件中，将 `password` 字段作如下修改，其中当我们给 `password` 赋值时便会调用 `set()` 方法，在 `set` 方法中使用了盐加密。

首先你需要安装 `bcryptjs` : 

~~~js
npm install bcryptjs --save
~~~

然后在 `model` 添加加密控制：

~~~javascript
password: {
    type: Sequelize.STRING,
    set(val) {
        const salt = bcrypt.genSaltSync(10) 
        const hash = bcrypt.hashSync(val, salt)
        this.setDataValue('password', hash)
    }
},
~~~

使用 `postman` 提交数据即可完成注册。

## 用户邮箱登录与令牌分发

![1592351415979](F:\Study\GitStudyNote\KoaStudy\media\邮箱登录.png)

在如今的应用中，用户登录方式多样，我们需要根据用户不同的登录方式来判断，因此我们先在 `core` 文件夹中创建一个 `userType` 文件，用来做用户登录方式的枚举。里面有一个 `LoginType` 对象，这个对象包含四种不同的用户登录方式，以及一个根据值判断 `LoginType` 对象是否包含某种登录方式的函数：

~~~javascript
const LoginType = {
    USER_MINI_PROGRAM:100,
    USER_EMAIL:101,
    USER_MOBILE:102,
    ADMIN_EMAIL:200,
    isConcludeType
}
function isConcludeType(val){
    for (let key in this){
        if (this[key] == val){
            return true
        }
    }
    return false
}
module.exports = LoginType
~~~

用户登录时提交的数据需要验证，所以我们需要编写一个 `validator `，在这个 `TokenValidator` 类中，对 

`account`、`secret` 和 `type` 进行验证，其中 `type` 使用验证函数进行验证，写完之后记得导出：

~~~JavaScript
class TokenValidator extends LinValidator {
    constructor() {
        super()
        this.account = [
            new Rule('isLength', '账号不符合长度规范', {
                min: 4,
                max: 32
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
        if (!data.body.type){
            throw new Error('type是必须参数')
        }
        if (!LoginType.isConcludeType(data.body.type)){
            throw new Error('type参数不合法')
        }
    }
}
~~~

参数校验类写好之后，再来写 `api` 里的请求处理，先测试一下校验代码：

~~~JavaScript
const Router = require('koa-router')
const { TokenValidator } = require('../../validators/validator')
const router = new Router({
    prefix: '/v1/token'
})

router.post('/', async (ctx) => {
    var val = await new TokenValidator().validate(ctx)
    throw new global.errs.Success()
})
module.exports = router
~~~

根据不同登录方式书写具体处理逻辑，当登录方式为用户邮箱登录时，调用emailLogin函数来处理，用户使用 USER_MINI_PROGRAM方式登录的处理逻辑，后面会有详细讲解：

~~~JavaScript
const Router = require('koa-router')
const router = new Router({
    prefix:'/v1/token'
})
const {TokenValidator} = require('../../../validator/validator')
const LoginType = require('../../../lib/login-type')
const User = require('../../../models/user')

router.post('/',async (ctx,next) => {
    var val = await new TokenValidator().validate(ctx)
    switch(val.get('body.type')){
        case LoginType.USER_MINI_PROGRAM:
            
            break;
        case LoginType.USER_EMAIL:
            await User.emailLogin(val.get('body.account'),val.get('body.secret'))
            break;
        default:
            throw new global.errs.ParameterException('没有相应的登录类型');
            break;
    }
})

module.exports = router
~~~

在上面那段代码中，用户使用邮箱方式登录时，会调用 `emailLogin` 函数来进行用户账号和密码的验证，该函数最好是写在模型 `User` 中。具体验证过程是，根据用户提交的邮箱查找数据库，当没有对应账号的用户时，抛出异常提示“用户不存在”。如果存在相应用户，再来判断密码是否匹配，如果密码不匹配，抛出异常提示“密码不正确”：

~~~javascript
class User extends Model {
    async emailLogin(account,secret){
        let user = await User.findOne({
            where:{
                email:account,
            }
        })
        if (!user){
            throw new global.errs.AuthFailed('用户不存在！')
        }
        var corrent = bcrypt.compareSync(secret,user.password)
        if (!corrent){
            throw new global.errs.AuthFailed('密码错误！')
        }
    }
}
~~~

当然，以上的异常类 `AuthFailed` 需要自己定义，顺便定义了一个资源未找到异常类：

~~~javascript
class AuthFailed extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.status = 401
        this.msg = msg || '授权失败'
        this.errorCode = errorCode || 10004
    }
}
class NotFound extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.status = 404
        this.msg = msg || '资源未找到'
        this.errorCode = errorCode || 10000
    }
}
~~~

接下来需要书写令牌颁发相关代码，首先安装 `jsonwebtoken` ：

~~~js
npm install jsonwebtoken
~~~

然后，在 `util.js` 中编写令牌生成函数，`jwt` 的 `sign` 函数有三个参数，第一个参数是用来签名的对象，第二个参数是密钥，第三个参数是可配置参数，我将令牌的有效时间设置于此：

~~~javascript
//生成令牌
const generateToken = function (uid, scope) {
    const securityKey = global.config.security.securityKey
    const expiresIn = global.config.security.expiresIn
    const token = jwt.sign({
        uid,//用户id
        scope  //用户权限
    }, securityKey, {
        expiresIn: expiresIn
    })
    return token
}
~~~

其中的 `secretKey` 和 `expiresIn` 写在配置文件 `config.js` 中：

~~~javascript
    security:{
        securityKey:"0011aabbc",
        expiresIn:60*60
    },
~~~

`jwt` 原理：http://www.ruanyifeng.com/blog/2018/07/json_web_token-tutorial.html

## JWT令牌实现API访问控制

![1592274701785](F:\Study\GitStudyNote\KoaStudy\media\api访问与权限控制.png)

 在实际项目中，绝大多数的 `API` 都是非公开的，也就是需要授权才能获取，而且需要实现一次授权，多次获取。也就是说授予的权利有一定时效性。我们在这里使用  `jsonwebtoken` 包来实现 `token` 的分发与验证，从而实现服务端对客户端的访问控制。`jsonwebtoken` 包的安装与令牌的生成在上面已经做了详细的讲解，下面主要讲解令牌的验证以及对 `api` 的访问控制：

首先，需要写一个中间件来获取以及验证 `token`，在书写这个中间件时需要做到三步：

- 获取 `token` 需要使用 `basic-auth` 包
- `token` 无效的情况分为 `token` 不合法和 `token` 过期，需要分别抛出异常
- 通过验证之后，将 `uid` 和 `scope` 保存到 `ctx.auth` 中

~~~javascript
const basicAuth = require('basic-auth')
const jwt = require('jsonwebtoken')

class Auth {
    constructor() {
		
    }
    get m() {
        return async (ctx, next) => {
            const userToken = basicAuth(ctx.req)
            try {
                var decode = jwt.verify(userToken.name, 	                          global.config.security.securityKey)
            } catch (error) {
                if (error.name == 'TokenExpiredError') {
                    throw new global.errs.Forbbiden('token已过期')
                }
                throw new global.errs.Forbbiden('token不合法')
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
~~~

然后，我们在 `Auth` 中间件中使用到的 `Forbbiden` 异常类定义如下：

~~~JavaScript
class Forbbiden extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.status = 403
        this.msg = msg || '禁止访问'
        this.errorCode = errorCode || 10006
    }
}
~~~

再者，在 `router` 中，一个请求路径可以对应多个中间件，把编写的 `auth` 中间件放在业务逻辑中间件前面。

~~~javascript
const Router = require('koa-router')
const router = new Router({
    prefix:'/v1/classic'
})

const {
    Auth
} = require('../../../middlewares/auth')

router.get('/test', new Auth().m, async (ctx, next) => {
    ctx.body = ctx.auth.uid
})

module.exports = router
~~~

最后，在 `postman` 中发起请求时，选择 `Basic Auth`，填写 `Token`：

![1592100333567](F:\Study\GitStudyNote\KoaStudy\media\httpbasicauth.png)

## API权限分级控制

API权限分级控制大致的设计思路如下：

- 用户登录，系统生成令牌时，会根据不同用户设置不同的等级 scope
- 每一个 `api` 在使用 `Auth` 中间件时，会传入自身的级别
- 在 `Auth` 中间件中进行 `token` 检测时，会对 用户级别 和 `api` 级别进行比较，当用户级别大于 `api` 级别时，方可访问。

首先，在 `Auth` 类的构造函数中，定义几种用户级别，以及 `api` 级别：

~~~javascript
constructor(level) {
    this.level = level || 1
    Auth.USER = 8
    Auth.ADMIN = 16
    Auth.SUPER_ADMIN = 32
}
~~~

然后，在 `Auth` 类的 `m` 函数中进行 `api` 级别和 用户级别比较：

~~~javascript
if (decode.scope < this.level) {
    throw new global.errs.Forbbiden('用户权限不够')
}
~~~

最后，当 `api`  使用 `Auth` 中间件时，传入 `api` 等级：

~~~JavaScript
router.get('/test', new Auth(6).m, async (ctx, next) => {
    ctx.body = ctx.auth.uid
})
~~~

## 根据小程序openID登录系统

![1592277355804](F:\Study\GitStudyNote\KoaStudy\media\小程序openID登录.png)

![1592278547771](F:\Study\GitStudyNote\KoaStudy\media\openID登录系统.png)

首先，我们需要在配置文件  `config.js` 增加调用微信 `jscode2session` 接口的必要参数。这里总共有三个参数，其中 `loginUrl` 里面需要为 `appid` 和 `appSecret` ，以及 `code` 的真实值预留占位符:

~~~javascript
    wx:{
        appId:'',
        appSecret:'',
        loginUrl:`https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code`
    }
~~~

然后，在 `app` 目录下面新建一个文件夹 `service` ，在其中创建一个文件 `wxManager.js` ，文件中书写一个类 `wxManager` 。这个类的主要作用为根据appid、appsecret、code获取用户的openID，将openID存入数据库，然后再生成令牌。

~~~javascript
/*
    根据appid、appsecret、code获取用户的openID，将openID存入数据库，然后再生成令牌。
*/
const axios = require('axios')
const util = require('util')
const User = require('../models/user')
const {Auth} = require('../../middlewares/auth')
const {
    generateToken
} = require('../../core/util')

class wxManager {

    constructor(){
    }
    static async codeToToken(code) {
        const requestUrl = util.format(global.config.wx.loginUrl,
            global.config.wx.appId,
            global.config.wx.appSecret,
            code);
        var res = await axios.get(requestUrl);
        if (res.status !== 200) {
            throw new global.errs.Forbbiden('openId获取失败！')
        }
        if (res.data.errcode && res.data.errcode !== 0) {
            throw new global.errs.Forbbiden('openId获取失败:' + res.data.errcode)
        }
        let user = await User.getUserByOpenId(res.data.openid);
        if (!user){
           user = await User.registerByOpenId(res.data.openid);
        }
        return generateToken(user.id,Auth.USER)
    }
}

module.exports = {wxManager}
~~~

我们注意到，在 `wxManager` 类中，有两个模型方法，`getUserByOpenId` 、`registerByOpenId` ，这需要在 `User` 模型中定义：

~~~javascript
    static async getUserByOpenId(openid){
        const user = await User.findOne({
            where:{
                openid
            }
        })
        return user;
    }

    static async registerByOpenId(openid){
        return await User.create({
            openid
        })
    }
~~~

完成 `wxManager` 类及其辅助代码的编写之后，我们在路由文件 `token.js` 中扩展登录类型为 `USER_MINI_PROGRAM` 的代码：

~~~javascript
case LoginType.USER_MINI_PROGRAM:
    token = await wxManager.codeToToken(val.get('body.account'));
    break;
~~~

## 在小程序中使用npm

选择或者新建一个小程序项目。首先需要在终端中打开项目。你可以选择在微信开发者工具的项目目录的文件夹上，右键选择在终端中打开，或者是在文件资源管理器，项目所在目录的地址栏中输入 `cmd` 打开终端。

`npm` 初始化。初始化之后，项目根目录会增加一个 `package.json`，这是一个 `npm`包的索引文件，也可以看出说明文件，表明该项目安装了哪些 `npm`包。

~~~javascript
npm init
~~~

安装所需的 `npm`包：

~~~javascript
npm install lin-ui
~~~

执行成功后，会在根目录里生成项目依赖文件夹 `node_modules/lin-ui` （小程序IDE的目录结构里不会显示此文件夹）。 
然后用小程序官方IDE打开我们的小程序项目，找到 `工具` 选项，点击下拉选中 `构建npm` ，等待构建完成即可。

![1593307119215](F:\Study\GitStudyNote\KoaStudy\media\构建npm包.png)

出现上图所示的结果后，可以看到小程序IDE工具的目录结构里多出了一个文件夹 `miniprogram_npm`（之后所有通过 `npm` 引入的组件和 `js` 库都会出现在这里），打开后可以看到 `lin-ui` 文件夹，也就是我们所需要的组件。

![1593307168396](F:\Study\GitStudyNote\KoaStudy\media\检查npm包.png)

## 小程序登录验证

**使用组件**

在页面的 `json`文件中引入需要使用的组件

~~~javascript
{
  "usingComponents": {
    "l-button":"/miniprogram_npm/lin-ui/button/index"
  }
}
~~~

在  `wxml`中使用。第一个按钮为获取 `Token` 的按钮，其绑定一个方法，用以获取 `Token`。第二个控件为验证 `Token` 的按钮，用以验证获取到的 `Token`。

~~~javascript
<l-button l-class="btn" size="long" bind:lintap = "onGetToken">获取Token</l-button>
<l-button l-class="btn" size="long" bind:lintap = "onVerifiyToken">验证Token</l-button>
~~~

**获取 `Token`**

编写获取 `Token` 的代码。下面这段代码全是原始的微信 `api`调用代码，我们可以将其用 `promise` 封装，然后用 `async` 、`await`方式调用，这样看起来会更加简洁一些。

~~~javascript
  onGetToken(){
    wx.login({
      success: (result)=>{
        if (result.code) {
          //发起网络请求
          wx.request({
            url: 'http://localhost:3000/v1/token',
            method:'post',
            data: {
              account:result.code,
              type:100
            },
            success: (res)=>{
              console.log(res)
            },
            fail:(err)=>{
              console.log(err)
            }
          });
        } else {
          console.log('登录失败！' + res.errMsg)
        }        

      },
      fail: ()=>{
        console.log('code获取失败')
      },
    });
  }
~~~

**校验类**

编写一个校验类，校验规则只有一个，即为 `Token` 不能为空。

~~~javascript
class TokenEmptyValidator extends LinValidator{
    constructor(){
        super();
        this.token = [
            new Rule('isLength',"Token不允许为空",{
                min:1
            })
        ]
    }
}
~~~

**服务端验证函数**

参数校验通过之后，调用 `jwt` 的 `verify` 方法来验证令牌的合法性，如果令牌不合法则会进入异常。整个验证逻辑用`verifyToken` 函数来封装

~~~javascript
    static verifyToken(token){
        var decode = ''
        try{
            decode = jwt.verify(token, global.config.security.securityKey);
            return true;
        }catch(err){
            return false;
        }
    }
~~~

**VerifyToken 接口**

~~~javascript
router.post('/verify',async (ctx,next)=>{
    
    var v = await new TokenEmptyValidator().validate(ctx);
    let res = Auth.verifyToken(v.get("body.token"))
    ctx.body = {
        res:res,
        token:v.get("body.token")
    }
})
~~~

**小程序令牌验证请求函数**

~~~javascript
  onVerifiyToken(){
    let token = wx.getStorageSync('token')
    console.log(token)
    if (!token){
      return;
    }
    wx.request({
      url:"http://localhost:3000/v1/token/verify",
      method:"post",
      data:{
        token:token
      },
      success: (res)=>{
        console.log(res)
      },
      fail:(err)=>{
        console.log(err)
      }      
    })
  }
~~~

## 数据模型定义

**定义 Movie、Sentence、Music模型**

~~~javascript
const {
    Sequelize,
    Model
} = require('sequelize')
const {
    sequelize
} = require('../../core/db')

const classicFields = {
    image: Sequelize.String,
    content: Sequelize.String,
    pubdate: Sequelize.DATEONLY,
    favNums: Sequelize.INTEGER,
    title: Sequelize.String,
    type: Sequelize.TINYINT
}

class Movie extends Model {

}
Movie.init({
    classicFields
}, {
    sequelize,
    modelName: "movie",
    timestamps: false,
})

class Sentence extends Model {

}
Sentence.init({
    classicFields
}, {
    sequelize,
    modelName: "sentence",
    timestamps: false,
})

class Music extends Model {

}

const musicfields = Object.assign({
    url: Sequelize.String
}, classicFields)

Music.init({
    musicfields
}, {
    sequelize,
    modelName: "music",
    timestamps: false,
})

module.exports = {
    Movie,
    Sentence,
    Music
}
~~~

**定义 Flow 模型**

~~~javascript

~~~

