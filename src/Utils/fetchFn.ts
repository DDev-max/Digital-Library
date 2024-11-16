import { FetchFnProps } from "../data/types";


export async function fetchFn<T>({URL,setFetchNow}:FetchFnProps){

    const response = await fetch(URL)
    
    const format: T = await response.json()
    

    if (!response.ok) {        
        throw new Error(`Fetch error: ${response.status}, ${response.statusText}`);
      }
    


    if (setFetchNow) {
        setFetchNow(false)
    }
    
    
    return format

}

