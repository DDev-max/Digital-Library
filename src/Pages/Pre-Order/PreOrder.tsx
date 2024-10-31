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

export function PreOrder() {

    const defaultCoords: LatLngExpression = [9.93333, -84.08333]

    const phoneRef = useRef<HTMLInputElement>(null)

    const [markerPosition, setMarkerPosition] = useState<LatLngExpression>(defaultCoords)

    const context = useHighlightCntxt()
    if (!context) return
    
    const {setAlert} = context



    return (
        <main>
            <Alert brdrColor/>

            <h1>Pre-order book</h1>

            <form onSubmit={(e)=> formSubmit({e,setAlert,markerPosition})}>

                <p>
                    <label htmlFor="name">Name</label>

                    <input 
                    onChange={nameInputChange}
                    pattern={nameInputRegex.source}
                    required minLength={5}  
                    placeholder="Luis Ramirez"
                    type="text" id="name" name="name" />
                </p>

                <p>
                    <label htmlFor="phone">Phone</label>

                    <input 
                    minLength={9}
                    maxLength={9}
                    placeholder="1234-5678"
                    onChange={(e)=>phoneInputChange({e,phoneRef})}
                    ref={phoneRef} 
                    required type="tel" 
                    id="phone" name="phone" />

                </p>

                <p>
                    <label htmlFor="email">Email</label>

                    <input 
                    onChange={emailInputChange}
                    placeholder="example@gmail.com"
                    pattern={emailInputRegex.source}
                    required type="email" 
                    id="email" name="email" />
                </p>

                <Map markerPosition={markerPosition} setMarkerPosition={setMarkerPosition}/>

                <button type="submit">Pre-order</button>

            </form>
        </main>
    )
}