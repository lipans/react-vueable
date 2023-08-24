import { useRef } from 'react';

type WatchCallback<T> = T extends [unknown] ? (value: T[0], oldValue: T[0]) => void : (value: T, oldValue: T) => void;

function useWatch<T extends [unknown, ...unknown[]]>(callback: WatchCallback<T>, deps: T) {
  const refDeps = useRef<T>();

  const judgeChange = () => {
    if (!refDeps.current) return true;
    if (refDeps.current.length !== deps.length) return true;
    for (let i = 0; i < deps.length; i++) {
      if (refDeps.current[i] !== deps[i]) return true;
    }
    return false;
  };

  if (judgeChange()) {
    const newValue: any = deps.length > 1 ? deps : deps[0];

    if (refDeps.current) {
      const oldValue: any = refDeps.current.length > 1 ? refDeps.current : refDeps.current[0];
      callback(newValue, oldValue);
    }

    refDeps.current = deps;
  }
}

export default useWatch;
