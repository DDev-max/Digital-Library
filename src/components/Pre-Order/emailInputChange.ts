import { emailInputRegex } from "../../data/consts"

export function emailInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    //cambiar por refs
    if (!emailInputRegex.test(e.target.value)) {
        e.target.setCustomValidity("Please, enter a real e-mail address")
    }else{
        e.target.setCustomValidity("")

    }
}
