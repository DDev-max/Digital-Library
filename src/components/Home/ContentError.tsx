import { ContentErrorProps } from "../../data/types";

export function ContentError({error}: ContentErrorProps) {

    
    if ( error instanceof Error ) {
        const errorCode = error.message.match(/\d+/)?.[0]
        
        if (Number(errorCode) === 429) {
            return <p className="fullError">There seems to be a lot of traffic on our application today, please come back later.</p>
        } else{
            return <p  className="fullError"> Connection error </p>
        }


      }


}