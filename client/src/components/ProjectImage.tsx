/**
 * Enhanced image component for project images with loading states and error handling
 */
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface ProjectImageProps {
  src: string;
  alt: string;
  title?: string;
  description?: string;
  className?: string;
  showTitle?: boolean;
  showDescription?: boolean;
  loading?: 'lazy' | 'eager';
}

export default function ProjectImage({
  src,
  alt,
  title,
  description,
  className,
  showTitle = false,
  showDescription = false,
  loading = 'lazy'
}: ProjectImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => setIsLoading(false);
  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  if (hasError) {
    return (
      <div className={cn(
        "flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 p-8",
        className
      )}>
        <div className="text-center text-gray-500 dark:text-gray-400">
          <div className="text-2xl mb-2">🖼️</div>
          <p className="text-sm">Image not found</p>
          <p className="text-xs opacity-60">{src}</p>
        </div>
      </div>
    );
  }

  return (
    <figure className={cn("space-y-2", className)}>
      <div className="relative overflow-hidden rounded-lg">
        {isLoading && (
          <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-lg" />
        )}
        <img
          src={src}
          alt={alt}
          title={title}
          loading={loading}
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            "w-full h-auto transition-opacity duration-300",
            isLoading ? "opacity-0" : "opacity-100"
          )}
        />
      </div>
      
      {(showTitle && title) && (
        <figcaption className="font-medium text-gray-900 dark:text-gray-100">
          {title}
        </figcaption>
      )}
      
      {(showDescription && description) && (
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {description}
        </p>
      )}
    </figure>
  );
}

/**
 * Grid component for displaying multiple project images
 */
interface ProjectImageGridProps {
  images: Array<{
    src: string;
    alt: string;
    title?: string;
    description?: string;
  }>;
  columns?: 1 | 2 | 3 | 4;
  gap?: 2 | 4 | 6 | 8;
  showTitles?: boolean;
  showDescriptions?: boolean;
  className?: string;
}

export function ProjectImageGrid({
  images,
  columns = 2,
  gap = 6,
  showTitles = true,
  showDescriptions = true,
  className
}: ProjectImageGridProps) {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  }[columns];

  const gridGap = {
    2: 'gap-2',
    4: 'gap-4',
    6: 'gap-6',
    8: 'gap-8'
  }[gap];

  return (
    <div className={cn("grid", gridCols, gridGap, className)}>
      {images.map((image, index) => (
        <ProjectImage
          key={index}
          {...image}
          showTitle={showTitles}
          showDescription={showDescriptions}
        />
      ))}
    </div>
  );
}