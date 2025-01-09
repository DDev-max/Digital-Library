import type { AlertState, Item } from "data/types";
import { createContext } from "react";

 interface HighlightedCntxtType extends AlertState{
    favorites: Item[]
    setFavorites:  React.Dispatch<React.SetStateAction<Item[]>>
 }
 

export const HighlightedCntxt = createContext<HighlightedCntxtType | undefined>(undefined);

