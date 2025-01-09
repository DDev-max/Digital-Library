// import type { UserSearchState } from "data/types";
// import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"

// interface submitSearchProps extends UserSearchState{
//     event: React.FormEvent<HTMLFormElement>
//     router: AppRouterInstance
//     inputRef:  React.RefObject<HTMLInputElement>
// }

// //no hace falta?

// export function subtmitSearch({event,router,userSearch, setUserSearch,inputRef}: submitSearchProps) {
//   console.log("enviaoo");
  

//     event.preventDefault()
//     //no me acuerdo pq lo quito y lo pongo
//     inputRef.current?.focus()
    
    
//     if (!userSearch) return

//     router.push(`/Read/${userSearch}`)
//     setUserSearch("")

//     inputRef.current?.blur()



//   }