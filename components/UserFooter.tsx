import React from 'react'
import Link from 'next/link'
import Button from '@/components/Button'

const UserFooter = () => {
  return (
    <div>
      <footer className="bg-green-900 text-peach-100 py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Herbal Plants Hub</h3>
              <p className="mb-4">Your comprehensive guide to medicinal plants and natural remedies.</p>
            </div>
            
            <div>
              <h4 className="text-md font-semibold text-white mb-4">Explore</h4>
              <ul className="space-y-2">
                <li><Link href="/plants" className="hover:text-white">Plant Database</Link></li>
                <li><Link href="/categories" className="hover:text-white">By Categories</Link></li>
                <li><Link href="/remedies" className="hover:text-white">Common Remedies</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-md font-semibold text-white mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
                <li><Link href="/guides" className="hover:text-white">Usage Guides</Link></li>
                <li><Link href="/safety" className="hover:text-white">Safety Information</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-md font-semibold text-white mb-4">Connect</h4>
              <ul className="space-y-2">
                <li><Link href="/about" className="hover:text-white">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link href="/community" className="hover:text-white">Community</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-green-800 mt-8 pt-8 text-sm text-center">
            <p>© {new Date().getFullYear()} Herbal Plants Hub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default UserFooter
