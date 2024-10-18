/* eslint-disable react-hooks/exhaustive-deps */
import { Link, Outlet, useNavigate } from "react-router-dom";
import { FavoriteSVG } from "../svg/FavoriteSVG";
import { SearchSVG } from "../svg/SearchSVG";
import { UserSVG } from "../svg/UserSVG";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useRef, useState } from "react";
import { BooksAPISearch } from "../types";
import { debounce } from "../Services/Debounce";
import { nResults } from "../consts";


export function Header() {

    const [userSearch, setUserSearch] = useState("")
    const [optnIdx, setOptnIdx]   = useState(-1)
    const redirect = useNavigate()

    const fetchData = async () => {
      if (!userSearch) return []
        const response = await fetch(URL)
        const format: BooksAPISearch = await response.json()
        console.log("fetcheado");
        return format.items
        
    }


    const {data, refetch, isLoading, isError} = useQuery({
        queryKey: ["searchBooks"],
        queryFn: fetchData,
        enabled: false
    })

    const URL =`https://www.googleapis.com/books/v1/volumes?q=${userSearch}&maxResults=${nResults}&fields=items(id,volumeInfo(title,authors))`




    
    const optnsRef =  useRef<(string | null)[]>([]);

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const userInput = event.target.value
        setUserSearch(userInput)

        debounceCallback()
    }

    function selectOptn(event: React.KeyboardEvent<HTMLFormElement>) {
      if (!userSearch) return
        setOptnIdx(previous=>{
            let newIdx;

            if (event.key === "ArrowDown") {
                newIdx = (previous + 1) % nResults

                setUserSearch( optnsRef.current[newIdx] || "")
                return newIdx
    
            }

            if (event.key === "ArrowUp") {

                newIdx = previous === -1 
                ? nResults - 1 
                : (previous - 1 + nResults) % nResults


                setUserSearch(optnsRef.current[newIdx] || "")
                return newIdx
    
            }

            return previous


        })

        debounceCallback()
        

    }

    const debounceCallback = useCallback(debounce({
      callback: ()=>{
        refetch()
      }
  }), []);


  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    redirect(`/${userSearch}`)
  }
    
    
    return(
        <>
            <header className="header">
                <Link to={"/"}>
                    <h1 className="header_h1">Library</h1>
                </Link>

                <search className="header_search">
                    <form onSubmit={handleSubmit} tabIndex={0} onKeyDown={selectOptn} className="header_form">

                        <input 
                        value={userSearch}
                        onChange={handleChange}
                        className="header_input" 
                        aria-label="Search for a book" 
                        placeholder="Search books"  
                        type="text"
                        />

                        <div className="header_searchResults">
                          {isLoading && <progress/>}
                          {isError && <p>No matches</p>}

                            {!isError && data?.map((elmnt, idx)=>{return(
                                <p 
                                className={optnIdx === idx ? "header_searchResults--selected" :  ""}
                                key={elmnt.id} 
                                translate="no"
                                >

                                    <span 
                                    ref={(title)=> optnsRef.current[idx] = title?.textContent || ""}
                                    className="header_searchResults_title">{elmnt.volumeInfo.title}</span>

                                    {elmnt.volumeInfo.authors?.[0] &&
                                    <span className="header_searchResults_author">{elmnt.volumeInfo.authors[0]}</span>}

                                </p>
                            )})}
                        </div>

                        <button type="submit">
                            <SearchSVG/>
                        </button>
                    </form>
                </search>

                <div>
                    <UserSVG/>
                    <FavoriteSVG/>
                </div>
            </header>

            <Outlet/>
        
        </>
    )
}