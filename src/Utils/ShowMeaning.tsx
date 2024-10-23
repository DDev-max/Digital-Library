import { useQuery } from "@tanstack/react-query"
import { useState } from "react"


//PASAR A COMPONETNES
export function ShowMeaning(){
    const seleccion = window.getSelection()?.toString()

    const [meaning, setMeaning] = useState()

    const {data} = useQuery({
        queryKey: ["dictionary", seleccion],
        queryFn: ()=>{
            fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${seleccion}`)
            .then(response => response.json())
            .then(format => setMeaning(format))
        }
    })

    return
}