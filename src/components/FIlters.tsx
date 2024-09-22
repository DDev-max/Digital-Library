export function Filters() {
    return(
        <form className="formCategories">
            <label htmlFor="drama">
                Drama
                <input type="radio" name="category" id="drama" />
            </label>
            <label htmlFor="novel">
                Novel
                <input type="radio" name="category" id="novel" />
            </label>
            <label htmlFor="scifi">
                Science fiction
                <input type="radio" name="category" id="scifi" />
            </label>
            <label htmlFor="comedy">
                Comedy
                <input type="radio" name="category" id="comedy" />
            </label>
            <label htmlFor="crime">
                Crime
                <input type="radio" name="category" id="crime" />
            </label>
            <label htmlFor="kids">
                Kids
                <input type="radio" name="category" id="kids" />
            </label>        
        </form>
    )
}