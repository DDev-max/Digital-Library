import { fetchFn } from "Utils/fetchFn"
import { ReadBook } from "./ReadBook"
import type { NextJsPageProps } from "data/types"


export default async function ReadBookPage(props: NextJsPageProps<{title: string}>) {

    const params = await props.params
    const bookTitle = params?.title

    const paragraphs = 15
    const URLorem = `https://baconipsum.com/api/?type=all-meat&paras=${paragraphs}&format=json`
    const plainBookContent = await fetchFn<string[]>(URLorem)


    const bookName =  decodeURIComponent(bookTitle || "")

    return (
        <main id="mainContent" className="readBook">
            <h1 className="readBook_h1">{bookName}</h1>
            <ReadBook plainBookContent={plainBookContent} />
        </main>
    )
}