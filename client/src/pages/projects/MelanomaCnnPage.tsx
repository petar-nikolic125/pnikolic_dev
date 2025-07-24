// src/pages/projects/MelanomaCnnPage.tsx
import ProjectHeader from '@/components/ProjectHeader'
import TechStack from '@/components/TechStack'
import Gallery from '@/components/Gallery'
import LinksPanel from '@/components/LinksPanel'
import { projects } from '@/data/portfolio'

export default function MelanomaCnnPage() {
  const project = projects.find(p => p.slug === 'melanoma-cnn')!

  const links = project.liveUrl ? [
    {
      url: project.liveUrl,
      label: 'Live Demo',
      type: 'live' as const,
      description: 'Interactive melanoma detection interface'
    }
  ] : []

  const images = [
    {
      src: '/api/placeholder/800/600',
      alt: 'CNN Architecture Diagram',
      title: 'Neural Network Architecture',
      description: 'Deep CNN architecture optimized for medical image classification'
    },
    {
      src: '/api/placeholder/800/600',
      alt: 'Training Results',
      title: 'Model Performance',
      description: 'Training curves showing 92% AUC achievement on ISIC-2018 dataset'
    },
    {
      src: '/api/placeholder/800/600',
      alt: 'Inference Interface',
      title: 'Real-time Inference',
      description: 'FastAPI interface for <45ms inference on RTX 3060'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <ProjectHeader project={project} />
      
      <main className="max-w-6xl mx-auto px-4 py-8 space-y-12">
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">🎯 Medical AI Impact</h2>
          <div className="bg-black/40 rounded-xl p-6 border border-white/10">
            <div className="space-y-4 text-gray-300">
              <p className="text-lg">
                Advanced deep learning model for early melanoma detection, achieving 92% AUC on the ISIC-2018 dataset 
                with real-time inference capabilities for clinical deployment.
              </p>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="text-center p-4 bg-green-600/10 rounded-lg border border-green-500/20">
                  <div className="text-2xl font-bold text-green-300">92%</div>
                  <div className="text-sm">AUC Score</div>
                </div>
                <div className="text-center p-4 bg-blue-600/10 rounded-lg border border-blue-500/20">
                  <div className="text-2xl font-bold text-blue-300">&lt;45ms</div>
                  <div className="text-sm">Inference Time</div>
                </div>
                <div className="text-center p-4 bg-purple-600/10 rounded-lg border border-purple-500/20">
                  <div className="text-2xl font-bold text-purple-300">ISIC-2018</div>
                  <div className="text-sm">Dataset</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-6">🧠 Model Architecture</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <FeatureCard 
              title="Convolutional Layers" 
              description="Deep CNN architecture with residual connections and batch normalization for robust feature extraction from dermatoscopic images."
            />
            <FeatureCard 
              title="Data Augmentation" 
              description="Comprehensive augmentation pipeline including rotation, scaling, color jittering, and elastic deformation for improved generalization."
            />
            <FeatureCard 
              title="Transfer Learning" 
              description="Pre-trained backbone fine-tuned on medical imaging data with domain-specific optimization for melanoma detection."
            />
            <FeatureCard 
              title="Inference Optimization" 
              description="Model quantization and TensorRT optimization achieving sub-45ms inference times on RTX 3060 hardware."
            />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-6">📊 Performance Metrics</h2>
          <div className="bg-black/40 rounded-xl p-6 border border-white/10">
            <div className="overflow-x-auto">
              <table className="w-full text-gray-300">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left py-3 px-4 text-blue-300">Metric</th>
                    <th className="text-left py-3 px-4 text-blue-300">Value</th>
                    <th className="text-left py-3 px-4 text-blue-300">Benchmark</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/10">
                    <td className="py-3 px-4">AUC Score</td>
                    <td className="py-3 px-4 font-mono text-green-300">0.92</td>
                    <td className="py-3 px-4 text-sm">ISIC-2018 Challenge</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-3 px-4">Sensitivity</td>
                    <td className="py-3 px-4 font-mono text-green-300">0.89</td>
                    <td className="py-3 px-4 text-sm">Clinical Threshold</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-3 px-4">Specificity</td>
                    <td className="py-3 px-4 font-mono text-green-300">0.94</td>
                    <td className="py-3 px-4 text-sm">False Positive Rate</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">Inference Time</td>
                    <td className="py-3 px-4 font-mono text-blue-300">42ms</td>
                    <td className="py-3 px-4 text-sm">RTX 3060 GPU</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <Gallery images={images} title="📸 Model Visualizations" />
        
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