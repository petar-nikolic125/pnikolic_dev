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
    technologies: ["React", "TypeScript", "Three.js", "Spline"],
    liveUrl: "https://pixel-component-craft.vercel.app/",
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
    technologies: ["C", "Assembly", "Operating Systems"],
    sourceUrl: "https://github.com/<you>/xv6-shm",
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
    technologies: ["Python", "PyTorch", "FastAPI", "OpenCV"],
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
    technologies: ["Java", "JavaFX", "MySQL", "PostgreSQL"],
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
    technologies: ["CSS", "JavaScript", "GSAP", "Three.js"],
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
    technologies: ["WebGL", "D3.js", "Canvas", "WebSocket"],
    type: "3D Interactive",
    availability: "Live",
    category: "WebGL Charts",
  },
  {
    id: 7,
    slug: "search-engine-sim",
    name: "Search‑Engine Simulator (OS2025)",
    description:
        "Lock‑free, multi‑threaded text indexer & contextual search CLI in pure C.",
    image:
        "https://images.unsplash.com/photo-1527430253228-e93688616381?auto=format&fit=crop&w=800&h=600",
    technologies: ["C17", "Pthreads", "Lock‑free DS"],
    sourceUrl: "https://github.com/<you>/search_engine_sim",
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
