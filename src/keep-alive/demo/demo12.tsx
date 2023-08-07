import React, { useState } from 'react';
import {
  AliveScope,
  KeepAlive,
  useActivated,
  useDeactivated,
} from 'react-vueable';

const Test = () => {
  useActivated(() => {
    console.log('lp:activeted');
  });
  useDeactivated(() => {
    console.log('lp:deActiveted');
  });
  return <div>Test</div>;
};

export default () => {
  const [index, setIndex] = useState(0);
  const [count, setCount] = useState(0);
  return (
    <AliveScope>
      <div>
        <div>index:{index}</div>
        <div>count:{count}</div>
        <KeepAlive>
          <div key={index}>
            <Test />
            <div>{count}</div>
            <button
              type="button"
              onClick={() => {
                console.log('lp:count click', count);
                setCount(count + 1);
              }}
            >
              count+1
            </button>
            <button
              type="button"
              onClick={() => {
                console.log('lp:index click', index);
                setIndex(index + 1);
              }}
            >
              index+1
            </button>
          </div>
        </KeepAlive>
        <button
          type="button"
          onClick={() => {
            console.log('lp:count click', count);
            setCount(count + 1);
          }}
        >
          count+1
        </button>
      </div>
    </AliveScope>
  );
};
