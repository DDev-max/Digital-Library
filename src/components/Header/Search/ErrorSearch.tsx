import type { SearchBooksApi } from "data/types"

interface ErrorSearchProps {
    error: Error | null
    data: SearchBooksApi | undefined
}

export function ErrorSearch({ error, data }: ErrorSearchProps) {

    if (error && Number(error.message.match(/\d+/)?.[0]) === 429) {
        return (
            <li className="header_form_searchResults_error">There seems to be a lot of traffic on our application today, please come back later.</li>
        )

    } else if (!data || (data && Object.keys(data).length === 0)) {
        return <li className="header_form_searchResults_error">No results found</li>
    } else {
        return <li className="header_form_searchResults_error">Error while searching</li>
    }


}