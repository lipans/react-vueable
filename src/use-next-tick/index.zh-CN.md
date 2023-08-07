---
nav:
  title: API
  order: 1
---

# useNextTick

等待下一次 DOM 更新时被执行的hook，它实现了类似于Vue3 `nextTick` API的功能。

当你在react中使用`setState`或者其他方式更改响应式状态的值时，state的值的改变和 DOM 的更新并不是立即执行的，`useNextTick`返回一个函数，它会等到state和 DOM 更新后执行。

## 基本用法

直接使用`useNextTick`而不修饰任何tick函数(useNextTick没有参数)时,返回一个`nextTick`函数，它的作用基本和Vue3 `nextTick` API一致。

```js
const nextTick = useNextTick();
```

<br />

<code src="./demo/demo1.tsx" ></code>

## 刷新状态

如果`useNextTick`像`useCallback`或者`useMemo`一样修饰一个函数，那么被修饰的函数成为`tick`函数，`tick`函数会在nextTick后被执行，因为nextTick后所有状态都会被更新，所以`tick`函数依赖的状态会是最新的。

```js
const withNextTick = useNextTick(() => {
  // tick function
});
```

### 状态改变后刷新状态值

<code src="./demo/demo2.tsx" ></code>

<br />

### 消除useEffect陷阱

再看看下面这个例子，消除`useEffect陷阱`。

如果不在`useEffect`第二个参数里面添加count状态的依赖，则handleResize中获取的count不会被更新，但是handleResize被`useNextTick`修饰后，就会获取最新count状态。

请点击count+1后，再次改变窗口大小就可以看出差别：

<code src="./demo/demo3.tsx" ></code>

使用`useNextTick`而不是在`useEffect`第二个参数里面添加count状态的依赖，这是一种新的思路。响应式的useEffect里面过多的状态依赖会形成一个状态依赖链，我们必须非常清楚状态的依赖的关系，然而`useNextTick`不会带来这种心智负担。
