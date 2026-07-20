import { useRef as useReactRef, useState } from 'react';

import createReactive from '../shared/reactive';

function useRef<T extends object>(initialValue: T) {
  const isFirstRef = useReactRef(true);

  const [, triggerRender] = useState(false);

  const reactRef = useReactRef<T>(initialValue);

  if (isFirstRef.current) {
    reactRef.current = createReactive(reactRef.current, () => triggerRender((prev) => !prev));

    isFirstRef.current = false;
  }

  return { value: reactRef.current! };
}

export default useRef;
