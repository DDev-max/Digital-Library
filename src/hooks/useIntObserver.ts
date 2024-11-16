import { useEffect } from "react";
import { UseIntObserverProps } from "../data/types";


export function useIntObserver ({classToAdd,elementsArrayRef,options}: UseIntObserverProps) {
    

    useEffect(() => {
      const intObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(classToAdd);
          }
        })
      }, options)
  
      elementsArrayRef.current.forEach((element) => {
        if (element) {
            intObserver.observe(element)
        }
      });
  
      return () => intObserver.disconnect()

    }, [classToAdd, elementsArrayRef, options])


  }
  