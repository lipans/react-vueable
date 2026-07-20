---
group:
  title: status
  order: 2
---

# useReactive

返回一个对象的深层响应式代理。嵌套对象和数组会被惰性代理，因此 `state.list[0].count++`、`state.obj.a = 1`、`arr.push(...)`、`delete state.key` 等原地变更都会触发重新渲染。

> 内置对象（`RegExp`、`Date`、`Map`、`Set`、类实例等）会保持原样、不做深层响应式处理，因为代理它们会破坏其内部方法调用。

<code src="./demo/demo1.tsx" ></code>

这是一个示例，根据两个不同接口数据生成`viewdatas`并展示。

<code src="./demo/demo2.tsx" ></code>

<code src="./demo/demo3.tsx" debug ></code>
