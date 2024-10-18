import { useQuery } from "@tanstack/react-query";
import { BSellerSlider } from "./Main/BestSellersSlider";
import { BigSlider } from "./Main/BigSlider";
// import { Filters } from "./Main/FIlters";
import { HorizontalProducts } from "./Main/HorizontalProducts";
import { MultipleProducts } from "./Main/MultipleProducts";
import { VerticalProducts } from "./Main/VerticalProducts";
import {Item } from "../types";
import { API_URL } from "../consts";
import { fetchBooks } from "../Services/fetchBooks";

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


    const sellersBooks= data?.slice(0,5)
    const horizontalBooks = data?.slice(5,7)
    const verticalBooks= data?.slice(8, 10)
    const multipleBooks =  data?.slice(11)




    return(
            <main>
                <BigSlider/>
                {/* <Filters/> */}
                <BSellerSlider books={sellersBooks}/>
                <HorizontalProducts books={horizontalBooks}/>
                <VerticalProducts books={verticalBooks}/>
                <MultipleProducts books={multipleBooks}/>
            </main>
    )
    
}