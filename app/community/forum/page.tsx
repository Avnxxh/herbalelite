"use client";
import React, { useState } from 'react';
import UserNav from '@/components/UserNav';

interface ForumPost {
  id: number;
  title: string;
  author: string;
  authorAvatar: string;
  time: string;
  commentCount: number;
  likes: number;
  category: string;
  excerpt: string;
  isPinned?: boolean;
  isNew?: boolean;
}

interface Resource {
  id: number;
  title: string;
  type: string;
  description: string;
  level: string;
  duration: string;
}

const CommunityPage = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const forumPosts: ForumPost[] = [
    {
      id: 1,
      title: "Growing Tulsi indoors - Tips and tricks",
      author: "GreenThumb",
      authorAvatar: "🌿",
      time: "2 days ago",
      commentCount: 24,
      likes: 42,
      category: "gardening",
      excerpt: "Sharing my experience growing Tulsi in an apartment setting. Light requirements, watering schedule, and harvesting techniques that worked for me.",
      isPinned: true
    },
    {
      id: 2,
      title: "My experience using Ashwagandha for stress relief",
      author: "WellnessJourney",
      authorAvatar: "🧘",
      time: "4 days ago",
      commentCount: 18,
      likes: 37,
      category: "wellness",
      excerpt: "After 3 months of consistent use, here's how Ashwagandha has impacted my stress levels and sleep quality. Dosage and timing recommendations included.",
      isNew: true
    },
    {
      id: 3,
      title: "Identifying wild medicinal plants safely",
      author: "NatureExplorer",
      authorAvatar: "🌼",
      time: "1 week ago",
      commentCount: 32,
      likes: 56,
      category: "foraging",
      excerpt: "Guide to safely identifying medicinal plants in the wild. Common look-alikes and how to distinguish them. Always practice ethical foraging!",
      isPinned: true
    },
    {
      id: 4,
      title: "Best soil composition for medicinal herbs",
      author: "HerbalGardener",
      authorAvatar: "🌱",
      time: "5 days ago",
      commentCount: 15,
      likes: 29,
      category: "gardening",
      excerpt: "Testing different soil mixes for optimal growth of echinacea, chamomile, and lemon balm. Results and recommendations after 6 months of experimentation."
    },
    {
      id: 5,
      title: "Herbal tea blends for immune support",
      author: "TeaAlchemist",
      authorAvatar: "🍵",
      time: "3 days ago",
      commentCount: 21,
      likes: 45,
      category: "recipes",
      excerpt: "My favorite combinations of elderberry, echinacea, ginger, and other herbs for immune support during cold season. Measurements and steeping instructions included.",
      isNew: true
    },
    {
      id: 6,
      title: "Creating a medicinal herb garden in small spaces",
      author: "UrbanHerbalist",
      authorAvatar: "🏙️",
      time: "1 week ago",
      commentCount: 19,
      likes: 38,
      category: "gardening",
      excerpt: "How to maximize your balcony or small yard for growing medicinal herbs. Container selection, vertical gardening, and companion planting tips."
    }
  ];

  const resources: Resource[] = [
    {
      id: 1,
      title: "Beginner's Guide to Herbal Medicine",
      type: "E-book",
      description: "Comprehensive introduction to using herbs for wellness",
      level: "Beginner",
      duration: "45 pages"
    },
    {
      id: 2,
      title: "Medicinal Plant Identification",
      type: "Video Course",
      description: "Learn to identify 30 common medicinal plants safely",
      level: "Intermediate",
      duration: "2 hours"
    },
    {
      id: 3,
      title: "Herbal Remedies for Common Ailments",
      type: "Guide",
      description: "Natural approaches to everyday health concerns",
      level: "All Levels",
      duration: "28 pages"
    }
  ];

  const categories = [
    { id: 'all', name: 'All Topics' },
    { id: 'gardening', name: 'Gardening' },
    { id: 'wellness', name: 'Wellness' },
    { id: 'foraging', name: 'Foraging' },
    { id: 'recipes', name: 'Recipes' },
    { id: 'identification', name: 'Plant ID' }
  ];

  const filteredPosts = forumPosts.filter(post => {
    const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <UserNav />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-green-900 mb-4">Community & Learning</h1>
          <p className="text-lg text-green-700 max-w-3xl mx-auto">
            Connect with fellow plant enthusiasts and expand your knowledge through our community and educational resources.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search and Filter Section */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-1/3">
                  <input
                    type="text"
                    placeholder="Search discussions..."
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

                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  New Topic
                </button>
              </div>
            </div>

            {/* Forum Posts */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
              <div className="border-b border-green-100 p-4 bg-green-50 flex justify-between items-center">
                <h2 className="font-bold text-green-900">Community Discussions</h2>
                <div className="flex text-sm text-green-700">
                  <span className="mr-4">Comments</span>
                  <span>Likes</span>
                </div>
              </div>
              
              {filteredPosts.map(post => (
                <div key={post.id} className="border-b border-green-100 last:border-0 hover:bg-green-50 transition-colors duration-200">
                  <div className="p-4 flex">
                    <div className="flex-shrink-0 mr-4">
                      <div className="w-10 h-10 rounded-full bg-green-200 flex items-center justify-center text-lg">
                        {post.authorAvatar}
                      </div>
                    </div>
                    
                    <div className="flex-grow">
                      <div className="flex items-center mb-1">
                        <h3 className="font-semibold text-green-900 mr-2">{post.title}</h3>
                        {post.isPinned && (
                          <span className="text-amber-500 text-xs bg-amber-100 px-2 py-1 rounded-full flex items-center">
                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M5.5 17.5c-.2 0-.4-.1-.5-.2-.3-.2-.5-.5-.5-.8V9.7c-1.2-.5-2-1.7-2-3 0-1.7 1.3-3 3-3s3 1.3 3 3c0 1.3-.8 2.5-2 3v6.8c0 .3-.2.6-.5.8-.1.1-.3.2-.5.2zM5 4.5c-.8 0-1.5.7-1.5 1.5S4.2 7.5 5 7.5 6.5 6.8 6.5 6 5.8 4.5 5 4.5zM14.5 17.5c-.2 0-.4-.1-.5-.2-.3-.2-.5-.5-.5-.8V15h-7v1.5c0 .3-.2.6-.5.8-.2.1-.4.2-.5.2s-.4-.1-.5-.2c-.3-.2-.5-.5-.5-.8V9.7c-1.2-.5-2-1.7-2-3 0-1.7 1.3-3 3-3s3 1.3 3 3c0 1.3-.8 2.5-2 3v5h7v-5c-1.2-.5-2-1.7-2-3 0-1.7 1.3-3 3-3s3 1.3 3 3c0 1.3-.8 2.5-2 3v6.8c0 .3-.2.6-.5.8-.1.1-.3.2-.5.2zM14 4.5c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5 1.5-.7 1.5-1.5-.7-1.5-1.5-1.5z" />
                            </svg>
                            Pinned
                          </span>
                        )}
                        {post.isNew && (
                          <span className="text-green-600 text-xs bg-green-100 px-2 py-1 rounded-full">New</span>
                        )}
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-2">{post.excerpt}</p>
                      
                      <div className="flex items-center text-xs text-gray-500">
                        <span className="mr-3">Posted by {post.author}</span>
                        <span className="mr-3">•</span>
                        <span>{post.time}</span>
                        <span className="mx-3">•</span>
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full">{post.category}</span>
                      </div>
                    </div>
                    
                    <div className="flex-shrink-0 text-center ml-4">
                      <div className="mb-2">
                        <span className="font-semibold text-green-900">{post.commentCount}</span>
                        <p className="text-xs text-gray-500">Comments</p>
                      </div>
                      <div>
                        <span className="font-semibold text-green-900">{post.likes}</span>
                        <p className="text-xs text-gray-500">Likes</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Popular Members Section */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <h2 className="font-bold text-green-900 mb-4">Popular Community Members</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { name: "HerbalHealer", role: "Master Herbalist", posts: 142 },
                  { name: "PlantProfessor", role: "Botanist", posts: 98 },
                  { name: "GreenWitch", role: "Clinical Herbalist", posts: 117 }
                ].map((member, index) => (
                  <div key={index} className="flex items-center p-3 bg-green-50 rounded-lg">
                    <div className="w-12 h-12 rounded-full bg-green-200 flex items-center justify-center text-xl mr-3">
                      {index === 0 ? "🌿" : index === 1 ? "👨‍🔬" : "🧙‍♀️"}
                    </div>
                    <div>
                      <h3 className="font-semibold text-green-900">{member.name}</h3>
                      <p className="text-sm text-gray-600">{member.role}</p>
                      <p className="text-xs text-green-700">{member.posts} posts</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Learning Resources */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h2 className="font-bold text-green-900 mb-4">Learning Resources</h2>
              <div className="space-y-4">
                {resources.map(resource => (
                  <div key={resource.id} className="p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors duration-200">
                    <h3 className="font-semibold text-green-900 mb-1">{resource.title}</h3>
                    <div className="flex items-center text-xs text-gray-500 mb-2">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full mr-2">{resource.type}</span>
                      <span>{resource.level}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{resource.description}</p>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-green-700">{resource.duration}</span>
                      <button className="text-green-600 hover:text-green-800 font-medium">View</button>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 text-center text-green-600 hover:text-green-800 font-medium text-sm">
                View All Resources →
              </button>
            </div>

            {/* Upcoming Events */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h2 className="font-bold text-green-900 mb-4">Upcoming Events</h2>
              <div className="space-y-4">
                {[
                  { title: "Virtual Herb Walk", date: "Oct 15, 2023", time: "2:00 PM EST" },
                  { title: "Herbal Medicine Making", date: "Oct 22, 2023", time: "4:00 PM EST" },
                  { title: "Q&A with Herbalists", date: "Oct 29, 2023", time: "1:00 PM EST" }
                ].map((event, index) => (
                  <div key={index} className="p-3 bg-amber-50 rounded-lg border-l-4 border-amber-400">
                    <h3 className="font-semibold text-green-900 mb-1">{event.title}</h3>
                    <div className="flex items-center text-xs text-gray-600">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{event.date}</span>
                      <span className="mx-2">•</span>
                      <span>{event.time}</span>
                    </div>
                    <button className="mt-2 text-xs text-green-600 hover:text-green-800 font-medium">RSVP</button>
                  </div>
                ))}
              </div>
            </div>

            {/* Community Stats */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="font-bold text-green-900 mb-4">Community Stats</h2>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-800">2,847</div>
                  <div className="text-xs text-gray-600">Members</div>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-800">1,243</div>
                  <div className="text-xs text-gray-600">Topics</div>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-800">5,729</div>
                  <div className="text-xs text-gray-600">Comments</div>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-800">32</div>
                  <div className="text-xs text-gray-600">Events</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;