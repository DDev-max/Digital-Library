import { render, screen } from "@testing-library/react"
import { getPreviousContent } from "./getPreviousContent"

//RECIBE EL ULTIMO HIGLIGHT (SOLO HAY UNO), DEVUELVO ESE MISMO HIGLIGHT Y TODO LO QUE ESTA DETRAS


const ParagraphWithNestedElements = () => (
    <p>
        This is an paragraph
        <span> with some </span>
        nested tags
        we are simulating a
        <span> highlighted</span>
        paragraph
    </p>
)

//PONERLE NOMBRES DE CLASES


it("should return all previous plain text of a nested element", () => {

    render(<ParagraphWithNestedElements />)


    const nestedElement = screen.getByText("highlighted")

    const { fullPreviousPlainText } = getPreviousContent(nestedElement)

    expect(fullPreviousPlainText).toBe("This is an paragraph with some nested tags we are simulating a highlighted")
})

it("should return all previous html of a nested element", () => {

    render(<ParagraphWithNestedElements />)

    const nestedElement = screen.getByText("highlighted")

    const { fullPreviousHtml } = getPreviousContent(nestedElement)

    expect(fullPreviousHtml).toBe("This is an paragraph<span> with some </span>nested tags we are simulating a<span> highlighted</span>")
})