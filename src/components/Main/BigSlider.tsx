export function BigSlider() {
    return(
            <section className="bigSlider">
                <div className="bigSlider_contImg">
                    <img className="bigSlider_Img " src="https://th.bing.com/th/id/OIP.9hyEQuoVUyn_JR-XBmblbAHaE8?rs=1&pid=ImgDetMain" alt="" />
                    <footer className="bigSlider_footer">
                        <button className="bigSlider_imgNumber imgNumber--selected"></button>
                        <button className="bigSlider_imgNumber"></button>
                        <button className="bigSlider_imgNumber"></button>
                    </footer>
                </div>

                <h2 className="bigSlider_h2">Image desc</h2>
            </section>
    )
    
}