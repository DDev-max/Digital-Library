import { useContext } from "react";
import { HighlightedCntxt } from "./contextAPI";
import { NoProviderError } from "./NoProviderError";

export function useHighlightCntxt(){
   
    try {
        const context = useContext(HighlightedCntxt);

        if (context === undefined) {
            throw new NoProviderError("'HighlightedCntxt' should be used inside of 'HighlightsProvider'");
        }

        return context;
    } catch (error) {
        if (error instanceof NoProviderError) {
            console.error(error)
            
        }

        return 
    }
    
 }


