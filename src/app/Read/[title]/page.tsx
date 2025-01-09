import { URLorem } from "data/consts"
import { fetchFn } from "Utils/fetchFn"
import { ReadBook } from "./ReadBook"
import type { NextJsPageProps } from "data/types"


export default async function ReadBookPage(props: NextJsPageProps<{title: string}>) {

    const params = await props.params
    const bookTitle = params?.title

    const plainBookContent = await fetchFn<string[]>({ URL: URLorem })


    // const bookName = urlConversion({ title: bookTitle, fromURL: true })
    const bookName =  decodeURIComponent(bookTitle || "")

    return (
        <main id="mainContent" className="readBook">
            <h1 className="readBook_h1">{bookName}</h1>
            <ReadBook plainBookContent={plainBookContent} />
        </main>
    )
}