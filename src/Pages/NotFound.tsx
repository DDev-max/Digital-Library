import { ErrorSVG } from "../components/svg/ErrorSVG";

export function NotFound() {


    return (
        <main id="mainContent" className="errorPage">
            <div className="errorPage_div">
                <h1 className="errorPage_h1">This page does not exist</h1>
                <ErrorSVG classNameSVG="errorPage_svg"/>
            </div>
        </main>
    )
}