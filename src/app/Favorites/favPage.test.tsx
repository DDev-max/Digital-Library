import userEvent from '@testing-library/user-event';
import { render, screen } from "@testing-library/react"
import FavoriteListPage from "./page"
import { useFavoritesContext } from "Context/useFavoritesContext"
import type { Item } from "data/types";
import { removeAddFav } from '../../components/svg/Favorite/removeAddFav';

jest.mock('../../components/svg/Favorite/removeAddFav');
jest.mock("Context/useFavoritesContext");

it("should display a message if there are no books in the favorite list",()=>{
    (useFavoritesContext as jest.MockedFunction<typeof useFavoritesContext>).mockReturnValue({favorites:[], setFavorites: jest.fn()});
    render(<FavoriteListPage/>)


    const message = screen.getByText("Click on the heart to add a book")

    expect(message).toBeInTheDocument()

})

it("should show all books added to the favorites list", ()=>{
    const favorites: Item[] = [
        {
          id: "1",
          volumeInfo: {
            title: "The Little Prince",
            authors: ["Antoine de Saint-Exupéry"],
            imageLinks: {
              smallThumbnail: "https://example.com/small1.jpg",
              thumbnail: "https://example.com/large1.jpg"
            },
            description: "A story about friendship and the meaning of life."
          }
        },
        {
          id: "2",
          volumeInfo: {
            title: "1984",
            authors: ["George Orwell"],
            imageLinks: {
              smallThumbnail: "https://example.com/small2.jpg",
              thumbnail: "https://example.com/large2.jpg"
            },
            description: "A dystopian novel about totalitarianism."
          }
        }
      ];
      
    (useFavoritesContext as jest.MockedFunction<typeof useFavoritesContext>).mockReturnValue({favorites, setFavorites: jest.fn()});
    render(<FavoriteListPage/>)


    const firstBook = screen.getByText("The Little Prince")
    const secondBook = screen.getByText("1984")

    expect(firstBook).toBeInTheDocument()
    expect(secondBook).toBeInTheDocument()

})

it("should remove a book from the favorites list by clicking on the trash can icon",async ()=>{
    const user = userEvent.setup()
    const favorites: Item[] = [
        {
          id: "1",
          volumeInfo: {
            title: "The Little Prince",
            authors: ["Antoine de Saint-Exupéry"],
            imageLinks: {
              smallThumbnail: "https://example.com/small1.jpg",
              thumbnail: "https://example.com/large1.jpg"
            },
            description: "A story about friendship and the meaning of life."
          }
        }
      ];
      
    (useFavoritesContext as jest.MockedFunction<typeof useFavoritesContext>).mockReturnValue({favorites, setFavorites: jest.fn()});

    render(<FavoriteListPage/>)

    const trashCan = screen.getByLabelText("Remove from favorites list")
    await user.click(trashCan)

    expect(removeAddFav).toHaveBeenCalledTimes(1)
})