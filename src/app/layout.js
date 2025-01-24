import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "./components/Navbar";
import "./styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Eventory",
  description: "A Web Application to help users to discover events based on location, category, and date, and RSVP to them.",
  icons: {
    icon: "/images/eventory_logo.png",
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar/>
        {children}
      </body>
    </html>
  );
}
