#!/usr/bin/env node
/**
 * Image Management Utility
 * Usage: node scripts/add-image.js <project-slug> <image-file> [new-name]
 * Example: node scripts/add-image.js shared-memory-kernel diagram.png architecture.png
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

function addImage(projectSlug, sourceFile, targetName) {
  // Create project directory if it doesn't exist
  const projectDir = path.join(projectRoot, 'public', 'projects', projectSlug);
  if (!fs.existsSync(projectDir)) {
    fs.mkdirSync(projectDir, { recursive: true });
    console.log(`✓ Created directory: ${projectDir}`);
  }

  // Determine source path
  let sourcePath;
  if (fs.existsSync(sourceFile)) {
    sourcePath = sourceFile;
  } else if (fs.existsSync(path.join(projectRoot, sourceFile))) {
    sourcePath = path.join(projectRoot, sourceFile);
  } else if (fs.existsSync(path.join(projectRoot, 'attached_assets', sourceFile))) {
    sourcePath = path.join(projectRoot, 'attached_assets', sourceFile);
  } else {
    console.error(`❌ Source file not found: ${sourceFile}`);
    process.exit(1);
  }

  // Determine target filename
  const filename = targetName || path.basename(sourceFile);
  const targetPath = path.join(projectDir, filename);

  // Copy the file
  fs.copyFileSync(sourcePath, targetPath);
  console.log(`✓ Copied: ${sourcePath} → ${targetPath}`);
  
  // Generate the path for use in components
  const imagePath = `/projects/${projectSlug}/${filename}`;
  console.log(`📋 Use in component: src="${imagePath}"`);
  
  return imagePath;
}

function listImages() {
  const publicDir = path.join(projectRoot, 'public', 'projects');
  if (!fs.existsSync(publicDir)) {
    console.log('No images found. Create some with: node scripts/add-image.js <project-slug> <image-file>');
    return;
  }

  console.log('\n📁 Available Images:');
  const projects = fs.readdirSync(publicDir);
  projects.forEach(project => {
    const projectPath = path.join(publicDir, project);
    if (fs.statSync(projectPath).isDirectory()) {
      console.log(`\n  ${project}/`);
      const images = fs.readdirSync(projectPath);
      images.forEach(image => {
        console.log(`    /projects/${project}/${image}`);
      });
    }
  });
}

// CLI Interface
const [,, command, projectSlug, sourceFile, targetName] = process.argv;

if (command === 'list' || !command) {
  listImages();
} else if (projectSlug && sourceFile) {
  addImage(projectSlug, sourceFile, targetName);
} else {
  console.log(`
📸 Image Management Utility

Usage:
  node scripts/add-image.js <project-slug> <image-file> [new-name]
  node scripts/add-image.js list

Examples:
  node scripts/add-image.js shared-memory-kernel diagram.png
  node scripts/add-image.js multithreaded-word-finder screenshot.png terminal.png
  node scripts/add-image.js list
`);
}