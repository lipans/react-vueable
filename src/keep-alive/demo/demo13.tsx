import React, { ReactElement, useEffect, useRef, useState } from 'react';

const Test: React.FC<{ children?: ReactElement }> = () => {
  const ref = useRef<number>(0);

  const [a, setA] = useState(10);

  useEffect(() => {
    return () => {
      console.log('lp:ref', ref.current);
      ref.current = ref.current + 100;
    };
  }, [a]);

  return (
    <>
      <button type="button" onClick={() => setA(a + 10)}>
        a+10
      </button>
      <button type="button" onClick={() => ref.current++}>
        ref+1
      </button>
    </>
  );
};

export default () => {
  return (
    <div>
      <div>
        <Test />
      </div>
    </div>
  );
};
