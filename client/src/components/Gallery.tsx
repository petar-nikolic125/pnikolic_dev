// src/components/Gallery.tsx
interface GalleryImage {
  src: string
  alt: string
  title: string
  description?: string
}

interface GalleryProps {
  images: GalleryImage[]
  title?: string
}

export default function Gallery({ images, title = "Gallery" }: GalleryProps) {
  if (!images.length) return null

  return (
    <section>
      <h2 className="text-2xl font-bold text-white mb-6">{title}</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {images.map((image, index) => (
          <div key={index} className="bg-black/40 rounded-xl p-4 border border-white/10 hover:border-blue-500/30 transition-colors">
            <img 
              src={image.src} 
              alt={image.alt}
              className="w-full aspect-video object-cover rounded-lg mb-3"
            />
            <h3 className="font-semibold text-white mb-2">{image.title}</h3>
            {image.description && (
              <p className="text-gray-400 text-sm">{image.description}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}