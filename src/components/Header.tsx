import { Link } from "react-router-dom";
import { FavoriteSVG } from "./svg/Favorite/FavoriteSVG";
import { Search } from "./Search/Search";
import { Logo } from "./svg/Logo";


export function Header() {


    return(
        <>
            <header className="header">
                <Link title="Go to home page." className="header_LinkContainer" to={"/"}>
                    <Logo />
                    <h1 className="header_h1">MarkMyBook</h1>
                </Link>

                <a tabIndex={0} className="skipLink" href="#mainContent">Skip navigation</a>

                <Search/>

                <div className="header_aside">
                    <Link to={"/Favorites"}>
                        <FavoriteSVG className="header_favListIcon"/>
                    </Link>
                </div>
            </header>
        </>
    )
}