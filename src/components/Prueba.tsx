/* eslint-disable react-hooks/exhaustive-deps */
import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useRef, useState } from "react";

export function Pruebas() {

    const [busqueda, setBusqueda] = useState("")
    const [optnIdx, setOptnIdx]  = useState(-1)
    const listaOpciones =  useRef<(HTMLParagraphElement | null)[]>([]);

    const [fetchNow, setFetchNow] = useState(false)
    const URL = `https://www.googleapis.com/books/v1/volumes?q=${busqueda}&maxResults=${nResults}&fields=items(id,volumeInfo(title,authors))`


    const {data} = useQuery({
        queryKey: ["googleSearch"],
        queryFn: fetchFn,
        enabled: fetchNow
    })
    
    const idSet = new Set()



    function cambiarInput(e: React.ChangeEvent<HTMLInputElement>) {
        setBusqueda(e.target.value)
        
    }


    function seleccionarOpcion(e: React.KeyboardEvent<HTMLFormElement>) {
        setOptnIdx(previous=>{
            let newIdx;
  
          //   if (isError) return -1
  
  
            if (e.key === "ArrowDown") {
                newIdx = (previous + 1) % nResults
  
                setBusqueda( listaOpciones.current[newIdx]?.textContent || "")
                return newIdx
    
            }
  
            if (e.key === "ArrowUp") {
  
                newIdx = previous === -1 
                ? nResults - 1 
                : (previous - 1 + nResults) % nResults
  
  
                setBusqueda( listaOpciones.current[newIdx]?.textContent || "")
                return newIdx
    
            }
  
  
            return previous
  
  
        })

        
    }


    const debounce = (func, delay) => {
        let timer;
        return (...args) => {
          clearTimeout(timer);
          timer = setTimeout(() => func(...args), delay);
        };
      };
    
      const handleKeyDown = useCallback(
        debounce((event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.key.length === 1) {
                setFetchNow(true)
            }
        }, 1000),
        []
    );


      function fakeFetch(): Promise<string[]> {
        return new Promise((resolve) => {
          setTimeout(() => {
            console.log("fetcheado")
            
            const data = ['elemento1', 'elemento2', 'elemento3']
            resolve(data)
            setFetchNow(false)
          }, 1000)
        })
      }

    async function fetchFn<T>(){

        const response = await fetch(URL)
        const format: T = await response.json()
        
        console.log("fetch: ", URL)
        
        setFetchNow(false)
        return format
    
    }


    return (
        <form
        onBlur={()=> setOptnIdx(-1)}
        onKeyDown={seleccionarOpcion}
         >

            <input
            onKeyDown={handleKeyDown}
            onChange={cambiarInput}
            value={busqueda}
            />

            <button>Enviar</button>
            <span>{fetchNow ? "TRUE": "FALSE"}</span>

            <div>
                {data && data.items.map((elmnt, idx)=>{

                    return (
                        <p 
                        ref={(elemento) => listaOpciones.current[idx] = elemento}
                        className={optnIdx === idx? "pingudo" :""}
                        key={idx}>{elmnt.volumeInfo.title}</p>
                    )
  
                })}
            </div>

        </form>
    )
}


const nResults = 3


