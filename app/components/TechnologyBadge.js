import { techIconMap } from '../data/techCatalog';

const CONTAINER_SIZES = {
  sm: 'h-10 w-10',
  md: 'h-12 w-12',
  lg: 'h-14 w-14',
};

const ICON_SIZES = {
  sm: 'h-6 w-6',
  md: 'h-7 w-7',
  lg: 'h-9 w-9',
};

export default function TechnologyBadge({ tech, size = 'md' }) {
  const containerSize = CONTAINER_SIZES[size] ?? CONTAINER_SIZES.md;
  const iconSize = ICON_SIZES[size] ?? ICON_SIZES.md;
  const icon = tech ? techIconMap[tech.toLowerCase()] : undefined;

  if (!icon) {
    return (
      <span className="rounded-full border border-blue-200/70 bg-blue-50/70 px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm">
        {tech}
      </span>
    );
  }

  return (
    <div
      className={`relative flex items-center justify-center rounded-2xl border border-blue-200/70 bg-white/90 shadow-sm ${containerSize}`}
      title={tech}
    >
      <img src={icon} alt={tech} className={`${iconSize} object-contain`} />
      <span className="sr-only">{tech}</span>
    </div>
  );
}
