import { Header } from '@/components/Header/Header'
import '../Sass/styles.scss'
import 'leaflet/dist/leaflet.css'
import { FavoritesContextProvider } from 'Context/FavoritesContextProvider'

export const metadata = {
  title: 'Mark My Book',
  description:
    'A fun digital library to store your favorite books, buy new ones, and highlight texts in a creative, interactive way. Perfect for book lovers and note takers!',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>
        <FavoritesContextProvider>
          <Header />
          {children}
        </FavoritesContextProvider>
      </body>
    </html>
  )
}
