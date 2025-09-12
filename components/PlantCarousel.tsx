"use client";
import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';

interface PlantCarouselProps {
  images: string[];
  commonName: string;
}

export default function PlantCarousel({ images, commonName }: PlantCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000 })]);

  return (
    <div className="embla overflow-hidden rounded-xl" ref={emblaRef}>
      <div className="embla__container flex">
        {images.map((url, index) => (
          <div key={index} className="embla__slide flex-[0_0_100%] min-w-0">
            <div className="relative h-80 w-full">
              <Image
                src={url}
                alt={`${commonName} - Image ${index + 1}`}
                fill
                className="object-cover rounded-lg"
                priority={index === 0}
              />
            </div>
          </div>
        ))}
      </div>
      
      {/* Navigation Buttons */}
      <div className="flex justify-center mt-4 space-x-3">
        {images.map((_, index) => (
          <button
            key={index}
            className="w-3 h-3 rounded-full bg-emerald-300 opacity-50 hover:opacity-100 transition-opacity"
            onClick={() => emblaApi?.scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}