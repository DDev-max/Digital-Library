import { useQuery } from "@tanstack/react-query";
import { BSellerSlider } from "./Main/BestSellersSlider";
import { BigSlider } from "./Main/BigSlider";
// import { Filters } from "./Main/FIlters";
import { HorizontalProducts } from "./Main/HorizontalProducts";
import { MultipleProducts } from "./Main/MultipleProducts";
import { VerticalProducts } from "./Main/VerticalProducts";
import { BooksAPI, Item } from "../types";
import {Pruebas} from "./Prueba"

export function MainContent() {
    const PRUEBAS = !true

    const fields = "title,publishedDate,imageLinks,authors,categories"
    const API_URL=  `https://www.googleapis.com/books/v1/volumes?q=subject:fiction&fields=items(volumeInfo(${fields}))&maxResults=20`


    //Se esta asignando dos veces el tipo
    //Añadir errores con OOP
    //Poner srcset a las imgs
    const {data} = useQuery<Item[]>({
        queryKey: ["books", API_URL],

        //Separar function:
        queryFn: async ()=>{

            const response = await fetch(API_URL);
            const format: BooksAPI = await response.json();

            // console.log(format);
            // console.log("Fetcheado");
            

            return format.items

        }
    })


    const sellersBooks= data?.slice(0,5)
    const horizontalBooks = data?.slice(5,7)
    const verticalBooks= data?.slice(8, 10)
    const multipleBooks =  data?.slice(11)


    if (PRUEBAS) {
        return <Pruebas/>
    }


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