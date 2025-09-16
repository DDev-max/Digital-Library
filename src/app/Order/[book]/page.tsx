'use client'

import { emailInputRegex, nameInputRegex } from 'data/consts'
import { emailInputChange } from 'app/Order/[book]/inputChange/emailInputChange'
import { nameInputChange } from 'app/Order/[book]/inputChange/nameInputChange'
import { phoneInputChange } from 'app/Order/[book]/inputChange/phoneInputChange'
import { useRef, useState } from 'react'
import { useParams } from 'next/navigation'
import { Alert } from '@/components/Alert/Alert'
import { DynamicMap } from '@/components/Map/DynamicMap'
import type { AlertValues } from 'data/types'
import { formSubmit } from './formSubmit'
import type { LatLngExpression } from 'leaflet'

export default function PreOrderPage() {
  const params = useParams<{ book: string }>()
  const bookNameConv = decodeURIComponent(params.book)

  const phoneRef = useRef<HTMLInputElement>(null)

  const [formAlert, setFormAlert] = useState<AlertValues>({ string: '', color: 'red' })
  const [markerPosition, setMarkerPosition] = useState<LatLngExpression>()

  return (
    <main id='mainContent' className='orderMain'>
      <form aria-labelledby='formName' id='orderForm' className='orderForm' onSubmit={e => formSubmit({ e, setFormAlert })}>
        <h1 id='formName' className='orderForm_h1'>
          Pre-order a book
        </h1>

        <div className='orderForm_inputCont'>
          <p>
            <label className='orderForm_label' htmlFor='name'>
              Name
              <input
                className='orderForm_input'
                onChange={nameInputChange}
                pattern={nameInputRegex.source}
                required
                minLength={5}
                placeholder='Luis Ramirez'
                type='text'
                id='name'
                name='name'
                autoComplete='name'
              />
            </label>
          </p>

          <p>
            <label className='orderForm_label' htmlFor='phone'>
              Phone
              <input
                className='orderForm_input'
                minLength={9}
                maxLength={9}
                placeholder='1234-5678'
                onChange={e => phoneInputChange({ e, phoneRef })}
                ref={phoneRef}
                required
                type='tel'
                id='phone'
                name='phone'
                autoComplete='tel-country-code'
              />
            </label>
          </p>

          <p>
            <label className='orderForm_label' htmlFor='email'>
              Email
              <input
                autoComplete='email'
                className='orderForm_input'
                onChange={emailInputChange}
                placeholder='example@gmail.com'
                pattern={emailInputRegex.source}
                required
                type='email'
                id='email'
                name='email'
              />
            </label>
          </p>

          <p>
            <label className='orderForm_label' htmlFor='book'>
              Book title
              <input required className='orderForm_input' type='text' name='book' id='book' defaultValue={bookNameConv} />
            </label>
          </p>

          <input
            hidden
            readOnly
            name='coordinates'
            onChange={e => setMarkerPosition(e.target.value as unknown as LatLngExpression)}
            value={String(markerPosition)}
            type='text'
            data-testid='marker-input'
          />
        </div>

        <DynamicMap
          markerPosition={markerPosition as unknown as LatLngExpression}
          setMarkerPosition={setMarkerPosition}
          setFormAlert={setFormAlert}
          divClassName='orderForm_MapCont'
        />

        <button className='orderForm_submitBtn' type='submit'>
          Send Form
        </button>
      </form>

      <Alert alert={formAlert.string} brdrColor={formAlert.color} />
    </main>
  )
}
