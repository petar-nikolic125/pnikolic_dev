// src/pages/projects/PortfolioExplainerPage.tsx
import ProjectHeader from '@/components/ProjectHeader'
import TechStack from '@/components/TechStack'
import Gallery from '@/components/Gallery'
import LinksPanel from '@/components/LinksPanel'
import EnhancedTags from '@/components/EnhancedTags'
import GradientCard, { MetricCard } from '@/components/GradientCard'
import { projects } from '@/data/portfolio'

export default function PortfolioExplainerPage() {
  const project = projects.find(p => p.slug === 'portfolio-explainer')!

  const links = project.liveUrl ? [
    {
      url: project.liveUrl,
      label: 'Live Demo',
      type: 'live' as const,
      description: 'Interactive portfolio animation showcase'
    }
  ] : []

  const images = [
    {
      src: '/api/placeholder/800/600',
      alt: 'Three.js Scene Animation',
      title: '3D Scene Transitions',
      description: 'Smooth three-scene animation with GSAP timeline controls'
    },
    {
      src: '/api/placeholder/800/600',
      alt: 'Client Onboarding Flow',
      title: 'Streamlined Onboarding',
      description: 'Visual workflow demonstrating 60% reduction in onboarding time'
    },
    {
      src: '/api/placeholder/800/600',
      alt: 'Performance Analytics',
      title: 'Engagement Metrics',
      description: 'User interaction analytics and completion rate improvements'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <ProjectHeader project={project} />
      
      <main className="max-w-6xl mx-auto px-4 py-8 space-y-12">
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">🎨 Creative Impact</h2>
          <div className="bg-black/40 rounded-xl p-6 border border-white/10">
            <div className="space-y-4 text-gray-300">
              <p className="text-lg">
                An innovative three-scene CSS/JavaScript animation that revolutionized client onboarding, 
                reducing time-to-understanding by 60% through engaging visual storytelling.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="text-center p-4 bg-green-600/10 rounded-lg border border-green-500/20">
                  <div className="text-2xl font-bold text-green-300">-60%</div>
                  <div className="text-sm">Onboarding Time</div>
                </div>
                <div className="text-center p-4 bg-blue-600/10 rounded-lg border border-blue-500/20">
                  <div className="text-2xl font-bold text-blue-300">3 Scenes</div>
                  <div className="text-sm">Interactive Stages</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-6">🎬 Animation Features</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard 
              title="Three-Scene Narrative" 
              description="Carefully crafted three-part visual story that guides users through portfolio understanding progressively."
            />
            <FeatureCard 
              title="GSAP Timeline" 
              description="Advanced timeline animations with precise timing controls and smooth easing functions for professional motion."
            />
            <FeatureCard 
              title="Three.js Integration" 
              description="3D elements and particle systems that enhance the visual experience without overwhelming the narrative."
            />
            <FeatureCard 
              title="Interactive Controls" 
              description="User-controlled pacing with play/pause, skip, and replay functionality for optimal user experience."
            />
            <FeatureCard 
              title="Performance Optimized" 
              description="Efficient rendering with requestAnimationFrame and hardware acceleration for smooth 60fps animations."
            />
            <FeatureCard 
              title="Responsive Design" 
              description="Adaptive animations that work seamlessly across desktop, tablet, and mobile devices."
            />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-6">🔧 Technical Implementation</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-black/40 rounded-xl p-6 border border-white/10">
              <h4 className="font-semibold text-white mb-4">Animation Architecture</h4>
              <div className="space-y-3 text-gray-300 text-sm">
                <p>• GSAP timeline system for coordinated animations</p>
                <p>• CSS3 transforms with hardware acceleration</p>
                <p>• Three.js scene management and rendering</p>
                <p>• Custom easing functions for natural motion</p>
              </div>
            </div>
            
            <div className="bg-black/40 rounded-xl p-6 border border-white/10">
              <h4 className="font-semibold text-white mb-4">User Experience</h4>
              <div className="space-y-3 text-gray-300 text-sm">
                <p>• Progressive disclosure of information</p>
                <p>• Visual hierarchy through motion design</p>
                <p>• Accessibility considerations for motion sensitivity</p>
                <p>• Analytics integration for engagement tracking</p>
              </div>
            </div>
            
            <div className="bg-black/40 rounded-xl p-6 border border-white/10">
              <h4 className="font-semibold text-white mb-4">Performance Features</h4>
              <div className="space-y-3 text-gray-300 text-sm">
                <p>• WebGL rendering for 3D elements</p>
                <p>• Lazy loading of animation assets</p>
                <p>• Memory management for smooth playback</p>
                <p>• Fallback animations for low-end devices</p>
              </div>
            </div>
            
            <div className="bg-black/40 rounded-xl p-6 border border-white/10">
              <h4 className="font-semibold text-white mb-4">Client Impact</h4>
              <div className="space-y-3 text-gray-300 text-sm">
                <p>• 60% reduction in client onboarding time</p>
                <p>• Improved portfolio comprehension rates</p>
                <p>• Enhanced client engagement and retention</p>
                <p>• Scalable template for future projects</p>
              </div>
            </div>
          </div>
        </section>

        <EnhancedTags 
          methodologies={project.methodologies}
          paradigms={project.paradigms}
          architecture={project.architecture}
          taglines={project.taglines}
        />

        <Gallery images={images} title="📸 Animation Showcase" />
        
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