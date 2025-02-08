---
title: 理解react核心思维
description: >-
  在《坐标React星，React核心思维模型》一书中，作者叶凌东深入探讨了React的核心思维模型，帮助开发者更好地理解React的精髓和最佳实践。本文将通过总结书中的核心概念与技巧，带领读者一同领略React的独特思维方式，帮助开发者在实际项目中更加高效地运用React。
editLink: true
date: 2024-02-08T00:00:00.000Z
tag:
  - react
id: 560a9b9c3e152a35939a819cf1db86a9
---
[[toc]]

## 引言

React作为当前最流行的前端框架之一，已经成为现代Web开发的重要工具。尽管它的API和生态系统不断丰富，但很多开发者仍然未能完全掌握其核心的思维模式。叶凌东的《坐标React星，React核心思维模型》一书，系统性地解读了React的核心思维，帮助开发者从更深层次理解React的设计哲学和技术架构。本文将结合书中的要点，深入分析React的核心思维，帮助你提升对React的理解和运用能力。

## React的声明式编程思维

### 什么是声明式编程?

声明式编程是一种编程范式，强调描述想要的结果而不是执行的过程。不同于命令式编程，声明式编程让程序员关注于"做什么"而不是"如何做"。在声明式编程中，开发者定义逻辑规则和数据流，而系统负责如何实现这些规则。在React中，这种思维方式通过描述UI应该呈现什么样的状态来体现。

### 声明式与命令式编程的对比

而命令式编程要求开发者逐步编写操作DOM的代码，详细描述每一个步骤。例如，更新页面上的元素可能需要手动查找DOM节点，然后修改其内容或属性。这种方式容易导致代码复杂度增加，维护困难。而声明式编程通过React提供的API，如JSX，开发者只需要声明UI的状态，React则负责更新DOM以匹配这些状态。这样的对比让React在开发效率和代码可读性上大幅提升。

example：

```js
function openDialog(){
  const div = document.getElementById('container');
  // 这里我们需要跟踪系统内部状态，dialog是否存在，如果不存在则进行创建。
  if(!document.getElementById('dialog')){
    const dialog = document.createElement('div');
    dialog.appendChild('div')
    dialog.appendChild('button')
    ...
    div.appendChild(dialog);
  }
  div.style.display = 'block';
}
```

在上面的命令式编程中除了啰嗦外，还有一个主要的问题，随着一个真实系统的逐步开发，每个页面都有好多的动态元素，甚至这些动态元素之间还会相互依赖。在这种情况下追踪每一个元素的当前状态是比较困难的。而相比下面的使用声明式编程方法则轻松许多，我们只需要描述所期望的结果就好。其他细节交给React来完成。

```jsx
function App(){
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  ...
  //一个函数调用即可打开dialog，且代码简洁。
  funtion openDialog(){
    setIsDialogVisible(true);
  }
  return {
    <div>
    <div>主控界面</div>
    {isDialogVisible && <Dialog />}
    </div>
  }
}
```

### 在React中如何实现声明式编程

在React中，声明式编程通过JSX描述UI结构、使用状态和属性管理数据、定义事件处理逻辑以及利用虚拟DOM来实现，开发者只需声明UI应呈现的状态，React则负责如何实现这种状态，从而简化和优化UI开发过程。

## 数据不可变性

### 数据不可变性在React中的重要性

在React中，数据不可变性（Immutability）是指一旦数据（如state或props）被创建，就不能直接修改。这意味着每次数据变化时，都会生成一个新的数据对象，而不是修改原始数据对象。React通过不可变数据来确保每次状态或属性的变化都能被正确地追踪并触发UI的重新渲染。

不可变数据在React中的重要性体现在以下几个方面：

* 简化状态管理：不可变数据使得状态的变化更加可控和透明。每次状态更新时，React只需对比新的和旧的状态对象是否相等，而不需要深入检查对象的内部值。
* 提高性能：不可变数据让React能够快速地判断组件是否需要重新渲染，避免不必要的DOM操作。
* 避免意外副作用：直接修改数据可能导致难以追踪的副作用，尤其是在多个组件共享同一份数据时。不可变性有助于保证数据的可靠性和一致性。

### 如何通过不可变数据提高React的性能和可靠性？

不可变数据帮助提高React的性能主要通过以下几种方式：首先，React在进行虚拟DOM的Diff算法时，可以快速确定哪些部分需要更新，因为不可变数据结构确保了新的状态和旧的状态是不同的对象。其次，不可变性允许更好的缓存和优化，因为你可以安全地重用旧数据或部分数据，而不需要担心它们会发生变化。关于可靠性，不可变数据减少了状态管理的复杂性，避免了由于错误的修改导致的应用崩溃或不一致的状态。使用不可变数据结构（如Immer库），可以更简洁地处理复杂的更新逻辑，同时保持数据的完整性。

### 数据不可变性如何帮助避免不必要的渲染？

不可变数据的一个关键优势是它能够有效地避免不必要的渲染。在React中，每当状态更新，组件会重新渲染。但通过不可变数据，React可以使用浅比较来决定是否需要重新渲染。如果状态对象是不可变的，那么新旧状态的比较可以简单而快速地执行。如果新状态与旧状态引用相同，则可以跳过渲染。例如，shouldComponentUpdate方法或React.memo都可以利用这一点来阻止不必要的重绘。通过只在状态真正变化时触发渲染，应用的性能显著提高，特别是在处理大型列表或深层嵌套的组件结构时。此外，Hooks如useMemo和useCallback在结合不可变数据时，可以进一步优化组件的渲染性能，因为它们可以缓存计算结果，只有在依赖项改变时才重新计算。

## 单向数据流

### 什么是单向数据流？

单向数据流（Unidirectional Data Flow）是React中的核心概念之一，它指的是数据从父组件流向子组件，且仅沿着单一方向流动。具体来说，父组件通过props向子组件传递数据，子组件只能接收数据，不能直接修改父组件的数据。当子组件需要改变某些数据时，它通过回调函数将事件或数据变化反馈给父组件，由父组件来更新数据，再将新的数据通过props传递给子组件，信息总是从一个方向流动，不存在循环或双向流动。具体到React中，意味着：

* 状态（state）在组件树中从上到下传递。
* 子组件不能直接修改父组件的状态。
* 如果子组件需要改变父组件的状态，它必须通过回调函数（通常是事件处理程序）将数据或事件传递回父组件。

### 单向数据流的优势

* 数据流动可预测：单向数据流意味着数据只能从父组件流向子组件，消除了双向绑定可能带来的复杂性和不可预见的副作用。数据的改变都在明确的路径上进行，这简化了数据管理和调试。
* 更容易维护和调试：因为数据变化有一个明确的来源和流动方向，开发者可以更容易地找出问题的根源。父组件控制状态，子组件通过属性（props）接收数据，这使得应用程序的行为更加可预测和一致。
* 避免数据不一致：当多个组件不能同时修改共享状态时，就不会出现数据不一致的情况。单向数据流确保只有父组件可以管理状态，避免了因多个组件同时更新同一数据而可能产生的冲突。
* 简化组件的复用性：由于组件通过props接收数据和回调函数，它与父组件的耦合性较低。这使得子组件可以在不同的父组件中复用，而无需担心复杂的父子交互。

这也应征了一句很好的开发规范，**单一责任原则：谁的数据就由谁来修改**。

### 如何在React中实现单向数据流？

React中的单向数据流是通过props机制实现的，props是父组件传递给子组件的数据。子组件无法直接修改父组件的数据，只能通过回调函数（由父组件传递）来通知父组件进行状态更新。

```jsx
function ParentComponent() {
  const [count, setCount] = useState(0);

  function incrementCount() {
    setCount(count + 1);
  }

  return <ChildComponent count={count} onIncrement={incrementCount} />;
}

function ChildComponent({ count, onIncrement }) {
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={onIncrement}>Increment</button>
    </div>
  );
}
```

## 组件化与状态管理

### React中的组件化思想

组件化是React设计哲学的核心，旨在将复杂的UI拆分为小的、可管理的部分——组件。每个组件都是独立的，可以独立开发、测试和维护。通过这种方式，UI的任何部分都可以被视为一个独立的单元，负责自己的一部分逻辑和显示。组件化思想使得开发者能够以一种更模块化、更结构化的方式思考UI的构建，极大提高了代码的可读性和可维护性。每个组件可以接受输入（通过props），然后根据这些输入决定如何渲染自己，形成了一种从数据到视图的自然映射。

### 组件的组合与复用

React鼓励通过组件的组合来构建复杂的UI，类似于HTML元素的嵌套。组件可以像积木一样拼接在一起，形成更大的结构。复用是组件化的一个重要优势；你可以创建一个通用的组件，如按钮、输入框或卡片，然后在应用的不同地方使用它们。通过props，组件可以定制化以适应不同的需求，而无需重复编写类似的代码。这样的复用不仅减少了代码量，还提高了代码的一致性和可维护性。组件组合允许开发者以递增的方式构建应用，从简单到复杂，逐步添加功能和细节。

### 如何高效管理组件状态

在React中，状态（state）管理是组件逻辑的核心部分。每个组件可以拥有自己的状态，但如何管理这些状态以避免复杂度是关键。本地状态管理适用于单个组件或父子组件间的数据传递，常用useState或类组件的this.state来处理。全局状态管理则涉及到跨组件共享数据，这时可以使用useContext和useReducer来简化状态的传递和更新，或者借助像Redux这类外部库来集中管理应用状态。高效的状态管理还包括减少不必要的渲染，通过shouldComponentUpdate(目前一般只用于类组件)、React.memo或useMemo来优化组件性能。此外，理解何时提升状态到父组件或使用全局状态管理是实现高效状态管理的重要策略。

## React中的Hook及其使用规则

### React Hook的基本概念

### useState、useEffect、useContext等常用Hook的介绍

* useState：用于在函数组件中添加状态。它返回当前状态值和一个更新状态的函数。
* useEffect：用于处理副作用(非常适合处理异步操作)，如数据请求、DOM 操作、订阅等。useEffect 可以在组件挂载、更新或卸载时执行副作用。
* useContext：用于访问 React Context 中的共享状态。使得在不同层级的组件之间传递数据更加简单。
* useRef：用于访问 DOM 元素或在组件的生命周期内保持一个可变的引用。useRef 返回一个对象，可以用来持有对 DOM 元素或任何其他值的引用。
* useMemo：用于缓存计算结果，以避免不必要的重新计算。useMemo 会在依赖项发生变化时重新计算值，防止在每次渲染时进行昂贵的计算。
* useCallback：用于缓存函数实例，防止函数在每次渲染时重新创建。尤其在将函数作为props传递给子组件时，useCallback 能有效减少不必要的渲染。
* useLayoutEffect：类似于 useEffect，但是它在 DOM 更新后、浏览器绘制前同步执行。用于执行布局相关的副作用操作。
* useId：用于生成唯一的 ID，常用于表单控件或需要唯一标识符的元素。特别适合于服务端渲染（SSR）和并发模式下使用。
* useDeferredValue：用于延迟某些高优先级更新的渲染，减少不必要的阻塞。适用于在高负载下优先显示重要内容。
* useTransition：用于将某些更新标记为“可中断的”，并优先渲染重要内容。通常用于实现平滑过渡效果，如数据加载或路由切换。

```js
//state
const [count, setCount] = useState(0)
//useEffect
useEffect(() => {
  // 副作用操作，如数据获取
  fetchData();
}, [dependencies]);// 依赖项发生变化时，副作用会被重新执行
//useContext
export default function MyApp() {
  return (
    <ThemeContext.Provider value="dark">
      <Form />
    </ThemeContext.Provider>
  )
}

function Button({ children }) {
  const theme = useContext(ThemeContext);
  const className = 'button-' + theme;
  return (
    <button className={className}>
      {children}
    </button>
  );
}
//useRef
function FocusInput() {
  // 创建一个 ref 用于访问输入框元素
  const inputRef = useRef(null);

  // 聚焦输入框的函数
  const focusInput = () => {
    inputRef.current.focus();  // 通过 ref 聚焦输入框
  };

  return (
    <div>
      <input
        ref={inputRef} // 将 ref 绑定到输入框
        type="text"
        placeholder="点击按钮聚焦"
      />
      <button onClick={focusInput}>聚焦输入框</button>
    </div>
  );
}
//useMemo
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
//useCallback
const memoizedCallback = useCallback(() => { doSomething(); }, [dependencies]);
//useLayoutEffect
useLayoutEffect(() => {
  // 操作 DOM 或同步调整布局
}, [dependencies]);
//useId
const id = useId();
//useDeferredValue
const deferredValue = useDeferredValue(value);
//useTransition
const [isPending, startTransition] = useTransition();
```

### 使用Hook的规则：只能在函数组件中使用，不能在条件语句或循环中使用

使用 Hook 有两条规则：

* Hook 只能在 React 的 函数组件 或 自定义 Hook 中使用，不能在类组件或普通 JavaScript 函数中使用。
* 不应该在条件语句或循环中使用 Hook

```react
if (isActive) {
  const [count, setCount] = useState(0);  // 错误：Hook 不应在条件语句中使用
}
```

### 为什么遵守这些规则对性能和组件稳定性至关重要?

* 保持调用顺序一致性React: 会根据 Hook 的调用顺序来追踪组件的状态和副作用。如果 Hook 的调用顺序在不同的渲染中发生变化，React 就无法正确地管理状态或副作用，可能会导致错误的状态更新或渲染。
* 提高性能如果: Hook 的使用不遵循规则，React 可能会因为内部管理机制的复杂性而导致性能下降。遵守规则有助于 React 更高效地更新组件，并避免不必要的渲染和计算，提升应用性能。
* 避免状态混乱如果: Hook 被错误地放置在条件语句或循环中，可能会导致状态和副作用管理的混乱，甚至导致某些状态值丢失或不按预期更新。遵守规则可以确保每次渲染时 Hook 都按照相同的顺序执行，从而确保状态和副作用的一致性。
* 组件的可预测性遵守: Hook 规则使得组件的行为变得更加可预测和一致。

## 生命周期

React的生命周期概念是理解和管理组件行为的关键，尤其是在处理状态和副作用时。然而，随着函数组件和Hooks的普及，我们需要重新思考如何在这种新的编程范式中实现类似的生命周期管理。

### 组件挂载阶段

* constructor: 用于初始化状态和绑定方法，组件实例化时只调用一次。
* getDerivedStateFromProps: 静态方法，用于根据props更新state。
* render: 返回渲染组件的UI结构。
* componentDidMount: 在组件挂载后立即调用，通常用于数据获取、设置订阅等操作。

### 组件更新

* getDerivedStateFromProps: 每次更新时都会被调用，用于根据新的 props 来更新 state。
* shouldComponentUpdate: 决定是否需要重新渲染组件。
* render: 重新渲染组件。
* getSnapshotBeforeUpdate: 在 DOM 更新之前，getSnapshotBeforeUpdate 被调用，它允许你在更新前获取快照信息，例如记录滚动位置。
* componentDidUpdate: DOM更新后执行，常用于处理更新后的副作用。

### 组件卸载

在类组件中，componentWillUnmount 方法用于组件卸载前的清理操作。常用于清除定时器、取消订阅、清理外部资源等。

虽然函数组件不再显式使用生命周期方法，但 React 的 useEffect Hook 提供了类似的功能。通过 useEffect 的不同使用方式，我们可以实现类组件中的 componentDidMount、componentDidUpdate 和 componentWillUnmount 等生命周期行为。这种方式更加简洁，并且使得副作用管理变得更为直观和可控。

## 虚拟 DOM、Fiber 和 Time Slice

React 中的渲染机制不断演进，虚拟 DOM、Fiber 和 Time Slice 是三个关键的技术，它们共同优化了组件的更新过程，提升了 React 应用的性能和响应能力。在理解 React 渲染机制时，了解它们的工作原理及相互关系非常重要。

### 虚拟 DOM

虚拟 DOM 是 React 渲染过程中的核心技术之一，它旨在提高 UI 更新的效率。React 并不直接操作真实 DOM，而是在内存中创建一个虚拟的 DOM 树，当组件的状态或属性发生变化时，React 会构建出一个新的虚拟 DOM 树，并与当前的虚拟 DOM 树进行比较。这一过程称为 Diffing，通过查找新旧虚拟 DOM 之间的差异，React 确定哪些部分需要更新，并仅将差异部分应用到真实 DOM 上。通过这种方式，React 避免了每次状态更新都重新渲染整个页面的高昂开销，从而提升了渲染效率。

虚拟 DOM 的优点在于它减少了直接操作真实 DOM 的次数，避免了多次 DOM 操作的性能瓶颈。此外，虚拟 DOM 还让 React 在面对复杂 UI 变化时，可以更加高效地进行更新，并通过最小化实际 DOM 的更新，显著提高应用的响应速度。

### Fiber

随着 React 应用的规模不断增大，传统的同步渲染方式逐渐显现出其局限性。为了应对复杂应用中的性能瓶颈，React 16 引入了 Fiber，一个全新的渲染引擎。Fiber 的核心目标是使 React 的渲染过程更加灵活和高效，特别是在处理大型应用时，通过异步渲染和任务调度来优化性能。

在没有 Fiber 之前，React 的渲染是同步进行的，这意味着所有的渲染操作会在一个时间点内完成，而长时间的渲染任务可能会阻塞主线程，导致页面卡顿或界面不流畅。Fiber 通过将渲染过程分解为多个小任务，每个任务只执行渲染的一部分，并将这些任务分配到多个渲染帧中执行。这使得 React 可以在多个帧之间切换任务，不会阻塞 UI 更新和用户交互。

Fiber 还引入了任务优先级的概念，允许 React 根据任务的重要性来调度渲染顺序。例如，当用户进行交互时，React 会优先处理用户输入，而将较低优先级的渲染任务推迟执行。此外，Fiber 还支持任务的中断与恢复，使得渲染过程可以在高优先级任务执行时暂停，待高优先级任务完成后再继续低优先级的任务。

### Time Slice

Time Slice 是 Fiber 的一部分，它通过将渲染任务切割成多个小时间片段，确保在执行渲染任务时不会阻塞浏览器的主线程。Time Slice 的引入解决了长时间渲染任务导致 UI 卡顿的问题。

具体来说，Time Slice 会将渲染任务分解为许多小的时间片，每个时间片会在浏览器的一帧内执行一定量的工作。这样，渲染过程中的其他任务可以在下一个帧中继续执行，而不会造成长时间的 UI 停滞。通过这种方式，React 能够充分利用浏览器的空闲时间段来处理渲染任务，从而避免长时间占用主线程。

Time Slice 的优势在于它为长时间的渲染任务提供了分片执行的机制，使得 React 可以处理更复杂的 UI 更新而不影响用户交互。这不仅提升了 React 应用的响应性，也保证了渲染过程的流畅性。

这三者之间密切协作，共同优化了 React 的渲染机制。虚拟 DOM 作为 React 渲染的基础，负责计算组件的 UI 状态，并通过 Diffing 算法找出需要更新的部分。而 Fiber 则负责调度渲染任务，通过将渲染过程分解为多个小任务，并根据任务的优先级进行调度，确保渲染的高效性。Time Slice 作为 Fiber 的一部分，进一步优化了渲染任务的执行方式，将渲染过程切分成多个小片段，确保任务在多个帧之间分配执行，从而避免长时间阻塞主线程。

本文结合《坐标React星，React核心思维模型》一书，深入探讨了React的核心思维，包括声明式编程、数据不可变性、单向数据流、组件化与状态管理、Hooks的使用规则、组件生命周期以及虚拟DOM、Fiber和Time Slice等技术，这些概念和实践不仅简化了UI开发流程，也显著提升了React应用的性能和可维护性。

## 参考文献

1. [React官方文档](https://reactjs.org/docs/hooks-intro.html)
2. 《坐标React星，React核心思维模型》
