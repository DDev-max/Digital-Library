import type { Dispatch, SetStateAction } from "react";

interface DebounceCallBackProps{
    e: React.KeyboardEvent<HTMLInputElement>
    setFetchNow: Dispatch<SetStateAction<boolean>>

}

export const debounceCallBack = ({e,setFetchNow}: DebounceCallBackProps) => {
    if (!(e.target as HTMLInputElement).value) return

    if (e.key.length === 1 || e.key === "Backspace") {
        setFetchNow(true);
    }
    
}
