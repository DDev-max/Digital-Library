/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useRef } from "react";

interface DebounceProps {
    callback: (...args: any[]) => void
    delay?: number
}

export function useDebounce({ callback, delay = 1000 }: DebounceProps) {
    const timer = useRef<ReturnType<typeof setTimeout> | null>(undefined);


    return useCallback(
        (...args: any[]) => {

            if (timer.current === null) return
            clearTimeout(timer.current);

            timer.current = setTimeout(() => {
                callback(...args);
            }, delay);
        },
        [callback, delay]
    );
}





