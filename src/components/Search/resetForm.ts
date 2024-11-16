import { ResetFormProps } from "../../data/types"


export function resetForm({setUserSearch, setOptnIdx, queryClient}: ResetFormProps){
    setUserSearch("")
    setOptnIdx(-1)
    queryClient.removeQueries({queryKey: ["searchBooks"]})
}