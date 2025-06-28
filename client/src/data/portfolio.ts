// src/data/portfolio.ts

export const personalInfo = {
  name: "Petar Nikolić",
  title: "Software Engineer",
  subtitle: "Full-stack, distributed systems, real-time data",
  location: "Belgrade, Serbia • Open to remote across EU & US time zones",
  social: {
    github: "https://github.com/petar-nikolic125/",
    linkedin: "https://www.linkedin.com/in/petar-nikolic-957875345/",
    instagram: "https://instagram.com/nfs.u.2",
    email: "petar.nikolic.04.7@gmail.com"
  }
};

export interface WorkBullet { metric: string; label: string; }
export interface WorkEntry {
  id: number;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
  bullets: WorkBullet[];
}
export const workExperience: WorkEntry[] = [
  {
    id: 1,
    company: "Freelance",
    position: "Software Engineer (Freelance)",
    startDate: "2022",
    endDate: "Present",
    description:
        "Built high-volume trading dashboard for Zürich fintech; 120k tx/s, cut latency 40%. " +
        "Rescued React/Go e-commerce monolith in 10 weeks; TTI 2s→400ms, +12% conversion. " +
        "Designed & shipped Full-Stack Interactive Website Showcase (live demo) to prove 60fps WebGL.",
    bullets: [
      { metric: "120k", label: "tx/s handled" },
      { metric: "40%", label: "latency reduction" },
      { metric: "400ms", label: "TTI achieved" }
    ]
  }
];

export interface EduBullet { metric: string; label: string; }
export interface EduEntry {
  id: number;
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
  description: string;
  bullets: EduBullet[];
}
export const education: EduEntry[] = [
  {
    id: 1,
    institution: "RAF – Računarski fakultet",
    degree: "BSc Computer Science",
    startDate: "2023",
    endDate: "Present",
    description:
        "Kernel research: Shared-memory subsystem for xv6; benchmarked 18% throughput gain. " +
        "AI in Medicine: CNN melanoma detector (92% AUC) + white-paper. " +
        "Capstone: Psychotherapist Scheduling System — JavaFX GUI + PostgreSQL; 99.5% booking-success simulation.",
    bullets: [
      { metric: "18%", label: "kernel throughput gain" },
      { metric: "92%", label: "CNN AUC score" },
      { metric: "99.5%", label: "booking success rate" }
    ]
  }
];

export const skillsByCategory: Record<string, string[]> = {
  "Languages": [
    "JavaScript",
    "TypeScript",
    "Python",
    "Java",
    "C",
    "C++"
  ],
  "Frameworks": [
    "React",
    "Node.js",
    "Vue.js",
    "Next.js",
    "FastAPI",
    "PyTorch"
  ],
  "Tooling": [
    "Docker",
    "Git",
    "PyCharm",
    "JetBrains",
    "AWS",
    "PostgreSQL",
    "Prisma"
  ],
  "CS Fundamentals": [
    "Operating Systems",
    "Computer Networks",
    "Distributed Systems",
    "Algorithms"
  ]
};

export const skills: string[] = [
  "JavaScript",
  "TypeScript",
  "Python",
  "Java",
  "C",
  "C++",
  "React",
  "Node.js",
  "Vue.js",
  "Next.js",
  "FastAPI",
  "PyTorch",
  "Docker",
  "Git",
  "PyCharm",
  "JetBrains",
  "AWS",
  "PostgreSQL",
  "Prisma",
  "Operating Systems",
  "Computer Networks",
  "Distributed Systems",
  "Algorithms",
  "Socket.io",
  "Tailwind CSS"
];

export interface Project {
  id: number;
  name: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  sourceUrl?: string;
  docsUrl?: string;
  type: string;
  availability: string;
  category: string;
}
export const projects: Project[] = [
  {
    id: 1,
    name: "Full-Stack Interactive Website Showcase",
    description:
        "Real-time component assembly. Cut development time by 60%, increased client engagement by 280%.",
    image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    technologies: ["React", "TypeScript", "Three.js", "Spline"],
    liveUrl: "https://pixel-component-craft.vercel.app/",
    sourceUrl: "#",
    type: "Web App",
    availability: "Live",
    category: "Website Display"
  },
  {
    id: 2,
    name: "Shared-Memory Kernel Module",
    description:
        "Implemented System V encryption/decryption, shared memory management, altered inode structures. 18% throughput gain.",
    image:
        "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    technologies: ["C", "Assembly", "Operating Systems", "xv6"],
    liveUrl: "#",
    sourceUrl: "#",
    docsUrl: "#",
    type: "Systems",
    availability: "Source Available",
    category: "Systems / C"
  },
  {
    id: 3,
    name: "Melanoma Detection CNN",
    description: "92% AUC on ISIC 2018; inference <45ms on RTX 3060.",
    image:
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    technologies: ["Python", "PyTorch", "FastAPI", "OpenCV"],
    liveUrl: "#",
    sourceUrl: "#",
    docsUrl: "#",
    type: "AI/ML",
    availability: "Live",
    category: "AI / Medicine"
  },
  {
    id: 4,
    name: "Psychotherapist Scheduler",
    description:
        "Handles 10k concurrent bookings; ACID via MySQL + PL/pgSQL + MySQL Workbench.",
    image:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    technologies: ["Java", "JavaFX", "MySQL", "PostgreSQL"],
    liveUrl: "#",
    sourceUrl: "#",
    type: "Enterprise",
    availability: "Live",
    category: "Enterprise Java"
  },
  {
    id: 5,
    name: "Interactive Portfolio Explainer",
    description: "3-scene CSS/JS animation that cut client onboarding time 60%.",
    image:
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    technologies: ["CSS", "JavaScript", "GSAP", "Three.js"],
    liveUrl: "#",
    sourceUrl: "#",
    type: "Web App",
    availability: "Live",
    category: "Motion Design"
  },
  {
    id: 6,
    name: "Data Visualization Engine",
    description: "Streams 1M points with <50ms latency.",
    image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    technologies: ["WebGL", "D3.js", "Canvas", "WebSocket"],
    liveUrl: "#",
    sourceUrl: "#",
    docsUrl: "#",
    type: "3D Interactive",
    availability: "Live",
    category: "WebGL Charts"
  }
];

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
  "Flask",
  "Spline",
  "Three.js",
  "WebGL",
  "D3.js",
  "OpenCV",
  "DICOM",
  "Transformers",
  "spaCy",
  "Assembly",
  "Operating Systems",
  "Algorithms",
  "Memory Management",
  "Performance",
  "Prisma",
  "PostgreSQL",
  "Redis",
  "Docker",
  "Socket.io",
  "WebSocket",
  "Tailwind",
  "AWS",
  "Git",
  "Go"
];

export const availabilityOptions: string[] = [
  "Live",
  "Source Available",
  "In Development"
];

export const typeOptions: string[] = [
  "3D Interactive",
  "AI/ML",
  "Systems",
  "Web App",
  "API",
  "Library"
];

export const categoryOptions: string[] = [
  "Website Display",
  "Systems / C",
  "AI / Medicine",
  "Enterprise Java",
  "Motion Design",
  "WebGL Charts"
];
