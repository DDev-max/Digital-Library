import { nameInputRegex } from "../../../data/consts"

export function nameInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!nameInputRegex.test(e.target.value)) {
        e.target.setCustomValidity("Please enter your full name")
    }else{
        e.target.setCustomValidity("")

    }

}
