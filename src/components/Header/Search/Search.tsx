"use client"

import { useEffect, useRef, useState } from "react";
import { selectOptn } from "./selectOptn";
import { inputChange } from "./inputChange";
import { searchOptn } from "./searchOptn";
import { ErrorSearch } from "./ErrorSearch";
import { useRouter } from "next/navigation";
import { useSearch } from "hooks/useSearch";
import { useDebounce } from "hooks/useDebounce";
import { SearchSVG } from "@/components/svg/SearchSVG";
import { resetForm } from "./resetForm";
import { debounceCallBack } from "./debounceCallBack";



export function Search() {

    const [userSearch, setUserSearch] = useState("")
    const [optnIdx, setOptnIdx] = useState(-1)
    const [fetchNow, setFetchNow] = useState(false)

    const router = useRouter()

    const searchRef = useRef<HTMLElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)


    const URL = `https://www.googleapis.com/books/v1/volumes?q=${userSearch}&maxResults=5&fields=items(id,volumeInfo(title,authors))`

    const { data, isLoading, isError, error } = useSearch({ URL, fetchNow, setFetchNow })
    
    
    const optnsRef = useRef<(HTMLSpanElement | null)[]>([]);

    const handleKeyDown = useDebounce({
        callback: (e: React.KeyboardEvent<HTMLInputElement>) => debounceCallBack({e,setFetchNow})
    });

    useEffect(() => {
        const handleResetForm = (e: MouseEvent) => resetForm({ e, searchRef, setUserSearch })
        document.addEventListener("click", handleResetForm)

        return () => document.removeEventListener("click", handleResetForm)
    }, [])

    const nResults = data?.items?.length ?? 0
    const showError = isError && (userSearch || !isLoading)

    return (
        <search
            ref={searchRef}
            className="header_search">
            <form
                id="searchForm"
                onSubmit={(e) => {
                    e.preventDefault();
                    if (userSearch) {
                        searchOptn({ bookName: userSearch, inputRef, router, setUserSearch })
                    }
                }}

                onFocus={() => inputRef.current?.focus()}
                tabIndex={0}
                onKeyDown={(e) => selectOptn({e,nResults,optnsRef,setOptnIdx,setUserSearch})}
                className="header_form"
            >



                <ul aria-label="Search results" role="listbox" aria-live="polite" className="header_form_searchResults">
                    {(isLoading || fetchNow) && <progress />}

                    
                     {showError && <ErrorSearch data={data} error={error} />}

                    {!isError && !fetchNow && userSearch && data && data.items?.map((elmnt, idx) => {

                        const bookName = elmnt?.volumeInfo?.title


                        return (


                            <li
                                aria-selected={idx === optnIdx}
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

                    <button className="header_inputCont_searchBtn" aria-label="Search Books" type="submit">
                        <SearchSVG />
                    </button>

                    <input
                        ref={inputRef}
                        value={userSearch}
                        onChange={(event) => inputChange({ event, setUserSearch })}
                        onKeyDown={handleKeyDown}
                        className="header_inputCont_input"
                        aria-label="Search for a book"
                        placeholder="Search books"
                        type="search"
                    />


                </div>


            </form>
        </search>
    )
}



