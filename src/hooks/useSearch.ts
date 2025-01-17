import { useQuery } from "@tanstack/react-query";
import { getSearchBook } from "Utils/getSearchBooks/getSearchBook";


interface UseSearchProps {
    URL: string
    fetchNow: boolean
    setFetchNow: React.Dispatch<React.SetStateAction<boolean>>
}


export function useSearch({ URL, fetchNow, setFetchNow }: UseSearchProps) {

    return useQuery({
        queryKey: ["searchBooks"],
        queryFn: () => getSearchBook({setFetchNow,URL}),
        enabled: fetchNow
    })

}