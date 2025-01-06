import { UseIntObserverProps } from "../data/types";


export function intObserver({ setIsVisible, observedElements, options }: UseIntObserverProps) {
  const intObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {

      if (entry.isIntersecting) {
        const index = observedElements.current.findIndex(
          (element) => element === entry.target
        );


        setIsVisible((prev: boolean[]) => {
          const copy = [...prev]
          copy[index] = true
          return copy

        })
      }
    })
  }, options)

  observedElements.current.forEach((element) => {
    if (element) {
      intObserver.observe(element)
    }
  });

  return intObserver

}
