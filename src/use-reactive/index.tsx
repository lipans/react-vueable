import { useRef as useReactRef, useState } from 'react';

import createReactive from '../shared/reactive';

function useReactive<T extends object>(initialValue: T) {
  const [, triggerRender] = useState({});

  const reactRef = useReactRef<T>(initialValue);

  if (reactRef.current === initialValue) {
    reactRef.current = createReactive(reactRef.current, () => triggerRender({}));
  }

  return reactRef.current;
}

export default useReactive;
