'use client';

import { useMemo, useState } from 'react';
import { techCatalog } from '../data/techCatalog';

export default function TechStack() {
  const [hoveredTech, setHoveredTech] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = useMemo(() => {
    const unique = Array.from(new Set(techCatalog.map((tech) => tech.category)));
    return ['All', ...unique];
  }, []);

  const filteredTechnologies = useMemo(() => {
    if (selectedCategory === 'All') {
      return techCatalog;
    }
    return techCatalog.filter((tech) => tech.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="w-full max-w-5xl mx-auto my-20">
      <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h3 className="text-4xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent mb-3">
            Technology Stack
          </h3>
          <p className="text-gray-600 text-lg">Tools & Technologies I Work With</p>
        </div>

        {/* Tech Icons Grid */}
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-6">
          {filteredTechnologies.map((tech, index) => (
            <div
              key={index}
              className="group relative flex flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-110"
              onMouseEnter={() => setHoveredTech(tech.name)}
              onMouseLeave={() => setHoveredTech(null)}
              style={{
                animation: `float ${3 + (index % 3)}s ease-in-out infinite`,
                animationDelay: `${index * 0.1}s`
              }}
            >
              {/* Icon - hidden on hover */}
              <div className={`w-12 h-12 flex items-center justify-center transition-opacity duration-300 ${hoveredTech === tech.name ? 'opacity-0' : 'opacity-100'}`}>
                <img 
                  src={tech.icon} 
                  alt={tech.name}
                  className="w-full h-full object-contain filter group-hover:drop-shadow-lg transition-all duration-300"
                />
              </div>

              {/* Tech Name - shown on hover */}
              <div className={`absolute inset-0 flex items-center justify-center px-2 transition-opacity duration-300 ${hoveredTech === tech.name ? 'opacity-100' : 'opacity-0'}`}>
                <span className="text-xs font-bold text-center bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
                  {tech.name}
                </span>
              </div>

              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
            </div>
          ))}
        </div>

        {/* Category Filter */}
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 text-white shadow-lg transform scale-105'
                  : 'bg-gradient-to-r from-blue-100 to-purple-100 text-gray-700 hover:shadow-md'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
