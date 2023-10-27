---
group:
  title: keep-alive
  order: 2
---

# KeepAlive

Cache several instances of subcomponents wrapped within it. It can only have one sub component and must have one `key`, with different `keys` representing different cache instances.

## Basic Usage

```js
<KeepAlive>
  <Component key={index} />
</KeepAlive>
```

<code src="./demo/demo1.tsx"></code>

After switching from A to B, the instance of component A will automatically cache and all its states will be preserved.

## AliveScope

`AliveScope` is used to wrap several `KeepAlive`s. When not wrapped by `AliveScope`, the cache node is stored under the `KeepAlive` root node by default. This is consistent with Vue3's implementation. But if the `KeepAlive` node is destroyed, the cache will also be recycled. Using `AliveScope` can improve the position of the cache node in the Dom node. Even if the `KeepAlive` node is destroyed, the cache is still there.

<code src="./demo/demo2.tsx" ></code>

## Route Cache

If `KeepAlive` is used to wrap react routing, the wrapped page will be cached after leaving. This example cannot be previewed directly, please click to open the preview effect in codesandbox.

<code src="./demo/demo3.tsx" iframe="0" ></code>

## Multi-level Cache

This example shows a complex usage scenario. There are multiple types of `KeepAlives` in `AliveScope`, and they are in different tabs, or in a nested relationship.

<code src="./demo/demo4.tsx" ></code>

<code src="./demo/demo11.tsx" debug ></code>

<code src="./demo/demo12.tsx" debug ></code>

<code src="./demo/demo13.tsx" debug ></code>
