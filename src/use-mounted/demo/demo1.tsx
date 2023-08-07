import React, { useRef, useState } from 'react';
import { useMounted } from 'react-vueable';

const MyComponent = ({ onMounted }: { onMounted: () => void }) => {
  useMounted(onMounted);

  return <div>My Component</div>;
};

export default () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const onMounted = () => {
    if (!ref.current) return;
    const refDiv = ref.current;
    refDiv.innerText = 'My component on mounted!';
    setTimeout(() => (refDiv.innerText = ''), 2000);
  };

  return (
    <>
      {visible && <MyComponent onMounted={onMounted} />}
      <button type="button" onClick={() => setVisible((prev) => !prev)}>
        {visible ? 'hide' : 'show'}
      </button>
      <div ref={ref}></div>
    </>
  );
};
