import React, {
  ReactElement,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

interface CachedElement {
  reactElement: ReactElement;
  domElement?: HTMLDivElement;
  keepAliveContext?: KeepAliveContextType;
}

interface AliveScopeContextType {
  cachedMap: Map<React.Key, CachedElement>;
  setCachedMap: React.Dispatch<
    React.SetStateAction<Map<React.Key, CachedElement>>
  >;
}

interface KeepAliveContextType {
  onActivateds: (() => void)[];
  onDeactivateds: (() => void)[];
}

const AliveScopeContext = createContext<AliveScopeContextType | undefined>(
  undefined,
);
const KeepAliveContext = createContext<KeepAliveContextType | undefined>(
  undefined,
);

export const useActivated = (callback: () => void) => {
  const keepAliveContext = useContext(KeepAliveContext);
  if (!keepAliveContext) return;
  const index = keepAliveContext.onActivateds.findIndex(
    (activated) => activated.toString() === callback.toString(),
  );
  if (index > -1) keepAliveContext.onActivateds[index] = callback;
  else keepAliveContext.onActivateds.push(callback);
};

export const useDeactivated = (callback: () => void) => {
  const keepAliveContext = useContext(KeepAliveContext);
  if (!keepAliveContext) return;
  const index = keepAliveContext.onDeactivateds.findIndex(
    (deActivated) => deActivated.toString() === callback.toString(),
  );
  if (index > -1) keepAliveContext.onDeactivateds[index] = callback;
  else keepAliveContext.onDeactivateds.push(callback);
};

const CacheRenderer = ({
  cachedMap,
}: {
  cachedMap: Map<React.Key, CachedElement>;
}) => {
  const refCallback = (key: React.Key) => (element: HTMLDivElement) => {
    const cachedElement = cachedMap.get(key);
    if (cachedElement && element) cachedElement.domElement = element;
  };

  return (
    <div style={{ display: 'none' }}>
      {Array.from(cachedMap.entries()).map((item) => {
        const keepAliveContext =
          item[1].keepAliveContext ||
          (item[1].keepAliveContext = { onActivateds: [], onDeactivateds: [] });
        return (
          <div key={item[0]} ref={refCallback(item[0])}>
            <KeepAliveContext.Provider value={keepAliveContext}>
              {item[1].reactElement}
            </KeepAliveContext.Provider>
          </div>
        );
      })}
    </div>
  );
};

export const AliveScope: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cachedMap, setCachedMap] = useState<Map<React.Key, CachedElement>>(
    new Map(),
  );

  return (
    <AliveScopeContext.Provider value={{ cachedMap, setCachedMap }}>
      {children}
      <CacheRenderer cachedMap={cachedMap} />
    </AliveScopeContext.Provider>
  );
};

const KeepAlive: React.FC<{ children: ReactElement }> = ({ children }) => {
  const [privateCachedMap, setPrivateCachedMap] = useState<
    Map<React.Key, CachedElement>
  >(new Map());
  const { cachedMap: globalCachedMap, setCachedMap: setGlobalCachedMap } =
    useContext(AliveScopeContext) || {};
  const cachedMap = useMemo(
    () => globalCachedMap || privateCachedMap,
    [globalCachedMap, privateCachedMap],
  );
  const setCachedMap = useMemo(
    () => setGlobalCachedMap || setPrivateCachedMap,
    [setGlobalCachedMap],
  );
  const [activatedChanged, setActivatedChanged] = useState({});

  const ref = useRef<HTMLDivElement>(null);

  const lastKeyRef = useRef<React.Key>();

  useEffect(() => {
    if (!children.key) return;
    const cachedElement = cachedMap.get(children.key);
    if (!cachedElement) cachedMap.set(children.key, { reactElement: children });
    else cachedElement.reactElement = children;

    setCachedMap(new Map(cachedMap));

    if (lastKeyRef.current !== children.key) setActivatedChanged({});
    lastKeyRef.current = children.key;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children]);

  useEffect(() => {
    const noop = () => {};
    const rootElement = ref.current;
    if (!children.key || !rootElement) return noop;

    const cache = cachedMap.get(children.key);

    if (!cache?.domElement) return noop;

    while (cache.domElement.firstElementChild)
      rootElement.appendChild(cache.domElement.firstElementChild);
    cache.keepAliveContext?.onActivateds.forEach((onActivated) =>
      onActivated(),
    );

    return () => {
      if (!cache?.domElement) return;
      while (rootElement.firstElementChild)
        cache.domElement.appendChild(rootElement.firstElementChild);
      cache.keepAliveContext?.onDeactivateds.forEach((onDeactivated) =>
        onDeactivated(),
      );
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activatedChanged]);

  return (
    <>
      <div ref={ref} />
      {!globalCachedMap && <CacheRenderer cachedMap={cachedMap} />}
    </>
  );
};

export default KeepAlive;
