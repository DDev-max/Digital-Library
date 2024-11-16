import { InputChangeProps } from "../../data/types"

export function inputChange({event,setUserSearch}: InputChangeProps) {
    const userInput = event.target.value
    setUserSearch(userInput)

}


