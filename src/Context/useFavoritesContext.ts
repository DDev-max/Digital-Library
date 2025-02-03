import { useContext } from "react";
import { FavoritesContext } from "./contextAPI";
import { NoProviderError } from "./NoProviderError";

export function useFavoritesContext(){
   
    try {
        const context = useContext(FavoritesContext);

        
        if (context === undefined) {
            throw new NoProviderError("'FavoritesContext' should be used inside of 'FavoritesContextProvider'");
        }

        return context;
        
    } catch (error) {
        if (error instanceof NoProviderError) {
            console.error(error)
            throw(error)
        }
    }


 }


