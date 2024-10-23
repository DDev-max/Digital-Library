import { submitSearchProps } from "../../data/types"

export function subtmitSearch({event,redirect,userSearch}: submitSearchProps) {
    event.preventDefault()
    redirect(`/Read/${userSearch}`)
  }