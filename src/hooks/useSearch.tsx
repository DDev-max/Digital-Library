import { useQuery } from "@tanstack/react-query";
import { fetchFn } from "../Utils/fetchFn";
import { BooksAPISearch } from "../data/types";

export function useSearch(URL: string){
    
    return useQuery({
        queryKey: ["searchBooks", URL],
        queryFn: ()=> fetchFn<BooksAPISearch>(URL), 
        enabled: false,
    })

}