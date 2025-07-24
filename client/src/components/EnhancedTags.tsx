// src/components/EnhancedTags.tsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface EnhancedTagsProps {
  methodologies?: string[]
  paradigms?: string[]
  architecture?: string[]
  taglines?: string[]
}

export default function EnhancedTags({ methodologies, paradigms, architecture, taglines }: EnhancedTagsProps) {
  const [activeSection, setActiveSection] = useState<string | null>(null)

  const sections = [
    {
      id: 'methodologies',
      title: '🔬 Methodologies',
      items: methodologies || [],
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20',
      hoverColor: 'hover:border-blue-400/50'
    },
    {
      id: 'paradigms',
      title: '🧠 Programming Paradigms',
      items: paradigms || [],
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20',
      hoverColor: 'hover:border-purple-400/50'
    },
    {
      id: 'architecture',
      title: '🏗️ Architecture',
      items: architecture || [],
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20',
      hoverColor: 'hover:border-green-400/50'
    },
    {
      id: 'taglines',
      title: '✨ Key Features',
      items: taglines || [],
      color: 'from-amber-500 to-orange-500',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/20',
      hoverColor: 'hover:border-amber-400/50'
    }
  ].filter(section => section.items.length > 0)

  if (sections.length === 0) return null

  return (
    <section className="space-y-8">
      <h2 className="text-2xl font-bold text-white mb-6">🏷️ Technical Details</h2>
      
      <div className="grid gap-6 md:grid-cols-2">
        {sections.map((section, index) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`group ${section.bgColor} rounded-xl p-6 border ${section.borderColor} ${section.hoverColor} transition-all duration-300 cursor-pointer`}
            onClick={() => setActiveSection(activeSection === section.id ? null : section.id)}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">{section.title}</h3>
              <motion.div
                animate={{ rotate: activeSection === section.id ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-white/60"
              >
                ▼
              </motion.div>
            </div>
            
            <AnimatePresence>
              {activeSection === section.id ? (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-3"
                >
                  {section.items.map((item, i) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-center space-x-3"
                    >
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${section.color}`} />
                      <span className="text-gray-300 text-sm">{item}</span>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {section.items.slice(0, 2).map((item) => (
                    <span
                      key={item}
                      className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${section.color} text-white`}
                    >
                      {item}
                    </span>
                  ))}
                  {section.items.length > 2 && (
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white/60">
                      +{section.items.length - 2} more
                    </span>
                  )}
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  )
}