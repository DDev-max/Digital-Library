export function SingleProductSkeleton() {
  return (
    <div className='singleProduct visibleElmnt'>
      <div className='singleProduct_img singleProduct_img--skeleton'></div>

      <div className='singleProduct_infoCont'>
        <div className='singleProduct_title--skeleton'></div>

        <div className='singleProduct_desc--skeleton'></div>
      </div>
    </div>
  )
}
