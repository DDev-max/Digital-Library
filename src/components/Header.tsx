import { Link, Outlet } from "react-router-dom";
import { FavoriteSVG } from "../svg/FavoriteSVG";
import { SearchSVG } from "../svg/SearchSVG";
import { UserSVG } from "../svg/UserSVG";

export function Header() {


    return(
        <>
            <header className="header">
                <Link to={"/"}>
                    <h1 className="header_h1">Library</h1>
                </Link>

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

            <Outlet/>
        
        </>
    )
}