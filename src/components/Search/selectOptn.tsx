import { nResults } from "../../data/consts"
import { SelectOptnProps } from "../../data/types";

export function selectOptn({event,optnsRef,setOptnIdx,setUserSearch,userSearch,debouncCb, isError}: SelectOptnProps) {
    if (!userSearch) return

      setOptnIdx(previous=>{
          let newIdx;

          if (isError) return -1


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
