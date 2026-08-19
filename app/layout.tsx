import "./globals.css"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Provider from "./Provider/provider"
import { Inter } from "next/font/google"



const inter = Inter({
  subsets: ["latin"]
})

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" dir="ltr">
      <body className={`${inter.className} min-w-xs min-h-96`}>

        <Provider>

          <header className=" relative z-40">
            <Header />
          </header>

          <main>
            {children}
          </main>

          <footer>
            <Footer />
          </footer>

        </Provider>

      </body>
    </html>
  )
}