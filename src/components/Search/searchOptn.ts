import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import type { UserSearchState } from "data/types"


 interface SearchOptnProps extends Pick<UserSearchState, "setUserSearch">{
    bookName: string,
    router: AppRouterInstance
    inputRef:  React.RefObject<HTMLInputElement>
}

export function searchOptn({bookName, router,inputRef,setUserSearch}: SearchOptnProps) {
    console.log("opcion clickada");
    
    //quitar
    inputRef.current?.focus()

    setUserSearch("")
    // const urlBook = urlConversion({title: bookName})
    const urlBook = encodeURIComponent(bookName)
    router.push(`/Read/${urlBook}`)

    inputRef.current?.blur()



}
