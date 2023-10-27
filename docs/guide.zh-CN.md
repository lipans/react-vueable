# 指南

## 简介

`react-vueable`, 顾名思义，它提供了以Vue的方式在react里面开发的可能性。它提供了`Reactivity status`、`KeepAlive`、`nextTick`、生命周期钩子等支持。

## 线上尝试

这里有几个个基本的例子，让你快速了解`react-vueable`的功能。

- 响应式状态：<a href='https://codesandbox.io/s/yw4c6k?file=/App.tsx' target='_blank'>在线体验</a>
- KeepAlive: <a href='https://codesandbox.io/s/3f8thv?file=/App.tsx' target='_blank'>在线体验</a>
- nextTick: <a href='https://codesandbox.io/s/yz8zx6?file=/App.tsx' target='_blank'>在线体验</a>
- useWatch: <a href='https://codesandbox.io/s/ggrrk8?file=/App.tsx' target='_blank'>在线体验</a>

## 📦 安装

```bash
$ npm install --save react-vueable
# or
$ yarn add react-vueable
# or
$ pnpm add react-vueable
```

## 🔨 使用

```js
import { KeepAlive, useActivated, useDeactivated } from 'react-vueable';
```
