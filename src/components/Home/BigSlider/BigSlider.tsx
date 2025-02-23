'use client'

import { useState } from 'react'
import { ads } from '../../../data/consts'
import Image from 'next/image'

export function BigSlider() {
  const [imgIdx, setImgIdx] = useState(0)

  return (
    <section className='bigSlider'>
      <div className='bigSlider_contImgs' aria-live='polite' id='slider'>
        {ads.map((elmnt, idx) => {
          return (
            <article
              key={idx}
              className='bigSlider_bg'
              style={{ display: imgIdx === idx ? 'flex' : 'none', background: `linear-gradient(${elmnt.bgColor})` }}
            >
              <div className='bigSlider_contInfo'>
                <Image priority width={480} height={300} className='bigSlider_Img' key={elmnt.id} src={elmnt.ImgLink} alt={elmnt.alt} />

                <h2 style={{ color: elmnt.txtColor }} className='bigSlider_title'>
                  {elmnt.alt}
                </h2>
              </div>
            </article>
          )
        })}
      </div>

      <div role='tablist' className='bigSlider_footer'>
        {ads.map((_, idx) => {
          return (
            <button
              role='tab'
              aria-selected={imgIdx == idx}
              aria-label={`Click to see image number ${idx + 1}`}
              aria-controls='slider'
              key={idx}
              onClick={() => setImgIdx(idx)}
              className={`bigSlider_imgNumber ${imgIdx === idx ? ' bigSlider_imgNumber--selected' : ''}`}
            ></button>
          )
        })}
      </div>
    </section>
  )
}
