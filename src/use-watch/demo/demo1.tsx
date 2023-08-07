import React, { useRef, useState } from 'react';
import { useWatch } from 'react-vueable';

export default () => {
  const [a, setA] = useState(8);
  const [b, setB] = useState(10);

  const refMsg = useRef('');

  useWatch(
    (newA, oldA) => {
      refMsg.current = `[watch] newA:${newA}; oldA:${oldA}`;
    },
    [a],
  );

  const hanldeClickA = () => {
    setA((prev) => prev + 1);
  };

  const hanldeClickB = () => {
    setB((prev) => prev + 1);
  };

  return (
    <>
      <span>
        a:{a}; b:{b}
      </span>
      <div>{refMsg.current}</div>
      <button type="button" onClick={hanldeClickA}>
        change A
      </button>
      <button type="button" onClick={hanldeClickB}>
        change B
      </button>
    </>
  );
};
