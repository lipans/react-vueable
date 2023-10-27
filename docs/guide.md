# Guide

## Introduction

`react-vueable`, as the name suggests, it provides the possibility of developing in react using vue-like. It provides support for `Reactivity status` life cycle hooks `KeepAlive`, `nextTick` etc.

## Try it online

Here are a few basic examples to give you a quick overview `react-vueable` of the functionality.

- Reactivity status: <a href='https://codesandbox.io/s/yw4c6k?file=/App.tsx' target='_blank'>Online Demo</a>
- KeepAlive: <a href='https://codesandbox.io/s/3f8thv?file=/App.tsx' target='_blank'>Online Demo</a>
- nextTick: <a href='https://codesandbox.io/s/yz8zx6?file=/App.tsx' target='_blank'>Online Demo</a>
- useWatch: <a href='https://codesandbox.io/s/ggrrk8?file=/App.tsx' target='_blank'>Online Demo</a>

## 📦 Installation

```bash
$ npm install --save react-vueable
# or
$ yarn add react-vueable
# or
$ pnpm add react-vueable
```

## 🔨 Use

```js
import { KeepAlive, useActivated, useDeactivated } from 'react-vueable';
```
