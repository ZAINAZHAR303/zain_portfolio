import Image from 'next/image';
import Link from 'next/link';
import TechnologyBadge from '../components/TechnologyBadge';
import { projects } from '../data/projects';

const categories = ['AI', 'Web Dev', 'Academic'];

export default function ProjectsPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="text-center">
        <span className="inline-flex items-center px-4 py-2 text-sm font-semibold uppercase tracking-wider text-blue-600 bg-blue-100/70 rounded-full">
          Case Studies
        </span>
        <h1 className="mt-6 text-5xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
          Projects In Focus
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
          A deeper look at the products I have built across AI, full-stack web, and academic research workstreams.
        </p>
      </div>

      {categories.map((category) => {
        const categoryProjects = projects.filter((project) => project.category === category);
        if (categoryProjects.length === 0) {
          return null;
        }

        return (
          <section key={category} className="mt-16">
            <h2 className="text-3xl font-semibold text-gray-800">
              {category}
            </h2>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              {categoryProjects.map((project) => (
                <article
                  key={project.id}
                  className="group h-full overflow-hidden rounded-3xl border border-white/40 bg-white/80 backdrop-blur shadow-xl transition-transform duration-500 hover:-translate-y-2 hover:shadow-2xl"
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      priority={project.id <= 4}
                    />
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900">
                      {project.name}
                    </h3>
                    <p className="mt-3 text-gray-600 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-3">
                      {project.technologies.map((tech) => (
                        <TechnologyBadge key={tech} tech={tech} size="sm" />
                      ))}
                    </div>

                    <div className="mt-8 flex flex-wrap gap-4">
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl"
                        >
                          Live Demo
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-gray-700 shadow-md transition-all duration-300 hover:text-purple-600"
                        >
                          View Code
                        </a>
                      )}
                      <Link
                        href={project.detail}
                        className="inline-flex items-center gap-2 rounded-full border border-transparent bg-white/80 px-6 py-3 text-sm font-semibold text-gray-700 shadow-md transition-all duration-300 hover:border-purple-400 hover:text-purple-600"
                      >
                        Case Study
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
