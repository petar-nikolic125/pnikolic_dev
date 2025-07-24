// src/pages/projects/FullStackShowcasePage.tsx
import ProjectHeader from '@/components/ProjectHeader'
import TechStack from '@/components/TechStack'
import Gallery from '@/components/Gallery'
import LinksPanel from '@/components/LinksPanel'
import { projects } from '@/data/portfolio'

export default function FullStackShowcasePage() {
  const project = projects.find(p => p.slug === 'full-stack-showcase')!

  const links = [
    {
      url: project.liveUrl || '#',
      label: 'Live Demo',
      type: 'live' as const,
      description: 'Interactive component showcase website'
    }
  ]

  const images = [
    {
      src: '/api/placeholder/800/600',
      alt: 'Component Assembly Interface',
      title: 'Real-time Component Builder',
      description: 'Drag-and-drop interface for building UI components with live preview'
    },
    {
      src: '/api/placeholder/800/600',
      alt: '3D Scene Integration',
      title: 'Three.js Integration',
      description: '3D visualizations and interactive elements using Three.js'
    },
    {
      src: '/api/placeholder/800/600',
      alt: 'Performance Dashboard',
      title: 'Analytics Dashboard',
      description: 'Real-time engagement metrics showing 280% improvement'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <ProjectHeader project={project} />
      
      <main className="max-w-6xl mx-auto px-4 py-8 space-y-12">
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">🎯 Project Impact</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <FeatureCard 
              title="Development Efficiency" 
              description="Cut development time by 60% through real-time component assembly and live preview functionality."
            />
            <FeatureCard 
              title="User Engagement" 
              description="Boosted user engagement by 280% with interactive 3D elements and responsive design."
            />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-6">🚀 Key Features</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard 
              title="Real-time Assembly" 
              description="Live component building with instant visual feedback and code generation."
            />
            <FeatureCard 
              title="3D Visualizations" 
              description="Interactive Three.js scenes with smooth animations and user controls."
            />
            <FeatureCard 
              title="TypeScript Integration" 
              description="Fully typed components with IntelliSense support and error prevention."
            />
            <FeatureCard 
              title="Spline Integration" 
              description="Advanced 3D modeling and animation capabilities through Spline integration."
            />
            <FeatureCard 
              title="Responsive Design" 
              description="Mobile-first approach with seamless cross-device functionality."
            />
            <FeatureCard 
              title="Performance Optimized" 
              description="Lazy loading, code splitting, and optimized rendering for fast load times."
            />
          </div>
        </section>

        <Gallery images={images} title="📸 Interface Screenshots" />
        
        <TechStack technologies={project.technologies} />
        
        <LinksPanel links={links} />
      </main>
    </div>
  )
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-black/40 rounded-xl p-6 border border-white/10 hover:border-blue-500/30 transition-colors">
      <h3 className="font-semibold text-white mb-3">{title}</h3>
      <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
    </div>
  )
}