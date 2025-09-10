// app/plants/[scientificName]/page.tsx
import Image from 'next/image';
import { notFound } from 'next/navigation';

interface Plant {
  id: number;
  itcHsCode: string; // <-- Add this line
  commonName: string;
  scientificName: string;
  description: string;
  medicinalProperties: string;
  usedParts: string[];
  preparationMethods: string;
  habitat: string;
  imageUrls: string[];
}

async function getPlant(scientificName: string): Promise<Plant | null> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/herbal-plants/${encodeURIComponent(scientificName)}`,
    { next: { revalidate: 3600 } }
  );
  
  if (res.status === 404) {
    return null;
  }
  
  if (!res.ok) {
    throw new Error('Failed to fetch plant');
  }
  
  return res.json();
}

export default async function PlantPage({
  params,
}: {
  params: Promise<{ scientificName: string }>;
}) {
  // Await the params before using them
  const { scientificName } = await params;
  const plant = await getPlant(scientificName);
  
  if (!plant) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Plant Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">{plant.commonName}</h1>
          <p className="text-xl text-gray-600 italic">{plant.scientificName}</p>
          <p className="text-md text-gray-500 mt-2">
            <span className="font-semibold">ITC HS Code:</span> {plant.itcHsCode}
          </p>
        </div>
        
        {/* Image Carousel */}
        {plant.imageUrls && plant.imageUrls.length > 0 && (
          <div className="mb-8">
            <div className="relative h-64 w-full rounded-lg overflow-hidden">
              <Image
                src={plant.imageUrls[0]}
                alt={plant.commonName}
                fill
                className="object-cover"
              />
            </div>
            {plant.imageUrls.length > 1 && (
              <div className="grid grid-cols-3 gap-2 mt-2">
                {plant.imageUrls.slice(1).map((url, index) => (
                  <div key={index} className="relative h-24 rounded overflow-hidden">
                    <Image
                      src={url}
                      alt={`${plant.commonName} ${index + 2}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        
        {/* Plant Details */}
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Description</h2>
            <p className="text-gray-700 whitespace-pre-line">{plant.description}</p>
            
            <h2 className="text-2xl font-semibold mt-6 mb-4">Habitat</h2>
            <p className="text-gray-700">{plant.habitat}</p>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-4">Medicinal Properties</h2>
            <p className="text-gray-700 whitespace-pre-line">{plant.medicinalProperties}</p>
            
            <h2 className="text-2xl font-semibold mt-6 mb-4">Used Parts</h2>
            <div className="flex flex-wrap gap-2">
              {plant.usedParts.map((part, index) => (
                <span
                  key={index}
                  className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm"
                >
                  {part}
                </span>
              ))}
            </div>
            
            <h2 className="text-2xl font-semibold mt-6 mb-4">Preparation Methods</h2>
            <p className="text-gray-700 whitespace-pre-line">{plant.preparationMethods}</p>
          </div>
        </div>
      </div>
    </div>
  );
}