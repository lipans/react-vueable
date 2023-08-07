import React, { useState } from 'react';
import { useUnmounted } from 'react-vueable';

const Child = () => {
  useUnmounted(() => {
    console.log('Child Unmounted');
  });

  return <div>child</div>;
};

const Parent = () => {
  useUnmounted(() => {
    console.log('Parent Unmounted');
  });

  return (
    <div>
      {' '}
      <Child />
    </div>
  );
};

export default () => {
  const [visible, setVisible] = useState(true);
  return (
    <>
      {visible && <Parent />}
      <button type="button" onClick={() => setVisible((prev) => !prev)}>
        {visible ? 'unmount' : 'mount'}
      </button>
    </>
  );
};
