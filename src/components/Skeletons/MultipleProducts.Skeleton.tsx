export function MultipleProductsSkeleton() {

    const skeletonsQtty = new Array(20).fill(null); 

    return (
        skeletonsQtty.map((_, idx)=>(

            <article key={idx} className="MultipleProducts_article--skeleton">

            </article>

        ))

    )
}