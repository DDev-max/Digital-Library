import { submitSearchProps } from "../../data/types"

export function subtmitSearch({event,redirect,userSearch, setUserSearch,inputRef}: submitSearchProps) {

    event.preventDefault()
    
    inputRef.current?.focus() //place the cursor
    
    
    if (!userSearch) return
    console.log("submiteado");

    redirect(`/Read/${userSearch}`)
    setUserSearch("")

    inputRef.current?.blur()



  }