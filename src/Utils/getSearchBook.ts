import type { SearchBooksApi } from "data/types"
import { fetchFn } from "./fetchFn"

interface GetSearchBookProps {
    URL: string
    setFetchNow: React.Dispatch<React.SetStateAction<boolean>>
}

export async function getSearchBook({setFetchNow,URL}: GetSearchBookProps) {
    const results = await fetchFn<SearchBooksApi>(URL)
    setFetchNow(false)

    const mappedResults: SearchBooksApi = {
        items: results.items.map(elmnt=>({
            id: elmnt.id,
            volumeInfo: {
                authors: elmnt.volumeInfo.authors,
                title: elmnt.volumeInfo.title
            }
        }))
    }

    return mappedResults
}