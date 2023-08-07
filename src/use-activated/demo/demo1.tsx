import React, { useMemo, useState } from 'react';
import { KeepAlive, useActivated } from 'react-vueable';

const ComponentA = () => {
  useActivated(() => console.log('ComponentA activated'));
  return <div>Current component: A</div>;
};

const ComponentB = () => {
  useActivated(() => console.log('ComponentB activated'));
  return <div>Current component: B</div>;
};

export default () => {
  const [index, setIndex] = useState(0);
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
      <KeepAlive>
        <Component key={index} />
      </KeepAlive>
    </div>
  );
};
