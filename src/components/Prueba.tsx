import { useEffect } from "react"

export function Pruebas() {
    const URLS = [
        "https://www.gutenberg.org/ebooks/1197.txt.utf-8", 
        "https://www.gutenberg.org/files/1197/1197-h/1197-h.htm", 
        "https://www.gutenberg.org/files/1197/1197-0.txt", 
        "https://www.gutenberg.org/cache/epub/1197/pg1197.txt"]



    useEffect(()=>{
        fetch(URLS[3])
        .then(response=> response.text())
        .then(format=> console.log(format)
        )
    },[])



    

    return(
        <>

        </>
    )
}