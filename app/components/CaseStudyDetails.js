'use client';

import { createRef, useEffect, useMemo, useRef, useState } from 'react';

export default function CaseStudyDetails({ project }) {
  const { caseStudy, technologies } = project;

  const sections = useMemo(() => {
    return [
      { id: 'overview', label: 'Overview', content: caseStudy.overview },
      { id: 'problem', label: 'Problem', content: caseStudy.problem },
      { id: 'solution', label: 'Solution', content: caseStudy.solution },
      { id: 'research', label: 'Research & Techniques', content: caseStudy.research },
      { id: 'results', label: 'Results', content: caseStudy.results },
    ].filter((item) => {
      if (Array.isArray(item.content)) {
        return item.content.length > 0;
      }
      return Boolean(item.content);
    });
  }, [caseStudy]);

  const [activeSection, setActiveSection] = useState(sections[0]?.id ?? 'overview');
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);

  const sectionRefs = useMemo(() => {
    return sections.reduce((acc, section) => {
      acc[section.id] = createRef();
      return acc;
    }, {});
  }, [sections]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.getAttribute('data-section-id'));
          }
        });
      },
      {
        rootMargin: '-40% 0px -40% 0px',
        threshold: 0.1,
      }
    );

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      Object.values(sectionRefs).forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
      observer.disconnect();
    };
  }, [sectionRefs]);

  const scrollToSection = (id) => {
    const target = sectionRefs[id]?.current;
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="space-y-16">
      <div className="grid gap-8 md:grid-cols-[220px,1fr]">
        <nav className="bg-white/80 backdrop-blur rounded-3xl shadow-xl p-6 space-y-2 sticky top-24 self-start">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Sections</p>
          <div className="flex flex-col gap-2">
            {sections.map((section) => (
              <button
                key={section.id}
                type="button"
                onClick={() => scrollToSection(section.id)}
                className={`text-left px-4 py-3 rounded-2xl border transition-all duration-200 text-sm font-semibold ${
                  activeSection === section.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white border-transparent shadow-md'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-purple-300 hover:text-purple-600'
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>
        </nav>

        <div className="space-y-12">
          {sections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              data-section-id={section.id}
              ref={sectionRefs[section.id]}
              className="bg-white/90 backdrop-blur rounded-3xl shadow-xl p-8 space-y-4"
            >
              <h2 className="text-2xl font-semibold text-gray-900">{section.label}</h2>
              {Array.isArray(section.content) ? (
                <ul className="space-y-3 text-gray-700">
                  {section.content.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 rounded-2xl border border-blue-100 bg-blue-50/60 p-4 text-sm md:text-base"
                    >
                      <span className="mt-1 block h-2 w-2 rounded-full bg-blue-500" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : section.content ? (
                <p className="text-gray-700 leading-relaxed text-base md:text-lg">{section.content}</p>
              ) : (
                <p className="text-gray-500 text-sm">No content available for this section.</p>
              )}
            </section>
          ))}
        </div>
      </div>

      {caseStudy.features?.length ? (
        <div className="grid gap-6 md:grid-cols-[250px,1fr]">
          <div className="bg-white/80 backdrop-blur rounded-3xl shadow-xl p-6 space-y-3">
            <h2 className="text-xl font-semibold text-gray-900">Key Features</h2>
            <p className="text-sm text-gray-500">Tap a feature to explore how it supports the experience.</p>
            <div className="flex flex-col gap-2">
              {caseStudy.features.map((feature, index) => (
                <button
                  key={feature}
                  type="button"
                  onClick={() => setActiveFeatureIndex(index)}
                  className={`text-left px-4 py-3 rounded-2xl border transition-all duration-200 text-sm font-semibold ${
                    activeFeatureIndex === index
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white border-transparent shadow-md'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-purple-300 hover:text-purple-600'
                  }`}
                >
                  {feature}
                </button>
              ))}
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-cyan-500/10 rounded-3xl shadow-xl p-8 flex items-center">
            <p className="text-lg text-gray-700 leading-relaxed">
              {caseStudy.features[activeFeatureIndex]}
            </p>
          </div>
        </div>
      ) : null}

      {technologies?.length ? (
        <div className="bg-white/90 backdrop-blur rounded-3xl shadow-xl p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Tech Stack</h2>
          <div className="flex flex-wrap gap-3">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-blue-200/70 bg-blue-50/70 px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
