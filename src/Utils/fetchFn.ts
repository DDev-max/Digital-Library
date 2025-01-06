import { FetchFnProps } from "../data/types";
import mock from "../data/apiMock.json"
import { URLorem } from "data/consts";

export async function fetchFn<T>({ URL, setFetchNow }: FetchFnProps) {

  // const response = await fetch(URL)

  // const format: T = await response.json()


  // if (!response.ok) {        
        // throw new Error(`Fetch error: ${response.status}, ${response.statusText}`);
  //   }



  //VER PARA QUE CHOTA SE USABA Y COMO PUEDO INCORPORARLO EN NEXT JS (servia para el search)
  // if (setFetchNow) {
  //     setFetchNow(false)
  // }


  // return format

  // if (URL == URLorem) return ["Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint dolorem dolor sequi ullam dolores soluta corporis cupiditate vel. Commodi vel hic pariatur ab porro delectus a magnam ducimus sequi. Accusamus mollitia sunt quaerat quisquam sit expedita animi eum et dolorum.", "Ut fugit, reiciendis veniam possimus natus sit minima nulla, voluptates impedit, totam magnam explicabo aspernatur laboriosam omnis voluptatibus dicta amet deserunt minus id incidunt? Sint modi, nemo laboriosam nisi doloremque, ea pariatur natus excepturi voluptates odit odio vitae praesentium quaerat omnis vero. Non illo assumenda saepe ea iure aspernatur, officiis porro, numquam ab dolorum est facilis quidem similique cum repellendus, libero sapiente molestiae voluptatum."]
  // return mock

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mock);
    }, 5 * 1000);
  });


}

