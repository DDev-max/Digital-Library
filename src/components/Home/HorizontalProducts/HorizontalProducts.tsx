import type { Item } from '../../../data/types'
import Link from 'next/link'
import Image from 'next/image'

export function HorizontalProducts({ books }: { books: Item[] }) {
  return (
    <section className='horizontalSctn '>
      {books?.map(elmnt => {
        const info = elmnt.volumeInfo
        const nameForUrl = encodeURIComponent(info.title)

        return (
          <article key={info.title} className='horizontalSctn_Article'>
            <Image className='horizontalSctn_Img' width={128} height={198} src={info.imageLinks.thumbnail} alt={info.title} />

            <div className='horizontalSctn_infoDiv'>
              <h2 className='horizontalSctn_title'>{info.title}</h2>

              <Link href={`/Order/${nameForUrl}`} className='horizontalSctn_btn'>
                Pre-order
              </Link>
            </div>
          </article>
        )
      })}
    </section>
  )
}
