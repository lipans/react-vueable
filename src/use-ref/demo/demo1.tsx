import React from 'react';
import { useRef } from 'react-vueable';

export default () => {
  const ref = useRef({ a: 10 });

  const hanldeClick = () => {
    ref.value.a = ref.value.a + 1;
  }

  return (
    <div>
      <p>
        ref.value:<span id="count">{ref.value.a}</span>
      </p>
      <button type="button" onClick={hanldeClick}>
        ref.value + 1
      </button>
    </div>
  );
};
