import { BookAds } from "./types"

const fields = "title,publishedDate,imageLinks,authors,categories"

export const API_URL=  `https://www.googleapis.com/books/v1/volumes?q=subject:fiction&fields=items(volumeInfo(${fields}))&maxResults=20`

export const menuSize: number = 160

export const URLorem = "https://baconipsum.com/api/?type=all-meat&paras=10&format=json"

export const pTagLength = 3

export const spanWithClassAtt = 15

export const spanCloseTag = "</span>"

export const nResults = 5

export const ads: BookAds[] = [
    {
      ImgLink: "https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/101874664/original/6647c3de3e0a61444b8934afcd6903db0ff94147/design-a-good-cover-for-your-book-or-your-novel.jpg",
      id: "pfngua013",
      alt: "Our latest books."
    },
    {
      ImgLink: "https://entail-assets.com/mayple/62d3fed33127031a8d19444e_topdigitalmarketingbooks1_7537d6da3b3e12c2bfd36fb73c05db72_2000-1699776207516.jpg",
      id: "xdadf23",
      alt: "Business book covers."
    },
    {
      ImgLink: "https://assets.aboutamazon.com/dims4/default/5bd49fc/2147483647/strip/false/crop/2000x1125+0+0/resize/1200x675!/quality/90/?url=https%3A%2F%2Famazon-blogs-brightspot.s3.amazonaws.com%2Fe1%2F55%2F199341c14286b4d5322a9f89b44d%2Foctober-top10-books-hero-v2.jpg",
      id: "psmvir120",
      alt: "The new kindle books."
    }
  ];

//buscar cuales no estoy usando