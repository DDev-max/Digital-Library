import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { MainContent } from './components/Pages/MainContent'
import "./Sass/styles.scss"
import { Header } from './components/Header'
import { ReadBook } from './components/Pages/ReadBook'
import { HighlightsProvider } from './components/HighlightsProvider'
import { Pruebas } from './components/Prueba'
import { FavoritePage } from './components/Pages/FavoritePage'

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
     element: <Header/>,
     errorElement: <p>No hay nada</p>,
     children: [
      {
         index: true,
         element: <MainContent/>
      },
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
