import { submitSearchProps } from "../../data/types"

export function subtmitSearch({event,redirect,userSearch, setUserSearch,inputRef}: submitSearchProps) {

    event.preventDefault()
    
    inputRef.current?.focus()
    
    
    if (!userSearch) return

    redirect(`/Read/${userSearch}`)
    setUserSearch("")

    inputRef.current?.blur()



  }