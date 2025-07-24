// src/pages/projects/SharedMemoryKernelPage.tsx
import ProjectHeader from '@/components/ProjectHeader'
import TechStack from '@/components/TechStack'
import Gallery from '@/components/Gallery'
import LinksPanel from '@/components/LinksPanel'
import { projects } from '@/data/portfolio'

export default function SharedMemoryKernelPage() {
  const project = projects.find(p => p.slug === 'shared-memory-kernel')!

  const links = [
    {
      url: project.sourceUrl || '#',
      label: 'Source Code',
      type: 'github' as const,
      description: 'Complete xv6 kernel module implementation'
    }
  ]

  const images = [
    {
      src: '/api/placeholder/800/600',
      alt: 'Memory Layout Diagram',
      title: 'Virtual Memory Layout',
      description: 'Shared memory segments in xv6 virtual address space'
    },
    {
      src: '/api/placeholder/800/600',
      alt: 'System Call Interface',
      title: 'System Call Implementation',
      description: 'Custom system calls for shared memory management'
    },
    {
      src: '/api/placeholder/800/600',
      alt: 'Performance Results',
      title: 'IPC Performance Gains',
      description: '+18% throughput improvement over standard xv6 IPC'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <ProjectHeader project={project} />
      
      <main className="max-w-6xl mx-auto px-4 py-8 space-y-12">
        {/* Project Overview */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">🎯 Project Overview</h2>
          <div className="bg-black/40 rounded-xl p-6 border border-white/10">
            <div className="space-y-4 text-gray-300">
              <p className="text-lg">
                A comprehensive shared memory implementation for the xv6 educational operating system, 
                providing System-V style shared memory with custom page fault handling.
              </p>
              <p>
                This kernel module extends xv6's capabilities by implementing efficient inter-process 
                communication through shared memory segments, resulting in an 18% improvement in IPC throughput.
              </p>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">⚙️ Key Features</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <FeatureCard 
              title="System-V Style SHM" 
              description="Complete implementation of shared memory semantics including shmget(), shmat(), shmdt(), and shmctl() system calls with proper permission handling."
            />
            <FeatureCard 
              title="Custom Page Fault Handler" 
              description="Optimized page fault handling for shared memory access with lazy allocation and copy-on-write optimization where applicable."
            />
            <FeatureCard 
              title="Memory Management" 
              description="Efficient virtual memory management with proper cleanup, reference counting, and automatic deallocation of unused segments."
            />
            <FeatureCard 
              title="IPC Performance" 
              description="18% throughput improvement over standard xv6 IPC mechanisms through optimized memory mapping and reduced system call overhead."
            />
          </div>
        </section>

        {/* Technical Implementation */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">🔧 Technical Implementation</h2>
          <div className="space-y-6">
            {/* System Calls Table */}
            <div className="bg-black/40 rounded-xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold text-white mb-4">System Call Interface</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-gray-300">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left py-3 px-4 text-blue-300">System Call</th>
                      <th className="text-left py-3 px-4 text-blue-300">Purpose</th>
                      <th className="text-left py-3 px-4 text-blue-300">Implementation Details</th>
                    </tr>
                  </thead>
                  <tbody className="space-y-2">
                    <tr className="border-b border-white/10">
                      <td className="py-3 px-4 font-mono text-green-300">shmget()</td>
                      <td className="py-3 px-4">Create/access shared memory segment</td>
                      <td className="py-3 px-4 text-sm">Key-based segment identification with size and permission validation</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3 px-4 font-mono text-green-300">shmat()</td>
                      <td className="py-3 px-4">Attach segment to process</td>
                      <td className="py-3 px-4 text-sm">Virtual memory mapping with address space integration</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3 px-4 font-mono text-green-300">shmdt()</td>
                      <td className="py-3 px-4">Detach segment from process</td>
                      <td className="py-3 px-4 text-sm">Clean detachment with reference count management</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-mono text-green-300">shmctl()</td>
                      <td className="py-3 px-4">Control segment properties</td>
                      <td className="py-3 px-4 text-sm">Segment info, removal, and permission modification</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Architecture Details */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="bg-black/40 rounded-xl p-6 border border-white/10">
                <h4 className="font-semibold text-white mb-4">Memory Architecture</h4>
                <div className="space-y-3 text-gray-300 text-sm">
                  <p>• Virtual memory integration with xv6 VM system</p>
                  <p>• Page-aligned shared memory segments</p>
                  <p>• Efficient virtual-to-physical address translation</p>
                  <p>• Process page table modifications for sharing</p>
                </div>
              </div>
              
              <div className="bg-black/40 rounded-xl p-6 border border-white/10">
                <h4 className="font-semibold text-white mb-4">Synchronization</h4>
                <div className="space-y-3 text-gray-300 text-sm">
                  <p>• Kernel-level locking for segment metadata</p>
                  <p>• Process synchronization through shared memory</p>
                  <p>• Reference counting for automatic cleanup</p>
                  <p>• Race condition prevention in system calls</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Performance Analysis */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">📊 Performance Analysis</h2>
          <div className="bg-black/40 rounded-xl p-6 border border-white/10">
            <div className="space-y-4 text-gray-300">
              <h3 className="text-lg font-semibold text-white">Benchmark Results</h3>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="text-center p-4 bg-blue-600/10 rounded-lg border border-blue-500/20">
                  <div className="text-2xl font-bold text-blue-300">+18%</div>
                  <div className="text-sm">IPC Throughput</div>
                </div>
                <div className="text-center p-4 bg-green-600/10 rounded-lg border border-green-500/20">
                  <div className="text-2xl font-bold text-green-300">-32%</div>
                  <div className="text-sm">System Call Overhead</div>
                </div>
                <div className="text-center p-4 bg-purple-600/10 rounded-lg border border-purple-500/20">
                  <div className="text-2xl font-bold text-purple-300">4KB</div>
                  <div className="text-sm">Minimum Segment Size</div>
                </div>
              </div>
              <p className="text-sm">
                Performance measured against standard xv6 pipe-based IPC using synthetic workloads 
                with varying data sizes and process counts.
              </p>
            </div>
          </div>
        </section>

        <Gallery images={images} title="📸 System Diagrams" />
        
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