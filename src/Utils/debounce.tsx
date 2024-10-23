import { DebounceProps } from "../data/types";

export function debounce({callback,delay= 1000}: DebounceProps) {
    let timer: number;

    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (...args: any[])=>{
        clearTimeout(timer)

        timer = setTimeout(() => {
            callback(...args)
        }, delay);

    }
}

