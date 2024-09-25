import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { urlConversion } from "../../Services/urlConversion"

export function ReadBook() {

    const urlTitle = useParams()
    
    const URLorem = "https://baconipsum.com/api/?type=all-meat&paras=10&format=json"

    const {data} = useQuery<string[]>({
        queryKey: ["LoremIpsumm", URLorem],
        queryFn: async () => {
            const response = await fetch(URLorem)
            const format = await response.json()
            console.log(format);

            return format
        }
    })

    
    const bookName = urlConversion({title: urlTitle.title ?? "", fromURL: true})
    
    return(
        <>
            <h1>{bookName}</h1>
           {data?.map((elmnt, index)=>{
            return(
                <p key={index}>{elmnt}</p>
            )
           })}
            
        </>
    )
}