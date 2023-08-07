import React, { useRef, useState } from 'react';
import { useUpdated } from 'react-vueable';

export default () => {
  const [count, setCount] = useState(0);
  const divRef = useRef<HTMLDivElement>(null);

  useUpdated(() => {
    if (divRef.current) divRef.current.innerText = `On Updated; count:${count}`;
  });
  
  return (
    <>
      <div ref={divRef}></div>
      <button type="button" onClick={() => setCount(prev => prev + 1)}>
        count+1
      </button>
    </>
  );
};
