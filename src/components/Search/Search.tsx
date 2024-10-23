import { useQuery } from "@tanstack/react-query";
import { SearchSVG } from "../svg/SearchSVG";
import { BooksAPISearch } from "../../data/types";
import { nResults } from "../../data/consts";
import { useNavigate } from "react-router-dom";
import { useCallback, useRef, useState } from "react";
import { debounce } from "../../Utils/debounce";
import { subtmitSearch } from "./submitSearch";
import { selectOptn } from "./selectOptn";
import { inputChange } from "./inputChange";
import { fetchFn } from "../../Utils/fetchFn";


export function Search() {

    const [userSearch, setUserSearch] = useState("")
    const [optnIdx, setOptnIdx]   = useState(-1)
    const redirect = useNavigate()


    const {data, refetch, isLoading, isError} = useQuery({
        queryKey: ["searchBooks"],
        queryFn: ()=> fetchFn<BooksAPISearch>(""), //URL
        enabled: false
    })

    const URL =`https://www.googleapis.com/books/v1/volumes?q=${userSearch}&maxResults=${nResults}&fields=items(id,volumeInfo(title,authors))`


    
    const optnsRef =  useRef<(string | null)[]>([]);



    //VER SI SE PUEDE EVITAR
    const debounceCallback = useCallback(debounce({
        callback: ()=>{
            refetch()
        }
    }), [])




    return (
        <search className="header_search">
            <form 
            onSubmit={(event)=> subtmitSearch({event,redirect,userSearch})} 
            tabIndex={0} 
            onKeyDown={(event)=> selectOptn({debouncCb: debounceCallback, event,optnsRef,setOptnIdx,setUserSearch,userSearch})} className="header_form">

                <input 
                value={userSearch}
                onChange={(event)=> inputChange({debounceCb: debounceCallback,event,setUserSearch})}
                className="header_input" 
                aria-label="Search for a book" 
                placeholder="Search books"  
                type="text"
                />

                <div className="header_searchResults">
                {isLoading && <progress/>}
                {isError && <p>No matches</p>}

                    {!isError && data?.items.map((elmnt, idx)=>{return(
                        <p 
                        className={optnIdx === idx ? "header_searchResults--selected" :  ""}
                        key={elmnt.id} 
                        translate="no"
                        >

                            <span 
                            ref={(title)=> optnsRef.current[idx] = title?.textContent || ""}
                            className="header_searchResults_title"
                            >
                                {elmnt.volumeInfo.title}

                            </span>

                            {elmnt.volumeInfo.authors?.[0] &&
                            <span className="header_searchResults_author">
                                {elmnt.volumeInfo.authors[0]}
                            </span>}

                        </p>
                    )})}
                </div>

                <SearchSVG/>
                
            </form>
        </search>
    )
}