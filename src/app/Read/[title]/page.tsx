import { Alert } from "@/components/Alert"
import { URLorem } from "data/consts"
import { fetchFn } from "Utils/fetchFn"
import { urlConversion } from "Utils/urlConversion"
import { ReadBook } from "./ReadBook"
// import { ContxtMenu } from "@/components/Read_Books/ContxtMenu"


export default async function ReadBookPage(props: PageProps) {

    const params = await props.params
    const bookTitle = params.title    
    
    const plainBookContent = await fetchFn<string[]>({URL: URLorem})
    

    const bookName = urlConversion({title:bookTitle, fromURL: true})


    return(
        <main id="mainContent" className="readBook">

            
            <h1 className="readBook_h1">{bookName}</h1>
            <div className="readBook_paragraphsContainer">
                <ReadBook plainBookContent={plainBookContent}/>
            </div>
            
            
            <Alert/>

        </main>
    )
}