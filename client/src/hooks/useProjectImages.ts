/**
 * Hook for managing project images with type safety
 */
import { useMemo } from 'react';

export interface ProjectImage {
  src: string;
  alt: string;
  title: string;
  description?: string;
}

/**
 * Generate image path for a project
 */
export function getProjectImagePath(projectSlug: string, imageName: string): string {
  return `/projects/${projectSlug}/${imageName}`;
}

/**
 * Create a project image object with proper typing
 */
export function createProjectImage(
  projectSlug: string, 
  imageName: string, 
  options: Omit<ProjectImage, 'src'>
): ProjectImage {
  return {
    src: getProjectImagePath(projectSlug, imageName),
    ...options
  };
}

/**
 * Hook to manage multiple images for a project
 */
export function useProjectImages(projectSlug: string) {
  return useMemo(() => ({
    // Helper to create image objects
    image: (imageName: string, alt: string, title: string, description?: string): ProjectImage => 
      createProjectImage(projectSlug, imageName, { alt, title, description }),
    
    // Helper to get just the path
    path: (imageName: string) => getProjectImagePath(projectSlug, imageName),
    
    // Batch create multiple images
    images: (imageConfigs: Array<{ name: string; alt: string; title: string; description?: string }>) =>
      imageConfigs.map(config => createProjectImage(projectSlug, config.name, {
        alt: config.alt,
        title: config.title,
        description: config.description
      }))
  }), [projectSlug]);
}