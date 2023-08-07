import React from 'react';
import { useReactive } from 'react-vueable';

export default () => {
  const state = useReactive({ a: 10 });

  const hanldeClick = () => {
    state.a = state.a + 1;
  }

  return (
    <div>
      <p>
        state.a:<span id="count">{state.a}</span>
      </p>
      <button type="button" onClick={hanldeClick}>
        state.a + 1
      </button>
    </div>
  );
};
