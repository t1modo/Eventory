"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-800 shadow-md">
      <div className="w-full pl-3 pr-3 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Link href="/">
            <img src="/images/eventory_logo.png" alt="Logo" className="h-10" />
          </Link>
        </div>

        {/* The Desktop Nav Links */}
        <ul className="hidden md:flex space-x-6">
          <li>
            <Link href="/" className="font-sans hover:text-blue-500">
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/event-discovery"
              className="font-sans hover:text-blue-500"
            >
              Events
            </Link>
          </li>
          <li>
            <Link href="/rsvp" className="font-sans hover:text-blue-500">
              RSVP
            </Link>
          </li>
        </ul>

        {/* Auth Options */}
        <div className="hidden md:block">
          <button className="font-sans text-white bg-blue-500 px-4 py-2 rounded hover:bg-blue-600">
            Sign In
          </button>
        </div>

        {/* The Mobile Menu Toggle */}
        <button
          className="block md:hidden text-gray-600"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {/* Menu Icon */}
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        {/* The Mobile Nav Links */}
        {isMobileMenuOpen && (
          <ul className="absolute top-14 left-0 w-full bg-gray-900 shadow-md flex flex-col items-center space-y-4 py-4 md:hidden">
            <li>
              <Link
                href="/"
                className="font-sans hover:text-blue-500"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/event-discovery"
                className="font-sans hover:text-blue-500"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Events
              </Link>
            </li>
            <li>
              <Link
                href="/rsvp"
                className="font-sans hover:text-blue-500"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                RSVP
              </Link>
            </li>
            <li>
              <button
                className="font-sans text-white bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign In
              </button>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}
