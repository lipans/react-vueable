---
nav:
  title: API
  order: 1
---

# useNextTick

A hook that waits for the next DOM update to be executed. It implements `nextTick` function similar to the Vue3 API.

When you use `setState` or otherwise change the value of the responsive state in react, the change in the state value and the update of the DOM are not executed immediately. Instead, `useNextTick` return a function, which will be executed after status and DOM updates.

## Basic Usage

When using 'useNextTick' directly without tick function (useNextTick has no parameters), a 'nextTick' function is returned, which is basically the same as the Vue3 'nextTick' API.

```js
const nextTick = useNextTick();
```

<br />

<code src="./demo/demo1.tsx" ></code>

## Refresh Status

If 'useNextTick' has parameters, then it becomes the 'tick' function just like using 'useCallback' or 'useMemo'. The 'tick' function will be executed after the nextTick because all states will be updated after the nextTick, so the state that the 'tick' function depends on will be the latest.

```js
const withNextTick = useNextTick(() => {
  // tick function
});
```

### Refresh The Status Value After The Status Changes

<code src="./demo/demo2.tsx" ></code>

<br />

### Eliminate useEffect Traps

Let's take a look at the following example again to eliminate the `useEffect trap`.

If a count state dependency is not added in the second parameter of `useEffect`, the count obtained in handleResize will not be updated, but after handleResize is decorated with `useNextTick`, the latest count state will be obtained.

Please click on count+1 and change the window size again to see the difference:

<code src="./demo/demo3.tsx" ></code>

Using `useNextTick` instead of adding a count state dependency in the second parameter of `useEffect` is a new approach. Excessive state dependencies in a responsive useEffect can form a state dependency chain, and we must be very clear about the relationship between state dependencies. However, `useNextTick` does not bring such a mental burden.
