import React, { useMemo, useState } from 'react';
import { KeepAlive } from 'react-vueable';
import { ComponentA, ComponentB } from './TestComponent';

export default () => {
  const [index, setIndex] = useState(0);
  const Component = useMemo(() => ({ 0: ComponentA, 1: ComponentB })[index]!, [index]);

  return (
    <div>
      <label>
        <input type="radio" checked={index === 0} onChange={() => setIndex(0)} />A
      </label>
      <label>
        <input type="radio" checked={index === 1} onChange={() => setIndex(1)} />B
      </label>
      <KeepAlive>
        <Component key={index} />
      </KeepAlive>
    </div>
  );
};
