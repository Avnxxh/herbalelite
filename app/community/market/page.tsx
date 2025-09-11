"use client";
import React, { useState } from 'react';
import UserNav from '@/components/UserNav';

interface Product {
  id: number;
  title: string;
  seller: string;
  rating: number;
  price: number;
  description: string;
  tags: string[];
  location: string;
  category: string;
  organic?: boolean;
}

const MarketplacePage = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const products: Product[] = [
    {
      id: 1,
      title: "Herbal Consultation - Personalized Wellness Plan",
      seller: "Holistic Herbals",
      rating: 5,
      price: 85.00,
      description: "Book a 60-minute virtual consultation with a certified herbalist. Receive a personalized herbal wellness plan tailored to your specific health goals and concerns.",
      tags: ["consultation", "personalized", "wellness"],
      location: "Santa Fe, NM",
      category: "services"
    },
    {
      id: 2,
      title: "Handcrafted Lavender Essential Oil - 100% Pure",
      seller: "Aromatic Essentials",
      rating: 4.9,
      price: 18.50,
      description: "Small-batch, steam-distilled lavender essential oil made from organically grown Lavandula angustifolia. No additives or fillers. Perfect for aromatherapy, skincare, and relaxation.",
      tags: ["essential oil", "aromatherapy", "lavender"],
      location: "Eugene, OR",
      category: "products",
      organic: true
    },
    {
      id: 3,
      title: "Online Workshop: Herbal Medicine Making Basics",
      seller: "Wildcraft Herbals",
      rating: 4.9,
      price: 45.00,
      description: "Learn how to make your own herbal tinctures, salves, and teas in this comprehensive 2-hour online workshop. Includes downloadable recipe book and resource guide.",
      tags: ["workshop", "herbal medicine", "DIY"],
      location: "Asheville, NC",
      category: "education"
    },
    {
      id: 4,
      title: "Handcrafted Calendula Salve - Skin Healing Formula",
      seller: "Mountain Herbals",
      rating: 4.9,
      price: 15.99,
      description: "Soothing salve made with organic calendula flowers infused in olive oil and beeswax. Perfect for dry skin, minor cuts, burns, and rashes. Each jar is handcrafted in small batches.",
      tags: ["salve", "calendula", "skin care"],
      location: "Asheville, NC",
      category: "products",
      organic: true
    },
    {
      id: 5,
      title: "Organic Echinacea Plants - Immune Boosting Perennial",
      seller: "Green Thumb Nursery",
      rating: 4.8,
      price: 12.99,
      description: "Healthy, organically grown Echinacea purpurea plants. Perfect for your medicinal garden. These 1-year-old plants are ready to transplant and will flower this season.",
      tags: ["perennial", "medicinal", "native"],
      location: "Portland, OR",
      category: "plants",
      organic: true
    },
    {
      id: 6,
      title: "Organic Lemon Balm Plants - Calming Nervine",
      seller: "Green Thumb Nursery",
      rating: 4.8,
      price: 8.99,
      description: "Vibrant, organically grown lemon balm plants (Melissa officinalis). These fragrant perennials are excellent for tea, cooking, and attracting pollinators. Known for calming properties and lemon scent.",
      tags: ["perennial", "medicinal", "calming"],
      location: "Portland, OR",
      category: "plants",
      organic: true
    },
    {
      id: 7,
      title: "Medicinal Herb Garden Starter Kit",
      seller: "Sustainable Gardens",
      rating: 4.8,
      price: 34.99,
      description: "Complete kit to start your medicinal herb garden. Includes 6 varieties of herb seedlings, organic soil, biodegradable pots, plant markers, and a comprehensive growing guide.",
      tags: ["garden kit", "seedlings", "beginner friendly"],
      location: "Portland, OR",
      category: "kits",
      organic: true
    },
    {
      id: 8,
      title: "Medicinal Herb Seed Collection - 10 Varieties",
      seller: "Heritage Seed Co.",
      rating: 4.7,
      price: 24.95,
      description: "Start your medicinal herb garden with this collection of 10 essential healing herbs. Includes echinacea, chamomile, calendula, holy basil, lemon balm, and more. All seeds are open-pollinated and non-GMO.",
      tags: ["seeds", "medicinal", "herb garden"],
      location: "Seattle, WA",
      category: "plants",
      organic: true
    },
    {
      id: 9,
      title: "Herbal Tea Blend - Relaxation Formula",
      seller: "Tea Sanctuary",
      rating: 4.7,
      price: 12.50,
      description: "A calming blend of chamomile, lavender, lemon balm, and passionflower. This organic tea helps promote relaxation and restful sleep. Each package contains 20 biodegradable tea bags.",
      tags: ["tea", "relaxation", "sleep aid"],
      location: "Seattle, WA",
      category: "products",
      organic: true
    },
    {
      id: 10,
      title: "Organic Chamomile Plants - Calming Medicinal Herb",
      seller: "Sunshine Herb Farm",
      rating: 4.6,
      price: 9.99,
      description: "Beautiful, organically grown German Chamomile plants (Matricaria chamomilla). These ready-to-plant herbs will provide you with abundant flowers for tea and other remedies.",
      tags: ["chamomile", "medicinal", "tea herb"],
      location: "Boulder, CO",
      category: "plants",
      organic: true
    }
  ];

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'plants', name: 'Plants & Seeds' },
    { id: 'products', name: 'Herbal Products' },
    { id: 'services', name: 'Consultations' },
    { id: 'education', name: 'Workshops' },
    { id: 'kits', name: 'Starter Kits' }
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg
          key={i}
          className={`w-4 h-4 ${i <= rating ? 'text-amber-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    return stars;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <UserNav />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-green-900 mb-4">Herbal Marketplace</h1>
          <p className="text-lg text-green-700 max-w-3xl mx-auto">
            Connect with local farmers, herbalists, and artisans. Buy and sell medicinal plants, herbal products, and share knowledge with the community.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-1/3">
              <input
                type="text"
                placeholder="Search herbs, products, workshops..."
                className="w-full pl-10 pr-4 py-2 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <svg
                className="absolute left-3 top-2.5 h-5 w-5 text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                    activeCategory === category.id
                      ? 'bg-green-700 text-white'
                      : 'bg-green-100 text-green-800 hover:bg-green-200'
                  }`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="h-48 bg-gradient-to-r from-green-100 to-emerald-200 flex items-center justify-center relative">
                {product.organic && (
                  <div className="absolute top-4 left-4 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Organic
                  </div>
                )}
                <div className="text-5xl text-green-700 opacity-30">
                  {product.category === 'plants' && '🌿'}
                  {product.category === 'products' && '🧴'}
                  {product.category === 'services' && '👨‍⚕️'}
                  {product.category === 'education' && '📚'}
                  {product.category === 'kits' && '📦'}
                </div>
              </div>
              
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg text-green-900">{product.title}</h3>
                  <span className="font-bold text-green-700">${product.price.toFixed(2)}</span>
                </div>
                
                <div className="flex items-center mb-3">
                  <div className="flex mr-2">
                    {renderStars(product.rating)}
                  </div>
                  <span className="text-sm text-gray-500">{product.rating}</span>
                </div>
                
                <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-gray-700">{product.seller}</p>
                    <p className="text-xs text-gray-500">{product.location}</p>
                  </div>
                  <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Join Marketplace Section */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-2xl shadow-lg p-8 text-white mb-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Join Our Marketplace</h2>
            <p className="mb-6">
              Are you a herbalist, farmer, or artisan? Share your medicinal plants, herbal products, or knowledge with our community. 
              Create a seller account to list your items and connect with herbal enthusiasts.
            </p>
            
            <div className="bg-white bg-opacity-20 p-6 rounded-xl mb-6 text-green-700">
              <h3 className="font-bold text-lg mb-3">Marketplace Guidelines</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>All medicinal plants must be correctly identified</li>
                <li>Clearly state growing conditions and origin</li>
                <li>No medical claims allowed for products</li>
                <li>Organic certification must be verifiable</li>
                <li>Knowledge providers must list qualifications</li>
              </ul>
            </div>
            
            <button className="bg-white text-green-700 hover:bg-green-50 px-6 py-3 rounded-lg font-semibold transition-colors duration-200">
              Become a Seller
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketplacePage;