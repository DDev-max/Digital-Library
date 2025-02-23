export function BestSellersSkeleton() {
  const skeletonsQtty = new Array(15).fill(null)

  return (
    <div className='slider visibleElmnt'>
      <div className='slider_contImgs'>
        {skeletonsQtty.map((_, idx) => (
          <article key={idx} className='slider_bookContainer slider_bookContainer--skeleton visibleElmnt'></article>
        ))}
      </div>
    </div>
  )
}
