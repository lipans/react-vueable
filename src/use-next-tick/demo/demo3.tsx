import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNextTick } from 'react-vueable';

export default () => {
  const [count, setCount] = useState(0)

  const countRef = useRef<HTMLElement>(null);
  const getCountInNextTickHookRef = useRef<HTMLElement>(null);
  const getCountWithOutNextTickHookRef = useRef<HTMLElement>(null);

  const handleResizeInNextTick = useNextTick(() => {
    const dom = getCountInNextTickHookRef.current
    if (dom) dom.innerText = String(count);
  })

  const handleResizeWithOutNextTick = useCallback(() => {
    const dom = getCountInNextTickHookRef.current
    if (dom) dom.innerText = String(count);
  },[count])

  const handleResize =useCallback(()=>{
    handleResizeInNextTick();
    handleResizeWithOutNextTick();
  },[handleResizeInNextTick, handleResizeWithOutNextTick])

  useEffect(() => {
     window.addEventListener('resize', handleResize)
     return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div>
    <table>
      <tbody>
        <tr>
          <td>react state count:</td>
          <td><span ref={countRef}>{count}</span></td>
        </tr>
        <tr>
          <td>get count state in nextTick hook:</td>
          <td><span ref={getCountInNextTickHookRef}>0</span></td>
        </tr>
        <tr>
          <td>get count state with out nextTick hook:</td>
          <td><span ref={getCountWithOutNextTickHookRef}>0</span></td>
        </tr>
      </tbody>
    </table>
    <button type="button" onClick={() => setCount(count + 1)}>
      count+1
    </button>
  </div>
  );
}
