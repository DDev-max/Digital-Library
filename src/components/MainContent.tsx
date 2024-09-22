import { BSellerSlider } from "./Main/BestSellersSlider";
import { BigSlider } from "./Main/BigSlider";
import { Filters } from "./Main/FIlters";
import { HorizontalProducts } from "./Main/HorizontalProducts";
import { MultipleProducts } from "./Main/MultipleProducts";
import { VerticalProducts } from "./Main/VerticalProducts";

export function MainContent() {
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