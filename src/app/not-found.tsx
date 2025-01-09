import { ErrorSVG } from "@/components/svg/ErrorSVG"


export default function Error() {


    

    return (
        <main id="mainContent" className="errorPage">
            <div className="errorPage_div">
                <h1 className="errorPage_h1">This page does not exist</h1>
                <ErrorSVG className="errorPage_svg"/>
            </div>
        </main>
    )
}