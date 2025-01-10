
export const menuSize = 160

export const spanCloseTag = "</span>"

export const spanOpenRegex = /<span class="contextMenu_color--(first|second|third|fourth)">/g
export const spanCloseRegex = /<\/span>/g

export const emptySpanRegex = new RegExp(`${spanOpenRegex.source}${spanCloseRegex.source}`, 'g');

export const dataParagraphIdx = "data-index"


export const phoneInputRegx = /^\d{4}-\d{4}$/
export const nameInputRegex = /^\s*(?=.*\s)[A-Za-záéíóúÁÉÍÓÚñÑ]+(?: [A-Za-záéíóúÁÉÍÓÚñÑ]+)+\s*$/
// eslint-disable-next-line no-useless-escape
export const emailInputRegex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/


export const nResults = 5


 interface BookAds {
    ImgLink: string; 
    id: string;    
    alt: string; 
    bgColor: string  
    txtColor: string 
}

export const ads: BookAds[] = [
    {
      ImgLink: "https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/101874664/original/6647c3de3e0a61444b8934afcd6903db0ff94147/design-a-good-cover-for-your-book-or-your-novel.jpg",
      id: "pfngua013",
      alt: "Our latest books.",
      bgColor: "#297ca2 72.5%, rgb(7, 60, 101) 33%",
      txtColor: "#0f121a"
    },
    {
      ImgLink: "https://entail-assets.com/mayple/62d3fed33127031a8d19444e_topdigitalmarketingbooks1_7537d6da3b3e12c2bfd36fb73c05db72_2000-1699776207516.jpg",
      id: "xdadf23",
      alt: "The best business books",
      bgColor: "#f2f2ff 70%, rgb(242 242 255)",
      txtColor: "#d1131a"
    },
    {
      ImgLink: "https://assets.aboutamazon.com/dims4/default/5bd49fc/2147483647/strip/false/crop/2000x1125+0+0/resize/1200x675!/quality/90/?url=https%3A%2F%2Famazon-blogs-brightspot.s3.amazonaws.com%2Fe1%2F55%2F199341c14286b4d5322a9f89b44d%2Foctober-top10-books-hero-v2.jpg",
      id: "psmvir120",
      alt: "The new kindle books.",
      bgColor: "135deg,#300204 19%, #AF2022 62%",
      txtColor: "#000"
    }
  ];
