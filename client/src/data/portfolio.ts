export const personalInfo = {
  social: {
    github: "https://github.com/petar-nikolic125/",
    linkedin: "https://www.linkedin.com/in/petar-nikolic-957875345/",
    instagram: "https://instagram.com/nfs.u.2",
    email: "petar.nikolic.04.7@gmail.com",
  }
};

export const projects = [
  {
    id: 'component-forge',
    name: 'Component Forge',
    description: 'Live React-HTML component builder with drag & drop interface, CSS tokens, and one-click Figma import functionality.',
    category: 'Development Tools',
    type: 'Web App',
    technologies: ['React', 'Three.js', 'Tailwind', 'TypeScript'],
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=675',
    liveUrl: 'https://pixel-component-craft.vercel.app/',
  },
  {
    id: '3d-configurator',
    name: '3-D Product Configurator',
    description: 'Interactive 3D product configurator that increased conversions by 35% and handles 50K configurations monthly.',
    category: 'E-commerce',
    type: 'Web App',
    technologies: ['WebGL', 'Spline', 'Redis', 'GraphQL'],
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=675',
  },
  {
    id: 'data-viz',
    name: 'Data-Visualisation Engine',
    description: 'Real-time data visualization engine that streams 1M data points with less than 50ms latency.',
    category: 'Analytics',
    type: 'Platform',
    technologies: ['D3.js', 'WebGL', 'Socket.io'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=675',
  },
  {
    id: 'booking-platform',
    name: 'On-Demand Booking Platform',
    description: 'Real-time booking platform with dynamic slot management and sub-100ms latency for instant availability updates.',
    category: 'SaaS',
    type: 'Platform',
    technologies: ['Socket.io', 'PostgreSQL', 'Docker'],
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=675',
  },
  {
    id: 'etl-pipelines',
    name: 'Serverless ETL Pipelines',
    description: 'Serverless ETL system processing 5TB daily from gzip to Parquet format with Redshift integration in under 10 minutes.',
    category: 'Infrastructure',
    type: 'System',
    technologies: ['AWS Step Fn', 'Lambda', 'Athena'],
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=675',
  },
  {
    id: 'ai-medical',
    name: 'AI in Medicine Platform',
    description: 'Medical AI platform using CNN with 0.92 AUC for diagnostics, integrating robotics and nanotechnology research.',
    category: 'AI/ML',
    type: 'Research',
    technologies: ['TensorFlow', 'Python', 'PyTorch'],
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=675',
  },
];

export const technologies = [
  'React', 'TypeScript', 'JavaScript', 'Node.js', 'Python', 'PostgreSQL', 
  'Redis', 'Docker', 'AWS', 'Three.js', 'WebGL', 'Socket.io', 'GraphQL',
  'Tailwind', 'D3.js', 'TensorFlow', 'PyTorch', 'Lambda', 'Spline'
];

export const categoryOptions = [
  'Development Tools', 'E-commerce', 'Analytics', 'SaaS', 'Infrastructure', 'AI/ML'
];

export const typeOptions = [
  'Web App', 'Platform', 'System', 'Research'
];