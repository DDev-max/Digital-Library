import { URLorem } from "../consts"


//UNIR AMBOS FETCH?
export const fetchLorem = async () => {
    const response = await fetch(URLorem)
    const format = await response.json()
    //Llega y se setea ✅    
    return format
}
