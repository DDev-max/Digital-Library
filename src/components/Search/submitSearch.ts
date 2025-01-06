import { submitSearchProps } from "../../data/types"

export function subtmitSearch({event,push,userSearch, setUserSearch,inputRef}: submitSearchProps) {

    event.preventDefault()
    
    inputRef.current?.focus()
    
    
    if (!userSearch) return

    push(`/Read/${userSearch}`)
    setUserSearch("")

    inputRef.current?.blur()



  }