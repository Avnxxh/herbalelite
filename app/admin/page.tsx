"use client";
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { CldUploadWidget, CldImage } from 'next-cloudinary';
import RequireAuth from '@/components/RequireAuth';

interface HerbalPlantData {
  commonName: string;
  scientificName: string;
  description: string;
  medicinalProperties: string;
  usedParts: string[];
  preparationMethods: string;
  habitat: string;
  imageUrls: string[];
}

const HerbalPlantForm = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const [formData, setFormData] = useState<HerbalPlantData>({
    commonName: '',
    scientificName: '',
    description: '',
    medicinalProperties: '',
    usedParts: [''],
    preparationMethods: '',
    habitat: '',
    imageUrls: []
  });

  const [currentUsedPart, setCurrentUsedPart] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session) {
      router.push('/admin/signin');
    } else {
      setIsLoading(false);
    }
  }, [session, status, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUsedPartAdd = () => {
    if (currentUsedPart.trim()) {
      setFormData(prev => ({
        ...prev,
        usedParts: [...prev.usedParts, currentUsedPart.trim()]
      }));
      setCurrentUsedPart('');
    }
  };

  const handleUsedPartRemove = (index: number) => {
    setFormData(prev => ({
      ...prev,
      usedParts: prev.usedParts.filter((_, i) => i !== index)
    }));
  };

  const handleImageUploadSuccess = (result: any) => {
    if (result.info && result.info.secure_url) {
      setFormData(prev => ({
        ...prev,
        imageUrls: [...prev.imageUrls, result.info.secure_url]
      }));
    }
  };

  const handleImageRemove = (index: number) => {
    setFormData(prev => ({
      ...prev,
      imageUrls: prev.imageUrls.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/herbal-plants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newPlant = await response.json();
        alert('Herbal plant saved successfully!');
        // Reset form
        setFormData({
          commonName: '',
          scientificName: '',
          description: '',
          medicinalProperties: '',
          usedParts: [''],
          preparationMethods: '',
          habitat: '',
          imageUrls: []
        });
      } else {
        throw new Error('Failed to save plant');
      }
    } catch (error) {
      console.error('Error saving herbal plant:', error);
      alert('Error saving herbal plant. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <RequireAuth>
      <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="px-6 py-4 bg-emerald-600 text-white flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Herbal Plant Information Form</h1>
              <p className="mt-1">Add a new herbal plant to the database</p>
            </div>
            <button
              onClick={() => router.push('/admin')}
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 rounded-md transition-colors"
            >
              Back to Dashboard
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="commonName" className="block text-sm font-medium text-gray-700 mb-1">
                  Common Name *
                </label>
                <input
                  type="text"
                  id="commonName"
                  name="commonName"
                  value={formData.commonName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              <div>
                <label htmlFor="scientificName" className="block text-sm font-medium text-gray-700 mb-1">
                  Scientific Name *
                </label>
                <input
                  type="text"
                  id="scientificName"
                  name="scientificName"
                  value={formData.scientificName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Provide 2-3 paragraphs describing the plant..."
              />
            </div>

            {/* Medicinal Properties */}
            <div>
              <label htmlFor="medicinalProperties" className="block text-sm font-medium text-gray-700 mb-1">
                Medicinal Properties *
              </label>
              <textarea
                id="medicinalProperties"
                name="medicinalProperties"
                value={formData.medicinalProperties}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Describe the medicinal properties in detail..."
              />
            </div>

            {/* Used Parts */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Used Parts *
              </label>
              <div className="flex space-x-2 mb-2">
                <input
                  type="text"
                  value={currentUsedPart}
                  onChange={(e) => setCurrentUsedPart(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Add a part used (e.g., leaves, roots)"
                />
                <button
                  type="button"
                  onClick={handleUsedPartAdd}
                  className="px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                >
                  Add
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {formData.usedParts.map((part, index) => (
                  part && (
                    <span key={index} className="inline-flex items-center px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm">
                      {part}
                      <button
                        type="button"
                        onClick={() => handleUsedPartRemove(index)}
                        className="ml-2 text-emerald-600 hover:text-emerald-800"
                      >
                        &times;
                      </button>
                    </span>
                  )
                ))}
              </div>
            </div>

            {/* Preparation Methods */}
            <div>
              <label htmlFor="preparationMethods" className="block text-sm font-medium text-gray-700 mb-1">
                Preparation Methods *
              </label>
              <textarea
                id="preparationMethods"
                name="preparationMethods"
                value={formData.preparationMethods}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Describe how to prepare the plant for medicinal use..."
              />
            </div>

            {/* Habitat */}
            <div>
              <label htmlFor="habitat" className="block text-sm font-medium text-gray-700 mb-1">
                Habitat *
              </label>
              <input
                type="text"
                id="habitat"
                name="habitat"
                value={formData.habitat}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Describe the natural habitat of the plant..."
              />
            </div>

            {/* Images Section */}
            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Images</h2>

              {/* Cloudinary Upload Widget */}
              <div className="mb-6">
                <h3 className="text-md font-medium text-gray-700 mb-2">Upload Images</h3>

                <CldUploadWidget
                  uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                  onSuccess={handleImageUploadSuccess}
                  options={{
                    multiple: true,
                    sources: ['local'],
                    maxFiles: 5,
                  }}
                >
                  {({ open }) => (
                    <button
                      type="button"
                      onClick={() => open()}
                      className="w-full flex items-center justify-center h-32 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <div className="text-center">
                        <svg className="w-8 h-8 mx-auto mb-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                        </svg>
                        <p className="text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5 images</p>
                      </div>
                    </button>
                  )}
                </CldUploadWidget>

                {/* Image Previews */}
                <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                  {formData.imageUrls.map((url, index) => (
                    <div key={index} className="relative group">
                      <CldImage
                        width="200"
                        height="200"
                        src={url}
                        alt={`Uploaded image ${index + 1}`}
                        className="h-24 w-full object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => handleImageRemove(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-emerald-600 text-white font-medium rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? 'Saving...' : 'Save Herbal Plant'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </RequireAuth>
    
  );
};

export default HerbalPlantForm;