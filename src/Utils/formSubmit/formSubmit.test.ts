import { newAlert } from "Utils/newAlert";
import { formSubmit } from "./formSubmit"

jest.mock("Utils/newAlert")


const e = {
    preventDefault:  jest.fn()
} as unknown as React.FormEvent<HTMLFormElement>;

const setAlert = jest.fn();

it("should call newAlert", ()=>{
    formSubmit({e,setAlert})

    expect(newAlert).toHaveBeenNthCalledWith(1, {setAlert, string: "Form submitted!"})
})