import React from 'react';
import { useReactive } from 'react-vueable';

interface State {
  count: number;
  msg: string;
}

export default () => {
  const state = useReactive<State>({ count: 0, msg: 'hello world!' });

  const hanldeClick = () => {
    state.count++;
  };

  return (
    <div>
      <div>
        {state.msg} count:{state.count}
      </div>
      <button type="button" onClick={hanldeClick}>
        count+1
      </button>
    </div>
  );
};
