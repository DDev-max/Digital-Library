import { SearchSVG } from "../svg/SearchSVG";
import { nResults } from "../../data/consts";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { subtmitSearch } from "./submitSearch";
import { selectOptn } from "./selectOptn";
import { inputChange } from "./inputChange";
import fakeData from "../../data/muchasRequest.json"
import { useSearch } from "../../hooks/useSearch";
import { searchOptn } from "./searchOptn";
import { resetForm } from "./resetForm";
import { useQueryClient } from "@tanstack/react-query";

const optnsFake = fakeData.items.slice(0,5)

export function Search() {

    const [userSearch, setUserSearch] = useState("")
    const [optnIdx, setOptnIdx]   = useState(-1)//-1
    const [fetchNow, setFetchNow] =  useState(false)

    const redirect = useNavigate()
    const inputRef = useRef<HTMLInputElement>(null)

    const queryClient = useQueryClient()
    
    const URL = `https://www.googleapis.com/books/v1/volumes?q=${userSearch}&maxResults=${nResults}&fields=items(id,volumeInfo(title,authors))`
    


    const {data, isLoading, isError} = useSearch({fetchNow,setFetchNow,URL}) //URL

    
    const optnsRef =  useRef<(HTMLSpanElement | null)[]>([]);




    const handleKeyDown = useDebounce({
    callback: (event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.key.length === 1 || event.key === "Backspace") {
                console.log(fetchNow);
                
                setFetchNow(true);
            }
        }
    });

    
    //FEOOOOOOOOOOOOOOOOO

    //   const handleKeyDown = useCallback(
    //     useDebounce({callback: (event: React.KeyboardEvent<HTMLInputElement>) => {
    //         if (event.key.length === 1 || event.key === "Backspace") {
    //             console.log(fetchNow);
                
    //             setFetchNow(true)
    //         }
    //     }})

    //     , []

    // );



    
    return (
        <search className="header_search">

            <form 
            onSubmit={(event)=> subtmitSearch({event,inputRef,redirect,setUserSearch,userSearch})} 
            tabIndex={0} 
            onKeyDown={(e)=> selectOptn({e,optnsRef,setOptnIdx,setUserSearch})} 
            onBlur={()=>{resetForm({setOptnIdx,setUserSearch,queryClient})}}
            className="header_form"
            >

                <ul aria-live="polite" role="listbox" className="header_form_searchResults">
                {isLoading && <progress/>}
                
                    {isError && <p>Error while searching</p>}
                    {!isError && !fetchNow && userSearch && data?.items.map((elmnt, idx)=>{
                        const bookName = elmnt.volumeInfo.title
                        
                        return(
                        
                        
                        <li 
                        role="option"
                        onClick={()=> searchOptn({bookName,inputRef,redirect,setUserSearch})}
                        className={`header_form_searchResults_result  ${optnIdx == idx ? "header_form_searchResults_result--selected" : "" }`}
                        key={elmnt.id} 
                        translate="no"
                        >

                            <span 
                            ref={(elemento) => optnsRef.current[idx] = elemento}
                            className="header_form_searchResults_result_title"
                            >
                                {bookName}

                            </span>
                            
                            {elmnt.volumeInfo.authors?.[0] &&
                            <span className="header_form_searchResults_result_author">
                                {elmnt.volumeInfo.authors[0]}
                            </span>}


                        </li>
                    )})}
                </ul>


                <div className="header_inputCont">

                    <SearchSVG 
                    classNameBtn="header_inputCont_searchBtn"/>

                    <input 
                    ref={inputRef}
                    value={userSearch}
                    onChange={(event)=> inputChange({event,setUserSearch})}
                    onKeyDown={handleKeyDown}
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



