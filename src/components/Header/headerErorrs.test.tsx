import userEvent from '@testing-library/user-event';
import { Header } from './Header';
import { render, screen } from '@testing-library/react';
import type { SearchBooksApi } from 'data/types';
import { useSearch } from 'hooks/useSearch';

jest.mock('hooks/useSearch');
jest.spyOn(console,"error").mockImplementation(()=>console.log("Mock console error")); //to avoid message: search tag is unrecognized in this browser


it("should display an error if the API is down", async () => {
    const user = userEvent.setup()

    const data: SearchBooksApi = { items: [{ id: "1", volumeInfo: { authors: ["John"], title: "Book" } }] };
    const isLoading = false;
    const isError = true;
    const error = new Error("429 Client Error: Too Many Requests for URL");

    (useSearch as jest.Mock).mockReturnValue({ data, isLoading, isError, error })
    render(<Header />);

    const inputSearch = screen.getByLabelText("Search for a book")
    await user.type(inputSearch, "Some book")

    const errorMessage = screen.getByText("There seems to be a lot of traffic on our application today, please come back later.");
    expect(errorMessage).toBeInTheDocument();

})



it("should display a message if no results are found", async () => {
    const user = userEvent.setup()
    const data = {} as SearchBooksApi;
    const isLoading = false
    const isError = true
    const error = new Error("");

    (useSearch as jest.Mock).mockReturnValue({ data, isLoading, isError, error })

    render(<Header />);

    const inputSearch = screen.getByLabelText("Search for a book")
    await user.type(inputSearch, "Wrong book name")

    const errorMessage = screen.getByText("No results found")

    expect(errorMessage).toBeInTheDocument()

})



it("should display an error for other code errors", async () => {
    const user = userEvent.setup()

    const data: SearchBooksApi = { items: [{ id: "1", volumeInfo: { authors: ["John"], title: "Book" } }] };
    const isLoading = false;
    const isError = true;
    const error = new Error("401 Unauthorized");


    (useSearch as jest.Mock).mockReturnValue({ data, isLoading, isError, error })

    render(<Header />);
    const inputSearch = screen.getByLabelText("Search for a book")
    await user.type(inputSearch, "Some book")

    const errorMessage = screen.getByText("Error while searching");

    expect(errorMessage).toBeInTheDocument();

})