import { useParams } from "react-router-dom"
import { urlConversion } from "../../Utils/urlConversion"
import { ContxtMenu } from "./ContxtMenu"
import { Alert } from "../../components/Alert"
import { useHighlightCntxt } from "../../Context/useHighlightContxt"



export function ReadBook() {
    const urlTitle = useParams()
    const context = useHighlightCntxt()
    if (!context) return

    const {highlightedContent} = context

    const bookName = urlConversion({title: urlTitle.title ?? "", fromURL: true})


    return(
        <main className="readBook">
            <ContxtMenu/>
            <h1 className="readBook_h1">{bookName}</h1>
            <div className="readBook_paragraphsContainer">
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