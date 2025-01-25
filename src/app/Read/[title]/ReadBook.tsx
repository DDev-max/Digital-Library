"use client"

import { Alert } from "@/components/Alert/Alert";
import { ContxtMenu } from "@/components/ContextMenu/ContxtMenu"
import { useRef, useState } from "react"


export function ReadBook({ plainBookContent }: { plainBookContent: string[] }) {

    const [bookContent, setBookContent] = useState(plainBookContent)
    const [alert, setAlert] = useState("")

    const paragraphContainerRef = useRef<HTMLDivElement>(null)

    return (
        <>
            <ContxtMenu
                paragraphContainer={paragraphContainerRef}
                setAlert={setAlert}
                bookContent={bookContent}
                setBookContent={setBookContent} />

            <div
                ref={paragraphContainerRef}
                className="readBook_paragraphsContainer"
                // 👇 to avoid an error when selecting the whole paragraph by triple-clicking on it
                //onMouseDown={(e) => { if (e.detail >= 3) e.preventDefault() }}
                >



                {bookContent?.map((elmnt, pIndex) => {

                    return (
                        <p
                            dangerouslySetInnerHTML={{ __html: elmnt }} key={pIndex}>
                        </p>
                    )
                })}

                <Alert alert={alert} />

            </div>
        </>
    )
}