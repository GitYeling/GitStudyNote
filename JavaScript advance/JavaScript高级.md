#	JavaScript高级 #

## 构造函数和原型 ###

### 构造函数原型对象prototype ###

**构造函数的问题**

构造函数很好用，但是存在着浪费内存的问题。

**prototype**

构造函数通过原型分配的函数是所有对象所**共享的**。

JavaScript规定，每一个构造函数都有一个**prototype**属性，指向另一个对象。注意，这个prototype就是一个对象，这个对象的所有属性和方法，都会被构造函数所拥有。

:heart:我们可以把那些不变的方法，直接定义在prototype对象上，这样所有对象的实例就可以共享这些方法。

:heart:一般情况下，我们公共属性定义到构造函数里面，公共的方法我们放到原型对象身上。

*问：原型是什么？*

*问：原型的作用是什么？*

**对象原型proto（前后省略各两个下划线）**

对象都会有一个属性 proto指向构造函数的prototype原型对象，之所以我们对象可以使用构造函数prototype原型对象的属性和方法，就是因为对象有proto原型的存在。

~~~javascript
console.log(zhangsan.__proto__ === Student.prototype)
~~~

*方法的查找规则：*

> 首先看对象身上有没有某个方法，如果有就执行
>
> 否则通过__proto__去原型对象prototype里查找

### 构造函数 ###

**对象原型（proto）**和**构造函数原型对象（prototype）**里面都有一个**constructor**属性，constructor我们称为构造函数，因为它指回构造函数本身。

constructor主要用于记录该对象引用于哪一个构造函数，它可以让原型对象重新指向原来的构造函数。

很多时候，我们会修改原来的原型对象，给原型对象赋值的是一个对象，则我们需要手动的利用constructor这个属性，指回原来的构造函数。

### 构造函数、实例和原型对象三者之间的关系 ###

![1575284519843](C:\Users\Wan\AppData\Roaming\Typora\typora-user-images\1575284519843.png)

### 原型链 ###

![1575284699686](C:\Users\Wan\AppData\Roaming\Typora\typora-user-images\1575284699686.png)

### 对象成员查找规则 ###

- 当访问一个对象的属性（包括方法）时，首先查找这个**对象自身**有没有该属性
- 如果没有就查找它的原型（也就是proto指向的**prototype原型对象**）
- 如果还没有就查找原型对象的原型（**Object的原型对象**）
- 依次类推一直找到Object为止（**null**）

### 原 型对象this指向 ###

在构造函数里面的this，指向的是实例对象

原型对象函数里面的this指向的也是实例对象

### 扩展内置对象 ###

可以通过原型对象，对原来的内置对象进行扩展自定义方法。比如给数组增加自定义求偶数和的功能

注意：数组和字符串内置对象不能给原型对象覆盖操作 Array.prototype = {} ，只能是Array.prototype.xxx = function(){}的方式。

### Call方法的作用 ###

ES6之前并没有给我们提供extends继承。我们可以通过**构造函数+原型对象**模拟实现继承，被称为**组合继承**。

**Call()**

调用这个函数，并且修改函数运行时的this指向

~~~javascript
fun.call(thisArg,arg1,arg2,...)
~~~

- thisArg：当前调用this的指向对象
- arg1，arg2：传递的其他参数

### 利用父构造函数继承属性

~~~JavaScript
// 父构造函数
function Father(uname,age){
    // this指向父构造函数的对象实例
    this.uname = uname;
    this.age = age;
}

// 子构造函数
function Son(uname,age,score){
    // this 指向子构造函数的对象实例
    Father.call(this,uname,age);
    this.score = score;
}
var son =  new Son('刘德华',18,100)；
console.log(son)；
~~~

### 利用原型对象继承父类方法



