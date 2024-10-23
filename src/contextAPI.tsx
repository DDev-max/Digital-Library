import { createContext } from "react";
import { HighlightedCntxtType } from "./data/types";


const defaultContxtValue = {
   highlightedContent: [],
   setHighlightedContent: ()=>{},
   alert: "",
   setAlert:  ()=>{},
   favorites: [],
   setFavorites: ()=>{}
}

export const HighlightedCntxt = createContext<HighlightedCntxtType>(defaultContxtValue);

// if (HighlightedCntxt == undefined) {
//    //...........
// }
