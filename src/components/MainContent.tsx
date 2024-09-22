import { BSellerSlider } from "./Main/BestSellersSlider";
import { BigSlider } from "./Main/BigSlider";
import { Filters } from "./Main/FIlters";

export function MainContent() {
    return(
        <main>
            <BigSlider/>
            <Filters/>
            <BSellerSlider/>
        </main>
    )
    
}