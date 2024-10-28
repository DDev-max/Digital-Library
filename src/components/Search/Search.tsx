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
import fakeData from "../../data/muchasRequest.json"

const optnsFake = fakeData.items.slice(0,5)

export function Search() {

    const [userSearch, setUserSearch] = useState("")
    const [optnIdx, setOptnIdx]   = useState(-1)//-1
    const redirect = useNavigate()
    const inputRef = useRef<HTMLInputElement>(null)

    const URL =`https://www.googleapis.com/books/v1/volumes?q=${userSearch}&maxResults=${nResults}&fields=items(id,volumeInfo(title,authors))`


    const {data, refetch, isLoading, isError} = useQuery({
        queryKey: ["searchBooks", URL],
        queryFn: ()=> fetchFn<BooksAPISearch>(""), //URL
        enabled: false,
    })

    
    const optnsRef =  useRef<(string | null)[]>([]);


    const debounceCallback = useCallback(debounce({
        callback: ()=>{
            console.log("Refetch");
            refetch()
        }
    }), [])

    


    return (
        <search className="header_search">
            <form 
            onSubmit={(event)=> subtmitSearch({event,redirect,userSearch, setUserSearch, inputRef})} 
            tabIndex={0} 
            onKeyDown={(event)=> selectOptn({debouncCb: debounceCallback, event,optnsRef,setOptnIdx,setUserSearch,userSearch, isError})} className="header_form"
            >



                <div className="header_searchResults">
                {isLoading && <progress/>}
                
                    {/* {data.item} */}
                    {!isError && optnsFake.map((elmnt, idx)=>{return(
                        //header_searchResults_result --selected
                        <p 
                        className={`header_searchResults_result  ${optnIdx == idx ? "header_searchResults--selected" : "" }`}
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


                <div className="header_inputCont">

                    <SearchSVG 
                    classNameBtn="header_searchBtn" 
                    classNameSVG="header_searchSVG"/>

                    <input 
                    ref={inputRef}
                    value={userSearch}
                    onChange={(event)=> inputChange({debounceCb: debounceCallback,event,setUserSearch})}
                    className="header_input" 
                    aria-label="Search for a book" 
                    placeholder="Search books"  
                    type="text"
                    />

                </div>

                
            </form>
        </search>
    )
}


