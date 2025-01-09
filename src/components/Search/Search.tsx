"use client"

import { useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { SearchSVG } from "../svg/SearchSVG";
import { nResults } from "../../data/consts";
import { useDebounce } from "../../hooks/useDebounce";
import { selectOptn } from "./selectOptn";
import { inputChange } from "./inputChange";
import { useSearch } from "../../hooks/useSearch";
import { searchOptn } from "./searchOptn";
import { ErrorSearch } from "./ErrorSearch";
import { useRouter } from "next/navigation";

//ver si se puede implementar sin tanstack query
export function Search() {

    const [userSearch, setUserSearch] = useState("")
    const [optnIdx, setOptnIdx] = useState(-1)//-1
    const [fetchNow, setFetchNow] = useState(false)

    //ES ASI?
    const router = useRouter()

    const inputRef = useRef<HTMLInputElement>(null)

    const queryClient = useQueryClient()

    const URL = `https://www.googleapis.com/books/v1/volumes?q=${userSearch}&maxResults=${nResults}&fields=items(id,volumeInfo(title,authors))`



    const { data, isLoading, isError, error } = useSearch({ URL, fetchNow, setFetchNow })

    const optnsRef = useRef<(HTMLSpanElement | null)[]>([]);




    const handleKeyDown = useDebounce({
        callback: (event: React.KeyboardEvent<HTMLInputElement>) => {
            //OSEA, SI SE ESCRIBE EN LA BARRA DE BUSQUEDA
            if(!(event.target as HTMLInputElement).value) return
            
            if (event.key.length === 1 || event.key === "Backspace")  {
                console.log(userSearch);
                setFetchNow(true);
            }
        }
    });


    //si pongo algo como how to, salen keys repetidas, error del propio google


    return (
        <search
            className="header_search">
            <form

                onFocus={() => {
                    inputRef.current?.focus()
                }}
                tabIndex={0}
                onKeyDown={(e) => selectOptn({ e, optnsRef, setOptnIdx, setUserSearch, isError, userSearch })}
                className="header_form"
            >



                {/*                     {!isError && !fetchNow && !isLoading && userSearch && data && data?.items?.map((elmnt, idx) => { */}

                <ul aria-live="polite" role="listbox" className="header_form_searchResults">
                    {(isLoading || fetchNow) && <progress />}

                    <ErrorSearch data={data} error={error} isError={isError} isLoading={isLoading} userSearch={userSearch} />

                    {!isError && !fetchNow && userSearch && data && data.items?.map((elmnt, idx) => {

                        const bookName = elmnt?.volumeInfo?.title


                        return (


                            <li
                                aria-selected={idx == optnIdx}
                                role="option"
                                onClick={() => searchOptn({ bookName, inputRef, router, setUserSearch })}
                                className={`header_form_searchResults_result  ${optnIdx == idx ? "header_form_searchResults_result--selected" : ""}`}
                                key={elmnt.id}
                                translate="no"
                            >

                                <span
                                    ref={(element) => { optnsRef.current[idx] = element }}
                                    className="header_form_searchResults_result_title"
                                >
                                    {bookName}

                                </span>

                                {elmnt.volumeInfo.authors?.[0] &&
                                    <span className="header_form_searchResults_result_author">
                                        {elmnt?.volumeInfo?.authors[0]}
                                    </span>}


                            </li>
                        )
                    })}
                </ul>


                <div className="header_inputCont">

                    <SearchSVG />

                    <input
                        ref={inputRef}
                        value={userSearch}
                        onChange={(event) => inputChange({ event, setUserSearch })}
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



