import type { SearchBooksApi } from "data/types"
import { fetchFn } from "Utils/fetchFn/fetchFn"


interface GetSearchBookProps {
    URL: string
    setFetchNow: React.Dispatch<React.SetStateAction<boolean>>
}

export async function getSearchBook({setFetchNow,URL}: GetSearchBookProps) {
    const results = await fetchFn<SearchBooksApi>(URL)
    setFetchNow(false)
    
    //👇 sometimes API returns repeated id
    const idsObj = {};

    const uniqueBooks = results?.items.filter(item => {
      if (idsObj[item.id])  return false
      idsObj[item.id] = true;
      return true;
    });


    const mappedResults: SearchBooksApi = {
        items: uniqueBooks.map(elmnt=>({
            id: elmnt.id,
            volumeInfo: {
                authors: elmnt.volumeInfo.authors,
                title: elmnt.volumeInfo.title
            }
        }))
    }

    

    return mappedResults
}