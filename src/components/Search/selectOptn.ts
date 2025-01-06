import { nResults } from "../../data/consts"
import { SelectOptnProps } from "../../data/types";

export function selectOptn({ e, optnsRef, setOptnIdx, setUserSearch, isError, userSearch }: SelectOptnProps) {
  if (!userSearch) return -1


  setOptnIdx(previous => {
    let newIdx: number;

    if (isError) return -1


    if (e.key === "ArrowDown") {
      newIdx = (previous + 1) % nResults
      setUserSearch(optnsRef.current[newIdx]?.textContent || "")
      return newIdx

    }

    if (e.key === "ArrowUp") {

      newIdx = previous === -1
        ? nResults - 1
        : (previous - 1 + nResults) % nResults


      setUserSearch(optnsRef.current[newIdx]?.textContent || "")
      return newIdx

    }


    return previous


  })





}
