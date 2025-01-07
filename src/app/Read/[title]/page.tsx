import { URLorem } from "data/consts"
import { fetchFn } from "Utils/fetchFn"
import { urlConversion } from "Utils/urlConversion"
import { ReadBook } from "./ReadBook"
import { PageProps } from "../../../../.next/types/app/page"


export default async function ReadBookPage(props: PageProps) {

    const params = await props.params
    const bookTitle = params.title

    const plainBookContent = await fetchFn<string[]>({ URL: URLorem })


    const bookName = urlConversion({ title: bookTitle, fromURL: true })


    return (
        <main id="mainContent" className="readBook">


            <h1 className="readBook_h1">{bookName}</h1>
            <ReadBook plainBookContent={plainBookContent} />
        </main>
    )
}