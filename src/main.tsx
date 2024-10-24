import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { MainContent } from './Pages/Home/MainContent'
import "./Sass/styles.scss"
import { ReadBook } from './Pages/Read_Books/ReadBook'
import { HighlightsProvider } from './Context/HighlightsProvider'
import { Pruebas } from './components/Prueba'
import { FavoritePage } from './Pages/FavoritePage'
import { Layout } from './components/Layout'


const queryClient = new QueryClient({
   defaultOptions: {
      queries: {
         refetchOnWindowFocus: false
      }
   }
})


const router = createBrowserRouter([
   {
     path: "/",
     element: <Layout/>,
     errorElement: <p>No hay nada</p>,
     
     children: [
      {
         index: true,
         element: <MainContent/>
      }
      ,
      {
         path: "/Read/:title",
         element: <ReadBook/>
      },
      {
         path: "/Favorites",
         element: <FavoritePage/>

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
