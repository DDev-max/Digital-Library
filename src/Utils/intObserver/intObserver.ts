import type { Dispatch, SetStateAction } from 'react'

interface intObserverProps {
  observedElements: React.MutableRefObject<HTMLElement[]>
  setIsVisible: Dispatch<SetStateAction<boolean[]>>
  options?: IntersectionObserverInit
}

export function intObserver({ setIsVisible, observedElements, options }: intObserverProps) {
  const intObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const index = observedElements.current.findIndex(element => element === entry.target)

        setIsVisible((prev: boolean[]) => {
          const copy = [...prev]
          copy[index] = true
          return copy
        })
      }
    })
  }, options)

  observedElements.current.forEach(element => {
    if (element) {
      intObserver.observe(element)
    }
  })

  return intObserver
}
