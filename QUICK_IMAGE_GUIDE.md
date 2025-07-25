# 🖼️ Quick Image Guide - Super Simple

## How to Add Images (Pick Your Style)

### Option 1: Command Line (Easiest)
```bash
# Add any image instantly
node scripts/add-image.js my-project-slug screenshot.png

# Example:
node scripts/add-image.js shared-memory-kernel new-diagram.png
```

### Option 2: Drag & Drop
1. Open `public/projects/[your-project-slug]/` folder
2. Drop your image file there
3. Done!

### Option 3: Copy Command
```bash
cp your-image.png public/projects/your-project-slug/
```

## How to Use Images in Code

### Super Simple Method (Recommended)
```tsx
import { useProjectImages } from '@/hooks/useProjectImages'

function YourProjectPage() {
  const { path } = useProjectImages('your-project-slug')
  
  // Just use the path directly
  return (
    <img src={path('your-image.png')} alt="Description" />
  )
}
```

### For Gallery (Multiple Images)
```tsx
function YourProjectPage() {
  const { images } = useProjectImages('your-project-slug')
  
  const pics = images([
    { name: 'screenshot1.png', alt: 'Screenshot', title: 'Main View' },
    { name: 'screenshot2.png', alt: 'Settings', title: 'Settings Panel' }
  ])
  
  return <Gallery images={pics} title="Screenshots" />
}
```

### Enhanced Image with Loading & Error Handling
```tsx
import ProjectImage from '@/components/ProjectImage'

function YourProjectPage() {
  const { path } = useProjectImages('your-project-slug')
  
  return (
    <ProjectImage 
      src={path('hero.png')} 
      alt="Hero image"
      title="Main Interface"
      showTitle={true}
    />
  )
}
```

## What I Built For You

1. **CLI Tool**: `scripts/add-image.js` - Copies images to right folders
2. **TypeScript Hook**: `useProjectImages()` - Generates correct paths
3. **Smart Components**: `ProjectImage` with loading states and error handling
4. **Express Middleware**: Serves all images from `/projects/[slug]/[image]`

## Current Images
```
📁 shared-memory-kernel/
   - shared_memory_png.png
   - stresstest.png

📁 multithreaded-word-finder/
   - osword.png
```

## Examples from Your Current Code

**SharedMemoryKernelPage.tsx**:
```tsx
const { image, images } = useProjectImages('shared-memory-kernel')

// Single image
const stressImg = image('stresstest.png', 'Stress test output', 'Stress Test Results')

// Gallery
const pics = images([
  { name: 'shared_memory_png.png', alt: 'Architecture', title: 'System Flow' }
])
```

**MultithreadedWordFinderPage.tsx**:
```tsx
const { images } = useProjectImages('multithreaded-word-finder')

const pics = images([
  { name: 'osword.png', alt: 'CLI Interface', title: 'Terminal Output' }
])
```

That's it! The system handles everything else automatically.