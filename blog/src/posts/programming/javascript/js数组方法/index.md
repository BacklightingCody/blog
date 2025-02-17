---
title: js 数组方法
description: >-
  本文详细介绍了 JavaScript 中常见的数组方法，包括它们的使用场景和实际应用。在学习 React
  等框架时，掌握数组的操作尤为重要，因为它涉及到不可变数据的管理和状态的更新。通过这篇文章，你将更深入地理解数组方法的作用，并能在实际开发中灵活运用它们。
editLink: true
date: 2025-02-17T00:00:00.000Z
tag:
  - js
id: 52dca66a3d97fadc945f31b0e77e4187
---
[[toc]]

## 引言

在 JavaScript 中，数组是非常常用的一种数据结构，而对数组进行操作，则需要熟练掌握多种原生方法。在现代前端框架（如 React）中，数据不可变性是一个重要的概念，处理不可变数据离不开对数组的操作，例如创建一个新数组、过滤数据或者排序数组等。

例如，当我们使用 React 的状态管理时，经常需要基于当前状态创建一个全新的状态，而不能直接修改原数组。此时，我们需要对数组方法有一个清晰的认知和正确的使用方法。

本文将全面总结 JavaScript 中的数组方法，并分析它们的使用场景，同时结合不可变数据管理的实践，帮助你在日常开发中更高效地处理数组操作。

## 数组方法详解

### 基础操作方法

push() / pop()：在数组末尾添加/移除元素。
unshift() / shift()：在数组开头添加/移除元素。

```js
// push
const animals1 = ["pigs", "goats", "sheep"];
const count1 = animals1.push("cows");
console.log(animals1,count1);// ['pigs', 'goats', 'sheep', 'cows'],4

// pop
const animals2 = ["pigs", "goats", "sheep"];
const animial2 = animals2.pop();
console.log(animals2,animial2);// ['pigs', 'goats'],"sheep"

// unshift
const animals3 = ["pigs", "goats", "sheep"];
const count3 = animals3.unshift("chickens");
console.log(animals3,count3);//['chickens', 'pigs', 'goats', 'sheep'],4

// shift
const animals4 = ["pigs", "goats", "sheep"];
const animial4 = animals4.shift();
console.log(animals4,animial4);//['goats', 'sheep'], "pigs"
```

通过运行这些代码，我们很容易可以得到这四个操作均会影响原始数组，并且push/unshift操作会返回操作后的数组长度，而者shift/pop操作会返回被操作的元素。

### 遍历和变换方法

* forEach()：遍历数组中的每个元素，并且对数组的每个元素执行一次给定的函数。
* map()：创建一个新数组，这个新数组由原数组中的每个元素都调用一次提供的函数后的返回值组成。
* filter()：创建一个新数组, 其包含通过所提供函数实现的测试的所有元素。

```js
// forEach
const array1 = [1, 2, 3];
array1.forEach((element) => element + 1)
console.log(array1); //[1, 2, 3]

// map
const array2 = [1, 4, 9, 16];
const map2 = array2.map((x) => x * 2);
console.log(map2);// [2, 8, 18, 32]
console.log(array2);// [1, 4, 9, 16]

// filter
const array3 = [1, 2, 3, 4, 5];
const filtered = array3.filter((x) => x % 2 === 0);
console.log(filtered);// [2, 4]
console.log(array3);// [1, 2, 3, 4, 5]
```

通过运行这些代码，我们可以看出这三个均不会改变原始数组，并且forEach无返回值。

### 查找相关方法

* find()：该方法返回数组中满足提供的测试函数的第一个元素的值。否则返回 undefined。
* findIndex()：该方法返回数组中满足提供的测试函数的第一个元素的索引。否则返回 -1。
* indexOf()：该方法返回数组中第一次出现给定元素的下标，如果不存在则返回 -1。
* lastIndexOf():该方法返回数组中给定元素最后一次出现的索引，如果不存在则返回 -1。
* includes()：该方法用来判断一个数组是否包含一个指定的值，根据情况，如果包含则返回 true，否则返回 false。

```js
// find()
const array1 = [5, 12, 8, 130, 44];
const found = array1.find((element) => element > 10);
console.log(found,array1);// 12, [5, 12, 8, 130, 44]

// findIndex()
const array2 = [5, 12, 8, 130, 44];
const isLargeNumber = (element) => element > 13;
const foundIndex = array2.findIndex(isLargeNumber);
console.log(foundIndex,array2);// 3, [5, 12, 8, 130, 44]

// includes(searchElement, fromIndex?)
const array3 = [5, 12, 8, 130, 44];
console.log(array3.includes(12),array3);// true, [5, 12, 8, 130, 44]

// indexOf(searchElement, fromIndex?)
const array4 = [5, 12, 8, 130, 44];
console.log(array4.indexOf(12),array4);// 1, [5, 12, 8, 130, 44]

// lastIndexOf(searchElement, fromIndex?)
const array5 = [5, 12, 8, 130, 44];
console.log(array5.lastIndexOf(12),array5);// 1, [5, 12, 8, 130, 44]
```

从运行这些方法来看，它们也不会改变原数组。

### 归并方法

* reduce()：该方法对数组中的每个元素按序执行一个提供的 reducer 函数，每一次运行 reducer 会将先前元素的计算结果作为参数传入，最后将其结果汇总为单个返回值。第一次执行回调函数时，不存在“上一次的计算结果”。如果需要回调函数从数组索引为 0 的元素开始执行，则需要传递初始值。否则，数组索引为 0 的元素将被用作初始值，迭代器将从第二个元素开始执行（即从索引为 1 而不是 0 的位置开始）。
* reduceRight(): 该方法对累加器（accumulator）和数组的每个值（按从右到左的顺序）应用一个函数，并使其成为单个值。即相当于reduce的顺序取反版本。

```js
// array.reduce(function(total, currentValue, currentIndex, arr), initialValue)
const array1 = [1, 2, 3, 4];
// 0 + 1 + 2 + 3 + 4
const initialValue = 0;
const sumWithInitial = array1.reduce(
  (accumulator, currentValue) => accumulator + currentValue,
  initialValue,
);
```

### 排序和修改方法

* sort(): 该方法就地对数组的元素进行排序，并返回对相同数组的引用。默认排序是将元素转换为字符串，然后按照它们的 UTF-16 码元值升序排序。
* reverse()：该方法就地反转数组中的元素，并返回同一数组的引用。数组的第一个元素会变成最后一个，数组的最后一个元素变成第一个。
* toSorted():toSorted() 方法是 sort() 方法的复制方法版本。它返回一个新数组，其元素按升序排列
* toReversed():toReversed() 方法是 reverse() 方法对应的复制版本。它返回一个元素顺序相反的新数组。

```js
// sort(compareFn)  =>compareFn 可选
// 定义排序顺序的函数。返回值应该是一个数字，其符号表示两个元素的相对顺序：如果 a 小于 b，返回值为负数(升序），如果 a 大于 b，返回值为正数（降序），如果两个元素相等，返回值为 0。NaN 被视为 0。默认为升序排列
const array1 = [1, 2, 3, 4, 5];
const array2  = array1.sort((a, b) => a - b);
const array3 = array1.sort((a, b) => b - a)
console.log(array1); // [1, 2, 3, 4, 5]
console.log(array2);// [1, 2, 3, 4, 5]
console.log(array3);// [5, 4, 3, 2, 1]  如果要对比升序降序排列，则需要单独摘出进行比较，因为返回的是对同一个数组的引用的结果。
console.log(array1 === array2);// true

// toSorted(compareFn)
const array4 = [1, 2, 3, 4, 5];
const array5  = array4.toSorted((a, b) => a - b);
console.log(array4); // [1, 2, 3, 4, 5]
console.log(array5);// [1, 2, 3, 4, 5]
console.log(array4 === array5) // false
```

从这个例子中可以看出，sort()和reverse()会返回对相同数组的引用，因此我们如果在React中需要使用的话可以使用新版的toSorted()和toReversed(),这两个函数会保持不可变性原则。

### 分割和连接方法

* slice()：该方法返回一个新的数组对象，这一对象是一个由 start 和 end 决定的原数组的浅拷贝（包括 start，不包括 end），其中 start 和 end 代表了数组元素的索引。原始数组不会被改变。意味着如果数组中有对象，需要注意对象的引用。
* splice()：该方法就地移除或者替换已存在的元素和/或添加新的元素。返回值：一个包含了删除的元素的数组，如果只移除一个元素，则返回一个元素的数组，如果没有删除任何元素，则返回一个空数组。
* toSpliced()：该方法是 splice() 方法的复制版本。它返回一个新数组，并在给定的索引处删除和/或替换了一些元素。
* concat()：该方法用于合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组。
* join()：该方法将一个数组（或一个类数组对象）的所有元素连接成一个字符串并返回这个字符串，用逗号或指定的分隔符字符串分隔。如果数组只有一个元素，那么将返回该元素而不使用分隔符。

```js
// slice(start, end)
const animals = ["ant", "bison", "camel", "duck", "elephant"];
console.log(animals.slice()) // ["ant", "bison", "camel", "duck", "elephant"];
console.log(animals.slice(2));// ["camel", "duck", "elephant"]
console.log(animals) // ["ant", "bison", "camel", "duck", "elephant"]

// splice(start, deleteCount, item1, item2, ...) =>deleteCount:一个整数，表示数组中要从 start 开始删除的元素数量。tem1、…、itemN :可选
// 从 start 开始要加入到数组中的元素。
const months = ["Jan", "March", "April", "June"];
const arr1 = months.splice(1, 0, "Feb"); // ["Jan", "Feb", "March", "April", "June"]
console.log(months,arr1) // ["Jan", "Feb", "March", "April", "June"]
const arr2 = months.splice(4, 1, "May"); // 
console.log(arr2) // ["June"]

// toSpliced()
const months1 = ["Jan", "Mar", "Apr", "May"];
const months2 = months1.toSpliced(1, 0, "Feb");
console.log(months2); //["Jan", "Feb", "Mar", "Apr", "May"]
console.log(months1); //  ["Jan", "Mar", "Apr", "May"]

// concat(value0, value1, /* … ,*/ valueN)
const array1 = ["a", "b", "c"];
const array2 = ["d", "e", "f"];
const array3 = array1.concat(array2);
console.log(array1,array2); // ["a", "b", "c"] ["d", "e", "f"]
console.log(array3) // ["a", "b", "c", "d", "e", "f"]

// join(separator)=>separator:指定一个字符串来分隔数组的每个元素。如果需要，将分隔符转换为字符串。如果省略，数组元素用逗号（,）分隔。如果 separator 是空字符串（""），则所有元素之间都没有任何字符。
const elements = ["Fire", "Air", "Water"];
console.log(elements.join()); // "Fire,Air,Water"
console.log(elements.join("")); // "FireAirWater"
console.log(elements.join("-"));// "Fire-Air-Water"
```

### 其他数组方法

flat()：该法创建一个新的数组，并根据指定深度递归地将所有子数组元素拼接到新的数组中。
flatMap()：该方法对数组中的每个元素应用给定的回调函数，然后将结果展开一级，返回一个新数组。它等价于在调用 map() 方法后再调用深度为 1 的 flat() 方法（arr.map(...args).flat()），但比分别调用这两个方法稍微更高效一些。
Array.from(): 该静态方法从可迭代或类数组对象创建一个新的浅拷贝的数组实例。
Array.of(): 该静态方法通过可变数量的参数创建一个新的 Array 实例，而不考虑参数的数量或类型。
keys():该方法返回一个新的数组迭代器对象，其中包含数组中每个索引的键。
values(): 方法返回一个新的数组迭代器对象，该对象迭代数组中每个元素的值。

```js
// flat(depth) 默认为1层，如需彻底打平，设置depth 为 Infinity无论多少层均可
const arr2 = [0, 1, [2, [3, [4, 5]]]];
console.log(arr2.flat()); // [0, 1, 2, [3, [4, 5]]]
console.log(arr2.flat(Infinity));// [0, 1, 2, 3, 4, 5]

// flatMap(callback)
const arr1 = [1, 2, 1];
const result = arr1.flatMap((num) => (num === 2 ? [2, 2] : 1));
console.log(result);// [1, 2, 1, 2, 2]

// Array.from(arrayLike[, mapFn[, thisArg]])
console.log(Array.from("foo")); // ["f", "o", "o"]
console.log(Array.from([1, 2, 3], (x) => x + x));// [2, 4, 6]

// Array.of(element0[, element1[, ...[, elementN]]])
console.log(Array.of("foo", 2, "bar", true)); // ["foo", 2, "bar", true]
console.log(Array.of()); // []

//keys(),values()
const array1 = ["a", "b", "c"];
const iterator1 = array1.values();
const iterator2 = array1.keys();
for (const value of iterator1) {
  console.log(value); // a, b, c
}
for(const key of iterator2){
  console.log(key); // 0, 1, 2
}

```

这些方法也都是创建新对象，不是在原先对象上进行操作。

### reduce 详解

在诸多数组方法中，我个人认为其中最高级的就是 reduce，它是 JavaScript 的一种高阶数组方法，它能够以累积的方式对数组中的每一项数据进行处理，最终归并为一个值。除了最常见的加总或聚合数据之外，reduce 还具备处理复杂逻辑的能力，甚至可以实现其他数组方法（如 map、filter 等）的功能。因此想多说明一下，reduce 方法在很多场景下都十分有用。

#### 数值聚合：reduce 方法可以用来计算数组中元素的总和、平均值、最大值、最小值等

```js
// 计算数组元素的总和、最大值、最小值
const numbers = [1, 2, 3, 4];
const sum = numbers.reduce((acc, curr) => acc + curr, 0); 
const max = numbers.reduce((acc, curr) => (curr > acc ? curr : acc), numbers[0]);
const min = numbers.reduce((acc, curr) => (curr < acc ? curr : acc), numbers[0]);
console.log(sum, max, min); // // 10 4 1
// 统计数据
const items = [1, 2, 2, 3, 3, 3];
const countMap = items.reduce((acc, curr) => {
  acc[curr] = (acc[curr] || 0) + 1;
  return acc;
}, {});
console.log(countMap); // { 1: 1, 2: 2, 3: 3 }
```

#### 数组扁平化,数组去重

```js
// 数组扁平化
const nestedArray = [1, [2, 3], [4, [5, 6]]];
const flatArray = nestedArray.reduce((acc, curr) => acc.concat(Array.isArray(curr) ? curr.flat() : curr), []);
console.log(flatArray); // [1, 2, 3, 4, [5, 6]]

//  数组去重
const nums = [1, 2, 2, 3, 4, 4, 5];
const uniqueNums = nums.reduce((acc, curr) => {
  if (!acc.includes(curr)) acc.push(curr);
  return acc;
}, []);
console.log(uniqueNums); // [1, 2, 3, 4, 5]
```

#### 实现其他数组方法 map,filter

```js
// 使用reduce 实现 map
function myMap(array, callback) {
  return array.reduce((acc, curr, index, fullArray) => {
    // 将 callback 的返回值加入到 acc 中
    acc.push(callback(curr, index, fullArray));
    return acc;
  }, []); 
}

// 使用reduce实现map功能
const numbers = [1, 2, 3, 4];
const squared = numbers.reduce((acc, curr) => {
  acc.push(curr * curr);
  return acc;
}, []);
console.log(squared); // [1, 4, 9, 16]

// 使用reduce实现filter功能
function myFilter(array, callback) {
  return array.reduce((acc, curr, index, fullArray) => {
    // 如果当前元素通过了 callback 的测试条件，则加入到 acc
    if (callback(curr, index, fullArray)) {
      acc.push(curr);
    }
    return acc;
  }, []);
}

// 使用reduce实现filter功能
const evenNumbers = numbers.reduce((acc, curr) => {
  if (curr % 2 === 0) acc.push(curr);
  return acc;
}, []);
console.log(evenNumbers); // [2, 4]
```

#### 管道模式实现

```js
const pipeline = [
  (x) => x + 1,
  (x) => x * 2,
  (x) => x - 3,
];
const result = pipeline.reduce((acc, func) => func(acc), 5);
console.log(result); // ((5 + 1) * 2) - 3 = 9
```

这些也只是 reduce 的一些应用，还有更多强大的功能请阅读其他大佬的文章。

## 参考文献

[https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)
[部分代码由gpt实现：https://chatgpt.com/]([chatgpt.com](https://chatgpt.com/))
