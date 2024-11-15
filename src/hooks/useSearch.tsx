import { useQuery } from "@tanstack/react-query";
import { fetchFn } from "../Utils/fetchFn";
import { BooksAPISearch, UseSearchProps } from "../data/types";


export function useSearch({URL,fetchNow,setFetchNow}: UseSearchProps){


    return useQuery({
        queryKey: ["searchBooks"],
        queryFn: ()=> fetchFn<BooksAPISearch>({URL,setFetchNow}), 
        enabled: fetchNow,
    })

}