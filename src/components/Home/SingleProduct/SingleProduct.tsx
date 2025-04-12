import type { ObservedBookComponentProps } from '../../../data/types'
import { ellipsisText } from '../../../Utils/ellipsisText/ellipsisText'
import Link from 'next/link'
import Image from 'next/image'
import { ImageFallback } from '@/components/ImageFallback'

export function SingleProduct({ books, sectionRef, isVisible }: ObservedBookComponentProps) {
  if (!books) return

  return (
    <section ref={sectionRef} className={`singleProduct ${isVisible ? 'visibleElmnt' : ''}`}>
      {books[0].volumeInfo.imageLinks?.thumbnail ? (
        <Image
          className='singleProduct_img'
          loading='lazy'
          width={170}
          height={265}
          src={books[0].volumeInfo.imageLinks.thumbnail}
          alt={books[0].volumeInfo.title}
        />
      ) : (
        <ImageFallback />
      )}

      <div className='singleProduct_infoCont'>
        <h2 className='singleProduct_title'>{books[0].volumeInfo.title}</h2>

        <p className='singleProduct_desc'>{ellipsisText({ maxLength: 250, text: books[0].volumeInfo.description })}</p>

        <Link className='singleProduct_link' href={`/Read/${encodeURIComponent(books[0].volumeInfo.title)}`}>
          Read Now
        </Link>
      </div>
    </section>
  )
}
