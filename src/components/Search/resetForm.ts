// import type { QueryClient } from "@tanstack/react-query"
// import type { UserSearchState } from "data/types"

// interface ResetFormProps extends Pick<UserSearchState, "setUserSearch">{
//     setOptnIdx:  React.Dispatch<React.SetStateAction<number>>
//     queryClient: QueryClient
// }


// export function resetForm({setUserSearch, setOptnIdx, queryClient}: ResetFormProps){
//     setUserSearch("")
//     setOptnIdx(-1)
//     queryClient.removeQueries({queryKey: ["searchBooks"]})

//     console.log("form reseteado");
    
// }