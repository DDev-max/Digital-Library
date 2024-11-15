import { HorizontalProducts } from "./HorizontalProducts";
import { MultipleProducts } from "./MultipleProducts";
import { VerticalProducts } from "./VerticalProducts";
import { BigSlider } from "./BigSlider";
import { BSellerSlider } from "./BestSellersSlider";

import fakeData from "../../data/muchasRequest.json"
import { SingleProduct } from "./SingleProduct";
import { useBooks } from "../../hooks/useBooks";
import { useEffect, useRef, useState } from "react";

export function MainContent() {


    const {data, error, isError, } = useBooks()


    if (isError && error instanceof Error ) {
        const errorCode = error.message.match(/\d+/)?.[0]
        console.log(errorCode);
        

        // if (Number(errorCode) === 429) {
        //     return <p className="fullError">There seems to be a lot of traffic on our application today, please come back later.</p>
        // } else{
        //     return <p  className="fullError"> Connection error</p>
        // }


      }


    const pinga = fakeData.items
        

    const pinga1= pinga.slice(0,2)
    const pinga2 = pinga?.slice(2,10)
    const pinga3 =  pinga
    const pinga4= pinga?.slice(0,1)

    const horizontalBooks = data?.items?.slice(5,7)
    const sellersBooks= data?.items?.slice(0,10)
    // const verticalBooks= data?.items?.slice(8, 10)
    const multipleBooks =  data?.items?.slice(11)


    const observedElements= useRef<HTMLElement[]>([])


      useEffect(()=>{

        const intObserver = new IntersectionObserver((entries)=>{
            entries.forEach((elmnt) => {
                
                if (elmnt.isIntersecting) {
                    console.log("se ve");
                    
                    elmnt.target.classList.add("visibleElmnt")
                }
            })
        },
        {
            threshold: 0,
        }
    )
 
        observedElements.current.forEach((elmnt) => {
            if (elmnt) {
                console.log("hay elemento", elmnt);
                
              intObserver.observe(elmnt);
            }
          })

          return ()=> intObserver.disconnect()
          
      }, [])

    return(
            <main id="mainContent" className="mainContent">

                <BigSlider/>
                
                <div className="mainDiv">

                    <HorizontalProducts sectionRef={(elmnt: HTMLElement) =>  observedElements.current[0] = elmnt} books={pinga1}/>

                    <BSellerSlider sectionRef={(elmnt: HTMLElement) =>  observedElements.current[1] = elmnt} books={pinga2}/>
                    
                    <MultipleProducts sectionRef={(elmnt: HTMLElement) =>  observedElements.current[2] = elmnt} books={pinga3}/>
                    
                    <SingleProduct sectionRef={(elmnt: HTMLElement) =>  observedElements.current[3] = elmnt} books={pinga4}/>
                    
                    

                </div>


            </main>
    )
    
}