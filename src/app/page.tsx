import { BigSlider } from "@/components/Home/BigSlider/BigSlider";
import { ContentError } from "@/components/Home/ContentError";
import { HorizontalProducts } from "@/components/Home/HorizontalProducts/HorizontalProducts";
import { IntObserverContent } from "@/components/Home/IntObserverContent";
import { getAllBooks } from "Utils/getAllBooks/getAllBooks";



export default async function Page() {

    try {

        const books = await getAllBooks()
        const horizontalBooks = books.items.slice(1, 3)

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