/* eslint-disable testing-library/no-node-access */
import userEvent from '@testing-library/user-event';
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react"
import { ReadBook } from "./ReadBook"

it("shouldnt highlight a selection if its empty", async () => {
    const user = userEvent.setup()
    const bookContent = ["This is the first paragraph of a book"]

    render(<ReadBook plainBookContent={bookContent} />)

    const paragraph = screen.getByText('This is the first paragraph of a book')

    const range = document.createRange()
    const selection = window.getSelection()
    selection?.removeAllRanges()
    if (paragraph.firstChild) {
        range.setStart(paragraph.firstChild, 4)
        range.setEnd(paragraph.firstChild, 5)
    }

    selection?.addRange(range)

    fireEvent.contextMenu(paragraph)

    const firstColor = screen.getByLabelText("Color number 1")
    await user.click(firstColor)

    expect(paragraph.innerHTML).toBe('This is the first paragraph of a book')


});

it("should highlight a selected text", async () => {
    const user = userEvent.setup()
    const bookContent = ["This is the first paragraph of a book"]

    render(<ReadBook plainBookContent={bookContent} />)

    const paragraph = screen.getByText('This is the first paragraph of a book')

    const range = document.createRange()
    const selection = window.getSelection()
    selection?.removeAllRanges()
    if (paragraph.firstChild) {
        range.setStart(paragraph.firstChild, 0)
        range.setEnd(paragraph.firstChild, 4)
    }

    selection?.addRange(range)

    fireEvent.contextMenu(paragraph)

    const firstColor = screen.getByLabelText("Color number 1")
    await user.click(firstColor)

    expect(paragraph.innerHTML).toBe('<span class="contextMenu_color--first">This</span> is the first paragraph of a book')


});

it("should highlight a selection even if it contains highlighted text and plain text", async () => {
    const user = userEvent.setup()
    const bookContent = ['A highlighted <span class="contextMenu_color--first">text</span> and a plain text']

    render(<ReadBook plainBookContent={bookContent} />)

    const paragraph = screen.getByRole("paragraph")


    const range = document.createRange()
    const selection = window.getSelection()
    selection?.removeAllRanges()

    if (paragraph.firstChild && paragraph.lastChild) {
        range.setStart(paragraph.firstChild, 2)
        range.setEnd(paragraph.lastChild, 12)
    }

    selection?.addRange(range)

    fireEvent.contextMenu(paragraph)

    const firstColor = screen.getByLabelText("Color number 1")
    await user.click(firstColor)

    expect(paragraph.innerHTML).toBe('A <span class="contextMenu_color--first">highlighted text and a plain</span> text')
});

it("should highlight the full paragraph when its selected by triple clicking on it", async ()=>{
    const user =  userEvent.setup()
    const bookContent = ["A paragraph"]
    render(<ReadBook plainBookContent={bookContent}/>)

    const paragraph =  screen.getByText("A paragraph")
    await user.tripleClick(paragraph)
    fireEvent.contextMenu(paragraph)
    const firstColor = screen.getByLabelText("Color number 1")
    await user.click(firstColor)

    expect(paragraph.innerHTML).toBe('<span class="contextMenu_color--first">A paragraph</span>')

})

it("should remove a higlighted text", async () => {
    const user = userEvent.setup()
    const bookContent = ['<span class="contextMenu_color--first">This</span> is the first paragraph of a book']

    render(<ReadBook plainBookContent={bookContent} />)
    const highlight = screen.getByText('This')

    const range = document.createRange()
    const selection = window.getSelection()
    selection?.removeAllRanges()

    if (highlight.firstChild) {
        range.setStart(highlight.firstChild, 0)
        range.setEnd(highlight.firstChild, 4)
    }
    selection?.addRange(range)

    fireEvent.contextMenu(highlight)

    const removeBtn = screen.getByLabelText('Remove Highlight')

    await user.click(removeBtn)

    const paragraph = screen.getByRole("paragraph")

    expect(paragraph.innerHTML).toBe('This is the first paragraph of a book')


});

it("should display an alert if the user selects more than one paragraph", async () => {
    jest.useFakeTimers();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    const bookContent = ["First paragraph.", "Second paragraph."];
    render(<ReadBook plainBookContent={bookContent} />);

    const firstParagraph = screen.getByText("First paragraph.");
    const secondParagraph = screen.getByText("Second paragraph.");

    const range = document.createRange();
    const selection = window.getSelection();
    selection?.removeAllRanges();
    if (firstParagraph.firstChild && secondParagraph.firstChild) {
        range.setStart(firstParagraph.firstChild, 0);
        range.setEnd(secondParagraph.firstChild, 4);
    }
    selection?.addRange(range);

    fireEvent.contextMenu(secondParagraph);

    const firstColor = screen.getByLabelText("Color number 1");
    await user.click(firstColor);

    const alert = screen.getByRole("alert");
    expect(alert).toBeInTheDocument();

    await act(async () => {
        jest.advanceTimersByTime(2100);
        jest.runOnlyPendingTimers();
    });

    await waitFor(() => {
        expect(alert).not.toBeInTheDocument();
    });

    jest.useRealTimers();
});



it("should display an alert if the user tries to highlight more than one higlight", async ()=>{
    jest.useFakeTimers();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    const bookContent = ['A <span class="contextMenu_color--first">text</span> highlighted <span class="contextMenu_color--first">two</span> times']
    render(<ReadBook plainBookContent={bookContent} />)

    const paragraph = screen.getByRole("paragraph")

    const range = document.createRange()
    const selection = window.getSelection()
    selection?.removeAllRanges()
    if (paragraph.firstChild && paragraph.lastChild) {
        range.setStart(paragraph.firstChild, 0)
        range.setEnd(paragraph.lastChild, 6)
    }
    selection?.addRange(range)

    fireEvent.contextMenu(paragraph)

    const firstColor = screen.getByLabelText("Color number 1")
    await user.click(firstColor)

    const alert = screen.getByRole("alert")
    expect(alert).toBeInTheDocument()    

    await act(async () => {
        jest.advanceTimersByTime(2100);
        jest.runOnlyPendingTimers();
    });

    await waitFor(() => {
        expect(alert).not.toBeInTheDocument();
    });

    jest.useRealTimers();
})