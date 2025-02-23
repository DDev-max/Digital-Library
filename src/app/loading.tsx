import { BestSellersSkeleton } from '@/components/Home/BestSellersSlider/BestSellersSkeleton'
import { BigSliderSkeleton } from '@/components/Home/BigSlider/BigSliderSkeleton'
import { HorizontalProductsSkeleton } from '@/components/Home/HorizontalProducts/HorizontalProductsSkeleton'
import { MultipleProductsSkeleton } from '@/components/Home/MultipleProducts/MultipleProducts.Skeleton'
import { SingleProductSkeleton } from '@/components/Home/SingleProduct/SingleProductSkeleton'

export default function Loading() {
  return (
    <main className='mainDiv' aria-busy>
      <BigSliderSkeleton />
      <HorizontalProductsSkeleton />
      <BestSellersSkeleton />
      <MultipleProductsSkeleton />
      <SingleProductSkeleton />
    </main>
  )
}
