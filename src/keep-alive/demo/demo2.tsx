import React, { useMemo, useState } from 'react';
import { AliveScope, KeepAlive } from 'react-vueable';
import { ComponentA, ComponentB } from './TestComponent';

const Demo2 = () => {
  const [index, setIndex] = useState(0);
  const [isShow, setIsShow] = useState(true);
  const Component = useMemo(
    () => ({ 0: ComponentA, 1: ComponentB })[index]!,
    [index],
  );

  return (
    <div>
      <label>
        <input
          type="radio"
          checked={index === 0}
          onChange={() => setIndex(0)}
        />
        A
      </label>
      <label>
        <input
          type="radio"
          checked={index === 1}
          onChange={() => setIndex(1)}
        />
        B
      </label>
      {isShow && (
        <KeepAlive>
          <Component key={index} />
        </KeepAlive>
      )}
      <div>
        <button type="button" onClick={() => setIsShow(!isShow)}>
          Show/Hide
        </button>
      </div>
    </div>
  );
};

export default () => {
  return (
    <AliveScope>
      <Demo2 />
    </AliveScope>
  );
};
