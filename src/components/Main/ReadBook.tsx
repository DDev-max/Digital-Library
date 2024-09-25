import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"

export function ReadBook() {
    const bookName = useParams()
    const URL = "https://baconipsum.com/api/?type=all-meat&paras=10&format=json"

    const {data} = useQuery<string[]>({
        queryKey: ["LoremIpsumm", URL],
        queryFn: async () => {
            const response = await fetch(URL)
            const format = await response.json()
            console.log(format);
            

            return format
        }
    })

    return(
        <>
            <h1>{bookName.title}</h1>
           {data?.map(elmnt=>{
            return(
                <p>{elmnt}</p>
            )
           })}
            
        </>
    )
}