import { CopySVG } from '../svg/CopySVG'
import { SearchSVG } from '../svg/SearchSVG'
import { ColorsMenu } from './ColorsMenu'
import { highlightParagraph } from './highlightParagraph'
import { useMenuPosition } from './useMenuPosition'
import type { RefObject } from 'react'
import { useEffect, useRef } from 'react'
import { googleSearch } from 'Utils/googleSearch'
import { copyTxt } from 'Utils/copyText/copyTxt'
import type { AlertState, BookContentState } from 'data/types'
import { handleUnselectClick } from './handleUnselectClick'

interface ContxtMenuProps extends BookContentState, Pick<AlertState, 'setAlert'> {
  paragraphContainer: RefObject<HTMLDivElement>
}

export function ContxtMenu({ bookContent, setBookContent, setAlert, paragraphContainer }: ContxtMenuProps) {
  const menuRef = useRef<HTMLDivElement | null>(null)
  const { position, setPosition } = useMenuPosition({ menuRef, paragraphContainer })

  useEffect(() => {
    if (position?.display === 'block' && menuRef.current) {
      menuRef.current.focus()
    }
  }, [position])

  return (
    position && (
      <div
        tabIndex={0}
        onKeyDown={e => {
          if (e.key == 'Escape') setPosition(undefined)
        }}
        ref={menuRef}
        role='menu'
        style={{ ...position }}
        className={`contextMenu`}
      >
        <ColorsMenu
          onClickColor={e => {
            highlightParagraph({ e, bookContent, setAlert, setBookContent, setPosition, paragraphContainer })
          }}
          onUnselectClick={() => {
            handleUnselectClick({ bookContent, paragraphContainer, setBookContent, setPosition })
          }}
        />

        <div className={`contextMenu_btnsCont`}>
          <CopySVG
            onMouseDown={() => {
              copyTxt({ setAlert })
            }}
          />

          <button aria-label='Search on Google'>
            <SearchSVG onClick={googleSearch} />
          </button>
        </div>
      </div>
    )
  )
}
