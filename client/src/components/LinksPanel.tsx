// src/components/LinksPanel.tsx
import { ExternalLink, Github, FileText, Globe } from 'lucide-react'

interface LinkItem {
  url: string
  label: string
  type: 'github' | 'live' | 'docs' | 'external'
  description?: string
}

interface LinksPanelProps {
  links: LinkItem[]
  title?: string
}

export default function LinksPanel({ links, title = "Project Links" }: LinksPanelProps) {
  if (!links.length) return null

  const getIcon = (type: string) => {
    switch (type) {
      case 'github': return <Github size={20} />
      case 'live': return <ExternalLink size={20} />
      case 'docs': return <FileText size={20} />
      default: return <Globe size={20} />
    }
  }

  const getButtonStyle = (type: string) => {
    switch (type) {
      case 'github': 
        return "bg-gray-700 hover:bg-gray-600 text-white"
      case 'live': 
        return "bg-blue-600 hover:bg-blue-700 text-white"
      case 'docs': 
        return "bg-green-600 hover:bg-green-700 text-white"
      default: 
        return "bg-purple-600 hover:bg-purple-700 text-white"
    }
  }

  return (
    <section>
      <h2 className="text-2xl font-bold text-white mb-6">{title}</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {links.map((link, index) => (
          <a 
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-3 px-6 py-4 rounded-lg transition-colors ${getButtonStyle(link.type)}`}
          >
            {getIcon(link.type)}
            <div>
              <div className="font-medium">{link.label}</div>
              {link.description && (
                <div className="text-sm opacity-80">{link.description}</div>
              )}
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}