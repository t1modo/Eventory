import { Inter } from "next/font/google"
import Navbar from "./components/Navbar"
import "../app/styles/globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata = {
  title: "Eventory",
  description: "Discover and RSVP to events near you",
  icons: {
    icon: "/images/eventory_logo.png",
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} font-sans`}>
      <body className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <Navbar />
        <main className="container mx-auto px-4 py-8">{children}</main>
        <footer className="bg-gray-100 dark:bg-gray-800 py-6 mt-12">
          <div className="container mx-auto px-4 text-center">
            <p>&copy; 2025 Eventory. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  )
}