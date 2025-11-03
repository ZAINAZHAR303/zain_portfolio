'use client';

import { useState } from 'react';
import Link from 'next/link';
import { projects } from '../data/projects';

export default function Projects() {
  const [hoveredProject, setHoveredProject] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('AI');

  const categories = ['AI', 'Web Dev', 'Academic'];
  const filteredProjects = projects.filter(p => p.category === selectedCategory);

  return (
    <div className="w-full max-w-7xl mx-auto my-20">
      <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h3 className="text-4xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent mb-3">
            Projects
          </h3>
          <p className="text-gray-600 text-lg mb-8">Showcasing my work across AI, Web Development & Academic Projects</p>
          
          {/* Categories - Now on Top */}
          <div className="flex justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 text-white shadow-lg scale-105'
                    : 'bg-white text-gray-700 hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100 shadow-md'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid - Full Width */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105"
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  {/* Project Image */}
                  <div className="relative h-64 overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    
                    {/* Overlay on Hover */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-opacity duration-300 ${
                      hoveredProject === project.id ? 'opacity-100' : 'opacity-0'
                    }`}>
                      {/* Project Name */}
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full px-4">
                        <h5 className="text-white text-2xl font-bold mb-6">{project.name}</h5>
                        
                        {/* Action Icons */}
                        <div className="flex justify-center gap-4">
                          {/* GitHub Link */}
                          {project.github && (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-14 h-14 bg-white rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors duration-300 group/icon"
                              title="View Code"
                            >
                              <svg className="w-7 h-7 text-gray-800 group-hover/icon:text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/>
                              </svg>
                            </a>
                          )}

                          {/* Demo Link */}
                          {project.demo && (
                            <a
                              href={project.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-14 h-14 bg-white rounded-full flex items-center justify-center hover:bg-purple-500 transition-colors duration-300 group/icon"
                              title="Live Demo"
                            >
                              <svg className="w-7 h-7 text-gray-800 group-hover/icon:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </a>
                          )}

                          {/* Details Link */}
                          <Link
                            href={project.detail}
                            className="w-14 h-14 bg-white rounded-full flex items-center justify-center hover:bg-cyan-500 transition-colors duration-300 group/icon"
                            title="View Details"
                          >
                            <svg className="w-7 h-7 text-gray-800 group-hover/icon:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
      </div>
    </div>
  );
}
