export interface FetchFnProps{
    URL: string
    setFetchNow?:  React.Dispatch<React.SetStateAction<boolean>>

}


export async function fetchFn<T>({URL,setFetchNow}:FetchFnProps){

    // console.log("fetch: ", URL)




    const response = await fetch(URL)
    
    const format: T = await response.json()
    

    if (!response.ok) {
        throw new Error(`Fetch error: ${response.status}, ${response.statusText}`);
      }
    


    if (setFetchNow) {
        setFetchNow(false)
    }

    console.log("fetch hecho :", URL);
    
    
    return format

}














//MANDA EL ERROR A LA CONSOLA


// export async function fetchFn<T>({URL,setFetchNow}:FetchFnProps){

//     console.log("fetch: ", URL)

//     try {
//         const response = await fetch(URL)

//         if (!response.ok) {
//             throw new Error(`Fetch error: ${response.status}, ${response.statusText}, ${response.type},`);
//         }


//         const format: T = await response.json()

//         if (setFetchNow) {
//             setFetchNow(false)
//         }

//         return format

        

//     }  catch (error: any) {


//         if (error instanceof Error) {
//             console.log(error.message, error.name);
            
//         }

        
        

//         // if (error.message.includes("429")) {
//         //     console.log("No más fetch: límite de peticiones alcanzado.");
//         // } else {
//         //     console.error("Error en fetch: ", error);
//         // }

//         throw error 
//     }


// }






//ORIGINAL




// export async function fetchFn<T>({URL,setFetchNow}:FetchFnProps){

//     // console.log("fetch: ", URL)


//     const response = await fetch(URL)
    
//     const format: T = await response.json()
    

//     if (setFetchNow) {
//         setFetchNow(false)
//     }

//     console.log("fetch hecho :", URL);
    
    
//     return format

// }