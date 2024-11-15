export function HorizontalProductsSkeleton() {

    const skeletonsQtty = new Array(2).fill(null); 

    return (
        skeletonsQtty.map((_ , idx)=>(
        <article key={idx} className="horizontalSctn_Article--skeleton">
            <div className="horizontalSctn_Article_Img--skeleton"></div>

            <div className="horizontalSctn_Article_infoDiv">
                <div className="horizontalSctn_Article_infoDiv_title--skeleton"></div>

                <div className="horizontalSctn_Article_infoDiv_btn--skeleton"></div>
            </div>

        </article>
        ))
    )
}


