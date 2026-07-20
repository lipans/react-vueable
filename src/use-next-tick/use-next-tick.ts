import { useCallback, useEffect, useRef, useState } from 'react';

type TickReturnType<T extends ((...args: any[]) => any) | undefined> = T extends (...args: any[]) => any
  ? ReturnType<T> extends Promise<any>
    ? ReturnType<T>
    : Promise<ReturnType<T>>
  : Promise<void>;

export default function useNextTick(): () => Promise<void>;
export default function useNextTick<T extends (...args: any[]) => any>(
  tick: T,
): (...args: Parameters<T>) => TickReturnType<T>;
export default function useNextTick<T extends ((...args: any[]) => any) | undefined>(tick?: T) {
  const tickQueueRef = useRef<
    Array<{
      resolve: (value: T extends (...args: any[]) => any ? ReturnType<T> : void) => void;
      reject: (reason?: any) => void;
      args: T extends (...args: any[]) => any ? Parameters<T> : [];
    }>
  >([]);
  const [tickStatus, triggerTick] = useState({});

  const nextTick = useCallback(function (...args: T extends (...args: any[]) => any ? Parameters<T> : []) {
    const resultPromise = new Promise<void>((resolve, reject) => {
      tickQueueRef.current.push({ resolve, reject, args });
    });
    triggerTick({});
    return resultPromise;
  }, []);

  const onTick = useCallback(async () => {
    if (!tickQueueRef.current.length) return;

    const tickQueue = tickQueueRef.current;
    tickQueueRef.current = [];
    for (const tickParam of tickQueue) {
      try {
        if (!tick) {
          (tickParam.resolve as () => void)();
          continue;
        }
        const tickResult = tick(...tickParam.args);
        if (tickResult instanceof Promise) {
          const result = await tickResult;
          tickParam.resolve(result);
        } else {
          tickParam.resolve(tickResult);
        }
      } catch (e: any) {
        tickParam.reject(e);
      }
    }
  }, [tick]);

  useEffect(() => {
    onTick();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tickStatus]);

  useEffect(() => {
    const tickQueueRefValue = tickQueueRef;
    return () => {
      // Reject pending ticks on unmount to avoid Promises hanging forever.
      tickQueueRefValue.current.forEach(({ reject }) =>
        reject(new Error('useNextTick: component unmounted before tick executed')),
      );
      tickQueueRefValue.current = [];
    };
  }, []);

  return nextTick;
}
