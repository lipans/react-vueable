---
group:
  title: status
  order: 2
---

# useReactive

Returns a deeply reactive proxy for an object. Nested objects and arrays are proxied lazily, so in-place mutations such as `state.list[0].count++`, `state.obj.a = 1`, `arr.push(...)` and `delete state.key` all trigger a re-render.

> Built-in exotic objects (`RegExp`, `Date`, `Map`, `Set`, class instances, etc.) are kept as-is and are not made deeply reactive, since proxying them would break their internal method calls.

<code src="./demo/demo1.tsx" ></code>

This is an example of generating and displaying `viewdatas` based on data from two different API interfaces.

<code src="./demo/demo2.tsx" ></code>

<code src="./demo/demo3.tsx" debug ></code>
