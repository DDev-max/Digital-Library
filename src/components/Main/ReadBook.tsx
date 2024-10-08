import { useParams } from "react-router-dom"
import { urlConversion } from "../../Services/urlConversion"
import { ContxtMenu } from "../ContxtMenu"
import { useContext } from "react"
import { HighlightedCntxt } from "../../contextAPI"
import { Alert } from "../Alert"

export function ReadBook() {
    const urlTitle = useParams()

    const {highlightedContent} = useContext(HighlightedCntxt)

    

    const bookName = urlConversion({title: urlTitle.title ?? "", fromURL: true})


    return(
        <main>
            <ContxtMenu/>
            <h1>{bookName}</h1>
            <div className="paragraphsContainer">
                {highlightedContent?.map((elmnt, pIndex)=>{
                    return(
                        <p dangerouslySetInnerHTML={{__html: elmnt}} data-index={pIndex} key={pIndex}>
                        </p>
                    )
                })}
            </div>
            
            <Alert/>

        </main>
    )
}