"use client";
import React from 'react';
import Button from '@/components/Button';
import UserNav from '@/components/UserNav'; 
import UserFooter from '@/components/UserFooter';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <UserNav />
      

      {/* Hero Section */}
      <div className="container mx-auto px-6 py-16 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2">
          <h1 className="text-4xl md:text-6xl font-bold text-green-900 leading-tight">
            Discover the Healing Power of <span className="text-peach-600">Nature</span>
          </h1>
          <p className="mt-6 text-xl text-green-700">
            Explore our comprehensive database of medicinal plants, their properties, and traditional uses to support your wellness journey naturally.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Button variant="primary" href="/plants">
              Explore Plants
            </Button>
            <Button variant="secondary" href="/about">
              Learn More
            </Button>
          </div>
        </div>
        
        <div className="md:w-1/2 mt-10 md:mt-0">
          <div className="relative">
            <div className="absolute -top-6 -left-6 w-64 h-64 bg-peach-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute -bottom-8 -right-6 w-64 h-64 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="relative">
              <div className="bg-white p-6 rounded-2xl shadow-xl border border-peach-200">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-peach-100 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-peach-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-green-900">Aloe Vera</h3>
                </div>
                <p className="text-green-700">
                  Known for its healing properties, Aloe Vera is commonly used for skin treatments, digestive issues, and has antioxidant effects.
                </p>
                <div className="mt-4 flex items-center">
                  <span className="text-sm font-medium text-peach-700 bg-peach-100 px-2 py-1 rounded">Skin Health</span>
                  <span className="text-sm font-medium text-peach-700 bg-peach-100 px-2 py-1 rounded ml-2">Digestive Aid</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center text-green-900 mb-12">What You&apos;ll Discover</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md border border-peach-200">
            <div className="w-14 h-14 rounded-full bg-peach-100 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-peach-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-green-900 mb-2">Comprehensive Database</h3>
            <p className="text-green-700">Access detailed information on hundreds of medicinal plants from around the world.</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md border border-peach-200">
            <div className="w-14 h-14 rounded-full bg-peach-100 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-peach-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-green-900 mb-2">Health Benefits</h3>
            <p className="text-green-700">Learn about the traditional and scientific health benefits of each plant.</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md border border-peach-200">
            <div className="w-14 h-14 rounded-full bg-peach-100 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-peach-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-green-900 mb-2">Usage Guides</h3>
            <p className="text-green-700">Discover how to properly prepare and use herbal remedies safely and effectively.</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-green-800 py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Start Your Herbal Journey Today</h2>
          <p className="text-peach-100 text-xl max-w-2xl mx-auto mb-8">
            Join our community of plant enthusiasts and natural wellness advocates.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button variant="primary" href="/signup" className="px-8 py-3">
              Create Account
            </Button>
            <Button variant="secondary" href="/about" className="px-8 py-3 border-2 border-white text-white hover:bg-green-700">
              Learn More
            </Button>
          </div>
        </div>
      </div>
      <UserFooter />
    </div>
  );
};

export default HomePage;