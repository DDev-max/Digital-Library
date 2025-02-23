import { BestSellersSkeleton } from '@/components/Skeletons/BestSellersSkeleton'
import { BigSliderSkeleton } from '@/components/Skeletons/BigSliderSkeleton'
import { HorizontalProductsSkeleton } from '@/components/Skeletons/HorizontalProductsSkeleton'
import { MultipleProductsSkeleton } from '@/components/Skeletons/MultipleProducts.Skeleton'
import { SingleProductSkeleton } from '@/components/Skeletons/SingleProductSkeleton'

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
