import type { Item } from 'data/types'

interface RemoveAddFavProps {
  setFavorites: React.Dispatch<React.SetStateAction<Item[]>>
  selection: Item
  alreadyAdded: boolean
}

export function removeAddFav({ alreadyAdded, selection, setFavorites }: RemoveAddFavProps) {
  if (!alreadyAdded) {
    setFavorites(prev => [...prev, selection])
  } else {
    setFavorites(prevFavorites => {
      return prevFavorites?.filter(elmnt => elmnt.id !== selection.id)
    })
  }
}
