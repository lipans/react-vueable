import { useEffect, useRef } from 'react';

function useUpdated(callback: () => void) {
    const isFirstRef = useRef(true);
    useEffect(() => {
        if (isFirstRef.current) {
            isFirstRef.current = false;
            return;
        }
        callback();
    });
}

export default useUpdated;
