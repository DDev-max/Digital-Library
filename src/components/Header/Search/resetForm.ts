import type { Dispatch, RefObject, SetStateAction } from "react"

interface ResetFormProps{
    e: MouseEvent
    searchRef: RefObject<HTMLElement>
    setUserSearch: Dispatch<SetStateAction<string>>
}

export function resetForm({e,searchRef,setUserSearch}:ResetFormProps) {
    const targetIsNode = e.target instanceof Node

    if (targetIsNode && !searchRef.current?.contains(e.target)) setUserSearch("")
}
