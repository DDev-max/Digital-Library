import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { MainContent } from './Pages/Home/MainContent'
import "./Sass/styles.scss"
import "leaflet/dist/leaflet.css"
import { HighlightsProvider } from './Context/HighlightsProvider'
import { Pruebas } from './components/Prueba'
import { FavoritePage } from './Pages/FavoritePage'
import { Layout } from './components/Layout'
import { NotFound } from './Pages/NotFound'
import { lazy, Suspense } from 'react'


const queryClient = new QueryClient({
   defaultOptions: {
      queries: {
         refetchOnWindowFocus: false
      }
   }
})

const LazyReadBook = lazy(()=> import("./Pages/Read_Books/ReadBook"))
const LazyForm = lazy(()=> import("./Pages/Pre-Order/PreOrder"))

const router = createBrowserRouter([
   {
     path: "/",
     element: <Layout/>,
     errorElement: <NotFound/>,
     
     children: [
      {
         index: true,
         element: <MainContent/>
      }
      ,
      {
         path: "/Read/:title",
         element:(
            <Suspense>
               <LazyReadBook/>
            </Suspense>
         )
      },
      {
         path: "/Favorites",
         element: <FavoritePage/>

      },
      {
         path: "/Order/:book",
         element: (
            <Suspense>
               <LazyForm/>
            </Suspense>
         )
      }
     ]


   }
 ])




 const PRUEBAS = !true



createRoot(document.getElementById('root')!).render(
   <QueryClientProvider client={queryClient}>
      {PRUEBAS && <Pruebas/>}
      {!PRUEBAS &&
         <HighlightsProvider>
            <RouterProvider router={router} />
         </HighlightsProvider>
      }
   </QueryClientProvider>
)
