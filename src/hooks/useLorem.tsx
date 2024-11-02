import { useQuery } from "@tanstack/react-query";
import { fetchFn } from "../Utils/fetchFn";
import { URLorem } from "../data/consts";

export function useLorem () {
    return useQuery({
        queryKey: ["LoremIpsum", URLorem],
        queryFn: ()=> fetchFn<string[]>(URLorem)
    })
 }