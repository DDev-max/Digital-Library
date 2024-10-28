import { submitSearchProps } from "../../data/types"

export function subtmitSearch({event,redirect,userSearch, setUserSearch,inputRef}: submitSearchProps) {
    event.preventDefault()
    console.log("submiteado");
    
    inputRef.current?.focus()

    
    if (!userSearch) return

    redirect(`/Read/${userSearch}`)
    setUserSearch("")

    inputRef.current?.blur()


  }