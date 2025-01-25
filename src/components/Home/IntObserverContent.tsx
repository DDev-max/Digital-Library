"use client"

import { MultipleProducts } from "./MultipleProducts/MultipleProducts";
import { BSellerSlider } from "./BestSellersSlider/BestSellersSlider";
import { SingleProduct } from "./SingleProduct/SingleProduct";
import { useEffect, useRef, useState } from "react";
import { intObserver } from "../../Utils/intObserver/intObserver";
import type { BooksAPI} from "data/types";


export function IntObserverContent({books}: {books: BooksAPI}) {


    const oneProduct = books?.items?.slice(0, 1)
    const sellersBooks = books?.items?.slice(3, 13)
    const multipleBooks = books?.items?.slice(15)

    const components = [BSellerSlider, MultipleProducts, SingleProduct]
    const componentBook = [sellersBooks, multipleBooks, oneProduct]


    const observedElements = useRef<HTMLElement[]>([])
    const [isVisible, setIsVisible] = useState<boolean[]>([])


    useEffect(()=>{
        const observer = intObserver({observedElements,setIsVisible, options: {rootMargin: "100px"}})
        return () => { observer.disconnect() }
    }, [])

    return (
        components.map((Component, idx) => (
            <Component
                books={componentBook[idx]}
                isVisible={isVisible[idx]}
                key={idx}
                sectionRef={(elmnt: HTMLElement) => observedElements.current[idx] = elmnt}
            />
        ))

    )
}
