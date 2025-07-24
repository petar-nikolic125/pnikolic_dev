/* ─────────── src/data/portfolio.ts ───────────
   Master data file consumed across the app
   (projects grid, filters, bio panels, etc.)
   -------------------------------------------- */

export const personalInfo = {
  name: "Petar Nikolić",
  title: "Software Engineer",
  subtitle: "Full‑stack • Distributed systems • Real‑time data",
  location: "Belgrade, Serbia — open to remote EU / US",
  social: {
    github:   "https://github.com/petar-nikolic125",
    linkedin: "https://www.linkedin.com/in/petar-nikolic-957875345/",
    instagram:"https://instagram.com/nfs.u.2",
    email:    "petar.nikolic.04.7@gmail.com",
  },
};

/* ——— Work / Education (unchanged – trimmed) ——— */

/* ------------------------------------------------------------------
   Projects – 7 entries
   ------------------------------------------------------------------ */

export interface Project {
  id: number;
  slug?: string;
  name: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  sourceUrl?: string;
  docsUrl?: string;
  type?: string;
  availability?: string;
  category?: string;
  methodologies?: string[];
  paradigms?: string[];
  architecture?: string[];
  taglines?: string[];
}

export const projects: Project[] = [
  {
    id: 1,
    slug: "full-stack-showcase",
    name: "Full‑Stack Interactive Website Showcase",
    description:
        "Real‑time component assembly; cut dev time 60 %, boosted engagement 280 %.",
    image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&h=600",
    technologies: ["React", "TypeScript", "Three.js", "Spline", "Tailwind CSS", "Vite"],
    methodologies: ["Agile Development", "Component-Driven Design", "Test-Driven Development", "Continuous Integration"],
    paradigms: ["Functional Programming", "Reactive Programming", "Object-Oriented Design", "Declarative UI"],
    architecture: ["Client-Server Architecture", "Component-Based Architecture", "Real-time Event System", "Modular Design"],
    taglines: ["Blazing Fast Performance", "Pixel-Perfect Design", "Interactive Excellence", "Modern Web Standards"],
    liveUrl: "https://pixel-component-craft.vercel.app/",
    sourceUrl: "https://github.com/petar-nikolic125/full-stack-showcase",
    type: "Web App",
    availability: "Live",
    category: "Website Display",
  },
  {
    id: 2,
    slug: "shared-memory-kernel",
    name: "Shared‑Memory Kernel Module",
    description:
        "System‑V style SHM, custom page‑fault handler; +18 % IPC throughput on xv6.",
    image:
        "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?auto=format&fit=crop&w=800&h=600",
    technologies: ["C", "Assembly", "Operating Systems", "RISC-V", "Memory Management"],
    methodologies: ["System Programming", "Low-Level Design", "Performance Optimization", "Kernel Development"],
    paradigms: ["Procedural Programming", "Systems Programming", "Memory-Safe Design", "Concurrent Programming"],
    architecture: ["Microkernel Architecture", "Page-Based Memory Management", "IPC Mechanisms", "System Call Interface"],
    taglines: ["High-Performance IPC", "Memory-Safe Design", "RISC-V Optimized", "Production-Ready Kernel"],
    sourceUrl: "https://github.com/petar-nikolic125/xv6-shared-memory",
    type: "Systems",
    availability: "Source Available",
    category: "Systems / C",
  },
  {
    id: 3,
    slug: "melanoma-cnn",
    name: "Melanoma Detection CNN",
    description: "92 % AUC on ISIC‑2018; <45 ms inference on RTX 3060.",
    image:
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=800&h=600",
    technologies: ["Python", "PyTorch", "FastAPI", "OpenCV", "CUDA", "Docker"],
    methodologies: ["Deep Learning", "Computer Vision", "Model Optimization", "Medical AI", "MLOps"],
    paradigms: ["Neural Networks", "Convolutional Architecture", "Transfer Learning", "Data-Driven Development"],
    architecture: ["CNN Architecture", "REST API Backend", "GPU Acceleration", "Containerized Deployment"],
    taglines: ["Medical-Grade Accuracy", "Sub-50ms Inference", "CUDA Optimized", "Production Deployment"],
    sourceUrl: "https://github.com/petar-nikolic125/melanoma-detection-cnn",
    type: "AI/ML",
    availability: "Live",
    category: "AI / Medicine",
  },
  {
    id: 4,
    slug: "psychotherapist-scheduler",
    name: "Psychotherapist Scheduler",
    description:
        "10 k concurrent bookings; MySQL + PL/pgSQL; HIPAA‑ready desktop app.",
    image:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&h=600",
    technologies: ["Java", "JavaFX", "MySQL", "PostgreSQL", "JDBC", "Maven"],
    methodologies: ["Agile Development", "Database Design", "HIPAA Compliance", "Enterprise Architecture"],
    paradigms: ["Object-Oriented Design", "MVC Pattern", "Database-Driven Development", "Event-Driven Programming"],
    architecture: ["N-Tier Architecture", "Database Layer", "Business Logic Layer", "Presentation Layer"],
    taglines: ["HIPAA Compliant", "Enterprise Scale", "10k Concurrent Users", "Medical Grade Security"],
    sourceUrl: "https://github.com/petar-nikolic125/psychotherapist-scheduler",
    type: "Enterprise",
    availability: "Live",
    category: "Enterprise Java",
  },
  {
    id: 5,
    slug: "portfolio-explainer",
    name: "Interactive Portfolio Explainer",
    description:
        "Three‑scene CSS/JS animation that reduced client onboarding time 60 %.",
    image:
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&h=600",
    technologies: ["CSS", "JavaScript", "GSAP", "Three.js", "WebGL", "SVG"],
    methodologies: ["Motion Design", "User Experience Design", "Performance Optimization", "Cross-Browser Compatibility"],
    paradigms: ["Animation-Driven Development", "Timeline-Based Programming", "Event-Driven Architecture"],
    architecture: ["Scene Management", "Animation Pipeline", "Asset Loading System", "Responsive Design"],
    taglines: ["Stunning Animations", "60% Faster Onboarding", "Smooth Performance", "Interactive Storytelling"],
    sourceUrl: "https://github.com/petar-nikolic125/portfolio-explainer",
    type: "Web App",
    availability: "Live",
    category: "Motion Design",
  },
  {
    id: 6,
    slug: "data-vis-engine",
    name: "Data‑Visualisation Engine",
    description: "Streams 1 M points with <50 ms latency.",
    image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&h=600",
    technologies: ["WebGL", "D3.js", "Canvas", "WebSocket", "TypeScript", "GPU.js"],
    methodologies: ["Real-time Programming", "Performance Engineering", "Data Visualization", "GPU Computing"],
    paradigms: ["Event-Driven Programming", "Streaming Architecture", "Functional Programming", "GPU Acceleration"],
    architecture: ["Real-time Streaming", "GPU Acceleration", "WebGL Pipeline", "Memory Pool Management"],
    taglines: ["1M+ Data Points", "Sub-50ms Latency", "GPU Accelerated", "Real-time Streaming"],
    sourceUrl: "https://github.com/petar-nikolic125/data-vis-engine",
    type: "3D Interactive",
    availability: "Live",
    category: "WebGL Charts",
  },
  {
    id: 7,
    slug: "multithreaded-word-finder",
    name: "Search‑Engine Simulator (OS2025)",
    description:
        "Lock‑free, multi‑threaded text indexer & contextual search CLI in pure C.",
    image:
        "https://images.unsplash.com/photo-1527430253228-e93688616381?auto=format&fit=crop&w=800&h=600",
    technologies: ["C17", "Pthreads", "Lock‑free DS", "Memory Mapping", "Hash Tables"],
    methodologies: ["Concurrent Programming", "Lock-free Design", "Performance Optimization", "System Programming"],
    paradigms: ["Multi-threaded Programming", "Lock-free Programming", "Producer-Consumer Pattern", "Memory-Safe Design"],
    architecture: ["Thread Pool Architecture", "Lock-free Data Structures", "Memory Mapped Files", "Hash-based Indexing"],
    taglines: ["Lock-free Performance", "Multi-threaded Search", "Memory Efficient", "Production Ready"],
    sourceUrl: "https://github.com/petar-nikolic125/Multithreaded-Word-Finder",
    type: "Systems",
    availability: "Source Available",
    category: "Operating Systems",
  },
];

/* ------------------------------------------------------------------
   Filter / tag helpers – exported for UI components
   ------------------------------------------------------------------ */

export const availabilityOptions = ["Live", "Source Available", "In Development"];

export const typeOptions = [
  "3D Interactive",
  "AI/ML",
  "Systems",
  "Web App",
  "Enterprise",
  "Library",
];

export const categoryOptions = [
  "Website Display",
  "Systems / C",
  "AI / Medicine",
  "Enterprise Java",
  "Motion Design",
  "WebGL Charts",
  "Operating Systems",
];

/* ------------------------------------------------------------------
   Skills
   ------------------------------------------------------------------ */

export const technologies: string[] = [
  "React",
  "TypeScript",
  "JavaScript",
  "Node.js",
  "Python",
  "Java",
  "C",
  "C++",
  "Vue.js",
  "Next.js",
  "PyTorch",
  "TensorFlow",
  "FastAPI",
  "Spline",
  "Three.js",
  "WebGL",
  "D3.js",
  "OpenCV",
  "Assembly",
  "Operating Systems",
  "Algorithms",
  "PostgreSQL",
  "Redis",
  "Docker",
  "Socket.io",
  "WebSocket",
  "Tailwind CSS",
  "AWS",
  "Git",
  "Go",
];

export const skillsByCategory: Record<string, string[]> = {
  Languages: [
    "JavaScript",
    "TypeScript",
    "Python",
    "Java",
    "C",
    "C++",
    "Go",
  ],
  Frameworks: [
    "React",
    "Vue.js",
    "Next.js",
    "FastAPI",
    "PyTorch",
    "TensorFlow",
  ],
  Tooling: [
    "Docker",
    "Git",
    "VS Code",
    "JetBrains",
    "AWS",
    "PostgreSQL",
    "Prisma",
  ],
  "CS Fundamentals": [
    "Operating Systems",
    "Computer Networks",
    "Distributed Systems",
    "Algorithms",
  ],
};
