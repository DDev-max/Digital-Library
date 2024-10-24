import { createContext } from "react";
import { HighlightedCntxtType } from "../data/types";


export const HighlightedCntxt = createContext<HighlightedCntxtType | undefined>(undefined);

