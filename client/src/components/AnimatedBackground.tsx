// src/components/AnimatedBackground.tsx
import { motion } from 'framer-motion'

interface AnimatedBackgroundProps {
  variant?: 'default' | 'ai' | 'systems' | 'web'
}

export default function AnimatedBackground({ variant = 'default' }: AnimatedBackgroundProps) {
  const gradients = {
    default: 'from-slate-900 via-blue-900 to-slate-900',
    ai: 'from-purple-900 via-pink-900 to-indigo-900',
    systems: 'from-gray-900 via-slate-800 to-gray-900',
    web: 'from-blue-900 via-cyan-900 to-teal-900'
  }

  return (
    <div className={`fixed inset-0 bg-gradient-to-br ${gradients[variant]} overflow-hidden pointer-events-none`}>
      {/* Animated particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            animate={{
              x: [0, Math.random() * 100, Math.random() * -100, 0],
              y: [0, Math.random() * 100, Math.random() * -100, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Animated mesh gradients */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            `radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
             radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
             radial-gradient(circle at 40% 40%, rgba(120, 200, 255, 0.3) 0%, transparent 50%)`,
            `radial-gradient(circle at 60% 20%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
             radial-gradient(circle at 20% 80%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
             radial-gradient(circle at 80% 60%, rgba(120, 200, 255, 0.3) 0%, transparent 50%)`,
            `radial-gradient(circle at 80% 60%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
             radial-gradient(circle at 40% 40%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
             radial-gradient(circle at 20% 80%, rgba(120, 200, 255, 0.3) 0%, transparent 50%)`
          ]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  )
}