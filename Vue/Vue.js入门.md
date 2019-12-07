#  Vue.js入门 #

## Vue基础 ##

### 简介 ###

- JavaScript框架
- 简化DOM操作
- 响应式数据驱动

### 第一个Vue程序 ###

- 导入**开发版本**的vue.js

  ~~~javascript
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  ~~~

- 创建Vue实例对象，设置**el**属性和**data**属性

- 使用简洁的**模板语法**把数据渲染到页面上

### el挂载点 ###

el是用来设置Vue实例挂载（管理）的元素

**问题：**

- Vue实例的作用范围是什么呢？

  Vue会管理el选项**命中的元素**及其内部的**后代元素**

- 是否可以使用其他选择器？

  可以使用其他的选择器，但是建议使用**ID选择器**

- 是否可以设置其他的DOM元素？

  可以使用其他的双标签，不能使用HTML和body

### data数据对象 ###

- Vue中用到的数据定义在**data**中
- data中可以写**复杂类型**数据
- 渲染复杂类型数据时，遵守js的**语法**即可

## 本地应用 ##

本章主要通过一些案例来学习vue指令。

主要有：内容绑定、事件绑定；显示切换、属性绑定；列表循环，表单元素绑定。

Vue指令指的是，以**v-**开头的一组特殊语法

### v-text、v-html和插值表达式  ###

### v-on ###

**案例：**计数器

![image-20191128222347757](C:\Users\Zhang's member\AppData\Roaming\Typora\typora-user-images\image-20191128222347757.png)

- **v-on**指令可以传递参数。

  事件绑定的方法写成**函数调用**的形式，可以传入自定义参数

  定义方法时，需要定义形参来接收传入的实参

- **v-on**指令可以添加事件修饰符

  事件的后面跟上**.修饰符**可以对事件进行限制

  **.enter**可以限制触发的按键为回车

  事件修饰符有多种，api文档： https://cn.vuejs.org/v2/api/ 


### v-show、v-if 和 v-bind ###

操作频繁时用v-show，反之用v-if

**案例：**图片切换

![image-20191129165507025](C:\Users\Zhang's member\AppData\Roaming\Typora\typora-user-images\image-20191129165507025.png)

*分析：*

>定义图片数组
>
>添加图片索引
>
>绑定src属性
>
>图片切换逻辑
>
>显示状态切换

### v-for ###

根据数据生成列表结构，数组经常和 **v-for**结合使用

 使用 **v-for** 指令不仅可以循环 **普通变量数组**，还可以循环**对象数组**

语法是  **(item,index) in arr**

**item** 和 **index**可以结合其他指令一起使用

数组长度的更新会同步到页面上，是响应式的

### v-model ###

获取和设置 **表单元素** 的值（双向数据绑定）

- **v-model**指令的作用是便捷的设置和获取表单元素的值
- 绑定的数据会和表单元素**值**相关联
- 绑定的数据**<一一>**表单元素的值

### 记事本--案例分析 ###

**静态样式：**

![image-20191129191647386](C:\Users\Zhang's member\AppData\Roaming\Typora\typora-user-images\image-20191129191647386.png)

**功能划分：**

![image-20191129140907081](C:\Users\Zhang's member\AppData\Roaming\Typora\typora-user-images\image-20191129140907081.png)

### 记事本--新增 ###

*分析：*

>生成列表结构（v-for，数组）
>
>获取用户输入（v-model）
>
>回车，新增数据（v-on，.enter添加数据）

### 记事本--删除 ###

> 数据改变，和数据绑定的元素**同步**改变
>
> 事件的自定义参数
>
> **splice**方法的作用

### 记事本--统计 ###

统计信息个数（v-text,length）

### 记事本--清空 ###

点击清楚所有信息（v-on）

### 记事本--隐藏 ###

没有数据时，隐藏底部栏（v-show，v-if）

![image-20191129201938163](C:\Users\Zhang's member\AppData\Roaming\Typora\typora-user-images\image-20191129201938163.png)

### 记事本--总结 ###

- 列表可以通过**v-for**指令结合数据生成
- **v-on**结合事件修饰符可以对事件进行限制，比如**.enter**
- **v-on**在绑定事件时可以传递自定义参数
- 通过**v-model**可以快速的设置和获取表单元素的值
- 基于数据的开发方式

## 网络应用 ##

### 介绍 ###

本章讲解Vue结合网络数据开发应用。主要分为三部分：

- 讲解网络请求库 ——**axios**
- 如何让 **axios** 和**Vue **结合起来
- 通过一个天气预报案例来巩固所学内容

### 网络应用--axios基本使用

强大的网络请求库。将如下代码拷贝至你的页面上，在保持联网的状态下就可以使用了。

~~~javascript
 <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
~~~

书写格式：

~~~javascript
get请求：
	axios.get(地址?kay=value&key2=values).then(function(response){},function(err){})
post请求：
	axios.post(地址,{key:value,key2:value2}).then(function(response){},function(err){})
~~~

以下是两个网络接口：

| 请求地址                            | 请求方法 | 请求参数 | 响应内容 |
| ----------------------------------- | -------- | -------- | -------- |
| https://autumnfish.cn/api/joke/list | get      | num      | 随机笑话 |

​	参数说明：**num：** 笑话条数

| 请求地址                           | 请求方法 | 请求参数 | 响应内容       |
| ---------------------------------- | -------- | -------- | -------------- |
| https://autumnfish.cn/api/user/reg | post     | username | 注册成功或失败 |

​	参数说明：**username：**用户名（不能为空）



**小结：**

> axios必须先导入才可以使用
>
> 使用get或者post方法即可发送对应的请求
>
> then方法中的回调函数会在请求成功或失败的时候触发
>
> 通过回调函数的形参可以获取响应内容，或错误信息

**文档传送门：**https://github.com/axios/axios

### 网络应用--axios结合Vue ###

**注意点：**

**axios**回调函数中的**this**已经改变，无法访问到data中数据

> 把**this**保存起来，回调函数中直接使用保存的**this**即可
>
> 和本地应用最大的区别就是改变了**数据来源**

### 网络应用--介绍 ###

![image-20191130084757099](C:\Users\Zhang's member\AppData\Roaming\Typora\typora-user-images\image-20191130084757099.png)

![image-20191129130221510](C:\Users\Zhang's member\AppData\Roaming\Typora\typora-user-images\image-20191129130221510.png)

**API:**

| 请求地址                              | 请求方法 | 请求参数 | 响应内容           |
| ------------------------------------- | -------- | -------- | ------------------ |
| http://wthrcdn.etouch.cn/weather_mini | get      | city     | 今后五天的天气情况 |

### 网络应用--回车查询 ###

![image-20191129131015537](C:\Users\Zhang's member\AppData\Roaming\Typora\typora-user-images\image-20191129131015537.png)

**注意：**

- 应用的逻辑代码建议和页面**分离**，使用单独的js文件编写
- **axios**回调函数中this指向改变了，需要额外保存一份
- 服务器返回的数据比较复杂，获取的时候需要注意**层级**结构

### 网络应用--点击查询 ###

![image-20191129134245571](C:\Users\Zhang's member\AppData\Roaming\Typora\typora-user-images\image-20191129134245571.png)

**注意：**

- 自定义参数可以让代码的**复用性**更高
- **method**中定义的方法内部，可以通过**this**关键字点出其他的方法

