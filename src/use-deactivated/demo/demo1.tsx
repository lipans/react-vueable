import React, { useMemo, useState } from 'react';
import { KeepAlive, useDeactivated } from 'react-vueable';

const ComponentA = () => {
  useDeactivated(() => console.log('ComponentA deactivated'));
  return <div>Current component: A</div>;
};

const ComponentB = () => {
  useDeactivated(() => console.log('ComponentB deactivated'));
  return <div>Current component: B</div>;
};

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
