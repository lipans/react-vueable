import React, { useCallback, useState } from 'react';
import { useNextTick } from 'react-vueable';

export default () => {
  const [count, setCount] = useState(0);
  const nextTick = useNextTick();

  const hanldeClick = useCallback(async () => {
    setCount((prev) => prev + 1);
    const countBeforeRenderDom = document.getElementById('count_before_render');
    if (countBeforeRenderDom) countBeforeRenderDom.innerText = document.getElementById('count')?.innerText || '';
    await nextTick();
    const countAfterRenderDom = document.getElementById('count_after_render');
    if (countAfterRenderDom) countAfterRenderDom.innerText = document.getElementById('count')?.innerText || '';
  }, []);

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>react state count:</td>
            <td><span id="count">{count}</span></td>
          </tr>
          <tr>
            <td>count before render:</td>
            <td><span id="count_before_render">0</span></td>
          </tr>
          <tr>
            <td>count after render:</td>
            <td><span id="count_after_render">0</span></td>
          </tr>
        </tbody>
      </table>

      <button type="button" onClick={hanldeClick}>
        count+1
      </button>
    </div>
  );
};
