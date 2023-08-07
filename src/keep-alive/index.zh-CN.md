---
group:
  title: keep-alive
  order: 2
---

# KeepAlive

缓存包裹在其中的子组件的若干个实例。它只能有一个子组件，并且必须有一个`key`，不同的`key`代表不同的缓存实例。

## 基本用法

```js
<KeepAlive>
  <Component key={index} />
</KeepAlive>
```

<code src="./demo/demo1.tsx"></code>

从A切换到B后，A组件的实例将会自动缓存，它所有状态都会保留。

## AliveScope

`AliveScope`用来包裹若干个`KeepAlive`。没有被`AliveScope`包裹时，缓存节点默认存储`KeepAlive`根节点下面。这和Vue3的实现一致。但如果`KeepAlive`节点被销毁了，缓存会也被回收。使用`AliveScope`可以提升缓存节点在Dom节点中的位置，即使`KeepAlive`节点被销毁了，缓存依然还在。

<code src="./demo/demo2.tsx" ></code>

## 路由缓存

如果用`KeepAlive`去包裹react路由，则被包裹的页面在离开后会被缓存。这个示例无法直接预览，请点击在codesandbox中打开预览效果。

<code src="./demo/demo3.tsx" iframe="0" ></code>

## 多级缓存

这个示例展示了一种复杂的使用场景，在`AliveScope`里面有多种类型的`KeepAlive`, 他们分别在不同的tab里面，或者是嵌套关系。

<code src="./demo/demo4.tsx" ></code>

<code src="./demo/demo11.tsx" debug ></code>

<code src="./demo/demo12.tsx" debug ></code>

<code src="./demo/demo13.tsx" debug ></code>
