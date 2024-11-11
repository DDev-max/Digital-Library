import { HorizontalProducts } from "./HorizontalProducts";
import { MultipleProducts } from "./MultipleProducts";
import { VerticalProducts } from "./VerticalProducts";
import { BigSlider } from "./BigSlider";
import { BSellerSlider } from "./BestSellersSlider";

import fakeData from "../../data/muchasRequest.json"
import { SingleProduct } from "./SingleProduct";
import { useBooks } from "../../hooks/useBooks";

export function MainContent() {

//NO DEPENDER DE LA API, HACER MAP

    //Se esta asignando dos veces el tipo
    //Añadir errores con OOP
    //Poner srcset a las imgs

    const {data} = useBooks()


    const pinga = fakeData.items
        

    const pinga1= pinga.slice(0,2)
    const pinga2 = pinga?.slice(2,10)
    const pinga3 =  pinga
    const pinga4= pinga?.slice(0,1)

    const horizontalBooks = data?.items?.slice(5,7)
    const sellersBooks= data?.items?.slice(0,10)
    // const verticalBooks= data?.items?.slice(8, 10)
    const multipleBooks =  data?.items?.slice(11)


    return(
            <main>
                <BigSlider/>
                <div className="mainDiv">

                    <HorizontalProducts books={pinga1}/>
                    <BSellerSlider books={pinga2}/>
                    {/* <VerticalProducts books={pinga3}/> */}
                    <MultipleProducts books={pinga3}/>
                    <SingleProduct books={pinga4}/>

                </div>
            </main>
    )
    
}