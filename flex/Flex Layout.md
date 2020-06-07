# Flex布局

## Flex布局特点

- 操作方便,布局极为简单,移动端应用很广泛
- PC端浏览器支持情况较差
- IE 11或更低版本，不支持或仅部分支持

**建议：**

- 如果是PC端页面布局,我们还是传统布局
- 如果是移动端或者不考虑兼容性问题的PC端页面布局,我们还是使用flex弹性布局

**初体验：**

![1586566817740](F:\Study\GitStudyNote\flex\images\001.png)

## 布局原理

flex是flexible Box的缩写，为“弹性布局” ，用来为盒状模型提供最大的灵活性,任何一个容器都可以
指定为flex布局。

- 当我们为父盒子设为flex布局以后，元素的float、clear 和vertical-align属性将失效。
- 伸缩布局 = 弹性布局 = 伸缩盒布局 = 弹性盒布局 = flex布局

采用Flex布局的元素，称为Flex容器( flex container) ，简称"容器"。它的所有子元素自动成为容
器成员，称为Flex项目( flex item ) ，简称"项目"。

- 体验中div就是flex父容器。
- 体验中span就是子容器flex项目。
- 子容器可以横向排列也可以纵向排列。

![1586567129698](F:\Study\GitStudyNote\flex\images\002.png)

**总结flex布局原理:**

- 就是通过给父盒子添加flex属性,来控制子盒子的位置和排列方式

## 常见父项属性

**以下由6个属性是对父元素设置的：**

- flex- direction ：设置主轴的方向
- justify-content ：设置主轴上的子元素堆放方式
- flex-wrap ：设置子元素是否换行
- align-content ：设置侧轴上的子元素的排列方式(多行)
- align-items ：设置侧轴上的子元素排列方式(单行)
- flex-flow ：复合属性，相当于同时设置了flex-direction和flex-wrap

**:heart: flex-direction设置主轴的方向**

在flex布局中，是分为主轴和侧轴两个方向，同样的叫法有：行和列、x轴和y轴

- 默认主轴方向就是x轴方向，水平向右
- 默认侧轴方向就是y轴方向，水平向下

![1586568230196](F:\Study\GitStudyNote\flex\images\003.png)

flex- direction属性决定主轴的方向（即项目的排列方向）
注意：主轴和侧轴是会变化的，就看`flex -direction`设置谁为主轴，剩下的就是侧轴。而我们的子元素是跟着主轴来排列的。

![1586568576635](F:\Study\GitStudyNote\flex\images\004.png)

**:heart: justify-content设置主轴上的子元素堆放方式**

justify-content属性定义了项目在主轴上的对齐方式
注意:使用这个属性之前一定要确定好主轴是哪个

![1586569374648](F:\Study\GitStudyNote\flex\images\005.png)

**:heart:flex-wrap设置子元素是否换行**

默认情况下,项目都排在一条线(又称”轴线”) 上。flex-wrap属性定义 , flex布局中默认是不换行的。

![1586569889383](F:\Study\GitStudyNote\flex\images\006.png)

**:heart:align-items设置侧轴上的子元素排列方式(单行)**

该属性是控制子项在侧轴（默认是y轴）上的排列方式在子项为单项的时候使用

![1586570035819](F:\Study\GitStudyNote\flex\images\007.png)

**:heart:align-content设置侧轴上的子元素的排列方式（多行）**

如何实现下图效果？

![1590058224835](F:\Study\GitStudyNote\flex\images\1590058224835.png)

设置子项在侧轴上的排列方式并且只能用于子项出现换行的情况(多行) ，在单行下是没有效果的。

![1586570344854](F:\Study\GitStudyNote\flex\images\008.png)

align-content和align-items区别

- align-items适用于单行情况下，只有上对齐、下对齐、居中和拉伸
- align-content适应于换行(多行)的情况下(单行情况下无效)，可以设置上对齐、下对齐、 居中、拉伸以及平均分配剩余空间等属性值。
- 总结就是单行找align-items多行找align-content

![1586572015894](F:\Study\GitStudyNote\flex\images\009.png)

**:heart:flex-flow**

flex-flow属性是flex-direction和flex-wrap属性的复合属性

```css
flex-flow: row wrap;
```

以上六种父项的属性，总结起来就三类：

- 设置主轴方向；
- 设置主、侧轴排列方式；
- 是否换行；

## 子项常见属性

- flex子项目占的份数
- align-self控制子项自己在**侧轴**的排列方式
- order属性定义子项的排列顺序（前后顺序）