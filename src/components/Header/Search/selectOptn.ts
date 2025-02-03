import type { UserSearchState } from "data/types"


interface SelectOptnProps extends Pick<UserSearchState, "setUserSearch"> {
  e: React.KeyboardEvent<HTMLFormElement>
  optnsRef: React.MutableRefObject<(HTMLSpanElement | null)[]>
  setOptnIdx: React.Dispatch<React.SetStateAction<number>>
  nResults: number
}

export function selectOptn({ e, optnsRef, setOptnIdx, setUserSearch, nResults }: SelectOptnProps) {

  setOptnIdx(previous => {
    if (!optnsRef.current.length || !nResults) return -1

    let newIdx: number;

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
