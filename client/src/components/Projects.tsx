import { useState, useEffect } from 'react';
import { Search, ExternalLink } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  tech: string[];
  image: string;
  liveUrl?: string;
}

const projects: Project[] = [
  {
    id: 'component-forge',
    title: 'Component Forge',
    description: 'Live React-HTML component builder with drag & drop interface, CSS tokens, and one-click Figma import functionality.',
    category: 'Development Tools',
    tech: ['React', 'Three.js', 'Tailwind', 'TypeScript'],
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=675',
    liveUrl: 'https://pixel-component-craft.vercel.app/',
  },
  {
    id: '3d-configurator',
    title: '3-D Product Configurator',
    description: 'Interactive 3D product configurator that increased conversions by 35% and handles 50K configurations monthly.',
    category: 'E-commerce',
    tech: ['WebGL', 'Spline', 'Redis', 'GraphQL'],
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=675',
  },
  {
    id: 'data-viz',
    title: 'Data-Visualisation Engine',
    description: 'Real-time data visualization engine that streams 1M data points with less than 50ms latency.',
    category: 'Analytics',
    tech: ['D3.js', 'WebGL', 'Socket.io'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=675',
  },
  {
    id: 'booking-platform',
    title: 'On-Demand Booking Platform',
    description: 'Real-time booking platform with dynamic slot management and sub-100ms latency for instant availability updates.',
    category: 'SaaS',
    tech: ['Socket.io', 'PostgreSQL', 'Docker'],
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=675',
  },
  {
    id: 'etl-pipelines',
    title: 'Serverless ETL Pipelines',
    description: 'Serverless ETL system processing 5TB daily from gzip to Parquet format with Redshift integration in under 10 minutes.',
    category: 'Infrastructure',
    tech: ['AWS Step Fn', 'Lambda', 'Athena'],
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=675',
  },
  {
    id: 'ai-medical',
    title: 'AI in Medicine Platform',
    description: 'Medical AI platform using CNN with 0.92 AUC for diagnostics, integrating robotics and nanotechnology research.',
    category: 'AI/ML',
    tech: ['TensorFlow', 'Python', 'PyTorch'],
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=675',
  },
];

const chipColors: Record<string, string> = {
  'Development Tools': 'chip-blue',
  'E-commerce': 'chip-fuchsia',
  'Analytics': 'chip-cyan',
  'SaaS': 'chip-lime',
  'Infrastructure': 'chip-amber',
  'AI/ML': 'chip-cyan',
};

export default function Projects() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProjects, setFilteredProjects] = useState(projects);

  useEffect(() => {
    const filtered = projects.filter(project => {
      const searchTerm = searchQuery.toLowerCase();
      return (
        project.title.toLowerCase().includes(searchTerm) ||
        project.description.toLowerCase().includes(searchTerm) ||
        project.category.toLowerCase().includes(searchTerm) ||
        project.tech.some(tech => tech.toLowerCase().includes(searchTerm))
      );
    });
    setFilteredProjects(filtered);
  }, [searchQuery]);

  const clearSearch = () => setSearchQuery('');

  return (
    <section id="projects" className="py-12 md:py-16 lg:py-20 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
      {/* Header */}
      <header className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-fade-up">
          <span className="shimmer-text">Projects</span>
        </h2>
        <p className="text-xl text-[var(--fg-faint)] animate-fade-up delay-150">
          Explore my work across different domains
        </p>
      </header>

      {/* Search */}
      <div className="mb-10">
        <div className="relative animate-fade-up delay-225 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--fg-faint)] group-focus-within:text-[var(--brand-sky)] transition-colors duration-300 w-5 h-5" />
          <input
            type="text"
            placeholder="Search projects, technologies…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-lg bg-[hsl(var(--black-700)/0.6)] border border-[var(--border-color)] text-white placeholder:text-[var(--fg-faint)] focus:outline-none focus:border-[var(--brand-sky)] focus:ring-2 focus:ring-[hsl(var(--brand-sky)/0.6)] focus:bg-[hsl(var(--black-700)/0.8)] transition-all duration-300 hover-lift"
          />
        </div>
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project, index) => (
          <article 
            key={project.id} 
            className="project-card relative rounded-xl border border-[var(--border-color)] bg-[hsl(var(--black-700)/0.6)] overflow-hidden transition-all duration-500 hover-lift hover:border-[var(--brand-sky)] hover:shadow-2xl hover:shadow-[rgba(0,0,0,0.55)] group"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Image Banner */}
            <div className="relative overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                loading="lazy"
                className="w-full aspect-[16/9] object-cover object-center transform transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
              />
            </div>
            
            {/* Content */}
            <div className="p-6 space-y-4 relative z-20">
              <header className="flex justify-between items-start">
                <h3 className="text-xl font-bold text-white group-hover:text-[var(--brand-sky)] transition-all duration-300 group-hover:translate-x-1">
                  {project.title}
                </h3>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--fg-faint)] hover:text-[var(--brand-sky)] transition-all duration-300 hover:scale-110 hover:rotate-12"
                    title="View live"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                )}
              </header>

              <span className={`chip ${chipColors[project.category]} inline-block hover:scale-105 transition-transform duration-300`}>
                {project.category}
              </span>

              <p className="text-[var(--fg-subtle)] line-clamp-3 group-hover:text-[var(--fg)] transition-colors duration-500">
                {project.description}
              </p>

              {/* Tech Pills */}
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span key={tech} className="chip chip-blue">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && searchQuery && (
        <div className="text-center py-20">
          <p className="text-[var(--fg-faint)] mb-4">No projects match your search.</p>
          <button
            onClick={clearSearch}
            className="text-[var(--brand-sky)] hover:text-[var(--brand-fuchsia)] transition"
          >
            Clear search
          </button>
        </div>
      )}
    </section>
  );
}
