import { Link } from "react-router-dom";
import { FavoriteSVG } from "./svg/Favorite/FavoriteSVG";
import { Search } from "./Search/Search";
import { Logo } from "./svg/Logo";


export function Header() {


    return(
        <>
            <header className="header">
                <Link className="header_LinkContainer" to={"/"}>
                    <Logo classNameSVG="header_Logo"/>
                    <h1 className="header_h1">Library</h1>
                </Link>

                <Search/>

                <div className="header_aside">
                    <Link to={"/Favorites"}>
                        <FavoriteSVG/>
                    </Link>
                </div>
            </header>
        </>
    )
}