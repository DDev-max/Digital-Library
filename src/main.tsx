import { createRoot } from 'react-dom/client'
// import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { MainContent } from './components/MainContent'
import "./Sass/styles.scss"
import { Header } from './components/Header'
import { ReadBook } from './components/Main/ReadBook'
import { HighlightsProvider } from './components/HighlightsProvider'
import { Pruebas } from './components/Prueba'

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
         path: "/:title",
         element: <ReadBook/>
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
