// src/components/ProjectHeader.tsx
import { Link } from 'wouter'
import { ArrowLeft, ExternalLink, Github, FileText } from 'lucide-react'
import type { Project } from '@/data/portfolio'

interface ProjectHeaderProps {
  project: Project
}

export default function ProjectHeader({ project }: ProjectHeaderProps) {
  return (
    <header className="relative border-b border-white/10 bg-black/20 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <Link href="/projects/grid" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors mb-4">
          <ArrowLeft size={16} />
          Back to Projects
        </Link>
        
        <div className="flex flex-col md:flex-row md:items-start gap-6">
          <img 
            src={project.image} 
            alt={project.name}
            className="w-full md:w-48 h-32 md:h-32 object-cover rounded-lg shadow-lg"
          />
          
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              {project.name}
            </h1>
            <p className="text-lg text-gray-300 mb-4">
              {project.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.map((tech) => (
                <span 
                  key={tech}
                  className="px-3 py-1 bg-blue-600/20 text-blue-300 rounded-full text-sm font-medium border border-blue-500/30"
                >
                  {tech}
                </span>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-3">
              {project.sourceUrl && (
                <a 
                  href={project.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                >
                  <Github size={16} />
                  Source Code
                </a>
              )}
              {project.liveUrl && (
                <a 
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <ExternalLink size={16} />
                  Live Demo
                </a>
              )}
              {project.docsUrl && (
                <a 
                  href={project.docsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                >
                  <FileText size={16} />
                  Documentation
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}