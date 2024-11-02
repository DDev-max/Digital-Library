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
    const bookNameConv = urlConversion({title: selectedBook.book || "", fromURL: true})

    const [bookName, setBookName] =  useState(bookNameConv)
    const [markerPosition, setMarkerPosition] = useState<LatLngExpression>(defaultCoords)

    const phoneRef = useRef<HTMLInputElement>(null)


    const context = useHighlightCntxt()
    if (!context) return

    const {setAlert} = context


    return (
        <main className="orderMain">
            <Alert brdrColor/>

            <h1 className="orderMain_h1">Pre-order book</h1>

            <form className="orderMain_form" onSubmit={(e)=> formSubmit({e,setAlert,markerPosition})}>

                <div className="orderMain_form_allInputsCont">

                    <p className="orderMain_form_inputCont">
                        <label htmlFor="name">Name</label>

                        <input 
                        className="orderMain_form_inputCont_input"
                        onChange={nameInputChange}
                        pattern={nameInputRegex.source}
                        required minLength={5}  
                        placeholder="Luis Ramirez"
                        type="text" id="name" name="name" />
                    </p>

                    <p className="orderMain_form_inputCont">
                        <label htmlFor="phone">Phone</label>

                        <input 
                        className="orderMain_form_inputCont_input"
                        minLength={9}
                        maxLength={9}
                        placeholder="1234-5678"
                        onChange={(e)=>phoneInputChange({e,phoneRef})}
                        ref={phoneRef} 
                        required type="tel" 
                        id="phone" name="phone" />

                    </p>

                    <p className="orderMain_form_inputCont">
                        <label htmlFor="email">Email</label>

                        <input 
                        className="orderMain_form_inputCont_input"
                        onChange={emailInputChange}
                        placeholder="example@gmail.com"
                        pattern={emailInputRegex.source}
                        required type="email" 
                        id="email" name="email" />
                    </p>

                    <p className="orderMain_form_inputCont">
                        <label htmlFor="book">Book name</label>
                        
                        <input 
                        onChange={(e)=> {setBookName(e.target.value)}}
                        required
                        className="orderMain_form_inputCont_input"
                        type="text" name="book" 
                        id="book"  
                        value={bookName} />
                    </p>

                </div>

                <Map markerPosition={markerPosition} setMarkerPosition={setMarkerPosition}/>

                <button className="orderMain_form_submitBtn" type="submit">Send</button>

            </form>
        </main>
    )
}