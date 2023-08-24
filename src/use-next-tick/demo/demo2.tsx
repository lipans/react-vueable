import React, { useCallback, useRef, useState } from 'react';
import { useNextTick } from 'react-vueable';

export default () => {
  const [count, setCount] = useState(0);

  const countRef = useRef<HTMLElement>(null);
  const getCountInNextTickHookRef = useRef<HTMLElement>(null);
  const getCountWithOutNextTickHookRef = useRef<HTMLElement>(null);

  const withOutNextTick = useCallback(async () => {
    const dom = getCountWithOutNextTickHookRef.current;
    if (dom) dom.innerText = String(count);
  }, [count]);

  const withNextTick = useNextTick(() => {
    const dom = getCountInNextTickHookRef.current;
    if (dom) dom.innerText = String(count);
  });

  const hanldeClick = useCallback(async () => {
    setCount((prev) => prev + 1);
    await withNextTick();
    await withOutNextTick();
  }, [withNextTick, withOutNextTick]);

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>react state count:</td>
            <td>
              <span ref={countRef}>{count}</span>
            </td>
          </tr>
          <tr>
            <td>get count state in nextTick hook:</td>
            <td>
              <span ref={getCountInNextTickHookRef}>0</span>
            </td>
          </tr>
          <tr>
            <td>get count state with out nextTick hook:</td>
            <td>
              <span ref={getCountWithOutNextTickHookRef}>0</span>
            </td>
          </tr>
        </tbody>
      </table>
      <button type="button" onClick={hanldeClick}>
        count+1
      </button>
    </div>
  );
};
