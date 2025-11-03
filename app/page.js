import WorldMap from './components/WorldMap';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Certifications from './components/Certifications';

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero Section */}
      <div className="min-h-screen flex flex-col justify-center">
        <div className="space-y-6">
          <h1 className="text-6xl font-bold">
            <span className="text-gray-800">I'm </span>
            <span className="bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 bg-clip-text text-transparent typing-effect">
              Zain Azhar
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
            I am a final-year Computer Science student at the University of Agriculture, Faisalabad. 
            Throughout my academic journey, I have developed multiple projects in Generative AI, Agentic AI, 
            and Full-Stack Web Development.
          </p>

          <div className="flex gap-4 pt-6">
            <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              View My CV
            </button>
            <button className="px-8 py-4 bg-white text-gray-800 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-purple-500">
              Get In Touch
            </button>
          </div>
        </div>

        {/* Animated Background Elements */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 left-20 w-72 h-72 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-40 w-72 h-72 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* World Map Section */}
      <WorldMap />

      {/* Tech Stack Section */}
      <TechStack />

      {/* Projects Section */}
      <Projects />

      {/* Achievements Section */}
      <Achievements />

      {/* Certifications Section */}
      <Certifications />
    </div>
  );
}
