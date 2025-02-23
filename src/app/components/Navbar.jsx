"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <img className="h-8 w-auto" src="/images/eventory_logo.png" alt="Eventory" />
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">Eventory</span>
            </Link>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/event-discovery">Events</NavLink>
            <NavLink href="/rsvp">RSVP</NavLink>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium">
              Sign In
            </button>
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <MobileNavLink href="/">Home</MobileNavLink>
            <MobileNavLink href="/event-discovery">Events</MobileNavLink>
            <MobileNavLink href="/rsvp">RSVP</MobileNavLink>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
            <button className="block w-full text-left px-4 py-2 text-base font-medium text-purple-600 hover:text-purple-800 hover:bg-gray-100 dark:hover:bg-gray-700">
              Sign In
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}

function NavLink({ href, children }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-300 dark:hover:text-white dark:hover:border-gray-700"
    >
      {children}
    </Link>
  )
}

function MobileNavLink({ href, children }) {
  return (
    <Link
      href={href}
      className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700 dark:hover:border-gray-600"
    >
      {children}
    </Link>
  )
}