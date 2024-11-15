import { useState } from "react"
import { ads } from "../../data/consts"

export function BigSlider() {
    const [imgIdx, setImgIdx] = useState(0)

    return(
            <section className="bigSlider"
            
            >
                <div className="bigSlider_contImgs" aria-live="polite" id="slider" >
                    {ads.map((elmnt, idx)=>{
                        return(
                            <article key={idx} className="bigSlider_bg" style={{display: imgIdx === idx? "flex": "none", background: `linear-gradient(${elmnt.bgColor})`}}>

                                <div className="bigSlider_bg_contInfo">

                                    <img  className="bigSlider_bg_contInfo_Img" 
                                    key={elmnt.id} src={elmnt.ImgLink} 
                                    alt={elmnt.alt} 
                                    loading="lazy"
                                    />

                                    <h2 style={{color: elmnt.txtColor}} className="bigSlider_bg_contInfo_title">{elmnt.alt}</h2>

                                </div>


                            </article>
                        )
                    })}
                </div>

                <footer className="bigSlider_footer">
                    {ads.map((_, idx)=>{
                        return(
                            <button
                            aria-selected={imgIdx == idx}
                            aria-label={`Click to see image number ${idx + 1}`}
                            aria-controls="slider"
                            key={idx}
                            onClick={()=> setImgIdx(idx)}
                            className={`bigSlider_footer_imgNumber ${imgIdx === idx? " bigSlider_footer_imgNumber--selected" : ""}`}
                            >

                            </button>
                        )
                    })}
                </footer>

            </section>
    )
}