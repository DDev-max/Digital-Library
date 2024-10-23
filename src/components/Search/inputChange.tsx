import { InputChangeProps } from "../../data/types"

export function inputChange({debounceCb,event,setUserSearch}: InputChangeProps) {
    const userInput = event.target.value
    setUserSearch(userInput)

    debounceCb()
}
