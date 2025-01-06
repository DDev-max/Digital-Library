import { API_URL } from "data/consts";
import { BooksAPI } from "data/types";
import { BigSlider } from "@/components/Home/BigSlider";
import { ContentError } from "@/components/Home/ContentError";
import { HorizontalProducts } from "@/components/Home/HorizontalProducts";
import { IntObserverContent } from "@/components/Home/IntObserverContent";
import { fetchFn } from "Utils/fetchFn";

export default async function Page() {

    
    try {
        
        //QUITAR DESPUES DE QUITAR EL MOCK
        const books: BooksAPI = await fetchFn<BooksAPI>({ URL: API_URL })
        const horizontalBooks = books?.items?.slice(1, 3)

        return (

            <main id="mainContent" className="mainContent">

                <BigSlider />


                <div className="mainDiv">
                    <HorizontalProducts books={horizontalBooks} />
                    <IntObserverContent books={books} />
                </div>


            </main>
            
        )


    } catch (error) {

        return (
            <main id="mainContent" className="mainContent">
                <ContentError error={error} />
            </main>
        )

    }


}