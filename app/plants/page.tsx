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

// Sort component
function SortControls({ sortBy, setSortBy }: { 
  sortBy: string; 
  setSortBy: (sort: string) => void 
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-gray-600 whitespace-nowrap">Sort by:</span>
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="bg-white border border-green-300 rounded-lg py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-8">
        <div className="container mx-auto px-4">
          {/* Header with Welcome and Search */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 bg-white p-6 rounded-2xl shadow-md border border-peach-200">
            <div>
              <h1 className="text-3xl font-bold text-green-900">Welcome to Herbal Garden</h1>
              {sortBy === 'coughRemedies' && (
                <p className="text-green-600 font-medium mt-2">
                  Showing herbal plants known to cure cough, sorted by scientific name
                </p>
              )}
              {sortBy === 'headacheRemedies' && (
                <p className="text-green-600 font-medium mt-2">
                  Showing herbal plants known to cure headache, sorted by scientific name
                </p>
              )}
            </div>
            
            <div className="mt-4 md:mt-0 w-full md:w-auto display: flex gap-3">
              <SortControls sortBy={sortBy} setSortBy={setSortBy} />
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
              ) : sortBy === 'coughRemedies' ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-gray-500 text-lg mt-4">No cough remedy plants found in your collection</p>
                  <p className="text-gray-400 text-sm mt-2">
                    Add plants like Justicia adhatoda, Ocimum sanctum, Glycyrrhiza glabra, etc.
                  </p>
                </>
              ) : sortBy === 'headacheRemedies' ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-gray-500 text-lg mt-4">No headache remedy plants found in your collection</p>
                  <p className="text-gray-400 text-sm mt-2">
                    Add plants like Nardostachys jatamansi, Rosa spp., Centella asiatica, etc.
                  </p>
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

  return (
    <Link href={`/plants/${encodeURIComponent(plant.scientificName)}`} className="no-underline"> 
      <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-peach-200 relative">
        {/* Medicinal remedy badges */}
        <div className="absolute top-2 right-2 flex flex-col gap-1 z-10">
          {isCoughRemedy && (
            <div className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full border border-red-200">
              Cough
            </div>
          )}
          {isHeadacheRemedy && (
            <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full border border-blue-200">
              Headache
            </div>
          )}
        </div>
        
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
          
          {/* Medicinal properties summary */}
          {(isCoughRemedy || isHeadacheRemedy) && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <p className="text-xs text-gray-600">
                <span className="font-semibold">Medicinal Properties:</span>
                {isCoughRemedy && " Cough relief"}
                {isCoughRemedy && isHeadacheRemedy && ","}
                {isHeadacheRemedy && " Headache relief"}
              </p>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}