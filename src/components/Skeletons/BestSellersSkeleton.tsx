export function BestSellersSkeleton() {
    const skeletonsQtty = new Array(15).fill(null); 


    return (
        skeletonsQtty.map((_, idx)=>(
            <article key={idx} className="slider_bookContainer--skeleton">

            </article>
        ))
    )
}