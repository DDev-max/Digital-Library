/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useRef } from "react";
import { DebounceProps } from "../data/types";

export function useDebounce({ callback, delay = 1000 }: DebounceProps) {
    const timer = useRef<ReturnType<typeof setTimeout> | null>(undefined);


    return useCallback(
        (...args: any[]) => {

            clearTimeout(timer.current);
            //PROBAR CON ESTO ADENTRO
            // if (timer.current) {
            //     clearTimeout(timer.current);
            // }

            timer.current = setTimeout(() => {
                callback(...args);
            }, delay);
        },
        [callback, delay] 
    );
}





