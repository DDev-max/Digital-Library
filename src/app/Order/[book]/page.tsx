"use client"

import { emailInputRegex, nameInputRegex } from "data/consts"
import { emailInputChange } from "app/Order/[book]/emailInputChange"
import { nameInputChange } from "app/Order/[book]/nameInputChange"
import { phoneInputChange } from "app/Order/[book]/phoneInputChange"
import { useRef, useState } from "react"
import { formSubmit } from "Utils/formSubmit/formSubmit"
import { useParams } from "next/navigation"
import { Alert } from "@/components/Alert/Alert"
import  type { LatLngExpression } from "leaflet"
import { DynamicMap } from "@/components/Map/DynamicMap"



export default function PreOrderPage() {

    const params = useParams<{book: string}>()
    const bookNameConv = decodeURIComponent(params.book)

    const phoneRef = useRef<HTMLInputElement>(null)

    const [formAlert, setFormAlert] = useState("")
    const [markerPosition, setMarkerPosition] = useState<LatLngExpression>()


    return (
        <main id="mainContent" className="orderMain">

            <form aria-labelledby="formName" id="orderForm" className="orderForm" onSubmit={(e) => formSubmit({ e, setAlert: setFormAlert })}>

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
                                required
                                type="tel"
                                id="phone"
                                name="phone" />
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
                                required
                                type="email"
                                id="email"
                                name="email" />
                        </label>
                    </p>


                    <p >
                        <label
                            className="orderForm_AllInputs_label"
                            htmlFor="book">
                            Book name
                            <input
                                required
                                className="orderForm_AllInputs_input"
                                type="text"
                                name="book"
                                id="book"
                                defaultValue={bookNameConv}
                            />
                        </label>
                    </p>


                    <input readOnly name="coordinates" hidden value={markerPosition ? markerPosition.toString() : ""} type="text" />


                </div>



                <DynamicMap markerPosition={markerPosition} setMarkerPosition={setMarkerPosition} setAlert={setFormAlert} divClassName="orderForm_MapCont" />

                <button className="orderForm_submitBtn" type="submit">Send Form</button>
            </form>

            <Alert alert={formAlert} />

        </main>
    )
}

