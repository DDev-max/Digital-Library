import { nResults } from "../../data/consts"
import { SelectOptnProps } from "../../data/types";

export function selectOptn({event,optnsRef,setOptnIdx,setUserSearch,userSearch,debouncCb}: SelectOptnProps) {
    if (!userSearch) return

      setOptnIdx(previous=>{
          let newIdx;

          if (event.key === "ArrowDown") {
              newIdx = (previous + 1) % nResults

              setUserSearch( optnsRef.current[newIdx] || "")
              return newIdx
  
          }

          if (event.key === "ArrowUp") {

              newIdx = previous === -1 
              ? nResults - 1 
              : (previous - 1 + nResults) % nResults


              setUserSearch(optnsRef.current[newIdx] || "")
              return newIdx
  
          }

          return previous


      })

      debouncCb()
      

  }
