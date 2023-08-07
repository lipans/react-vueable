import { useEffect } from 'react';

function useUnmounted(callback: () => void) {
    useEffect(() => callback, []);
}

export default useUnmounted;
