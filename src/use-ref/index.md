---
group:
  title: status
  order: 1
---

# useRef

Accepts an internal value and returns a deeply reactive, mutable ref object with a single property `.value` that points to its internal value. Nested objects and arrays are proxied lazily, so in-place mutations inside `.value` (such as `ref.value.list[0].count++` or `ref.value.arr.push(...)`) also trigger a re-render.

> Built-in exotic objects (`RegExp`, `Date`, `Map`, `Set`, class instances, etc.) are kept as-is and are not made deeply reactive, since proxying them would break their internal method calls.

<code src="./demo/demo1.tsx" ></code>
