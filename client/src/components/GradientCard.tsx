// src/components/GradientCard.tsx
import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface GradientCardProps {
  children: ReactNode
  gradient?: string
  className?: string
  hover?: boolean
}

export default function GradientCard({ 
  children, 
  gradient = 'from-blue-500/20 to-purple-500/20',
  className = '',
  hover = true
}: GradientCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`
        relative overflow-hidden rounded-xl border border-white/10 
        bg-gradient-to-br ${gradient} backdrop-blur-sm
        ${hover ? 'hover:border-white/20 hover:scale-[1.02]' : ''} 
        transition-all duration-300 ${className}
      `}
    >
      <div className="relative z-10 p-6">
        {children}
      </div>
      
      {/* Animated border gradient */}
      <div className="absolute inset-0 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-[1px] rounded-xl bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      </div>
    </motion.div>
  )
}

export function MetricCard({ title, value, description, icon }: {
  title: string
  value: string
  description: string
  icon: string
}) {
  return (
    <GradientCard gradient="from-slate-800/50 to-slate-900/50" className="text-center">
      <div className="text-3xl mb-2">{icon}</div>
      <div className="text-2xl font-bold text-white mb-1">{value}</div>
      <div className="text-sm font-medium text-gray-300 mb-2">{title}</div>
      <div className="text-xs text-gray-400">{description}</div>
    </GradientCard>
  )
}