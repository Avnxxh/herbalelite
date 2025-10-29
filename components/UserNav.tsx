"use client";
import React, { useState } from 'react'
import Link from 'next/link'
import Button from '@/components/Button'
import Image from 'next/image';

const UserNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div>
      {/* Navigation */}
      <nav className="flex items-center justify-between p-4 md:p-6 bg-green-800">
        <div className="flex items-center">
      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-peach-500 flex items-center justify-center mr-3 overflow-hidden">
        <Image 
          src="/logoelite.jpeg" 
          alt="Herbal Plants Hub Logo" 
          width={40} 
          height={40}
          className="w-full h-full object-cover"
        />
      </div>
      <Link href="/" className="text-xl md:text-2xl font-bold text-white">Herbal Plants Hub</Link>
    </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6 lg:space-x-8">
          <Link href="/plants" className="text-white hover:text-peach-200 transition-colors">Plant Library</Link>
          <Link href="/community" className="text-white hover:text-peach-200 transition-colors">Community</Link>
          <Link href="/ayurveda" className="text-white hover:text-peach-200 transition-colors">Ayurveda</Link>
          <Link href="/about" className="text-white hover:text-peach-200 transition-colors">About</Link>
          <Link href="/contact" className="text-white hover:text-peach-200 transition-colors">Contact Us</Link>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <Button variant="primary" className="hidden sm:block mr-4 text-sm py-1 px-3">
            Sign In
          </Button>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
        
        {/* Desktop Sign In Button */}
        <div className="hidden md:block">
          <Button variant="primary">
            Sign In
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-green-700">
          <div className="px-4 py-2 space-y-1">
            <Link 
              href="/plants" 
              className="block py-2 text-white hover:bg-green-600 rounded px-3"
              onClick={() => setIsMenuOpen(false)}
            >
              Plant Library
            </Link>
            <Link 
              href="/community" 
              className="block py-2 text-white hover:bg-green-600 rounded px-3"
              onClick={() => setIsMenuOpen(false)}
            >
              Community
            </Link>
            <Link 
              href="/ayurveda" 
              className="block py-2 text-white hover:bg-green-600 rounded px-3"
              onClick={() => setIsMenuOpen(false)}
            >
              Ayurveda
            </Link>
            <Link 
              href="/about" 
              className="block py-2 text-white hover:bg-green-600 rounded px-3"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className="block py-2 text-white hover:bg-green-600 rounded px-3"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact Us
            </Link>
            <div className="pt-2 pb-3 border-t border-green-600 mt-2">
              <Button variant="primary" className="w-full justify-center">
                Sign In
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserNav
