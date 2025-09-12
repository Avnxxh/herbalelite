"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import UserNav from '@/components/UserNav';

interface Plant {
  id: number;
  itcHsCode: string;
  commonName: string;
  scientificName: string;
  imageUrls: string[];
  // Add other fields as needed
}

async function getPlants(): Promise<Plant[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/herbal-plants`, {
    next: { revalidate: 3600 }
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch plants');
  }
  
  return res.json();
}

export default function PlantsPage() {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [filteredPlants, setFilteredPlants] = useState<Plant[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const plantsData = await getPlants();
        setPlants(plantsData);
        setFilteredPlants(plantsData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching plants:', error);
        setIsLoading(false);
      }
    };

    fetchPlants();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredPlants(plants);
    } else {
      const filtered = plants.filter(plant =>
        plant.commonName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        plant.scientificName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        plant.itcHsCode.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredPlants(filtered);
    }
  }, [searchQuery, plants]);

  return (
    <div className=''>
        <UserNav />
         <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-8">
        
        <div className="container mx-auto px-4">
          {/* Header with Welcome and Search */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 bg-white p-6 rounded-2xl shadow-md border border-peach-200">
            <div>
              <h1 className="text-3xl font-bold text-green-900">Welcome to Herbal Garden</h1>
            </div>
            
            <div className="mt-4 md:mt-0 w-full md:w-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search plants..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full md:w-64 px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-peach-500"
                />
                <svg 
                  className="absolute right-3 top-2.5 h-5 w-5 text-green-400" 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>


          {/* Plants Grid */}
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-peach-500"></div>
            </div>
          ) : filteredPlants.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl shadow-md border border-peach-200">
              {searchQuery ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-gray-500 text-lg mt-4">No plants found for &quot;{searchQuery}&quot;</p>
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="mt-4 text-peach-600 hover:text-peach-700 font-medium"
                  >
                    Clear search
                  </button>
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <p className="text-gray-500 text-lg mt-4">No plants found.</p>
                  <Link 
                    href="/admin/herbal-plant-form"
                    className="inline-block mt-4 bg-peach-500 hover:bg-peach-600 text-white px-6 py-2 rounded-lg font-medium transition duration-300"
                  >
                    Add Your First Plant
                  </Link>
                </>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPlants.map((plant) => (
                <PlantCard key={plant.id} plant={plant} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
    
     
    
  );
}

function PlantCard({ plant }: { plant: Plant }) {
  return (
    <Link href={`/plants/${encodeURIComponent(plant.scientificName)}`} className="no-underline"> 
      <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-peach-200">
      {/* Image */}
      {plant.imageUrls && plant.imageUrls.length > 0 && (
        <div className="relative h-48 w-full">
          <Image
            src={plant.imageUrls[0]}
            alt={plant.commonName}
            fill
            className="object-cover"
          />
        </div>
      )}
      
      <div className="p-5">
        <h2 className="text-xl font-semibold text-green-900">{plant.commonName}</h2>
        <p className="text-sm text-green-700 italic">{plant.scientificName}</p>
        <p className="text-xs text-green-600 mt-2">
          <span className="font-semibold">ITC HS Code:</span> {plant.itcHsCode}
        </p>
        
    
      </div>
    </div>
    </Link>
    
  );
}