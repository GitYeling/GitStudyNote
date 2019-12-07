# Bootstrap的使用

## 响应式开发 ##

### 响应式开发原理 ###

就是使用媒体查询针对不同宽度的设备进行布局和样式的设置，从而适配不同设备。

|        设备划分        |      尺寸区间      | 设置宽度 |
| :--------------------: | :----------------: | :------: |
|    超小屏幕（手机）    |       <768px       |   100%   |
|    小屏设备（平板）    | >=768px  ~   992px |  750px   |
| 中等屏幕（桌面显示器） | >=992px ~ <1200px  |  970px   |
| 宽屏设备（桌面显示器） |      >=1200px      |  1170px  |

### 响应式布局容器 ###

响应式需要一个父级作为容器，来配合子级元素来实现变化效果。

原理就是在不同屏幕下，通过媒体查询来改变这个布局容器的大小，再改变里面子元素的排列方式和大小，从而实现不同屏幕下，看到不同的页面布局和样式变化。

**案例：**响应式导航。

*需求分析：*

- 当我们屏幕大于等于768像素时，我们给布局容器container宽度设置为750px。
- container里面包含8个li盒子，每个盒子的宽度定为93.75px(750/8)，高度为30px，浮动一行显示。
- 当我们屏幕缩放，宽度小于768像素时，container盒子宽度修改为100%宽度。
- 此时里面的8个li，宽度修改为33.33%，这样一行就只能显示3个li，剩余的下行显示。

## Bootstrap的使用 ##

### Bootstrap简介 ##

<center class='third'>
    <img src='C:\Users\Wan\AppData\Roaming\Typora\typora-user-images\1574232759196.png' width="200px" height="200px" align="center">
    <img src='C:\Users\Wan\AppData\Roaming\Typora\typora-user-images\1574233545132.png' width="200px" height="200px" align="center">
    <img src='C:\Users\Wan\AppData\Roaming\Typora\typora-user-images\1574233343415.png' width="250px" height="200px" align="center"></center>

Bootstrp来自于Twitter，是基于HTML、CSS和JavaScript的，它简洁灵活，使得Web开发更加便捷。

推荐使用：https://www.bootcss.com/

### Bootstrap的使用 ###

控制权在框架本身，使用者要按照框架所规定的某种规范进行开发

Bootstrap使用四部曲：

- **创建文件夹结构 **
- **创建HTML骨架结构**
- **引入相关样式文件**
- **书写内容**

书写内容：

- 直接拿bootstrap预先定义好的样式来使用
- 修改bootstrap原来的样式，注意权重
- 学好bootstrap的关键在于知道它**定义了哪些样式，以及这些样式能实现什么样的效果**

### bootstrap布局容器 ###

bootstrap需要为页面内容和栅格系统包裹一个容器，bootstrap预先定义好了这个类，叫.container，它提供了两个作此用处的类。

**container类：**

- 响应式布局的容器，固定宽度

- 大屏（>=1200px）宽度定为1170px
- 中屏（>=992px）宽度定为970px
- 小屏(>=768px) 宽度定为750px
- 超小屏（100%）

**container-fluid类：**

- 流式布局容器  百分百宽度
- 占据全部视口（viewport）的容器
- 适合于单独做移动开发

### bootstrap栅格系统 ###

栅格系统也称网格系统，它是指将页面划分为等宽的列，然后通过列数的定义来模块化页面布局。

bootstrap的栅格系统统一吧页面分成了12列，实际上是把container划分成了12列。

![1574521649226](C:\Users\Wan\AppData\Roaming\Typora\typora-user-images\1574521649226.png)

​	

|           设备           |   尺寸   | 类前缀  |
| :----------------------: | :------: | :-----: |
|       平板（小屏）       | >=576px  | col-sm- |
|    桌面显示器（中屏）    | >=768px  | col-md- |
|   大桌面显示器（大屏）   | >=992px  | col-lg- |
| 超大桌面显示器（超大屏） | >=1200px | col-xl- |

- 行（row）必须放到container布局容器里面
- 我们实现列的平均划分，需要给列添加**类前缀 **
- sm-small:小；md-medium:中等；lg-large:大；
- 列（column）大于12，多余的列所在的元素将被作为一个整体另起排列。
- 每一container默认有左右15像素的padding
- 可以同时为一列指定多个设备的类名，以便划分不同份数，例如class="col-md-4   col-sm-6"

**案例1：**创建等宽响应式列（在移动设备（小于768px的设备）上浏览时，所有的列会上下堆叠显示）

**案例2：**创建不等宽响应式列（大屏成比例，小屏堆叠）

**案例3：**桌面设备（两列各占50%）、平板（左右占比1:3）、手机（堆叠显示）

### 列偏移 ###

偏移列通过 **col-md-offset-3** **（Bootstrap4：offset-\*-\*）** 类来设置。第一个星号( * )可以是 **sm、md、lg、xl**，表示屏幕设备类型，第二个星号( * )可以是 **1** 到 **11** 的数字。

设置列偏移时，同样需要设置占比（col-md-XX）

### 列嵌套 ###

嵌套列的父元素又分成12等份，在嵌套列的外层需要加上row，以取消父元素的padding值。

### 响应式工具 ###

为了加快移动设备友好开发工作，利用媒体查询功能，并使用这些工具类可以方便的针对不同设备展示或隐藏页面内容。

**Bootstrap3**

![1574247579347](C:\Users\Wan\AppData\Roaming\Typora\typora-user-images\1574247579347.png)

与之相反的，是visible-xs、visible-sm 、visible-md、visible-lg

**Bootstrp4**

https://getbootstrap.com/docs/4.0/utilities/display/

## 阿里百秀首页案例 ##

### 需求分析 ###

**技术选型 **

- 方案：采用响应式页面开发方案
- 技术：bootstrap框架
  - 设计图：设计图采用1280px设计尺寸

**页面分析**

![1574251392300](C:\Users\Wan\AppData\Roaming\Typora\typora-user-images\1574251392300.png)![1574251418929](C:\Users\Wan\AppData\Roaming\Typora\typora-user-images\1574251418929.png)

列划分：2、7、3

**屏幕划分分析**

1、屏幕缩放发现，**中等屏幕和大屏幕布局是一致的**。因此我们的列定义为 col-md- 就可以了，md是大于等于970以上的

2、屏幕缩放发现，**小屏幕的布局发生改变**，因此我们需要为小屏幕根据需求改变布局

3、屏幕缩放发现，**超小屏幕又发生变化**，因此我们需要为超小屏幕根据需求改变布局

4、**策略：**我们先布局md以上的pc端布局，最后根据实际需求再修改小屏幕和超小屏幕的特殊布局样式

### 前期准备工作 ###

**1、创建文件夹结构**

![1574252264527](C:\Users\Wan\AppData\Roaming\Typora\typora-user-images\1574252264527.png)

**2、放入bootstrap文件**

![1574252501576](C:\Users\Wan\AppData\Roaming\Typora\typora-user-images\1574252501576.png)

**3、创建HTML骨架结构**

- 引入bootstrap文件
- 引入我们自己的首页样式文件
- 测试是否引入成功

```javascript
    <link rel="stylesheet" href="bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="css/index.css">
```

### 阿里百秀logo制作 ###

>插入logo
>
>解决padding-left问题
>
>实现等比缩放

### nav制作引入字体图标 ###

>设置nav背景色和底部边框
>
>去除小圆点、下划线、设置hover
>
>添加文字，设置字体大小和padding-left
>
>添加图标，设置图标垂直居中

### news制作 ###

>使用ul将布局设置好
>
>每个li内部包好一个a标签，a标签内部有img和p
>
>调整第一个li中的内容
>
>调整后4个li

### publish模块制作 ###

### aside模块制作 ###

### logo响应式制作 ###

>在小屏幕中，图片不缩放，保持原尺寸
>
>在超小屏幕中，取而代之的是“阿里百秀”四个字

### nav响应式制作 ###

> 进入小屏幕和超小屏幕时，nav中的li浮动起来，并且宽度为20
>
> 进入超小屏幕时，nav文字会变成14px

### news响应式制作 ###

>news模块在小屏幕和超小屏幕时，需要设置一个margin-top
>
>超小屏幕中，第一个li宽度为100%，其余的各占50%

### publish响应式制作 ###

> 超小屏幕下，所有的文章，仅保留标题和阅读评论。
>
> 超小屏幕下，标题字号改为14px。

## 移动端主流方案 ##

###  移动端主流方案 ###

**单独制作移动端页面（主流）**

京东商城手机版

淘宝触屏版

苏宁易购手机版

......

**响应式页面兼容移动端（其次）**

三星手机官网

......

### 移动端技术选型 ###

**流式布局（百分比布局）**

**flex弹性布局（推荐）**

**rem适配布局（推荐）**

**响应式布局**

建议：选择一种作为主要技术选型，其他技术作为辅助的混合技术开发。





