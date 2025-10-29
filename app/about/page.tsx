import React from 'react';
import Button from '@/components/Button';
import UserNav from '@/components/UserNav';
import UserFooter from '@/components/UserFooter';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <UserNav />

      {/* Hero Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-green-900 leading-tight mb-6">
            About <span className="text-peach-600">Herbophilia</span>
          </h1>
          <p className="text-xl text-green-700 mb-8">
            Bridging traditional herbal wisdom with modern digital innovation
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-peach-200">
          <h2 className="text-3xl font-bold text-green-900 mb-6 text-center">Our Mission</h2>
          <div className="prose prose-lg text-green-700 max-w-none">
            <p className="text-lg leading-relaxed mb-6">
              Welcome to Herbophilia, an interactive web portal born from a passion to bridge the gap between traditional herbal knowledge and modern digital access. Our project is a comprehensive digital encyclopedia dedicated to the world of medicinal plants, designed to empower individuals with reliable, easily accessible information.
            </p>
            <p className="text-lg leading-relaxed mb-6">
              At its core, Herbophilia features a rich, meticulously curated plant database that details the botanical characteristics, historical context, and geographical origins of countless herbs. Beyond simple identification, our platform allows users to explore practical applications through its detailed directory of traditional uses and home remedies.
            </p>
            <p className="text-lg leading-relaxed">
              With advanced search and filtering capabilities, you can pinpoint specific plants based on their benefits, active compounds, or required growing conditions, making personalized discovery seamless and intuitive. Herbophilia is more than just a website—it&apos;s a user-friendly gateway to rediscovering the power of nature, built to educate, inspire, and connect you with the timeless wisdom of herbal plants.
            </p>
          </div>
        </div>
      </div>

      {/* Key Features Section */}
      <div className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center text-green-900 mb-12">Key Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow-md border border-peach-200 hover:shadow-lg transition-shadow duration-300">
            <div className="w-14 h-14 rounded-full bg-peach-100 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-peach-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-green-900 mb-2">Rich Plant Database</h3>
            <p className="text-green-700">Comprehensive information on botanical characteristics, historical context, and geographical origins of medicinal plants.</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md border border-peach-200 hover:shadow-lg transition-shadow duration-300">
            <div className="w-14 h-14 rounded-full bg-peach-100 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-peach-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-green-900 mb-2">Advanced Search & Filters</h3>
            <p className="text-green-700">Find plants by benefits, active compounds, or growing conditions with our intuitive filtering system.</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md border border-peach-200 hover:shadow-lg transition-shadow duration-300">
            <div className="w-14 h-14 rounded-full bg-peach-100 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-peach-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-green-900 mb-2">Uses & Remedies</h3>
            <p className="text-green-700">Detailed directory of traditional uses and practical home remedies for natural wellness.</p>
          </div>
        </div>
      </div>

      {/* Team/Project Info */}
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-green-900 mb-6">Our Vision</h2>
          <p className="text-xl text-green-700 max-w-3xl mx-auto leading-relaxed">
            Herbophilia represents our commitment to preserving traditional knowledge while making it accessible 
            to everyone through modern technology. We believe that understanding nature&apos;s remedies is the first 
            step toward holistic wellness and sustainable living.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button variant="primary" href="/plants">
              Explore Our Database
            </Button>
            <Button variant="secondary" href="/contact">
              Get In Touch
            </Button>
          </div>
        </div>
      </div>

      <UserFooter />
    </div>
  );
};

export default AboutPage;