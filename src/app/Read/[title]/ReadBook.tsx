'use client'

import { Alert } from '@/components/Alert/Alert'
import { ContxtMenu } from '@/components/ContextMenu/ContxtMenu'
import type { AlertValues } from 'data/types'
import { useRef, useState } from 'react'

export function ReadBook({ plainBookContent }: { plainBookContent: string[] }) {
  const [bookContent, setBookContent] = useState(plainBookContent)
  const [alert, setAlert] = useState<AlertValues>({ color: 'red', string: '' })

  const paragraphContainerRef = useRef<HTMLDivElement>(null)

  return (
    <>
      <ContxtMenu paragraphContainer={paragraphContainerRef} setFormAlert={setAlert} bookContent={bookContent} setBookContent={setBookContent} />

      <div ref={paragraphContainerRef} className='readBook_paragraphsContainer'>
        {bookContent?.map((elmnt, pIndex) => {
          return <p dangerouslySetInnerHTML={{ __html: elmnt }} key={pIndex}></p>
        })}

        <Alert alert={alert.string} brdrColor={alert.color} />
      </div>
    </>
  )
}
