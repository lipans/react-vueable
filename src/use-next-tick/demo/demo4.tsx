import React, { useCallback, useState } from 'react';
import { useNextTick } from 'react-vueable';

export default () => {
  const [count, setCount] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  // The tick function reads the latest count after the DOM has updated.
  const nextTick = useNextTick((label: string) => {
    if (label === 'tick-2') {
      throw new Error('tick-2 error');
    }

    return `${label} → count=${count}`;
  });

  const hanldeClick = useCallback(async () => {
    setCount((prev) => prev + 1);

    // Call nextTick multiple times within the same render batch.
    // All ticks run once after the next DOM update and every Promise resolves.
    const results = await Promise.all([
      nextTick('tick-1'),
      nextTick('tick-2').catch((e) => e.message),
      nextTick('tick-3'),
    ]);

    setLogs(results);
  }, [nextTick]);

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>react state count:</td>
            <td>
              <span>{count}</span>
            </td>
          </tr>
          <tr>
            <td>executed ticks:</td>
            <td>
              <span>{logs.length}</span>
            </td>
          </tr>
          <tr>
            <td>tick results:</td>
            <td>{logs.length ? logs.map((log) => <div key={log}>{log}</div>) : <span>-</span>}</td>
          </tr>
        </tbody>
      </table>
      <button type="button" onClick={hanldeClick}>
        count+1
      </button>
    </div>
  );
};
