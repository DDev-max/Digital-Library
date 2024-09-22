import { FavoriteSVG } from "../svg/FavoriteSVG";
import { SearchSVG } from "../svg/SearchSVG";
import { UserSVG } from "../svg/UserSVG";

export function Header() {
    return(
        <header className="header">
            <h1 className="header__h1">Library</h1>

            <search>
                <form>
                    <input aria-label="Search for a book" placeholder="Search books"  type="text" />
                    <button type="submit">
                        <SearchSVG/>
                    </button>
                </form>
            </search>

            <div>
                <UserSVG/>
                <FavoriteSVG/>
            </div>
        </header>
    )
}