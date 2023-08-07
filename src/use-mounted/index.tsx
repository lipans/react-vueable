import { useEffect } from 'react';


function useMounted(callback: () => void) {
    useEffect(callback, []);
}

export default useMounted;
