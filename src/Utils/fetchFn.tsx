export async function fetchFn<T>(URL: string){

    const response = await fetch(URL)
    const format: T = await response.json()
    
    console.log("fetch: ", URL)
    
    return format

}