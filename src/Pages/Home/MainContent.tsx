import { useQuery } from "@tanstack/react-query";
import {BooksAPI } from "../../data/types";
import { API_URL } from "../../data/consts";

import { HorizontalProducts } from "./HorizontalProducts";
import { MultipleProducts } from "./MultipleProducts";
import { VerticalProducts } from "./VerticalProducts";
import { BigSlider } from "./BigSlider";
import { BSellerSlider } from "./BestSellersSlider";

import fakeData from "../../data/muchasRequest.json"
import { fetchFn } from "../../Utils/fetchFn";

export function MainContent() {

//NO DEPENDER DE LA API, HACER MAP

    //Se esta asignando dos veces el tipo
    //Añadir errores con OOP
    //Poner srcset a las imgs
    const {data} = useQuery({
        queryKey: ["books", API_URL],
        //Separar function:
        queryFn: () => fetchFn<BooksAPI>("")//API URL
    })


    const pinga = fakeData.items
        

    const pinga1= pinga?.slice(0,5)
    const pinga2 = pinga?.slice(5,7)
    const pinga3= pinga?.slice(8, 10)
    const pinga4 =  pinga?.slice(5)

    const sellersBooks= data?.items?.slice(0,5)
    const horizontalBooks = data?.items?.slice(5,7)
    const verticalBooks= data?.items?.slice(8, 10)
    const multipleBooks =  data?.items?.slice(11)


    return(
            <main>
                <BigSlider/>
                <HorizontalProducts books={pinga2}/>
                <BSellerSlider books={pinga1}/>
                <VerticalProducts books={pinga3}/>
                <MultipleProducts books={pinga4}/>
            </main>
    )
    
}