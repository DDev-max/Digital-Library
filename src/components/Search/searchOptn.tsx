import { SearchOptnProps } from "../../data/types"
import { urlConversion } from "../../Utils/urlConversion"


export function searchOptn({bookName, redirect,inputRef,setUserSearch}: SearchOptnProps) {


    inputRef.current?.focus()

    setUserSearch("")
    const urlBook = urlConversion({title: bookName})
    redirect(`/Read/${urlBook}`)

    inputRef.current?.blur()



}
