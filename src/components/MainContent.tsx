import { useQuery } from "@tanstack/react-query";
import { BSellerSlider } from "./Main/BestSellersSlider";
import { BigSlider } from "./Main/BigSlider";
import { Filters } from "./Main/FIlters";
import { HorizontalProducts } from "./Main/HorizontalProducts";
import { MultipleProducts } from "./Main/MultipleProducts";
import { VerticalProducts } from "./Main/VerticalProducts";

export function MainContent() {
    const gutendexAPÏ= "https://gutendex.com/books/?page=1&per_page=15"

    const {data} = useQuery({
        queryKey: ["books"],
        queryFn: async ()=>{
            const inicio = performance.now()

            const response = await fetch(gutendexAPÏ);
            const format = await response.json();

            const fin = performance.now()

            const tiempo = fin - inicio
            console.log(tiempo);
            
            return console.log(format);

        }
    })




    return(
        <main>
            <BigSlider/>
            <Filters/>
            <BSellerSlider/>
            <HorizontalProducts/>
            <VerticalProducts/>
            <MultipleProducts/>
        </main>
    )
    
}