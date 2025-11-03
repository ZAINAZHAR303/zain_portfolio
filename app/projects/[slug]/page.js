import { notFound } from 'next/navigation';
import { projects } from '../../data/projects';
import CaseStudyDetails from '../../components/CaseStudyDetails';
import TechnologyBadge from '../../components/TechnologyBadge';

const projectBySlug = new Map(projects.map((project) => [project.slug, project]));

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const project = projectBySlug.get(resolvedParams.slug);
  if (!project) {
    return {};
  }

  return {
    title: `${project.name} – Case Study`,
    description: project.description,
  };
}

export default async function ProjectCaseStudy({ params }) {
  const resolvedParams = await params;
  const project = projectBySlug.get(resolvedParams.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto space-y-16">
      <header className="space-y-6 text-center">
        <span className="inline-flex items-center px-4 py-2 text-sm font-semibold uppercase tracking-wider text-blue-600 bg-blue-100/70 rounded-full">
          Case Study
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          {project.name}
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          {project.description}
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          {project.technologies.map((tech) => (
            <TechnologyBadge key={tech} tech={tech} />
          ))}
        </div>
      </header>
      <CaseStudyDetails project={project} />
    </div>
  );
}
