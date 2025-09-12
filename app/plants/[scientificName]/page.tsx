import Image from 'next/image';
import { notFound } from 'next/navigation';
import UserNav from '@/components/UserNav';

interface Plant {
  id: number;
  itcHsCode: string;
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
  const { scientificName } = await params;
  const plant = await getPlant(scientificName);
  
  if (!plant) {
    notFound();
  }

  return (
    <div>
        <UserNav/>
    <main className="min-h-screen bg-gradient-to-b from-emerald-50 via-emerald-50 to-white py-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-8">
          {/* Plant Header */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/2">
                {/* Main Image */}
                {plant.imageUrls && plant.imageUrls.length > 0 && (
                  <div className="relative h-80 w-full rounded-xl overflow-hidden mb-4">
                    <Image
                      src={plant.imageUrls[0]}
                      alt={plant.commonName}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                )}

                {/* Thumbnail Gallery */}
                {plant.imageUrls && plant.imageUrls.length > 1 && (
                  <div className="grid grid-cols-4 gap-2">
                    {plant.imageUrls.slice(1).map((url, index) => (
                      url ? (
                        <div key={index} className="relative h-20 rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity">
                          <Image
                            src={url}
                            alt={`${plant.commonName} ${index + 2}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : null
                    ))}
                  </div>
                )}
              </div>

              <div className="md:flex-1 flex flex-col justify-center">
                <h1 className="text-4xl md:text-5xl font-extrabold text-emerald-900">{plant.commonName}</h1>
                <p className="text-lg md:text-xl text-emerald-700 italic mt-1">{plant.scientificName}</p>
                <div className="mt-4 text-sm text-emerald-600 bg-emerald-100 inline-block px-3 py-2 rounded-full font-medium">
                  ITC HS Code: <span className="font-semibold text-emerald-800">{plant.itcHsCode}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="">
            

            {/* Right: Details card spanning two columns on large screens */}
            <section className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <h2 className="text-2xl font-semibold text-emerald-900 mb-3">Description</h2>
                <p className="text-gray-700 whitespace-pre-line leading-relaxed">{plant.description}</p>

                <hr className="my-6 border-emerald-100" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-emerald-800 mb-2">Habitat</h3>
                    <p className="text-gray-700">{plant.habitat}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-emerald-800 mb-2">Preparation Methods</h3>
                    <p className="text-gray-700 whitespace-pre-line">{plant.preparationMethods}</p>
                  </div>
                </div>

                <hr className="my-6 border-emerald-100" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-emerald-800 mb-2">Medicinal Properties</h3>
                    <p className="text-gray-700 whitespace-pre-line leading-relaxed">{plant.medicinalProperties}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-emerald-800 mb-2">Used Parts</h3>
                    <div className="flex flex-wrap gap-2">
                      {plant.usedParts.map((part, i) => (
                        <span key={i} className="inline-flex items-center text-sm font-medium bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full">
                          {part}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>

    </div>
    
  );
}