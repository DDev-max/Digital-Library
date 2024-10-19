import { useQuery } from "@tanstack/react-query";
import { BSellerSlider } from "../Landing/BestSellersSlider";
import { BigSlider } from "../Landing/BigSlider";
// import { Filters } from "./Main/FIlters";
import { HorizontalProducts } from "../Landing/HorizontalProducts";
import { MultipleProducts } from "../Landing/MultipleProducts";
import { VerticalProducts } from "../Landing/VerticalProducts";
import {Item } from "../../types";
import { API_URL } from "../../consts";
import { fetchBooks } from "../../Services/fetchBooks";

import fakeData from "../../muchasRequest.json"

export function MainContent() {

//NO DEPENDER DE LA API, HACER MAP

    //Se esta asignando dos veces el tipo
    //Añadir errores con OOP
    //Poner srcset a las imgs
    const {data} = useQuery<Item[]>({
        queryKey: ["books", API_URL],
        //Separar function:
        queryFn: fetchBooks
    })


    const pinga = fakeData.items
    

    const sellersBooks= pinga?.slice(0,5)
    const horizontalBooks = pinga?.slice(5,7)
    const verticalBooks= pinga?.slice(8, 10)
    const multipleBooks =  data?.slice(11)




    return(
            <main>
                <BigSlider/>
                {/* <Filters/> */}
                <BSellerSlider books={sellersBooks}/>
                <HorizontalProducts books={horizontalBooks}/>
                <VerticalProducts books={verticalBooks}/>
                <MultipleProducts books={pinga}/>
            </main>
    )
    
}