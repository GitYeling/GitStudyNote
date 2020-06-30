# REM适配布局 + Less

## 思考

- 页面布局文字能否随着屏幕大小变化而变化?
- 流式布局和flex布局主要针对于宽度布局,那高度如何设置?
- 怎么样让屏幕发生变化的时候元素高度和宽度等比例缩放?

## 介绍

- em相对于父元素的字体大小来说的
- rem相对于html元素字体大小来说的
- rem的优点就是可以通过修改html里面的文字大小来改变页面中元素的大小可以整体控制

## 媒体查询

媒体查询( Media Query )是CSS3新语法。

- 使用@media查询，可以针对不同的媒体类型定义不同的样式
- @media可以针对不同的屏幕尺寸设置不同的样式
- 当你重置浏览器大小的过程中,页面也会根据浏览器的宽度和高度重新渲染页面
- 目前针对很多苹果手机、Android手机 ,平板等设备都用得到多媒体查询

![1591404347145](F:\Study\GitStudyNote\rem\media\1.png)

**语法规范：**

![1591404581787](F:\Study\GitStudyNote\rem\media\3.png)

- 用@media开头注意@符号
- mediatype媒体类型
- 关键字and not only
- media feature媒体特性必须有小括号包含

**mediatype查询类型**（将不同的终端设备划分成不同的类型,称为媒体类型)

![1591404716460](F:\Study\GitStudyNote\rem\media\4.png)

**关键字**（关键字将媒体类型或多个媒体特性连接到一起做为媒体查询的条件）

- and :可以将多个媒体特性连接到一起,相当于“且”的意思。
- not :排除某个媒体类型,相当于“非” 的意思,可以省略。
- only :指定某个特定的媒体类型,可以省略。

**媒体特性**（每种媒体类型都具体各自不同的特性,根据不同媒体类型的媒体特性设置不同的展示风格。我们暂且了解三个。注意他们要加小括号包含）

![1591404898114](F:\Study\GitStudyNote\rem\media\5.png)

**案例**：根据页面宽度改变页面背景颜色

思路分析:

>按照从大到小的或者从小到大的思路
>注意我们有最大值max-width和最小值min-width都是包含等于的
>当屏幕小于540像素，背景颜色变为艳(x<= 539 )
>当屏幕大于等于540像素并且小于等于969像素的时候背景颜色为绿色( 540=<x<= 969 )
>当屏幕大于等于970像素的时候,背景颜色为红绝( X>= 970 ) 

## 元素动态变化

- rem单位是跟着html来走的,有了rem页面元素可以设置不同大小尺寸
- 媒体查询可以根据不同设备宽度来修改样式
- 媒体查询+rem就可以实现不同设备宽度,实现页面元素大小的动态变化

![1591405854732](F:\Study\GitStudyNote\rem\media\7.png)

## 引入资源

- 当样式比较繁多的时候,我们可以针对不同的媒体使用不同stylesheets (样式表)。
- 原理就是直接在link中判断设备的尺寸,然后引用不同的css文件。

![1591406232312](F:\Study\GitStudyNote\rem\media\8.png)

## css使用的痛点

我们以前在css中编写可以复用的代码，大部分都是通过 **类**的方式来实现 如：

~~~css
.hidden{
  display: none;
}
.center-block{
  margin: 0 auto;
}
.text-center{
  text-align: center;
}
~~~

但是稍微碰到复杂一点的需求，就发现无法很好的解决了。如:

>不同颜色的外观

~~~css
.color1_outline{
  background-color: blue;
  border-top: 1px solid blue;
  box-shadow: 0 0 1px 1px blue;
}
.colo2r_outline{
  background-color: red;
  border-top: 1px solid red;
  box-shadow: 0 0 1px 1px red;
}
~~~

可以看到，上述的两个类，只是颜色名不一样，剩下的代码其实是一样的，但是却无法很好的维护这段代码。

又或者如:

>多个盒子中的背景位置 等比例变化

~~~css
.box1{
  background-position: 10px 10px;
}
.box2{
  background-position: 20px 20px;
}
.box3{
  background-position: 30px 30px;
}
.box4{
  background-position: 40px 40px;
}
......box5
~~~

可以看到，以上代码是存在同样的规律的，有编程思维的人瞬间就想到 使用**循环**来处理，可惜 `css` 不支持！

## css中的变量

css其实也可以像`JavaScript`一样，支持变量的功能的！

>IE和 Opera 不支持

### 初体验

1. 声明变量 使用 `--` 关键字
2. 调用变量 使用 `var()` 函数

~~~css
div {
    width: 200px;
    height: 200px;
    /* 声明变量 */
    --color: red;
    /* 使用变量 必须放在var函数内 */
    background-color: var(--color);
}
~~~

### 带默认参数

在使用变量时，如果变量不存在，可以带上默认参数

~~~css
div {
    height: 500px;
    /* 默认参数  200px */
    padding-top: var(--padding-top,200px);
    /* 默认参数 10px solid red */
    border: var(--border, 10px solid red);
    /* 默认参数  linear-gradient(yellow,red) */
    background-image: var(--img,linear-gradient(yellow,red));
}
~~~

### 变量拼接

css变量还可以进行拼接使用，如

~~~css
div {
    height: 500px;
    /* 直接拼接 */
    border: var(--b, 1px) solid red;
}

div::after {
    --title: "我的页面";
    /* 字符串拼接 */
    content: var(--title) '二〇一九年五月三十日 18:15:24';
}
~~~

### 作用域

作用域可以简单理解为 css中的层叠，如：

`common.css`

~~~css
body{
  --color:red;
}
~~~

`index.css`

~~~css
body{
  background-color: var(--color);
}
~~~

## less 预处理器

Less 是一门 CSS 预处理语言，它扩展了 CSS 语言，增加了变量、Mixin、函数等特性，使 CSS 更易维护和扩展。

> 其他的还有 sass stylues

### 技术介绍

我们主要来讲解`less`中的以下技术，掌握以下技术可以让我们再去写 css代码时，速度将得到一个质的提升。

1. 变量 `variable`
2. 混合 `mixin`
3. 嵌套
4. 循环 `loop`

### less的执行过程

1. 编写符合`less`语法的`less`文件

2. 使用工具将`less`文件编译成对应的css文件

   `vscode`中 下载 `easy less` 插件 即可

   ![1591429057964](F:\Study\GitStudyNote\rem\media\9.png)

3. 页面中引入 编译好的`css`文件

### 变量*

变量就相当于一个盒子，只要箱子里的东西被改变了，那么谁用到了的这个箱子，都得跟着一起改变。

~~~ css
// 声明变量 @变量名:值;
@color:red;

// 使用变量
body{
  background: @color;
}
~~~

如果要是用另一个less文件中的变量，则需要先导入：

`common.less`

~~~css
@color:red;
~~~

`index.less`

~~~css
@import "common.less";

body{
    color:@color;
}
~~~

### mixin

可以理解为自定义函数，提供了强大的代码段的复用功能

1. 声明混合 使用 `.`关键字
2. 使用混合 直接 `.混合名()` 即可

~~~css
/* 1 声明函数 @c为参数 black 为默认值  */
.changeColor(@c:black){
  background-color: red;
  color: red;
  border: 1px solid @c;
  font-size: 100px;
}

/* 2 使用函数 */
div{
  .changeColor(yellow);
   width:100px;
}
~~~

### 嵌套*

嵌套为 less中尤为重要的知识，提供了很简洁操作 同层级元素的语法。

> p a 为 div的子元素，p a 是同层级的关系

~~~css
div{
  background-color: red;
  p{
    background-color: blue;
  }
  >a{
    color: olive;
  }
}
~~~

### 循环Loop

> 需要注意的是，less中的循环，底层是通过递归来实现的！所以，可能需要多花一点时间去研究。

可以很方便为我们生成如下有规律的代码段

~~~css
.box1{
  background-position: 10px 10px;
}
.box2{
  background-position: 20px 20px;
}
.box3{
  background-position: 30px 30px;
}
.box4{
  background-position: 40px 40px;
}
~~~

**使用**

~~~css
/* 1 定义循环函数 */
.loop(@counter) when (@counter > 0) {
  /* 2 钻进去 3 2 1 */
  .loop((@counter - 1));
  /* 3 钻出来 1 2 3 */
  .box@{counter} {
    background-position: @counter*10px @counter*10px;
  }
}

.loop(3);
~~~

### 运算*

任何数字、颜色或者变量都可以参与运算。就是Less提供了加(+)、减(-)、乘(*)、除(/)算术运算。

**注意：**

- 乘号(*)和除号(/ )的写法
- 运算符中间左右有个空格隔开1px+ 5
- 对于两个不同的单位的值之间的运算，运算结果的值取第一个值的单位
- 如果两个值之间只有一个值有单位，则运算结果就取该单位

## rem适配方案

**目标：**

1. 让一些不能等比自适应的元素，达到当设备尺寸发生改变的时候，等比例适配当前设备。
2. 使用媒体查询根据不同设备，按比例设置html的字体大小，然后页面元素使用rem做尺寸单位，当html字体大小变化元愫尺寸也会发生变化，从而达到等比缩放的适配。

**实际开发适配方案：**

1. 按照设计稿与设备宽度的比例，动态计算并设置html根标签的font-size大小； 
2. ( 媒体查询)CSS中，设计稿元素的宽、高、相对位置等取值，按照同等比例换算为rem为单位的值；

![1591430508247](F:\Study\GitStudyNote\rem\media\10.png) 

**技术方案一**

- less
- 媒体查询
- rem

**技术方案二（推荐）**

- less
- flexible.js

## 方案一：rem+媒体查询+less技术

**设计稿常见尺寸宽度**

![1591489649151](F:\Study\GitStudyNote\rem\media\11.png)

一般情况下,我们以一套或两套效果图适应大部分的屏幕 ，放弃极端屏或对其优雅降级,牺牲-些效果现在基本以750为准。

**动态设置html标签 font-size 大小**

1. 假设设计稿是750px
2. 假设我们把整个屏幕划分为15等份(划分标准不一，可以是20份，也可以为10等份)
3. 每一份作为html字体大小，这里就是50px
4. 那么在320px设备的时候，字体大小为320/15就是21.33px
5. 用我们页元素的大小除以不同的html字体大小会发现他们比例还是相同的
6. 比如我们以750为标准设计稿
7. 一个100*100像素的页面元素在750屏幕下，就是100/ 50转换为rem是2rem * 2 rem比例是1比1 
8. 320屏幕下，html 字体大小为21.33，则2rem = 42.66px 此时宽和高都是42.66，此时宽和高的比例还是1比1
9. 但是已经能实现不同屏幕下页面元素盒子等比例缩放的效果

:heart:**苏宁首页：**m.suning.com

### 项目初始化

**技术选型**

> 方案:我们采取单独制作移动页面方案
> 技术：布局采取rem适配布局（less + rem + 媒体查询）
> 设计图:本设计图采用750px设计尺寸

**搭建相关文件夹结构**

![1591490821897](F:\Study\GitStudyNote\rem\media\12.png)

**设置视口标签以及引入初始化样式**

![1591490881149](F:\Study\GitStudyNote\rem\media\13.png)

**设置公共common.less文件**

1. 新建common.less

2. 设置好最常见的屏幕尺寸， 利用媒体查询设置不同的html字体大小,因为除了首其他倾面也需要

3. 我们关心的尺有320px、360px、 375px、 384px、 400px、 414px、 424px、 480px、 540px、 720px、

   750px划分的份数我们定为15等份

4. 因为我们pc端也可以打开我们苏宁移动端首页，我们默认html字体大小为50px ，**注意这句话写到最上面**

**新建index.less文件**

1. 新建index.less，在该文件里面写首页的样式

2. 将刚才设置好的common.less弓|入到index.Iess里面语法如下:

   ![1591491548114](F:\Study\GitStudyNote\rem\media\14.png)

3. 生成index.css 弓|入到index.html里面

### 头部搜索栏制作



## 方案二：rem+flexible.js

**flexible.js原理**

- 手机淘宝团队出的简洁高效移动端适配库
- 我们再也不需要在写不同屏幕的媒体查询，因为里面js做了处理
- 它的原理是把当前设备划分为10等份，但是不同设备下，比例还是一致的。
- 我们要做的，就是确定好我们当前设备的html字大小就可以了
- 比如当前设计稿是750px，那么我们只需要把html文字大小设为75px(750px/ 10)就可以
- 里页面元素rem值：页面元素的px值/ 75
- 剩余的，让flexible.js来去算

github地址: https://github.com/amfe/lib-flexible

**技术选型**

> 方案：我们采取单独制作移动页面方案
> 技术：布局采取rem适配布局2 ( flexible.js + rem )
> 设计图：本设计图采用750px设计尺寸

**搭建相关文件夹**

![1591493704191](F:\Study\GitStudyNote\rem\media\15.png)

**设置视口标签、引入初始化样式和js文件**

![1591493746322](F:\Study\GitStudyNote\rem\media\16.png)

![1591493841987](F:\Study\GitStudyNote\rem\media\17.png)

**设置body样式**

~~~css
body {
    min-width: 320px;
    width: 15rem;
    margin: 0 auto;
    line-height: 1.5;
    font-family: Arial, Helvetica;
    background: #F2F2F2;
}
~~~

