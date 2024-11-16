import { ErrorSearchProps } from "../../data/types"



export function ErrorSearch({error,isError,data,isLoading,userSearch}: ErrorSearchProps) {

    if (error && Number(error.message.match(/\d+/)?.[0]) === 429) {
        return (
        <p className="header_form_searchResults_error">There seems to be a lot of traffic on our application today, please come back later.</p>
        )

    } else if (isError) {
        return <li className="header_form_searchResults_error">Error while searching</li>
    }

    if (userSearch && !isLoading && data && Object.keys(data).length === 0) {
        return  <li className="header_form_searchResults_error">No results found</li>
    }


}