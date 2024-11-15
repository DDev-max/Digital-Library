import { useQuery } from "@tanstack/react-query";
import { fetchFn } from "../Utils/fetchFn";
import { BooksAPI } from "../data/types";
import { API_URL } from "../data/consts";

export function useBooks(){

    return useQuery({
        queryKey: ["books", API_URL],
        queryFn: () => fetchFn<BooksAPI>({URL: API_URL}),//API URL
        
    })
}