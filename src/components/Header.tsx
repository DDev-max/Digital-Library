import { FavoriteSVG } from "./svg/Favorite/FavoriteSVG";
import { Search } from "./Search/Search";
import { Logo } from "./svg/Logo";
import Link from "next/link";


export function Header() {

    return(
        <>
            <header className="header">
                <a tabIndex={0} className="skipLink" href="#mainContent">Skip navigation</a>
                
                <Link title="Go to home page." className="header_LinkContainer" href={"/"}>
                    <Logo />
                    <h1 className="header_h1">MarkMyBook</h1>
                </Link>


                <Search/>

                <div className="header_aside">
                    <Link href={"/Favorites"}>
                        <FavoriteSVG className="header_favListIcon"/>
                    </Link>
                </div>
            </header>
        </>
    )
}