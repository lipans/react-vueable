import React, { ReactElement, useRef, useState } from 'react';
import { useNextTick, useWatch } from 'react-vueable';

interface KeepAliveProps {
  children: ReactElement;
}

const KeepAlive = (props: KeepAliveProps) => {
  const cachedChildrenRef = useRef<ReactElement[]>([]);

  const rootRef = useRef<HTMLDivElement>(null);

  const currentChild = useRef<ReactElement>();

  const [cachedElementMap] = useState<Map<React.Key, HTMLDivElement>>(
    new Map(),
  );

  const nextTick = useNextTick();
  useWatch(async () => {
    const children = props.children;
    if (!children) return;

    currentChild.current = cachedChildrenRef.current.find(
      (item) => item.key === children.key,
    );
    if (!currentChild.current) {
      cachedChildrenRef.current.push(children);
      currentChild.current = children;
    }

    await nextTick();

    if (!currentChild.current || !currentChild.current.key) return;
    const cachedElement = cachedElementMap.get(currentChild.current.key);
    if (!cachedElement) return;
    const firstElementChild = rootRef.current?.firstElementChild;
    if (firstElementChild) rootRef.current?.removeChild(firstElementChild);
    rootRef.current?.appendChild(cachedElement);
  }, [props.children]);

  const refCallback = (key: React.Key | null) => (element: HTMLDivElement) => {
    if (!key) return;

    if (!Array.from(cachedElementMap.keys()).includes(key) && element) {
      cachedElementMap.set(key, element);
    }
  };

  return (
    <div ref={rootRef}>
      <div style={{ display: 'none' }}>
        {cachedChildrenRef.current.map((child) => (
          <div key={child.key} ref={refCallback(child.key)}>
            {child}
          </div>
        ))}
      </div>
    </div>
  );
};

export default KeepAlive;
