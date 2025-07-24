// src/pages/projects/DataVisEnginePage.tsx
import ProjectHeader from '@/components/ProjectHeader'
import TechStack from '@/components/TechStack'
import Gallery from '@/components/Gallery'
import LinksPanel from '@/components/LinksPanel'
import { projects } from '@/data/portfolio'

export default function DataVisEnginePage() {
  const project = projects.find(p => p.slug === 'data-vis-engine')!

  const links = project.liveUrl ? [
    {
      url: project.liveUrl,
      label: 'Live Demo',
      type: 'live' as const,
      description: 'Interactive data visualization engine'
    }
  ] : []

  const images = [
    {
      src: '/api/placeholder/800/600',
      alt: 'Real-time Data Streaming',
      title: 'High-Performance Streaming',
      description: 'Visualization of 1M+ data points with <50ms latency'
    },
    {
      src: '/api/placeholder/800/600',
      alt: 'WebGL Rendering Pipeline',
      title: 'WebGL Optimization',
      description: 'Custom shaders and vertex buffer management for maximum performance'
    },
    {
      src: '/api/placeholder/800/600',
      alt: 'Interactive Dashboard',
      title: 'Dynamic Visualizations',
      description: 'Real-time charts and graphs with smooth animations'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <ProjectHeader project={project} />
      
      <main className="max-w-6xl mx-auto px-4 py-8 space-y-12">
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">⚡ Performance Breakthrough</h2>
          <div className="bg-black/40 rounded-xl p-6 border border-white/10">
            <div className="space-y-4 text-gray-300">
              <p className="text-lg">
                High-performance data visualization engine capable of streaming and rendering 
                1 million data points with sub-50ms latency using WebGL optimization.
              </p>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="text-center p-4 bg-blue-600/10 rounded-lg border border-blue-500/20">
                  <div className="text-2xl font-bold text-blue-300">1M+</div>
                  <div className="text-sm">Data Points</div>
                </div>
                <div className="text-center p-4 bg-green-600/10 rounded-lg border border-green-500/20">
                  <div className="text-2xl font-bold text-green-300">&lt;50ms</div>
                  <div className="text-sm">Latency</div>
                </div>
                <div className="text-center p-4 bg-purple-600/10 rounded-lg border border-purple-500/20">
                  <div className="text-2xl font-bold text-purple-300">60 FPS</div>
                  <div className="text-sm">Smooth Rendering</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-6">🚀 Engine Capabilities</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard 
              title="WebGL Acceleration" 
              description="Custom vertex and fragment shaders optimized for massive dataset rendering with hardware acceleration."
            />
            <FeatureCard 
              title="Real-time Streaming" 
              description="WebSocket-based data streaming with efficient buffer management and delta compression."
            />
            <FeatureCard 
              title="D3.js Integration" 
              description="Seamless integration with D3.js for complex data binding and transformation pipelines."
            />
            <FeatureCard 
              title="Canvas Optimization" 
              description="Dual-layer canvas system separating static and dynamic elements for optimal rendering performance."
            />
            <FeatureCard 
              title="Memory Management" 
              description="Efficient memory pooling and garbage collection strategies for sustained high-performance operation."
            />
            <FeatureCard 
              title="Interactive Controls" 
              description="Zoom, pan, filter, and drill-down capabilities maintaining 60fps even with complex datasets."
            />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-6">🔧 Technical Architecture</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-black/40 rounded-xl p-6 border border-white/10">
              <h4 className="font-semibold text-white mb-4">Rendering Pipeline</h4>
              <div className="space-y-3 text-gray-300 text-sm">
                <p>• WebGL vertex buffer optimization</p>
                <p>• Custom shader programs for data visualization</p>
                <p>• Level-of-detail (LOD) rendering system</p>
                <p>• Hardware-accelerated transformations</p>
              </div>
            </div>
            
            <div className="bg-black/40 rounded-xl p-6 border border-white/10">
              <h4 className="font-semibold text-white mb-4">Data Processing</h4>
              <div className="space-y-3 text-gray-300 text-sm">
                <p>• Streaming data ingestion via WebSocket</p>
                <p>• Real-time aggregation and filtering</p>
                <p>• Delta compression for bandwidth optimization</p>
                <p>• Adaptive sampling for large datasets</p>
              </div>
            </div>
            
            <div className="bg-black/40 rounded-xl p-6 border border-white/10">
              <h4 className="font-semibold text-white mb-4">Performance Optimization</h4>
              <div className="space-y-3 text-gray-300 text-sm">
                <p>• Object pooling for memory efficiency</p>
                <p>• Frustum culling for off-screen elements</p>
                <p>• Batch rendering to minimize draw calls</p>
                <p>• Progressive enhancement for device capabilities</p>
              </div>
            </div>
            
            <div className="bg-black/40 rounded-xl p-6 border border-white/10">
              <h4 className="font-semibold text-white mb-4">User Experience</h4>
              <div className="space-y-3 text-gray-300 text-sm">
                <p>• Responsive interaction without frame drops</p>
                <p>• Contextual tooltips and data exploration</p>
                <p>• Keyboard and mouse navigation support</p>
                <p>• Accessibility features for screen readers</p>
              </div>
            </div>
          </div>
        </section>

        {/* Performance Benchmarks */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">📊 Performance Benchmarks</h2>
          <div className="bg-black/40 rounded-xl p-6 border border-white/10">
            <div className="overflow-x-auto">
              <table className="w-full text-gray-300">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left py-3 px-4 text-blue-300">Metric</th>
                    <th className="text-left py-3 px-4 text-blue-300">Performance</th>
                    <th className="text-left py-3 px-4 text-blue-300">Benchmark</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/10">
                    <td className="py-3 px-4">Data Points</td>
                    <td className="py-3 px-4 font-mono text-green-300">1,000,000+</td>
                    <td className="py-3 px-4 text-sm">Simultaneous rendering</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-3 px-4">Latency</td>
                    <td className="py-3 px-4 font-mono text-green-300">42ms</td>
                    <td className="py-3 px-4 text-sm">End-to-end streaming</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-3 px-4">Frame Rate</td>
                    <td className="py-3 px-4 font-mono text-green-300">60 FPS</td>
                    <td className="py-3 px-4 text-sm">Sustained during interaction</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">Memory Usage</td>
                    <td className="py-3 px-4 font-mono text-blue-300">~256MB</td>
                    <td className="py-3 px-4 text-sm">1M points + interaction state</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <Gallery images={images} title="📸 Engine Demonstrations" />
        
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