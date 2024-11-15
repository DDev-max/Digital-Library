import { QueryClient } from "@tanstack/react-query"

export interface ResetFormProps{
    setUserSearch:   React.Dispatch<React.SetStateAction<string>>
    setOptnIdx:  React.Dispatch<React.SetStateAction<number>>
    queryClient: QueryClient
}

export function resetForm({setUserSearch, setOptnIdx, queryClient}: ResetFormProps){
    setUserSearch("")
    setOptnIdx(-1)
    queryClient.removeQueries({queryKey: ["searchBooks"]})
}