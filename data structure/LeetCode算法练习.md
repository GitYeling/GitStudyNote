# LeetCode算法练习

## 数组

### 从排序数组中删除重复项

给定一个排序数组，你需要在**原地**删除重复出现的元素，使得每个元素只出现一次，返回移除后数组的新长度。

不要使用额外的数组空间，你必须在**原地修改输入数组**并在使用 O(1) 额外空间的条件下完成。

**示例：**

~~~JavaScript
给定 nums = [0,0,1,1,1,2,2,3,3,4],
函数应该返回新的长度 5, 并且原数组 nums 的前五个元素被修改为 0, 1, 2, 3, 4。
你不需要考虑数组中超出新长度后面的元素。
~~~

**实现代码：**

~~~javascript
var removeDuplicates = function(num){
    var flag = 0
    for (var i=0;i<num.length;i++){
        if (num[flag] != num[i]){
            num[flag+1] = num[i]
            flag++
        }
    }
    console.log('删除后的数组长度为：' + (flag+1))
    for (var i=0;i<=flag;i++){
        console.log(num[i])
    }
}
var num = [0,1,1,1,2,2,3,3,4,6,9,11,12]
removeDuplicates(num)
~~~

### 两数之和

给定一个整数数组 `nums` 和一个目标值 `target`，请你在该数组中找出和为目标值的那 **两个** 整数，并返回他们的数组下标。

你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。

**示例：**

~~~JavaScript
给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。
你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。
~~~

**实现代码：**

~~~javascript
var twoSum = function(nums,target){
    for (var i=0;i<nums.length;i++){
        for (var j=i;j<nums.length;j++){
            if (nums[i] + nums[j] == target){
                return [i,j]
            }
        }
    }
}

var nums = [2,3,8,9,11,17,25,73]
var target = 81
var indexs = twoSum(nums,target)
console.log(indexs)
~~~

### 买股票的最佳时机

给定一个数组，它的第 *i* 个元素是一支给定股票第 *i* 天的价格。

设计一个算法来计算你所能获取的最大利润。你可以尽可能地完成更多的交易（多次买卖一支股票）。

**注意：**你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。

