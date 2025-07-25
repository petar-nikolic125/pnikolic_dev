/**
 * Ultra-simple image utilities for maximum convenience
 */

/**
 * Get image path for any project - shortest possible syntax
 * @param projectSlug - The project slug (e.g., 'shared-memory-kernel')
 * @param imageName - The image filename (e.g., 'screenshot.png')
 */
export function img(projectSlug: string, imageName: string): string {
  return `/projects/${projectSlug}/${imageName}`
}

/**
 * Create multiple image objects for galleries
 */
export function imgs(
  projectSlug: string, 
  imageConfigs: Array<{ name: string; alt: string; title: string; description?: string }>
) {
  return imageConfigs.map(config => ({
    src: img(projectSlug, config.name),
    alt: config.alt,
    title: config.title,
    description: config.description
  }))
}

/**
 * Quick image object creator
 */
export function imgObj(
  projectSlug: string,
  imageName: string,
  alt: string,
  title: string,
  description?: string
) {
  return {
    src: img(projectSlug, imageName),
    alt,
    title,
    description
  }
}