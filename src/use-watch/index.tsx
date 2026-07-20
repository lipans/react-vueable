import { useEffect, useRef } from 'react';

type WatchValue<T extends unknown[]> = T extends [unknown] ? T[0] : T;

type WatchCallback<T extends unknown[]> = (value: WatchValue<T>, oldValue: WatchValue<T>) => void;

function useWatch<T extends [unknown, ...unknown[]]>(callback: WatchCallback<T>, deps: T) {
  const refDeps = useRef<T>();
  const refCallback = useRef(callback);
  refCallback.current = callback;

  useEffect(() => {
    const prevDeps = refDeps.current;
    refDeps.current = deps;

    if (!prevDeps) return;

    const newValue = (deps.length > 1 ? deps : deps[0]) as WatchValue<T>;
    const oldValue = (prevDeps.length > 1 ? prevDeps : prevDeps[0]) as WatchValue<T>;
    refCallback.current(newValue, oldValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export default useWatch;
