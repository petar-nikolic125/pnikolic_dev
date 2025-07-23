import { useEffect, useState } from 'react'
import { useRoute } from 'wouter'
import { Link } from 'wouter'
import { ArrowLeft, ExternalLink, Github, FileText } from 'lucide-react'
import { projects, type Project } from '@/data/portfolio'

export default function ProjectDetail() {
  const [, params] = useRoute('/projects/:slugOrId')
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!params?.slugOrId) {
      setLoading(false)
      return
    }

    // Find project by slug or id
    const foundProject = projects.find(p => 
      p.slug === params.slugOrId || 
      p.id.toString() === params.slugOrId
    )

    setProject(foundProject || null)
    setLoading(false)
  }, [params?.slugOrId])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="animate-pulse text-white text-lg">Loading project...</div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Project Not Found</h1>
          <Link href="/projects/grid" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors">
            <ArrowLeft size={16} />
            Back to Projects
          </Link>
        </div>
      </div>
    )
  }

  // Special handling for multithreaded word finder
  const isWordFinder = project.slug === 'multithreaded-word-finder'

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
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

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {isWordFinder ? (
          <WordFinderContent />
        ) : (
          <DefaultProjectContent project={project} />
        )}
      </main>
    </div>
  )
}

function WordFinderContent() {
  return (
    <div className="space-y-8">
      {/* Key Features */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          ✨ Key Selling Points
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          <FeatureCard 
            title="Concurrent Indexing" 
            description="Every index <file> spawns a detached worker that tokenises, normalises and inserts words into a lock-free hash-map (open addressing + linear probing) — no global mutexes, zero contention."
          />
          <FeatureCard 
            title="Context-aware Search" 
            description="search <word> streams matches ordered by descending term-frequency, then prints rich snippets (whole sentences) for instant relevance."
          />
          <FeatureCard 
            title="Censorship Pipeline" 
            description="At start-up you may pass a stop-list; all black-listed tokens and their sentences are skipped at both index and query time."
          />
          <FeatureCard 
            title="Elastic Hash-map Core" 
            description="Custom bucket array auto-resizes @ 0.75 load-factor; each slot stores a word plus a dynamically-grown vector of <file, occurrence-count, contexts[]>."
          />
          <FeatureCard 
            title="CLI Micro-shell" 
            description="Minimal REPL exposes index_, search_, clean_, stop_. Unknown commands yield actionable hints."
          />
          <FeatureCard 
            title="ANSI UX" 
            description="Colour-coded prompts, progress ticks and result highlights for first-class terminal experience (demo GIF below)."
          />
          <FeatureCard 
            title="Portable Build" 
            description="Single-file Makefile; depends only on glibc & pthread. Runs on Ubuntu, Arch, Alpine, WSL — anywhere POSIX is near."
          />
        </div>
      </section>

      {/* Architecture */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          🏗️ Architecture at a Glance
        </h2>
        <div className="bg-black/40 rounded-xl p-6 border border-white/10">
          <div className="space-y-4 text-gray-300">
            <p>The system uses a thread-pool architecture where the main CLI thread manages user interaction while worker threads handle file processing concurrently.</p>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="font-semibold text-white mb-2">Thread Pool</h4>
                <p className="text-sm">Dynamically managed worker threads for file indexing operations</p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">Hash-Map</h4>
                <p className="text-sm">Lock-free data structure with open addressing for concurrent read-only access</p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">CLI Interface</h4>
                <p className="text-sm">Interactive REPL with command processing and result formatting</p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">File Processing</h4>
                <p className="text-sm">Concurrent tokenization and normalization with stop-word filtering</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Screenshots */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-6">📸 Screenshots</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-black/40 rounded-xl p-4 border border-white/10">
            <img 
              src="/api/placeholder/600/400" 
              alt="Multithreaded Word Finder - Key Selling Points"
              className="w-full rounded-lg mb-3"
            />
            <h3 className="font-semibold text-white mb-2">Key Features Overview</h3>
            <p className="text-gray-400 text-sm">Detailed breakdown of the system capabilities including concurrent indexing, context-aware search, and elastic hash-map core.</p>
          </div>
          
          <div className="bg-black/40 rounded-xl p-4 border border-white/10">
            <img 
              src="/api/placeholder/600/400" 
              alt="Multithreaded Word Finder - Architecture Diagram"
              className="w-full rounded-lg mb-3"
            />
            <h3 className="font-semibold text-white mb-2">System Architecture</h3>
            <p className="text-gray-400 text-sm">Visual representation of the thread-pool architecture, showing CLI interface, worker threads, and hash-map interactions.</p>
          </div>
        </div>
      </section>

      {/* Technical Details */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-6">🔧 Technical Implementation</h2>
        <div className="bg-black/40 rounded-xl p-6 border border-white/10">
          <div className="space-y-4 text-gray-300">
            <div>
              <h4 className="font-semibold text-white mb-2">Lock-free Hash Map</h4>
              <p className="text-sm">Custom implementation using open addressing with linear probing. Auto-resizing at 0.75 load factor ensures optimal performance while maintaining thread safety through careful memory ordering.</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">Multithreading Strategy</h4>
              <p className="text-sm">Each file indexing operation spawns a detached worker thread. The main thread handles CLI interactions while workers process files concurrently, updating the shared hash map without locks.</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">Memory Management</h4>
              <p className="text-sm">Dynamic memory allocation for word storage and context vectors. Careful cleanup ensures no memory leaks even with concurrent operations.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function DefaultProjectContent({ project }: { project: Project }) {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold text-white mb-6">About This Project</h2>
        <div className="bg-black/40 rounded-xl p-6 border border-white/10">
          <p className="text-gray-300 leading-relaxed">{project.description}</p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-6">Technologies Used</h2>
        <div className="grid gap-3 md:grid-cols-3">
          {project.technologies.map((tech) => (
            <div key={tech} className="bg-black/40 rounded-lg p-4 border border-white/10">
              <span className="text-blue-300 font-medium">{tech}</span>
            </div>
          ))}
        </div>
      </section>
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