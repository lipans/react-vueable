# react-vueable

Vue3 emulation API called in the react function component

[![NPM version](https://img.shields.io/npm/v/react-vueable.svg?style=flat)](https://npmjs.org/package/react-vueable)
[![NPM downloads](http://img.shields.io/npm/dm/react-vueable.svg?style=flat)](https://npmjs.org/package/react-vueable)

## ✨ Features

- Most similar to Vue API, easy to learn and use
- Supports Vue reactive object, such as ref(), reactive()
- Written in TypeScript with predictable static types

## 📚 Homepage

- [https://react-vueable.surge.sh](https://react-vueable.surge.sh)

## 📦 Install

```bash
$ npm install --save react-vueable
# or
$ yarn add react-vueable
# or
$ pnpm add react-vueable
```

## 🔨 Usage

### useReactive

```tsx
import { useReactive } from 'react-vueable';

const state = useReactive<State>({ count: 0, msg: 'hello world!' });

state.count++;
```

[Open demo in CodeSandbox](https://codesandbox.io/s/yw4c6k?file=/App.tsx)

### KeepAlive

```tsx
import { KeepAlive } from 'react-vueable';

export default () => {
  const [index, setIndex] = useState(0);
  const Component = useMemo(
    () => ({ 0: ComponentA, 1: ComponentB })[index]!,
    [index],
  );

  return (
    <KeepAlive>
      <Component key={index} />
    </KeepAlive>
  );
};
```

[Open demo in CodeSandbox](https://codesandbox.io/s/3f8thv?file=/App.tsx)

### nextTick

```tsx
import { useCallback, useState } from 'react';
import { useNextTick } from 'react-vueable';

export default () => {
  const [count, setCount] = useState(0);
  const nextTick = useNextTick();

  const hanldeClick = useCallback(async () => {
    setCount((prev) => prev + 1);
    console.log(document.getElementById('count')?.innerText);
    await nextTick();
    console.log(document.getElementById('count')?.innerText);
  }, []);

  return (
    <div>
      <span id="count">{count}</span>
      <button type="button" onClick={hanldeClick}>
        count+1
      </button>
    </div>
  );
};
```

[Open demo in CodeSandbox](https://codesandbox.io/s/yz8zx6?file=/App.tsx)

### useWatch

```tsx
import { useWatch } from 'react-vueable';

useWatch(
  (newA, oldA) => {
    console.log(`[watch] newA:${newA}; oldA:${oldA}`);
  },
  [a],
);
```

[Open demo in CodeSandbox](https://codesandbox.io/s/ggrrk8?file=/App.tsx)

## LICENSE

MIT
