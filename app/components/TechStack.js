'use client';

import { useState } from 'react';

export default function TechStack() {
  const [hoveredTech, setHoveredTech] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const technologies = [
    { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', category: 'Backend' },
    { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', category: 'Frontend' },
    { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', category: 'Frontend' },
    { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', category: 'Database' },
    { name: 'Firebase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg', category: 'Backend' },
    { name: 'Vercel', icon: 'https://assets.vercel.com/image/upload/v1588805858/repositories/vercel/logo.png', category: 'Backend' },
    { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', category: 'AI/ML' },
    { name: 'TensorFlow', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg', category: 'AI/ML' },
    { name: 'PyTorch', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg', category: 'AI/ML' },
    { name: 'Pandas', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg', category: 'AI/ML' },
    { name: 'NumPy', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg', category: 'AI/ML' },
    { name: 'Express.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', category: 'Backend' },
    { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', category: 'AI/ML' },
    { name: 'C', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg', category: 'AI/ML' },
    { name: 'C++', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg', category: 'AI/ML' },
    { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', category: 'Frontend' },
    { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', category: 'Frontend' },
    { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg', category: 'Frontend' },
    { name: 'Flask', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg', category: 'Backend' },
    { name: 'FastAPI', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg', category: 'Backend' },
    { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', category: 'Backend' },
    { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', category: 'Backend' },
    { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', category: 'Database' },
    { name: 'Sklearn', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg', category: 'AI/ML' },
    { name: 'Matplotlib', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/matplotlib/matplotlib-original.svg', category: 'AI/ML' },
    { name: 'LangChain', icon: 'https://avatars.githubusercontent.com/u/126733545?s=200&v=4', category: 'AI/ML' },
    { name: 'OpenAI', icon: 'https://static.vecteezy.com/system/resources/previews/022/227/364/non_2x/openai-chatgpt-logo-icon-free-png.png', category: 'AI/ML' },
    { name: 'Render', icon: 'https://cdn.worldvectorlogo.com/logos/.svg', category: 'Backend' },
    { name: 'Railway', icon: 'https://railway.app/brand/logo-light.png', category: 'Backend' },
    { name: 'Transformers', icon: 'https://huggingface.co/front/assets/huggingface_logo-noborder.svg', category: 'AI/ML' },
    { name: 'Gemini API', icon: 'https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg', category: 'AI/ML' },
    { name: 'LangGraph', icon: 'https://avatars.githubusercontent.com/u/126733545?s=200&v=4', category: 'AI/ML' },
  ];

  const categories = ['All', 'Frontend', 'Backend', 'AI/ML', 'Database'];

  const filteredTechnologies = selectedCategory === 'All' 
    ? technologies 
    : technologies.filter(tech => tech.category === selectedCategory);

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
