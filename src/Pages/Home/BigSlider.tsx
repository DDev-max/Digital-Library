import { useState } from "react"
import { ads } from "../../data/consts"

export function BigSlider() {
    const [imgIdx, setImgIdx] = useState(0)

//linear-gradient(100deg, rgb(48 2 4) 16%, #af2022 50%)
    return(
            <section className="bigSlider"
            
            >
                <div className="bigSlider_contImgs">
                    {ads.map((elmnt, idx)=>{
                        return(
                            <article key={idx} className="bigSlider_bg" style={{display: imgIdx === idx? "flex": "none", background: `linear-gradient(${elmnt.bgColor})`}}>

                                <div className="bigSlider_contInfo">

                                    <img  className="bigSlider_Img" key={elmnt.id} src={elmnt.ImgLink} alt={elmnt.alt} />

                                    <h2 className="bigSlider_title">{elmnt.alt}</h2>

                                </div>


                            </article>
                        )
                    })}
                </div>

                <footer className="bigSlider_footer">
                    {ads.map((_, idx)=>{
                        return(
                            <button
                            key={idx}
                            onClick={()=> setImgIdx(idx)}
                            className={`bigSlider_imgNumber ${imgIdx === idx? " bigSlider_imgNumber--selected" : ""}`}
                            >

                            </button>
                        )
                    })}
                </footer>

            </section>
    )
}