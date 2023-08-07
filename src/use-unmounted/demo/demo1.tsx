import React, { useRef, useState } from 'react';
import { useUnmounted } from 'react-vueable';

const MyComponent = ({ onUnmounted }: { onUnmounted: () => void }) => {
  useUnmounted(onUnmounted);

  return <div>My Component</div>;
};

export default () => {
  const [visible, setVisible] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  const onUnmounted = () => {
    if (!ref.current) return;
    const refDiv = ref.current;
    refDiv.innerText = 'My component on unmounted!';
    setTimeout(() => (refDiv.innerText = ''), 2000);
  };

  return (
    <>
      {visible && <MyComponent onUnmounted={onUnmounted} />}
      <button type="button" onClick={() => setVisible((prev) => !prev)}>
        {visible ? 'unmount' : 'mount'}
      </button>
      <div ref={ref}></div>
    </>
  );
};
