// src/pages/projects/PsychotherapistSchedulerPage.tsx
import ProjectHeader from '@/components/ProjectHeader'
import TechStack from '@/components/TechStack'
import Gallery from '@/components/Gallery'
import LinksPanel from '@/components/LinksPanel'
import EnhancedTags from '@/components/EnhancedTags'
import GradientCard, { MetricCard } from '@/components/GradientCard'
import { projects } from '@/data/portfolio'

export default function PsychotherapistSchedulerPage() {
  const project = projects.find(p => p.slug === 'psychotherapist-scheduler')!

  const links = project.liveUrl ? [
    {
      url: project.liveUrl,
      label: 'Live Demo',
      type: 'live' as const,
      description: 'HIPAA-ready desktop application'
    }
  ] : []

  const images = [
    {
      src: '/api/placeholder/800/600',
      alt: 'Desktop Application Interface',
      title: 'JavaFX Desktop Interface',
      description: 'Clean, professional interface designed for healthcare environments'
    },
    {
      src: '/api/placeholder/800/600',
      alt: 'Database Architecture',
      title: 'Database Schema',
      description: 'MySQL/PostgreSQL schema optimized for concurrent booking operations'
    },
    {
      src: '/api/placeholder/800/600',
      alt: 'Load Testing Results',
      title: 'Scalability Testing',
      description: 'Performance metrics showing 10k concurrent booking capacity'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <ProjectHeader project={project} />
      
      <main className="max-w-6xl mx-auto px-4 py-8 space-y-12">
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">🏥 Healthcare Solution</h2>
          <div className="bg-black/40 rounded-xl p-6 border border-white/10">
            <div className="space-y-4 text-gray-300">
              <p className="text-lg">
                Enterprise-grade scheduling application designed for psychotherapy practices, 
                handling 10,000 concurrent bookings with HIPAA-compliant data protection.
              </p>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="text-center p-4 bg-blue-600/10 rounded-lg border border-blue-500/20">
                  <div className="text-2xl font-bold text-blue-300">10k</div>
                  <div className="text-sm">Concurrent Bookings</div>
                </div>
                <div className="text-center p-4 bg-green-600/10 rounded-lg border border-green-500/20">
                  <div className="text-2xl font-bold text-green-300">HIPAA</div>
                  <div className="text-sm">Compliant</div>
                </div>
                <div className="text-center p-4 bg-purple-600/10 rounded-lg border border-purple-500/20">
                  <div className="text-2xl font-bold text-purple-300">24/7</div>
                  <div className="text-sm">Availability</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-6">⚙️ Enterprise Features</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard 
              title="Concurrent Booking Engine" 
              description="Handles 10,000 simultaneous booking requests with optimized database transactions and connection pooling."
            />
            <FeatureCard 
              title="HIPAA Compliance" 
              description="End-to-end encryption, audit logging, and access controls meeting healthcare data protection standards."
            />
            <FeatureCard 
              title="Multi-Database Support" 
              description="Supports both MySQL and PostgreSQL with PL/pgSQL stored procedures for complex scheduling logic."
            />
            <FeatureCard 
              title="Desktop Application" 
              description="JavaFX-based desktop client optimized for clinical environments with offline capabilities."
            />
            <FeatureCard 
              title="Real-time Updates" 
              description="Live synchronization across multiple client instances with conflict resolution algorithms."
            />
            <FeatureCard 
              title="Advanced Scheduling" 
              description="Recurring appointments, waitlists, automated reminders, and resource conflict detection."
            />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-6">🛠️ Technical Architecture</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-black/40 rounded-xl p-6 border border-white/10">
              <h4 className="font-semibold text-white mb-4">Database Layer</h4>
              <div className="space-y-3 text-gray-300 text-sm">
                <p>• Connection pooling for high concurrent access</p>
                <p>• Stored procedures for complex scheduling logic</p>
                <p>• Transaction isolation for data consistency</p>
                <p>• Automated backup and recovery systems</p>
              </div>
            </div>
            
            <div className="bg-black/40 rounded-xl p-6 border border-white/10">
              <h4 className="font-semibold text-white mb-4">Application Layer</h4>
              <div className="space-y-3 text-gray-300 text-sm">
                <p>• JavaFX for cross-platform desktop deployment</p>
                <p>• MVC architecture with clean separation</p>
                <p>• Dependency injection for testability</p>
                <p>• Comprehensive unit and integration testing</p>
              </div>
            </div>
            
            <div className="bg-black/40 rounded-xl p-6 border border-white/10">
              <h4 className="font-semibold text-white mb-4">Security Features</h4>
              <div className="space-y-3 text-gray-300 text-sm">
                <p>• AES-256 encryption for sensitive data</p>
                <p>• Role-based access control (RBAC)</p>
                <p>• Comprehensive audit trail logging</p>
                <p>• Secure authentication and session management</p>
              </div>
            </div>
            
            <div className="bg-black/40 rounded-xl p-6 border border-white/10">
              <h4 className="font-semibold text-white mb-4">Performance Optimization</h4>
              <div className="space-y-3 text-gray-300 text-sm">
                <p>• Database query optimization and indexing</p>
                <p>• Caching layer for frequently accessed data</p>
                <p>• Asynchronous processing for non-blocking operations</p>
                <p>• Load testing validated up to 10k concurrent users</p>
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

        <Gallery images={images} title="📸 Application Screenshots" />
        
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