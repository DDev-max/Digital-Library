export function MainContent() {
    return(
        <main>
            <section className="bigSlider">
                <div className="bigSlider__contImg">
                    <img className="bigSlider__Img " src="https://th.bing.com/th/id/OIP.9hyEQuoVUyn_JR-XBmblbAHaE8?rs=1&pid=ImgDetMain" alt="" />
                    <footer className="bigSlider__footer">
                        <button className="bigSlider__imgNumber imgNumber--selected"></button>
                        <button className="bigSlider__imgNumber"></button>
                        <button className="bigSlider__imgNumber"></button>
                    </footer>
                </div>

                <h1 className="bigSlider__h1">Image desc</h1>
            </section>
        </main>
    )
    
}