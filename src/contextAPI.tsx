import { createContext } from "react";

interface HighlightedCntxtType{
   highlightedContent : string[]
   setHighlightedContent: React.Dispatch<React.SetStateAction<string[]>>
   alert: string
   setAlert: React.Dispatch<React.SetStateAction<string>>
}

const defaultContxtValue = {
   highlightedContent: [],
   setHighlightedContent: ()=>{},
   alert: "",
   setAlert:  ()=>{}
}

export const HighlightedCntxt = createContext<HighlightedCntxtType>(defaultContxtValue);

// if (HighlightedCntxt == undefined) {
//    //...........
// }
