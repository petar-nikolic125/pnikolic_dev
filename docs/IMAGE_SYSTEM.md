# 🖼️ Modular Image System

This project uses a fully modular, scalable image system that makes adding images to any project page super easy and reliable.

## 📁 Folder Structure

```
public/
└── projects/
    ├── shared-memory-kernel/
    │   ├── shared_memory_png.png
    │   └── stresstest.png
    └── multithreaded-word-finder/
        └── osword.png
```

## 🚀 Quick Start

### Adding Images (3 Ways)

#### 1. **Command Line Tool** (Easiest)
```bash
# Add an image from anywhere
node scripts/add-image.js shared-memory-kernel screenshot.png

# Add with custom name
node scripts/add-image.js my-project diagram.png architecture.png

# List all existing images
node scripts/add-image.js list
```

#### 2. **Manual Copy**
```bash
# Just copy to the right folder
cp my-image.png public/projects/my-project-slug/
```

#### 3. **Drag & Drop**
Drop images directly into `public/projects/[your-project-slug]/` in the file explorer.

### Using Images in Components

#### Simple Usage
```tsx
import { useProjectImages } from '@/hooks/useProjectImages'

function MyProjectPage() {
  const { image, path } = useProjectImages('my-project-slug')
  
  // Method 1: Full image object
  const heroImage = image('hero.png', 'Hero screenshot', 'Main Interface')
  
  // Method 2: Just the path
  return <img src={path('logo.png')} alt="Logo" />
}
```

#### Gallery Usage
```tsx
function MyProjectPage() {
  const { images } = useProjectImages('my-project-slug')
  
  const galleryImages = images([
    {
      name: 'screenshot1.png',
      alt: 'First screenshot',
      title: 'Main Dashboard',
      description: 'Overview of the main interface'
    },
    {
      name: 'screenshot2.png', 
      alt: 'Second screenshot',
      title: 'Settings Panel'
    }
  ])
  
  return <Gallery images={galleryImages} title="Screenshots" />
}
```

## 🛠️ Technical Details

### Express Static Serving
Images are served by Express middleware:
```typescript
// In server/index.ts
app.use(express.static(path.join(import.meta.dirname, '..', 'public')));
```

### URL Pattern
All images follow this pattern:
```
/projects/[project-slug]/[image-name]
```

### TypeScript Support
The system includes full TypeScript support with:
- `ProjectImage` interface
- `useProjectImages` hook
- `ProjectImage` component with loading states
- `ProjectImageGrid` for multiple images

## 📋 Management Commands

```bash
# List all images
node scripts/add-image.js list

# Add image (auto-detected from attached_assets or current directory)
node scripts/add-image.js my-project my-image.png

# Add with custom name
node scripts/add-image.js my-project source.png target.png
```

## ✨ Features

- **Zero Configuration**: Works in development and production
- **No Imports**: Uses root-absolute paths, no webpack imports
- **Type Safe**: Full TypeScript support
- **Error Handling**: Graceful fallbacks for missing images
- **Loading States**: Built-in loading indicators
- **Scalable**: Add any number of projects and images

## 🎯 Benefits

1. **Convenience**: Dead simple to add new images
2. **Reliability**: No more broken image links
3. **Performance**: Served efficiently by Express
4. **Maintainability**: Clear organization by project
5. **Developer Experience**: Type safety + helpful utilities

## 📝 Examples

### Before (Old System)
```tsx
// ❌ Fragile, hard to manage
const images = [
  { src: '/attached_assets/image_1753308651728.png', alt: '...' }
]
```

### After (New System)
```tsx
// ✅ Clean, maintainable, type-safe
const { images } = useProjectImages('my-project')
const galleryImages = images([
  { name: 'hero.png', alt: 'Hero image', title: 'Main Interface' }
])
```

That's it! The system handles everything else automatically.