import { Link } from "react-router-dom";
import { FavoriteSVG } from "./svg/Favorite/FavoriteSVG";
import { Search } from "./Search/Search";


export function Header() {


    return(
        <>
            <header className="header">
                <Link to={"/"}>
                    <h1 className="header_h1">Library</h1>
                </Link>

                <Search/>

                <div>
                    <UserSVG/>
                    <FavoriteSVG/>
                </div>
            </header>
        </>
    )
}