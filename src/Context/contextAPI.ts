import type { Item } from "data/types";
import { createContext } from "react";

 interface FavoritesContextType{
    favorites: Item[]
    setFavorites:  React.Dispatch<React.SetStateAction<Item[]>>
 }
 

export const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

