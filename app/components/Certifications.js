'use client';

import { useState } from 'react';

export default function Certifications() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const certificates = [
    {
      id: 1,
      name: 'AMAL Fellowship',
      image: '/certificates/amal.jpg',
      issuer: 'AMAL Academy',
    },
    {
      id: 2,
      name: 'Code in Place',
      image: '/certificates/codeinPlace.png',
      issuer: 'Stanford University',
    },
    {
      id: 3,
      name: 'GPT-4 Certification',
      image: '/certificates/gpt40.png',
      issuer: 'OpenAI',
    },
    {
      id: 4,
      name: 'Meta Hacker Cup Round 1',
      image: '/certificates/metahackercupRound1.png',
      issuer: 'Meta',
    },
    {
      id: 5,
      name: 'NASA Space Apps Challenge',
      image: '/certificates/nasahacks.png',
      issuer: 'NASA',
    },
    {
      id: 6,
      name: 'Saylani Mass IT Training',
      image: '/certificates/saylani.jpg',
      issuer: 'Saylani Welfare Trust',
    },
    
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % certificates.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + certificates.length) % certificates.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="w-full max-w-7xl mx-auto my-20">
      <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h3 className="text-4xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent mb-3">
            Certifications
          </h3>
          <p className="text-gray-600 text-lg">
            Professional certifications and recognitions
          </p>
        </div>

        {/* Slider Container */}
        <div className="relative">
          {/* Main Certificate Display */}
          <div className="relative h-[600px] overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50">
            {certificates.map((cert, index) => (
              <div
                key={cert.id}
                className={`absolute inset-0 transition-all duration-700 transform ${
                  index === currentIndex
                    ? 'opacity-100 translate-x-0 scale-100'
                    : index < currentIndex
                    ? 'opacity-0 -translate-x-full scale-95'
                    : 'opacity-0 translate-x-full scale-95'
                }`}
              >
                {/* Certificate Image */}
                <div className="w-full h-full p-8 flex items-center justify-center">
                  <div className="relative w-full h-full group">
                    <img
                      src={cert.image}
                      alt={cert.name}
                      className="w-full h-full object-contain rounded-xl shadow-2xl transform transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Certificate Info Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 rounded-b-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <h4 className="text-2xl font-bold text-white mb-2">{cert.name}</h4>
                      <p className="text-gray-200 text-lg">{cert.issuer}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Previous Button */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/90 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 group z-10"
          >
            <svg
              className="w-6 h-6 text-gray-800 group-hover:text-white transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/90 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 group z-10"
          >
            <svg
              className="w-6 h-6 text-gray-800 group-hover:text-white transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-3 mt-8">
            {certificates.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? 'w-12 h-3 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500'
                    : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-6 gap-4 mt-8">
            {certificates.map((cert, index) => (
              <button
                key={cert.id}
                onClick={() => goToSlide(index)}
                className={`relative rounded-lg overflow-hidden transition-all duration-300 transform ${
                  index === currentIndex
                    ? 'ring-4 ring-blue-500 scale-105 shadow-xl'
                    : 'opacity-60 hover:opacity-100 hover:scale-105'
                }`}
              >
                <img
                  src={cert.image}
                  alt={cert.name}
                  className="w-full h-20 object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
