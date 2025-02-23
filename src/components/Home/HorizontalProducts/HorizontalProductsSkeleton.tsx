export function HorizontalProductsSkeleton() {
  const skeletonsQtty = new Array(2).fill(null)

  return (
    <div className='horizontalSctn'>
      {skeletonsQtty.map((_, idx) => (
        <article key={idx} className='horizontalSctn_Article horizontalSctn_Article--skeleton'>
          <div className='horizontalSctn_Img horizontalSctn_Img--skeleton'></div>

          <div className='horizontalSctn_infoDiv'>
            <div className='horizontalSctn_title  horizontalSctn_title--skeleton'></div>

            <div className='horizontalSctn_btn horizontalSctn_btn--skeleton'></div>
          </div>
        </article>
      ))}
    </div>
  )
}
