import { API_URL } from "../consts";
import { BooksAPI } from "../types";

export const fetchBooks=  async ()=>{

    const response = await fetch(API_URL);
    const format: BooksAPI = await response.json();

    // console.log(format);
    // console.log("Fetcheado");
    

    return format.items

}