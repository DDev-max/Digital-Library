import { LatLngExpression } from "leaflet";
import { Alert } from "../../components/Alert";
import { Map } from "../../components/Map/Map";
import { useRef, useState } from "react";
import { emailInputRegex, nameInputRegex } from "../../data/consts";
import { useHighlightCntxt } from "../../Context/useHighlightContxt";
import { nameInputChange } from "./nameInputChange";
import { emailInputChange } from "./emailInputChange";
import { phoneInputChange } from "./phoneInputChange";
import { formSubmit } from "../../Utils/formSubmit";
import { useParams } from "react-router-dom";
import { urlConversion } from "../../Utils/urlConversion";

export default function PreOrder() {

    const defaultCoords: LatLngExpression = [9.93333, -84.08333]

    const selectedBook = useParams()
    const bookNameConv = urlConversion({ title: selectedBook.book || "", fromURL: true })

    const [bookName, setBookName] = useState(bookNameConv)
    const [markerPosition, setMarkerPosition] = useState<LatLngExpression>(defaultCoords)

    const phoneRef = useRef<HTMLInputElement>(null)


    const context = useHighlightCntxt()
    if (!context) return

    const { setAlert } = context


    return (
        <main id="mainContent" className="orderMain">
            <Alert brdrColor />


            <form aria-labelledby="formName" className="orderForm" onSubmit={(e) => formSubmit({ e, setAlert, markerPosition })}>

                <h1 id="formName" className="orderForm_h1">Pre-order a book</h1>

                <div className="orderForm_AllInputs">

                    <p>
                        <label 
                        className="orderForm_AllInputs_label" 
                        htmlFor="name">

                            Name
                            <input
                                className="orderForm_AllInputs_input"
                                onChange={nameInputChange}
                                pattern={nameInputRegex.source}
                                required minLength={5}
                                placeholder="Luis Ramirez"
                                type="text" id="name" name="name" />
                        </label>
                    </p>

                    <p >
                        <label 
                        className="orderForm_AllInputs_label"
                        htmlFor="phone">
                            Phone
                            <input
                                className="orderForm_AllInputs_input"
                                minLength={9}
                                maxLength={9}
                                placeholder="1234-5678"
                                onChange={(e) => phoneInputChange({ e, phoneRef })}
                                ref={phoneRef}
                                required type="tel"
                                id="phone" name="phone" />
                        </label>
                    </p>

                    <p >
                        <label 
                        className="orderForm_AllInputs_label"
                        htmlFor="email">
                            Email
                            <input
                                className="orderForm_AllInputs_input"
                                onChange={emailInputChange}
                                placeholder="example@gmail.com"
                                pattern={emailInputRegex.source}
                                required type="email"
                                id="email" name="email" />
                        </label>
                    </p>


                    <p >
                        <label                         
                        className="orderForm_AllInputs_label"
                        htmlFor="book">
                            Book name
                            <input
                                onChange={(e) => { setBookName(e.target.value) }}
                                required
                                className="orderForm_AllInputs_input"
                                type="text" name="book"
                                id="book"
                                value={bookName} />
                        </label>
                    </p>

                </div>



                <Map divClassName="orderForm_MapCont" markerPosition={markerPosition} setMarkerPosition={setMarkerPosition} />


                <button className="orderForm_submitBtn" type="submit">Send Form</button>
            </form>

        </main>
    )
}