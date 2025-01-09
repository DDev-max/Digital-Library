import { useQuery } from "@tanstack/react-query";
import { fetchFn } from "../Utils/fetchFn";
import type { SearchBooksApi } from "../data/types";


interface UseSearchProps {
    URL: string
    fetchNow: boolean
    setFetchNow: React.Dispatch<React.SetStateAction<boolean>>
}


export function useSearch({ URL, fetchNow, setFetchNow }: UseSearchProps) {

    return useQuery({
        queryKey: ["searchBooks"],
        queryFn: () => fetchFn<SearchBooksApi>({ URL, setFetchNow }),
        enabled: fetchNow
    })

}