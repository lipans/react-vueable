import { useRef as useReactRef, useState } from 'react';

function useReactive<T extends object>(initialValue: T) {

    const [, triggerRender] = useState({});

    const reactRef = useReactRef<T>(initialValue);

    if (reactRef.current === initialValue) {

        reactRef.current = new Proxy<T>(reactRef.current, {
            get(target, key) {
                return Reflect.get(target, key);
            },
            set(target, key, value) {
                triggerRender({});
                return Reflect.set(target, key, value);
            }
        });
    }

    return reactRef.current
}

export default useReactive;
