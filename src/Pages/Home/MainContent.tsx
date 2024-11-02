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
        

    const pinga1= pinga
    const pinga2 = pinga?.slice(5,7)
    const pinga3= pinga?.slice(8, 10)
    const pinga4 =  pinga

    const sellersBooks= data?.items?.slice(0,5)
    const horizontalBooks = data?.items?.slice(5,7)
    const verticalBooks= data?.items?.slice(8, 10)
    const multipleBooks =  data?.items?.slice(11)

    const unico = pinga.slice(0,1)

    return(
            <main>
                <BigSlider/>
                <div className="mainDiv">

                    <HorizontalProducts books={pinga2}/>
                    <BSellerSlider books={pinga1}/>
                    {/* <VerticalProducts books={pinga3}/> */}
                    <MultipleProducts books={pinga4}/>
                    <SingleProduct books={unico}/>

                </div>
            </main>
    )
    
}