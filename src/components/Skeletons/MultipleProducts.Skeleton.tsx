export function MultipleProductsSkeleton() {
  const skeletonsQtty = new Array(16).fill(null)

  return (
    <div className='MultipleProducts_Grid'>
      {skeletonsQtty.map((_, idx) => (
        <article key={idx} className='MultipleProducts_article MultipleProducts_article--skeleton'></article>
      ))}
    </div>
  )
}
