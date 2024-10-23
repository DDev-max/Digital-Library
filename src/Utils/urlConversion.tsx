import { conversionParams } from "../data/types"
 
 export function urlConversion({title, fromURL=false}: conversionParams) {

    if (fromURL) {
        return title.split("-").join(" ")
    }

    const normalize = title.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    const hyphen = normalize.split(" ").join("-")
    
    return hyphen
}