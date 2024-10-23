import { useState } from "react"
import { ads } from "../../data/consts"

export function BigSlider() {
    const [imgIdx, setImgIdx] = useState(0)


    return(
            <section className="bigSlider">
                <div className="bigSlider_contImg">
                    {ads.map((elmnt, idx)=>{
                        return(
                            <img style={{display: imgIdx === idx? "block": "none"}} className="bigSlider_Img" key={elmnt.id} src={elmnt.ImgLink} alt={elmnt.alt} />
                        )
                    })}
                </div>

                <footer className="bigSlider_footer">
                    {ads.map((_, idx)=>{
                        return(
                            <button
                            onClick={()=> setImgIdx(idx)}
                            className={`bigSlider_imgNumber ${imgIdx === idx? " imgNumber--selected" : ""}`}
                            >

                            </button>
                        )
                    })}
                </footer>

            </section>
    )
}