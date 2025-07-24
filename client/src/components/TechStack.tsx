// src/components/TechStack.tsx
interface TechStackProps {
  technologies: string[]
  title?: string
}

export default function TechStack({ technologies, title = "Technologies Used" }: TechStackProps) {
  return (
    <section>
      <h2 className="text-2xl font-bold text-white mb-6">{title}</h2>
      <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-4">
        {technologies.map((tech) => (
          <div key={tech} className="bg-black/40 rounded-lg p-4 border border-white/10 hover:border-blue-500/30 transition-colors">
            <span className="text-blue-300 font-medium">{tech}</span>
          </div>
        ))}
      </div>
    </section>
  )
}