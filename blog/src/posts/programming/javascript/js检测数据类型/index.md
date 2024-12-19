---
title: js 数据检测类型
description: 在JavaScript开发中，检测数据类型是非常常见的需求。无论是基本类型的判断，还是复杂对象的识别，选择合适的方法不仅能够避免潜在的 bug，还能提升代码的可读性和可维护性。本文将从多种方法出发，深入分析其适用场景、优缺点以及最佳实践，帮助开发者更加高效地处理类型检测。
editLink: true
date: 2024-12-07
tag: [js]
---
[[toc]]

## 引言

---

在JavaScript开发中，检测数据类型是非常常见的需求。无论是基本类型的判断，还是复杂对象的识别，选择合适的方法不仅能够避免潜在的 bug，还能提升代码的可读性和可维护性。本文将从多种方法出发，介绍通常的场景。

## 为什么需要检测数据类型

js是一门动态语言，变量的数据类型会随着赋值的变化而改变，这种灵活性既是优势也是挑战。以下是一些常见场景：

* 表单验证：确保用户输入的数据是期望的类型（如数字或字符串）。
* 动态数据处理：在处理 JSON 数据时，根据字段类型做出不同的操作。
* 类型转换：根据变量的类型决定是否需要进行强制类型转换。
* 调试与错误定位：快速定位不符合预期的数据类型问题。

## 常用的类型检测方法

### typeof

typeof 运算符返回一个字符串，表示操作数的类型。 用于返回一个表示给定变量的数据类型的字符串。它是检测变量类型的主要工具之一  

```js
console.log(typeof 42); // "number"
console.log(typeof "hello"); // "string"
console.log(typeof true); // "boolean"
console.log(typeof undefined); // "undefined"
console.log(typeof null); // "object" (历史遗留问题)
console.log(typeof []); // "object"
console.log(typeof function(){}); // "function"
```

基本数据类型值基本上都可以有效检测，引用数据类型值也可以检测出来（object和function）
最佳实践是用来检测Number，String，Boolean，undefined，BigInt，null不可以，会返回object

#### 但是也有一些缺点

* NaN / Infinity 都是数字类型的，检测结果都是“number”
* typeof null 的结果是“object”
* typeof 普通对象/数组对象/正则对象...， 结果都是“object”，这样就无法基于typeof 区分是普通对象还是数组对象``...等了

### Object.prototype.toString.call()

Object.prototype.toString.call() 是基于 JavaScript 内置的 Object 对象提供的。Object.prototype 是所有对象的原型链起点，它上面定义了一些通用的方法供所有对象继承和使用，而 toString 方法是其中之一，它通过检查传入值的 [[Class]] 内部属性来返回类型信息，并且基于call让方法中的this指向检测的数据值，这样就可以实现数据类型检测了：

* 每一种数据类型的构造函数的原型上都有toString方法；
* 除了Object.prototype上的toString是用来返回当前实例所属类的信息，[object Type]格式的字符串（检测数据类型的），其余toString方法的都是转换为字符串的。
* 对象实例.toString() ：toString方法中的this是对象实例，也就是检测它的数据类型，也就是this是谁，就是检测谁的数据类型
* Object.prototype.toString.call([value]) 所以我们是把toString执行，基于call改变this为要检测的数据值

```js
console.log(Object.prototype.toString.call(42));         // "[object Number]"
console.log(Object.prototype.toString.call("hello"));    // "[object String]"
console.log(Object.prototype.toString.call(true));       // "[object Boolean]"
console.log(Object.prototype.toString.call(null));       // "[object Null]"
console.log(Object.prototype.toString.call(undefined)); // "[object Undefined]"
console.log(Object.prototype.toString.call([]));        // "[object Array]"
console.log(Object.prototype.toString.call({}));        // "[object Object]"
console.log(Object.prototype.toString.call(new Date())); // "[object Date]"
console.log(Object.prototype.toString.call(/regex/));   // "[object RegExp]"
```

Object.prototype.toString.call() 是 JavaScript 中检测数据类型的一种通用且精确的方法。它可以帮助我们准确识别所有类型的数据

### instanceof

instanceof 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。
即检查instanceof前面的东西是否有原型，没有直接返回false，如果有那么是否在instanceof后面的对象的原型链上可以查找到，可以则返回true,主要用于检查一个对象是否属于某个类（或其原型链上的某个类）  

因此也有一些优缺点：

* 基于这种方式，可以弥补 typeof 无法细分对象类型的缺点（想检测这个值是否为数组，只需要看他是否为Array类的实例即可）
* 基本数据类型的实例是无法基于它检测出来的
* 不管是数组对象韩式正则对象，都是 Object 的实例，检测结果都是 TRUE ，所以无法基于这个结果判断是否为普通对象

### 构造函数检测

通过 constructor 属性判断类型。

```js
console.log((42).constructor === Number); // true
console.log("hello".constructor === String); // true
console.log([].constructor === Array); // true
console.log({}.constructor === Object); // true
```

这个方法除了null和undefined之外，对基本类型和引用类型均可用。
但是有三个缺点：

* 对象继承的影响：如果一个对象继承自另一个对象，其constructor属性可能会指向错误的构造函数。exp：

```js
function Parent() {}
function Child() {}
Child.prototype = new Parent();
let child = new Child();
console.log(child.constructor === Child); // false
console.log(child.constructor === Parent); // true
```

* 原型链篡改的影响：如果原型链被篡改，constructor属性可能会变得不可靠。exp:

```js
Array.prototype = {};
let arr = [];
console.log(arr.constructor === Array); // false
```

* 跨窗口或跨框架问题：在不同的窗口或框架中，即使是相同类型的对象，其constructor属性也可能不相等。

### 特殊方法

1. Array.isArray()：用于检测一个对象是否是数组。
2. isNaN() 和 Number.isNaN()：检测是否为 NaN;isNaN()是ES6新增的，用于判断一个值是否为NaN，它返回一个布尔值，与Number.isNaN()不同，它不会将字符串转换为数字再比较。

    ```javascript
    console.log(Number.isNaN(NaN));    // true
    console.log(isNaN("hello"));       // true (因为 "hello" 转换为数字是 NaN)
    console.log(Number.isNaN("hello"));// false (不会转换类型)
    ```

3. isFinite()：检测是否为有限数值
4. Object.is()：用于比较两个值是否相等，与 === 的区别在于，它比较两个值是否为同一个对象。并且NaN是相等的。

## 总结

| **方法**                        | **精确性** | **适用场景**           | **性能**    |
|----------------------------------|------------|-------------------------|-------------|
| typeof                         | 较低       | 基本类型和函数检测     | 高性能      |
| Object.prototype.toString.call() | 高         | 精确检测任意类型       | 性能适中    |
| instanceof                     | 中         | 检测对象实例关系       | 高性能      |
| Array.isArray()                | 高         | 专门用于数组检测       | 高性能      |
| 构造函数检测                      | 中         | 检测对象类型           | 高性能      |

还有一些使用建议：

* 快速判断用 typeof：适合简单场景
* 精确判断用 Object.prototype.toString.call：适合复杂对象
* 数组判断用 Array.isArray
* 保持一致性：在项目中尽量使用统一的检测方法

## 参考文献

[MDN文档:https://developer.mozilla.org/zh-CN/docs/Web/JavaScript](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript)
