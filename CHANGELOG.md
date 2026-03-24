# 更新日志

## 2.0.2 (2026-3-24)

- 维护注释信息

## v2.0.1 (2025-12-26)

- 修复类型导出错误

## v2.0.0 (2025-12-24)

## v2.0.0-alpha.0 (2025-6-24)

- 修改了 `debounce` 和 `throttle` 方法的参数类型，该更改可能导致不兼容
- 修改 `isNode` 校验方式，防止在基于 'chromium' 浏览器插件的后台应用中校验错误

## v1.0.13-beta.5 (2025-9-12)

修复在无法使用 `globalThis.crypto.getRandomValues` 环境下获取随机字符串的长度错误

## v1.0.13-beta.4 (2025-9-12)

for weChatMiniProgram

## v1.0.13-beta.3 (2025-9-12)

for weChatMiniProgram

## v1.0.13-beta.2 (2025-9-11)

for weChatMiniProgram

## v1.0.13-beta.1 (2025-9-11)

for weChatMiniProgram

## v1.0.13-beta.0 (2025-9-7)

for weChatMiniProgram

## v1.0.12 (2025-8-4)

- 移除 `arguments` 在原型上的使用，因为在大多数时候，会编译成严格模式，导致报错

```bash
    constructor.prototype.arguments = Function.arguments;
                                               ^

TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them
```

## v1.0.11 (2025-8-4)

- 在使用 `createConstructor` 在 webpack 的环境下，发现非标准的函数对象的原型被写了，导致出现了使用函数原型异常的现象。但是为了统一处理，在 `createConstructor` 强制为原型设置原型方法。

## v1.0.10 (2025-7-26)

- 整理文档

## v1.0.10-test.0 (2025-7-24)

- 么事，测试 pnpm 发布

## v1.0.9 (2025-7-19)

- 修复已知问题

## v1.0.8 (2025-7-18)

- 优化了使用 `createConstructor` 的类型声明

## v1.0.7 (2025-7-11)

- 使用 `getRandomString` 时判断是否是浏览器环境，环境判定有误，导致使用 `window.crypto` 使用有误。仙子啊直接使用 `globalThis.crypto` 而非环境判定。

## v1.0.6 (2025-7-9)

- 更新了 `debounce` 和 `throttle` 的回调类型

## v1.0.5 (2025-6-24)

修改 `debounce` 和 `throttle` 的第二参数

## v1.0.13-beta.5 (2025-9-12)

修复在无法使用 `globalThis.crypto.getRandomValues` 环境下获取随机字符串的长度错误

## v1.0.13-beta.4 (2025-9-12)

for weChatMiniProgram

## v1.0.13-beta.3 (2025-9-12)

for weChatMiniProgram

## v1.0.13-beta.2 (2025-9-11)

for weChatMiniProgram

## v1.0.13-beta.1 (2025-9-11)

for weChatMiniProgram

## v1.0.13-beta.0 (2025-9-7)

for weChatMiniProgram

## v1.0.12 (2025-8-4)

- 移除 `arguments` 在原型上的使用，因为在大多数时候，会编译成严格模式，导致报错

```bash
    constructor.prototype.arguments = Function.arguments;
                                               ^

TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them
```

## v1.0.11 (2025-8-4)

- 在使用 `createConstructor` 在 webpack 的环境下，发现非标准的函数对象的原型被写了，导致出现了使用函数原型异常的现象。但是为了统一处理，在 `createConstructor` 强制为原型设置原型方法。

## v1.0.10 (2025-7-26)

- 整理文档

## v1.0.10-test.0 (2025-7-24)

- 么事，测试 pnpm 发布

## v1.0.9 (2025-7-19)

- 修复已知问题

## v1.0.8 (2025-7-18)

- 优化了使用 `createConstructor` 的类型声明

## v1.0.7 (2025-7-11)

- 使用 `getRandomString` 时判断是否是浏览器环境，环境判定有误，导致使用 `window.crypto` 使用有误。仙子啊直接使用 `globalThis.crypto` 而非环境判定。

## v1.0.6 (2025-7-9)

- 更新了 `debounce` 和 `throttle` 的回调类型

## v1.0.5 (2025-6-24)

修改 `debounce` 和 `throttle` 的第二参数

## v1.0.2 (2025-6-19)

- 移除了 `createConstructor` 这个鸡肋

## v1.0.1 (2025-6-15)

- 文档维护

## v1.0.0 （5 🈷️ 24 日 2025 年）

- 没有说明，莫名其妙的更新
