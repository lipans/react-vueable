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
  const tickParamRef = useRef<{
    resolve: (value: T extends (...args: any[]) => any ? ReturnType<T> : void) => void;
    reject: (reason?: any) => void;
    args: T extends (...args: any[]) => any ? Parameters<T> : [];
  }>();
  const [tickStatus, triggerTick] = useState(false);

  const nextTick = useCallback(function (...args: T extends (...args: any[]) => any ? Parameters<T> : []) {
    const resultPromise = new Promise<void>((resolve, reject) => {
      tickParamRef.current = { resolve, reject, args };
    });
    triggerTick((prev) => !prev);
    return resultPromise;
  }, []);

  const onTick = useCallback(async () => {
    if (!tickParamRef.current) return;
    const tickParam = tickParamRef.current;
    tickParamRef.current = undefined;
    try {
      if (!tick) {
        (tickParam.resolve as () => void)();
        return;
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
  }, [tick]);

  useEffect(() => {
    onTick();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tickStatus]);

  return nextTick;
}
