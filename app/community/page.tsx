"use client";
import React from 'react';
import UserNav from '@/components/UserNav';
import Link from 'next/link';

const CommunityPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <UserNav />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-green-900 mb-4">Herbal Community Hub</h1>
          <p className="text-lg text-green-700 max-w-3xl mx-auto">
            Connect, share, and grow with fellow herbal enthusiasts. Our community is where knowledge blossoms and relationships root deeply.
          </p>
        </div>

        {/* Importance of Community Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-green-900 mb-6 text-center">Why Community Matters in Herbalism</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-green-50 p-6 rounded-xl">
                <div className="w-12 h-12 rounded-full bg-green-200 flex items-center justify-center text-xl mb-4">
                  🌿
                </div>
                <h3 className="font-bold text-lg text-green-800 mb-2">Shared Knowledge</h3>
                <p className="text-green-700">
                  Herbal wisdom is often passed down through generations. In community, we preserve and expand this knowledge together, 
                  ensuring traditional remedies aren&apos;t lost while exploring new applications.
                </p>
              </div>
              
              <div className="bg-amber-50 p-6 rounded-xl">
                <div className="w-12 h-12 rounded-full bg-amber-200 flex items-center justify-center text-xl mb-4">
                  🤝
                </div>
                <h3 className="font-bold text-lg text-amber-800 mb-2">Collective Support</h3>
                <p className="text-amber-700">
                  Growing, foraging, and working with herbs comes with challenges. Community provides support, encouragement, 
                  and shared problem-solving to help everyone succeed in their herbal journey.
                </p>
              </div>
              
              <div className="bg-emerald-50 p-6 rounded-xl">
                <div className="w-12 h-12 rounded-full bg-emerald-200 flex items-center justify-center text-xl mb-4">
                  🌎
                </div>
                <h3 className="font-bold text-lg text-emerald-800 mb-2">Sustainable Practices</h3>
                <p className="text-emerald-700">
                  Together we can promote ethical foraging, sustainable cultivation, and conservation efforts that protect medicinal plants 
                  and their ecosystems for future generations.
                </p>
              </div>
              
              <div className="bg-teal-50 p-6 rounded-xl">
                <div className="w-12 h-12 rounded-full bg-teal-200 flex items-center justify-center text-xl mb-4">
                  🌼
                </div>
                <h3 className="font-bold text-lg text-teal-800 mb-2">Cultural Preservation</h3>
                <p className="text-teal-700">
                  Herbal traditions are deeply tied to cultural heritage. Community helps honor and maintain these diverse practices 
                  while respectfully sharing them across cultures.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Community Features Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-green-900 mb-8 text-center">Explore Our Community Features</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Marketplace Card */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
              <div className="h-48 bg-gradient-to-r from-green-100 to-emerald-200 flex items-center justify-center">
                <div className="text-6xl text-green-700 opacity-30">🛒</div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-green-900 mb-3">Herbal Marketplace</h3>
                <p className="text-gray-600 mb-4">
                  Discover medicinal plants, herbal products, consultations, and workshops from trusted growers and practitioners. 
                  Support small-scale herbal businesses and find exactly what you need for your wellness journey.
                </p>
                <Link href="community/market">
                  <button className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center">
                    Visit Marketplace
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </Link>
              </div>
            </div>
            
            {/* Forum Card */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
              <div className="h-48 bg-gradient-to-r from-amber-100 to-orange-200 flex items-center justify-center">
                <div className="text-6xl text-amber-700 opacity-30">💬</div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-amber-900 mb-3">Community Forum</h3>
                <p className="text-gray-600 mb-4">
                  Join conversations with herbal enthusiasts of all experience levels. Ask questions, share experiences, 
                  and learn from others&apos; wisdom. From gardening tips to remedy formulations, our forum has it all.
                </p>
                <Link href="community/forum">
                  <button className="w-full bg-amber-600 hover:bg-amber-700 text-white px-4 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center">
                    Join Discussion
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-2xl shadow-lg p-8 text-white mb-12">
          <h2 className="text-2xl font-bold mb-8 text-center">What Our Community Members Say</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                text: "Through this community, I&apos;ve connected with local growers who&apos;ve taught me sustainable harvesting practices that honor both the plants and the land.",
                author: "Elena, Herbalist",
                role: "3 years in community"
              },
              {
                text: "The forum helped me identify a plant growing in my backyard that turned out to be a wonderful medicinal herb I now use in my daily tea blend!",
                author: "Marcus, Beginner",
                role: "6 months in community"
              },
              {
                text: "Selling through the marketplace has allowed me to turn my passion into a small business while connecting with customers who truly value organic, lovingly grown herbs.",
                author: "Sofia, Grower",
                role: "2 years in community"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white bg-opacity-20 p-6 rounded-xl ">
                <p className="italic mb-4 text-green-800">&quot;{testimonial.text}&quot;</p>
                <div>
                  <p className="font-semibold text-green-800">{testimonial.author}</p>
                  <p className="text-sm opacity-80 text-green-800">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Join Community CTA */}
        <div className="text-center bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-green-900 mb-4">Ready to Join Our Growing Community?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            Whether you&apos;re a seasoned herbalist or just beginning your plant journey, our community has something for you. 
            Share knowledge, find resources, and connect with like-minded individuals who share your passion for herbal wellness.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200">
                Create Account
              </button>
            </Link>
            <button className="border border-green-600 text-green-600 hover:bg-green-50 px-6 py-3 rounded-lg font-medium transition-colors duration-200">
              Learn More
            </button>
          </div>
        </div>

        {/* Community Guidelines */}
        <div className="bg-green-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-green-900 mb-6 text-center">Our Community Guidelines</h2>
          
          <div className="max-w-3xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-green-800 mb-3">We Encourage</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Respectful knowledge sharing</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Cultural appreciation & respect</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Sustainable practices</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Evidence-based information</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-bold text-green-800 mb-3">We Discourage</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-red-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>Making unverified health claims</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-red-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>Cultural appropriation</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-red-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>Unsustainable harvesting advice</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-red-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>Disrespectful behavior</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;