import React from 'react'
import Link from 'next/link'
import Button from '@/components/Button'

const UserNav = () => {
  return (
    <div>
        {/* Navigation */}
      <nav className="flex items-center justify-between p-6 bg-green-800">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-peach-500 flex items-center justify-center mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
            </svg>
          </div>
          <Link href="/" className="text-2xl font-bold text-white">Herbal Plants Hub</Link>
        </div>
        
        <div className="hidden md:flex space-x-8">
          <Link href="/plants" className="text-white">Plant Library</Link>
          <Link href="/community" className="text-white">Community</Link>
          <Link href="/ayurveda" className="text-white">Ayurveda</Link>
          <Link href="/about" className="text-white">About</Link>
          <Link href="/contact" className="text-white">Contact Us</Link>
        </div>
        
        <Button variant="primary">
          Sign In
        </Button>
      </nav>
    </div>
  )
}

export default UserNav
