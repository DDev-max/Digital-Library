import { useRef } from "react";

interface DebounceProps {
    callback: (...args: unknown[]) => void
    delay?: number
}

export function useDebounce({ callback, delay = 1000 }: DebounceProps) {
    const timer = useRef<ReturnType<typeof setTimeout> | null>(undefined);

    console.log("DEBOUNCE");
    
    return (...args: unknown[]) => {
        console.log("RETURN");
        

        if (timer.current === null) return
        clearTimeout(timer.current);

        timer.current = setTimeout(() => {
            callback(...args);
        }, delay);
    }

    
}





