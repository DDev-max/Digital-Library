import type { ObservedBookComponentProps } from '../../../data/types'
import { ellipsisText } from '../../../Utils/ellipsisText/ellipsisText'
import Link from 'next/link'
import Image from 'next/image'

export function SingleProduct({ books, sectionRef, isVisible }: ObservedBookComponentProps) {
  if (!books) return

  return (
    <section ref={sectionRef} className={`singleProduct ${isVisible ? 'visibleElmnt' : ''}`}>
      <Image
        className='singleProduct_img'
        loading='lazy'
        width={170}
        height={265}
        src={books[0].volumeInfo.imageLinks.thumbnail}
        alt={books[0].volumeInfo.title}
      />

      <div className='singleProduct_infoCont'>
        <h2 className='singleProduct_infoCont_title'>{books[0].volumeInfo.title}</h2>

        <p className='singleProduct_infoCont_desc'>{ellipsisText({ maxLength: 250, text: books[0].volumeInfo.description })}</p>

        <Link className='singleProduct_infoCont_link' href={`/Read/${encodeURIComponent(books[0].volumeInfo.title)}`}>
          Read Now
        </Link>
      </div>
    </section>
  )
}
