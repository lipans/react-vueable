/**
 * Determine whether a value can be deeply proxied.
 *
 * Only plain objects and arrays are proxied. Built-in exotic objects such as
 * `RegExp`, `Date`, `Map`, `Set` and class instances are returned as-is,
 * because wrapping them in a `Proxy` breaks internal-slot access (e.g.
 * `regexp.test()` would throw a `TypeError`).
 */
function isReactivable(value: unknown): value is object {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  if (Array.isArray(value)) {
    return true;
  }

  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
}

/**
 * Create a deeply reactive proxy for `target`.
 *
 * Nested objects and arrays are proxied lazily on access, so in-place mutations
 * like `state.list[0].count++`, `state.obj.a = 1`, `arr.push(...)` and
 * `delete state.key` all invoke `onChange`.
 *
 * @param target   The object to make reactive.
 * @param onChange Called whenever a tracked mutation happens.
 */
function createReactive<T extends object>(target: T, onChange: () => void): T {
  const proxyCache = new WeakMap<object, object>();

  const reactive = <V extends object>(value: V): V => {
    const cached = proxyCache.get(value);
    if (cached) {
      return cached as V;
    }

    const proxy = new Proxy(value, {
      get(t, key, receiver) {
        const result = Reflect.get(t, key, receiver);
        return isReactivable(result) ? reactive(result) : result;
      },
      set(t, key, newValue, receiver) {
        const oldValue = Reflect.get(t, key, receiver);
        const result = Reflect.set(t, key, newValue, receiver);
        if (!Object.is(oldValue, newValue)) {
          onChange();
        }
        return result;
      },
      deleteProperty(t, key) {
        const had = Object.prototype.hasOwnProperty.call(t, key);
        const result = Reflect.deleteProperty(t, key);
        if (had && result) {
          onChange();
        }
        return result;
      },
    });

    proxyCache.set(value, proxy);
    return proxy;
  };

  return reactive(target);
}

export default createReactive;
