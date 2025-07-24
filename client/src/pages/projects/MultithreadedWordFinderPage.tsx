// src/pages/projects/MultithreadedWordFinderPage.tsx
import ProjectHeader from '@/components/ProjectHeader'
import TechStack from '@/components/TechStack'
import Gallery from '@/components/Gallery'
import LinksPanel from '@/components/LinksPanel'
import { projects } from '@/data/portfolio'

export default function MultithreadedWordFinderPage() {
  const project = projects.find(p => p.slug === 'multithreaded-word-finder')!
  
  // Update the GitHub URL to the correct one
  const projectWithCorrectUrl = {
    ...project,
    sourceUrl: 'https://github.com/petar-nikolic125/Multithreaded-Word-Finder'
  }

  const links = [
    {
      url: 'https://github.com/petar-nikolic125/Multithreaded-Word-Finder',
      label: 'Source Code',
      type: 'github' as const,
      description: 'Complete implementation with Makefile and documentation'
    }
  ]

  const images = [
    {
      src: '/api/placeholder/800/600',
      alt: 'CLI Interface in Action',
      title: 'Interactive CLI Interface',
      description: 'ANSI-colored terminal interface with real-time indexing progress and search results'
    },
    {
      src: '/api/placeholder/800/600', 
      alt: 'Architecture Diagram',
      title: 'System Architecture',
      description: 'Thread pool architecture with lock-free hash map and concurrent file processing'
    },
    {
      src: '/api/placeholder/800/600',
      alt: 'Performance Benchmarks',
      title: 'Performance Analysis',
      description: 'Concurrent indexing performance vs single-threaded baseline'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <ProjectHeader project={projectWithCorrectUrl} />
      
      <main className="max-w-6xl mx-auto px-4 py-8 space-y-12">
        {/* Key Features */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            ✨ Key Features
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
              description="Colour-coded prompts, progress ticks and result highlights for first-class terminal experience."
            />
          </div>
        </section>

        {/* Architecture */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            🏗️ Architecture Overview
          </h2>
          <div className="bg-black/40 rounded-xl p-6 border border-white/10">
            <div className="space-y-6 text-gray-300">
              <p className="text-lg">The system uses a thread-pool architecture where the main CLI thread manages user interaction while worker threads handle file processing concurrently.</p>
              
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-3">
                  <h4 className="font-semibold text-white text-lg">Core Components</h4>
                  <div className="space-y-2">
                    <div>
                      <span className="font-medium text-blue-300">Thread Pool:</span>
                      <p className="text-sm">Dynamically managed worker threads for file indexing operations</p>
                    </div>
                    <div>
                      <span className="font-medium text-blue-300">Hash Map:</span>
                      <p className="text-sm">Lock-free data structure with open addressing for concurrent read-only access</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-white text-lg">Processing Pipeline</h4>
                  <div className="space-y-2">
                    <div>
                      <span className="font-medium text-blue-300">CLI Interface:</span>
                      <p className="text-sm">Interactive REPL with command processing and result formatting</p>
                    </div>
                    <div>
                      <span className="font-medium text-blue-300">File Processing:</span>
                      <p className="text-sm">Concurrent tokenization and normalization with stop-word filtering</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Implementation */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">🔧 Technical Implementation</h2>
          <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
            <div className="bg-black/40 rounded-xl p-6 border border-white/10">
              <h4 className="font-semibold text-white mb-4 text-lg">Lock-free Hash Map</h4>
              <div className="space-y-3 text-gray-300 text-sm">
                <p>• Custom implementation using open addressing with linear probing</p>
                <p>• Auto-resizing at 0.75 load factor for optimal performance</p>
                <p>• Thread safety through careful memory ordering without locks</p>
                <p>• Dynamic growth with rehashing for scalability</p>
              </div>
            </div>
            
            <div className="bg-black/40 rounded-xl p-6 border border-white/10">
              <h4 className="font-semibold text-white mb-4 text-lg">Multithreading Strategy</h4>
              <div className="space-y-3 text-gray-300 text-sm">
                <p>• Detached worker threads for each file indexing operation</p>
                <p>• Main thread handles CLI interactions non-blocking</p>
                <p>• Workers update shared hash map concurrently</p>
                <p>• No global mutexes - zero contention design</p>
              </div>
            </div>
            
            <div className="bg-black/40 rounded-xl p-6 border border-white/10">
              <h4 className="font-semibold text-white mb-4 text-lg">Memory Management</h4>
              <div className="space-y-3 text-gray-300 text-sm">
                <p>• Dynamic allocation for word storage and context vectors</p>
                <p>• Careful cleanup ensures no memory leaks</p>
                <p>• Efficient string handling with minimal copying</p>
                <p>• Resource management for concurrent operations</p>
              </div>
            </div>
            
            <div className="bg-black/40 rounded-xl p-6 border border-white/10">
              <h4 className="font-semibold text-white mb-4 text-lg">Performance Features</h4>
              <div className="space-y-3 text-gray-300 text-sm">
                <p>• Context-aware search with relevance ranking</p>
                <p>• Term frequency optimization for faster queries</p>
                <p>• ANSI color output for enhanced user experience</p>
                <p>• Portable build system with minimal dependencies</p>
              </div>
            </div>
          </div>
        </section>

        <Gallery images={images} title="📸 Screenshots & Diagrams" />
        
        <TechStack technologies={project.technologies} />
        
        <LinksPanel links={links} />
      </main>
    </div>
  )
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-black/40 rounded-xl p-6 border border-white/10 hover:border-blue-500/30 transition-colors">
      <h3 className="font-semibold text-white mb-3 text-lg">{title}</h3>
      <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
    </div>
  )
}