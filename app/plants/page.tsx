"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import UserNav from '@/components/UserNav';
import NisargAI from '@/components/NisargAi';

interface Plant {
  id: number;
  itcHsCode: string;
  commonName: string;
  scientificName: string;
  imageUrls: string[];
  createdAt: string | Date | null;
}

// List of plants that cure cough by their scientific names
const COUGH_REMEDY_PLANTS = [
  "Justicia adhatoda",
  "Ocimum sanctum", 
  "Glycyrrhiza glabra",
  "Andrographis paniculata",
  "Eucalyptus globulus",
  "Euphorbia hirta",
  "Clitoria ternatea",
  "Tylophora indica",
  "Trachyspermum ammi",
  "Adhatoda vasica"
];

// List of plants that cure headache by their scientific names
const HEADACHE_REMEDY_PLANTS = [
  "Nardostachys jatamansi",
  "Rosa spp.",
  "Centella asiatica",
  "Bacopa monnieri",
  "Acorus calamus"
];

// Sort component - Responsive design
function SortControls({ sortBy, setSortBy }: { 
  sortBy: string; 
  setSortBy: (sort: string) => void 
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-gray-600 whitespace-nowrap hidden sm:block">Sort by:</span>
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="bg-white border border-green-300 rounded-lg py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent w-full sm:w-auto text-sm sm:text-base"
      >
        <option value="commonName-asc">Common Name (A-Z)</option>
        <option value="commonName-desc">Common Name (Z-A)</option>
        <option value="scientificName-asc">Scientific Name (A-Z)</option>
        <option value="scientificName-desc">Scientific Name (Z-A)</option>
        <option value="createdAt-desc">Newest First</option>
        <option value="createdAt-asc">Oldest First</option>
        {/* New options for medicinal remedies */}
        <option value="coughRemedies">Cough Remedies (A-Z)</option>
        <option value="headacheRemedies">Headache Remedies (A-Z)</option>
      </select>
    </div>
  );
}

async function getPlants(): Promise<Plant[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/herbsort`, {
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
  const [sortBy, setSortBy] = useState('commonName-asc');
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

  // Apply sorting and filtering
  useEffect(() => {
    let result = [...plants];
    
    // Apply search filter
    if (searchQuery.trim() !== '') {
      result = result.filter(plant =>
        plant.commonName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        plant.scientificName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        plant.itcHsCode.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Handle special cases for medicinal remedies
    if (sortBy === 'coughRemedies') {
      // Filter plants to only include cough remedies and sort by scientific name
      result = result.filter(plant => 
        COUGH_REMEDY_PLANTS.some(remedyPlant => 
          plant.scientificName.toLowerCase().includes(remedyPlant.toLowerCase())
        )
      ).sort((a, b) => {
        const aName = a.scientificName.toLowerCase();
        const bName = b.scientificName.toLowerCase();
        return aName.localeCompare(bName);
      });
    } else if (sortBy === 'headacheRemedies') {
      // Filter plants to only include headache remedies and sort by scientific name
      result = result.filter(plant => 
        HEADACHE_REMEDY_PLANTS.some(remedyPlant => 
          plant.scientificName.toLowerCase().includes(remedyPlant.toLowerCase())
        )
      ).sort((a, b) => {
        const aName = a.scientificName.toLowerCase();
        const bName = b.scientificName.toLowerCase();
        return aName.localeCompare(bName);
      });
    } else {
      // Apply regular sorting for other options
      const [field, order] = sortBy.split('-');
      
      result.sort((a, b) => {
        // Get the raw values
        const aValue = a[field as keyof Plant];
        const bValue = b[field as keyof Plant];
        
        // Convert to comparable values based on field type
        let aComparable: string | number;
        let bComparable: string | number;
        
        if (field === 'createdAt') {
          // Handle date fields - convert to timestamp for comparison
          const aDate = aValue ? new Date(aValue as string | Date).getTime() : 0;
          const bDate = bValue ? new Date(bValue as string | Date).getTime() : 0;
          aComparable = aDate;
          bComparable = bDate;
        } else {
          // Handle string fields (commonName, scientificName)
          // For other fields like imageUrls, we'll convert to string representation
          aComparable = String(aValue || '').toLowerCase();
          bComparable = String(bValue || '').toLowerCase();
        }
        
        // Perform comparison
        if (order === 'asc') {
          return aComparable > bComparable ? 1 : -1;
        } else {
          return aComparable < bComparable ? 1 : -1;
        }
      });
    }
    
    setFilteredPlants(result);
  }, [searchQuery, plants, sortBy]);

  return (
    <div>
      <NisargAI/>
      <div className=''>
      <UserNav />
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-4 sm:py-8">
        <div className="container mx-auto px-3 sm:px-4">
          {/* Header with Welcome and Search - Responsive layout */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-md border border-peach-200">
            <div className="mb-4 sm:mb-0">
              <h1 className="text-2xl sm:text-3xl font-bold text-green-900">Welcome to Herbal Garden</h1>
              {sortBy === 'coughRemedies' && (
                <p className="text-green-600 font-medium mt-1 sm:mt-2 text-sm sm:text-base">
                  Showing herbal plants known to cure cough, sorted by scientific name
                </p>
              )}
              {sortBy === 'headacheRemedies' && (
                <p className="text-green-600 font-medium mt-1 sm:mt-2 text-sm sm:text-base">
                  Showing herbal plants known to cure headache, sorted by scientific name
                </p>
              )}
            </div>
            
            <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-3">
              <SortControls sortBy={sortBy} setSortBy={setSortBy} />
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search plants..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full sm:w-64 px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-peach-500 text-sm sm:text-base"
                />
                <svg 
                  className="absolute right-3 top-2.5 h-4 w-4 sm:h-5 sm:w-5 text-green-400" 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          {/* Plants Grid - Responsive grid */}
          {isLoading ? (
            <div className="flex justify-center items-center h-48 sm:h-64">
              <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-t-2 border-b-2 border-peach-500"></div>
            </div>
          ) : filteredPlants.length === 0 ? (
            <div className="text-center py-8 sm:py-12 bg-white rounded-xl sm:rounded-2xl shadow-md border border-peach-200">
              {searchQuery ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 sm:h-16 sm:w-16 mx-auto text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-gray-500 text-base sm:text-lg mt-3 sm:mt-4">No plants found for &quot;{searchQuery}&quot;</p>
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="mt-3 sm:mt-4 text-peach-600 hover:text-peach-700 font-medium"
                  >
                    Clear search
                  </button>
                </>
              ) : sortBy === 'coughRemedies' ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 sm:h-16 sm:w-16 mx-auto text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-gray-500 text-base sm:text-lg mt-3 sm:mt-4">No cough remedy plants found in your collection</p>
                  <p className="text-gray-400 text-xs sm:text-sm mt-2">
                    Add plants like Justicia adhatoda, Ocimum sanctum, Glycyrrhiza glabra, etc.
                  </p>
                </>
              ) : sortBy === 'headacheRemedies' ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 sm:h-16 sm:w-16 mx-auto text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-gray-500 text-base sm:text-lg mt-3 sm:mt-4">No headache remedy plants found in your collection</p>
                  <p className="text-gray-400 text-xs sm:text-sm mt-2">
                    Add plants like Nardostachys jatamansi, Rosa spp., Centella asiatica, etc.
                  </p>
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 sm:h-16 sm:w-16 mx-auto text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <p className="text-gray-500 text-base sm:text-lg mt-3 sm:mt-4">No plants found.</p>
                  <Link 
                    href="/admin/herbal-plant-form"
                    className="inline-block mt-3 sm:mt-4 bg-peach-500 hover:bg-peach-600 text-white px-4 py-2 sm:px-6 sm:py-2 rounded-lg font-medium transition duration-300 text-sm sm:text-base"
                  >
                    Add Your First Plant
                  </Link>
                </>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredPlants.map((plant) => (
                <PlantCard key={plant.id} plant={plant} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
    </div>
    
  );
}

function PlantCard({ plant }: { plant: Plant }) {
  // Check if this plant is a cough remedy
  const isCoughRemedy = COUGH_REMEDY_PLANTS.some(remedyPlant => 
    plant.scientificName.toLowerCase().includes(remedyPlant.toLowerCase())
  );

  // Check if this plant is a headache remedy
  const isHeadacheRemedy = HEADACHE_REMEDY_PLANTS.some(remedyPlant => 
    plant.scientificName.toLowerCase().includes(remedyPlant.toLowerCase())
  );

  // Function to handle Amazon search
  const handleAmazonSearch = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation to plant details
    e.stopPropagation(); // Stop event bubbling
    
    // Create Amazon search URL with plant's common name
    const searchQuery = encodeURIComponent(plant.commonName);
    const amazonUrl = `https://www.amazon.in/s?k=${searchQuery}`;
    
    // Open Amazon in new tab
    window.open(amazonUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <Link href={`/plants/${encodeURIComponent(plant.scientificName)}`} className="no-underline"> 
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-peach-200 relative">
        {/* Medicinal remedy badges */}
        <div className="absolute top-2 right-2 flex flex-col gap-1 z-10">
          {isCoughRemedy && (
            <div className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 sm:px-2.5 sm:py-0.5 rounded-full border border-red-200">
              Cough
            </div>
          )}
          {isHeadacheRemedy && (
            <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 sm:px-2.5 sm:py-0.5 rounded-full border border-blue-200">
              Headache
            </div>
          )}
        </div>
        
        {/* Image */}
        {plant.imageUrls && plant.imageUrls.length > 0 && (
          <div className="relative h-40 sm:h-48 w-full">
            <Image
              src={plant.imageUrls[0]}
              alt={plant.commonName}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        )}
        
        <div className="p-4 sm:p-5">
          <h2 className="text-lg sm:text-xl font-semibold text-green-900">{plant.commonName}</h2>
          <p className="text-sm text-green-700 italic">{plant.scientificName}</p>
          <p className="text-xs text-green-600 mt-2">
            <span className="font-semibold">ITC HS Code:</span> {plant.itcHsCode}
          </p>
          
          {/* Medicinal properties summary */}
          {(isCoughRemedy || isHeadacheRemedy) && (
            <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-gray-100">
              <p className="text-xs text-gray-600">
                <span className="font-semibold">Medicinal Properties:</span>
                {isCoughRemedy && " Cough relief"}
                {isCoughRemedy && isHeadacheRemedy && ","}
                {isHeadacheRemedy && " Headache relief"}
              </p>
            </div>
          )}

          {/* Buy Plant Button */}
          <div className="mt-3 sm:mt-4">
            <button
              onClick={handleAmazonSearch}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium py-2 sm:py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <svg 
                className="w-4 h-4" 
                viewBox="0 0 24 24" 
                fill="currentColor"
              >
                <path d="M10.5 13.5L12 12l1.5 1.5L15 12l1.5 1.5L18 12l1.5 1.5-1.5 1.5 1.5 1.5-1.5 1.5L18 21l-1.5-1.5L15 21l-1.5-1.5L12 21l-1.5-1.5L9 21l-1.5-1.5L6 21l-1.5-1.5 1.5-1.5-1.5-1.5 1.5-1.5L6 12l1.5 1.5L9 12l1.5 1.5z"/>
                <path d="M12 3L9 6l3 3 3-3-3-3z"/>
              </svg>
              Buy Plant
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}