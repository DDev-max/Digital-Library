import { SearchSVG } from "../svg/SearchSVG";
import { nResults } from "../../data/consts";
import { useNavigate } from "react-router-dom";
import { useCallback, useRef, useState } from "react";
import { debounce } from "../../Utils/debounce";
import { subtmitSearch } from "./submitSearch";
import { selectOptn } from "./selectOptn";
import { inputChange } from "./inputChange";
import fakeData from "../../data/muchasRequest.json"
import { useSearch } from "../../hooks/useSearch";
import { searchOptn } from "./searchOptn";

const optnsFake = fakeData.items.slice(0,5)

export function Search() {

    const [userSearch, setUserSearch] = useState("")
    const [optnIdx, setOptnIdx]   = useState(-1)//-1
    const redirect = useNavigate()
    const inputRef = useRef<HTMLInputElement>(null)

    const URL =`https://www.googleapis.com/books/v1/volumes?q=${userSearch}&maxResults=${nResults}&fields=items(id,volumeInfo(title,authors))`


    const {data, refetch, isLoading, isError} = useSearch("") //URL


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


                <div className="header_form_searchResults">
                {isLoading && <progress/>}
                
                    {/* {data.item} */}
                    {!isError && data?.items.map((elmnt, idx)=>{return(
                        <p 
                        onClick={()=> searchOptn({redirect, bookName:elmnt.volumeInfo.title, inputRef,setUserSearch})}

                        className={`header_form_searchResults_result  ${optnIdx == idx ? "header_form_searchResults_result--selected" : "" }`}
                        key={elmnt.id} 
                        translate="no"
                        >

                            <span 
                            ref={(title)=> optnsRef.current[idx] = title?.textContent || ""}
                            className="header_form_searchResults_result_title"
                            >
                                {elmnt.volumeInfo.title}

                            </span>

                            {elmnt.volumeInfo.authors?.[0] &&
                            <span className="header_form_searchResults_result_author">
                                {elmnt.volumeInfo.authors[0]}
                            </span>}

                        </p>
                    )})}
                </div>


                <div className="header_inputCont">

                    <SearchSVG 
                    classNameBtn="header_inputCont_searchBtn"/>

                    <input 
                    ref={inputRef}
                    value={userSearch}
                    onChange={(event)=> inputChange({debounceCb: debounceCallback,event,setUserSearch})}
                    className="header_inputCont_input" 
                    aria-label="Search for a book" 
                    placeholder="Search books"  
                    type="text"
                    />

                </div>

                
            </form>
        </search>
    )
}


