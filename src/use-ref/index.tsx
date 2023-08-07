import { useRef as useReactRef, useState } from 'react';

function useRef<T extends object>(initialValue: T) {
  const isFirstRef = useReactRef(true);

  const [, triggerRender] = useState(false);

  const reactRef = useReactRef<T>(initialValue);

  if (isFirstRef.current) {
    reactRef.current = new Proxy<T>(reactRef.current, {
      get(target, key) {
        return Reflect.get(target, key);
      },
      set(target, key, value) {
        triggerRender((prev) => !prev);
        return Reflect.set(target, key, value);
      },
    });

    isFirstRef.current = false;
  }

  return { value: reactRef.current! };
}

export default useRef;
