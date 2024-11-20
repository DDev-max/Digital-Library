import { HorizontalProducts } from "./HorizontalProducts";
import { MultipleProducts } from "./MultipleProducts";
import { BigSlider } from "./BigSlider";
import { BSellerSlider } from "./BestSellersSlider";
import { SingleProduct } from "./SingleProduct";
import { useBooks } from "../../hooks/useBooks";
import { useRef } from "react";
import { ContentError } from "./ContentError";
import { useIntObserver } from "../../hooks/useIntObserver";

export function MainContent() {


    const {data, error, isError, } = useBooks()


    const oneProduct = data?.items?.slice(0,1)
    const horizontalBooks = data?.items?.slice(1,3)

    const sellersBooks= data?.items?.slice(3,13)
    const multipleBooks =  data?.items?.slice(15)
    

    const observedElements= useRef<HTMLElement[]>([])

    useIntObserver({classToAdd:"visibleElmnt", elementsArrayRef: observedElements})


    return(
            <main id="mainContent" className="mainContent">

                <ContentError error={error} isError={isError}/>


                {!isError && <>
                
                    <BigSlider/>
                    
                    <div className="mainDiv">

                        <HorizontalProducts sectionRef={(elmnt: HTMLElement) =>  observedElements.current[0] = elmnt} books={horizontalBooks}/>

                        <BSellerSlider sectionRef={(elmnt: HTMLElement) =>  observedElements.current[1] = elmnt} books={sellersBooks}/>
                        
                        <MultipleProducts sectionRef={(elmnt: HTMLElement) =>  observedElements.current[2] = elmnt} books={multipleBooks}/>
                        
                        <SingleProduct sectionRef={(elmnt: HTMLElement) =>  observedElements.current[3] = elmnt} books={oneProduct}/>
                        
                        

                    </div>
                
                </>}


            </main>
    )
    
}