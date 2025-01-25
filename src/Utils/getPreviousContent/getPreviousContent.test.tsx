import { render, screen } from "@testing-library/react"
import { getPreviousContent } from "./getPreviousContent"


const ParagraphWithNestedElements = () => (
    <p>
        This is an paragraph
        <span> with some </span>
        <span>nested tags</span>
        we are simulating a highlighted 
        paragraph 
    </p>
)

//PONERLE NOMBRES DE CLASES


it("should return all previous plaintext of a nested element", () => {

    render(<ParagraphWithNestedElements />)


    const nestedElement = screen.getByText("nested tags")

    const previousText = getPreviousContent(nestedElement)
    
    expect(previousText).toBe("This is an paragraph with some nested tags")
})