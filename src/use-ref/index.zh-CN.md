---
group:
  title: status
  order: 1
---

# useRef

接受一个内部值，返回一个深层响应式的、可更改的 ref 对象，此对象只有一个指向其内部值的属性 `.value`。嵌套对象和数组会被惰性代理，因此对 `.value` 内部的原地变更（如 `ref.value.list[0].count++` 或 `ref.value.arr.push(...)`）也会触发重新渲染。

> 内置对象（`RegExp`、`Date`、`Map`、`Set`、类实例等）会保持原样、不做深层响应式处理，因为代理它们会破坏其内部方法调用。

<code src="./demo/demo1.tsx" ></code>
