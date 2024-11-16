import { useParams } from "react-router-dom"
import { urlConversion } from "../../Utils/urlConversion"
import { ContxtMenu } from "./ContxtMenu"
import { Alert } from "../../components/Alert"
import { useLorem } from "../../hooks/useLorem"



export default function ReadBook() {


    const urlTitle = useParams()

    const {data} = useLorem()

    const bookName = urlConversion({title: urlTitle.title ?? "", fromURL: true})



    return(
        <main id="mainContent" className="readBook">

            <ContxtMenu/>
            <h1 className="readBook_h1">{bookName}</h1>
            <div className="readBook_paragraphsContainer">
                {data?.map((elmnt, pIndex)=>{
                    
                    return(
                        <p  dangerouslySetInnerHTML={{__html: elmnt}} data-index={pIndex} key={pIndex}>
                        </p>
                    )
                })}
            </div>
            
            <Alert/>

        </main>
    )
}