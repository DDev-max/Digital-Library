//import mock from "../data/apiMock.json"
//import { URLorem } from "data/consts";

export async function fetchFn<TFetchReturn>(URL: string) {
    // console.log(URL);

    // return [
    //     'Lorem ipsum dolor sit amet consectetur HOLA adipisicing elit. Sint dolorem dolor sequi ullam dolores soluta corporis cupiditate vel. Commodi vel hic pariatur ab porro delectus HOLA a magnam ducimus sequi. AcHOLAcusamus mollitia sunt quaerat quisquam sit expedita animi eum et dolorum.',
    //     'Ut fugit, reiciendis veniam context possimus natus sit minima nulla, voluptates impedit, totam magnam explicabo aspernatur laboriosam omnis voluptatibus dicta amet deserunt minus id incidunt? Sint modi,context nemo "aa" "aa" laboriosam nisi doloremque, ea pariatur natus excepturi voluptates odit odio vitae praesentium quaerat omnis vero. Non illo ADIOS ADIOSassumenda saepe ea iure aspernatur, officiis porro, numquam ab dolorum est facilis context quidem similique cum repellendus, libero sapiente molestiae ADIOS voluADIOSptatum.',
    //     'Ha ada d da f ajghe casd jhaslkdno vjndoiuvn '
    // ]
    //     return mock

    //   return repeatedMock


    //   return mockSearch


    const response = await fetch(URL)

    if (!response.ok) {
        throw new Error(`Fetch error: ${response.status}, ${response.statusText}`);
    }

    const format: TFetchReturn = await response.json()





    return format



}

/*

const mockSearch = {items: [
  {
      "id": "oLfUCwAAQBAJ",
      "volumeInfo": {
          "title": "ACCIÓN y añañin. ㍼㍽, Spa😠ish and English Edition",
          "authors": [
              "Cipriano de Valera",
              "Bold Rain",
              "KJV"
          ]
      }
  },
  {
      "id": "Xifq5OE7174C",
      "volumeInfo": {
          "title": "Crusader Art in the Holy Land, From the Third Crusade to the Fall of Acre",
          "authors": [
              "Jaroslav Folda"
          ]
      }
  },
  {
      "id": "Tuc8AAAAcAAJ",
      "volumeInfo": {
          "title": "An Introduction to the Critical Study and Knowledge of the Holy Scriptures",
          "authors": [
              "Thomas Hartwell Horne"
          ]
      }
  },
  {
      "id": "yeTU8s9jliUC",
      "volumeInfo": {
          "title": "Holy People, Holy Place",
          "authors": [
              "Thomas G. Simons"
          ]
      }
  },
  {
      "id": "ldsLAAAAYAAJ",
      "volumeInfo": {
          "title": "A Pilgrimage to the Holy Land",
          "authors": [
              "Alphonse de Lamartine"
          ]
      }
  }
]}

const repeatedMock = {items:[
    {
        "id": "A5TKAwAAQBAJ",
        "volumeInfo": {
            "title": "En sólo 20 horas",
            "authors": [
                "Josh Kaufman"
            ]
        }
    },
    {
        "id": "n4WeBAAAQBAJ",
        "volumeInfo": {
            "title": "How to Manage Difficult People",
            "authors": [
                "Alan Fairweather"
            ]
        }
    },
    {
        "id": "y94DAAAAMBAJ",
        "volumeInfo": {
            "title": "Popular Mechanics"
        }
    },
    {
        "id": "xFuREAAAQBAJ",
        "volumeInfo": {
            "title": "El explicador de cosas: cosas difíciles explicadas con palabras fáciles / Thing Explainer: Complicated Stuff in Simple Words",
            "authors": [
                "Randall Munroe"
            ]
        }
    },
    {
        "id": "y94DAAAAMBAJ",
        "volumeInfo": {
            "title": "Popular Mechanics"
        }
    }
]}

*/