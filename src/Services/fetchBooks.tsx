import { API_URL } from "../consts";
import { BooksAPI } from "../types";

export const fetchBooks=  async ()=>{

    const response = await fetch("");
    const format: BooksAPI = await response.json();
    

    return format.items

}