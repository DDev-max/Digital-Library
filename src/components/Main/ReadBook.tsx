import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { urlConversion } from "../../Services/urlConversion"
import { ContxtMenu } from "../ContxtMenu"

export function ReadBook() {
    const urlTitle = useParams()
    
    const URLorem = "https://baconipsum.com/api/?type=all-meat&paras=10&format=json"

    const {data} = useQuery<string[]>({
        queryKey: ["LoremIpsumm", URLorem],
        queryFn: async () => {
            const response = await fetch(URLorem)
            const format = await response.json()
            
            return format
        }
        
    })



    const bookName = urlConversion({title: urlTitle.title ?? "", fromURL: true})
    

    // function handleSelect() {

    //     const wSelect =  window.getSelection()
    //     const userSelection = wSelect?.toString()

    //     if (userSelection && userSelection.length >0) {
    //         const range = wSelect?.getRangeAt(0)
    //         const span =  document.createElement("span")
    //         span.className = "highlighted"
    //         range?.surroundContents(span)
    //         wSelect?.removeAllRanges()
    //     }


    // }




    return(
        <main>
            <ContxtMenu/>
            <h1>{bookName}</h1>
           {data?.map((elmnt, pIndex)=>{
            return(
                <p  key={pIndex}>
                    {elmnt}
                </p>
            )
           })}
            
        </main>
    )
}