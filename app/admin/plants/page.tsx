// app/admin/plants/page.tsx
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import RequireAuth from '@/components/RequireAuth';


interface Plant {
  id: number;
  commonName: string;
  scientificName: string;
  imageUrls: string[];
  // Add other fields as needed
}

async function getPlants(): Promise<Plant[]> {
  // In a real app, you'd want to add authentication to your API endpoint too
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/herbal-plants`, {
    next: { revalidate: 3600 } // Revalidate every hour
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch plants');
  }
  
  return res.json();
}

export default async function PlantsPage() {
  // Check if user is authenticated
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/admin/signin');
  }

  let plants: Plant[] = [];
  try {
    plants = await getPlants();
  } catch (error) {
    console.error('Error fetching plants:', error);
  }

  return (
    <RequireAuth>
      <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Herbal Plants Management</h1>
        <Link 
          href="/admin/herbal-plant-form"
          className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition-colors"
        >
          Add New Plant
        </Link>
      </div>
      
      {plants.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No plants found.</p>
          <Link 
            href="/admin/herbal-plant-form"
            className="inline-block mt-4 bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition-colors"
          >
            Add Your First Plant
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plants.map((plant) => (
            <PlantCard key={plant.id} plant={plant} />
          ))}
        </div>
      )}
    </div>
    </RequireAuth>
    
  );
}

function PlantCard({ plant }: { plant: Plant }) {
  return (
    <Link href={`/admin/plants/${encodeURIComponent(plant.scientificName)}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        {/* Image Carousel */}
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
        
        <div className="p-4">
          <h2 className="text-xl font-semibold text-gray-800">{plant.commonName}</h2>
          <p className="text-sm text-gray-600 italic">{plant.scientificName}</p>
          
          {/* Admin actions */}
          <div className="mt-4 flex space-x-2">
            <button className="text-sm bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition-colors">
              Edit
            </button>
            <button className="text-sm bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition-colors">
              Delete
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}