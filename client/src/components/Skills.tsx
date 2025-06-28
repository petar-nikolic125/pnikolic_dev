import { FC, useEffect, useRef, useState } from "react";
import type { SVGProps } from "react";

// Emoji fallback icons
type EmojiIcon = FC<SVGProps<SVGSVGElement> & { size?: number }>;

const WebIcon: EmojiIcon = ({ size = 32, className }) => (
    <span style={{ fontSize: size }} className={className}>🌐</span>
);
const CSSIcon: EmojiIcon = ({ size = 32, className }) => (
    <span style={{ fontSize: size }} className={className}>🎨</span>
);
const JSIcon: EmojiIcon = ({ size = 32, className }) => (
    <span style={{ fontSize: size }} className={className}>⚡</span>
);
const TSIcon: EmojiIcon = ({ size = 32, className }) => (
    <span style={{ fontSize: size }} className={className}>📘</span>
);
const ReactIcon: EmojiIcon = ({ size = 32, className }) => (
    <span style={{ fontSize: size }} className={className}>⚛️</span>
);
const VueIcon: EmojiIcon = ({ size = 32, className }) => (
    <span style={{ fontSize: size }} className={className}>💚</span>
);
const NextIcon: EmojiIcon = ({ size = 32, className }) => (
    <span style={{ fontSize: size }} className={className}>▲</span>
);
const TailwindIcon: EmojiIcon = ({ size = 32, className }) => (
    <span style={{ fontSize: size }} className={className}>🌊</span>
);

const MySQLIcon: EmojiIcon = ({ size = 32, className }) => (
    <span style={{ fontSize: size }} className={className}>🗄️</span>
);
const PostgreSQLIcon: EmojiIcon = ({ size = 32, className }) => (
    <span style={{ fontSize: size }} className={className}>🐘</span>
);
const MongoIcon: EmojiIcon = ({ size = 32, className }) => (
    <span style={{ fontSize: size }} className={className}>🍃</span>
);
const RedisIcon: EmojiIcon = ({ size = 32, className }) => (
    <span style={{ fontSize: size }} className={className}>🔴</span>
);
const SQLiteIcon: EmojiIcon = ({ size = 32, className }) => (
    <span style={{ fontSize: size }} className={className}>💾</span>
);
const SupabaseIcon: EmojiIcon = ({ size = 32, className }) => (
    <span style={{ fontSize: size }} className={className}>⚡</span>
);

const PythonIcon: EmojiIcon = ({ size = 32, className }) => (
    <span style={{ fontSize: size }} className={className}>🐍</span>
);
const JavaIcon: EmojiIcon = ({ size = 32, className }) => (
    <span style={{ fontSize: size }} className={className}>☕</span>
);
const CIcon: EmojiIcon = ({ size = 32, className }) => (
    <span style={{ fontSize: size }} className={className}>🔧</span>
);
const RustIcon: EmojiIcon = ({ size = 32, className }) => (
    <span style={{ fontSize: size }} className={className}>🦀</span>
);

const GitIcon: EmojiIcon = ({ size = 32, className }) => (
    <span style={{ fontSize: size }} className={className}>📚</span>
);
const DockerIcon: EmojiIcon = ({ size = 32, className }) => (
    <span style={{ fontSize: size }} className={className}>🐳</span>
);
const VSCodeIcon: EmojiIcon = ({ size = 32, className }) => (
    <span style={{ fontSize: size }} className={className}>🛠️</span>
);
const FigmaIcon: EmojiIcon = ({ size = 32, className }) => (
    <span style={{ fontSize: size }} className={className}>🎨</span>
);

interface Skill  { label: string; Icon: EmojiIcon }
interface Column { title: string; items: Skill[]  }

const columns: Column[] = [
  {
    title: "Web",
    items: [
      { label: "HTML5",        Icon: WebIcon },
      { label: "CSS3",         Icon: CSSIcon },
      { label: "JavaScript",   Icon: JSIcon },
      { label: "TypeScript",   Icon: TSIcon },
      { label: "React",        Icon: ReactIcon },
      { label: "Vue.js",       Icon: VueIcon },
      { label: "Next.js",      Icon: NextIcon },
      { label: "Tailwind",     Icon: TailwindIcon },
    ],
  },
  {
    title: "Database",
    items: [
      { label: "MySQL",      Icon: MySQLIcon },
      { label: "PostgreSQL", Icon: PostgreSQLIcon },
      { label: "MongoDB",    Icon: MongoIcon },
      { label: "Redis",      Icon: RedisIcon },
      { label: "SQLite",     Icon: SQLiteIcon },
      { label: "Supabase",   Icon: SupabaseIcon },
    ],
  },
  {
    title: "Languages",
    items: [
      { label: "Python",     Icon: PythonIcon },
      { label: "Java",       Icon: JavaIcon },
      { label: "C",          Icon: CIcon },
      { label: "Rust",       Icon: RustIcon },
    ],
  },
  {
    title: "Tools",
    items: [
      { label: "Git",      Icon: GitIcon },
      { label: "Docker",   Icon: DockerIcon },
      { label: "VS Code",  Icon: VSCodeIcon },
      { label: "Figma",    Icon: FigmaIcon },
    ],
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement|null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(
        ([e]) => e.isIntersecting && setIsVisible(true),
        { threshold: 0.25 }
    );
    if (sectionRef.current) io.observe(sectionRef.current);
    return () => io.disconnect();
  }, []);

  return (
      <section
          ref={sectionRef}
          id="skills"
          className="py-12 md:py-16 lg:py-20 px-6 md:px-10 lg:px-16 max-w-screen-xl mx-auto"
      >
        <h2 className="text-center text-4xl md:text-5xl font-serif font-bold mb-12 md:mb-16 text-white">
          <span className="shimmer-text">Skills</span>
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-x-10 gap-y-16">
          {columns.map((col, cIdx) => (
              <div
                  key={col.title}
                  className={`flex flex-col items-center ${
                      isVisible ? "animate-fade-up" : "opacity-0"
                  }`}
                  style={{ animationDelay: `${cIdx * 80}ms` }}
              >
                <h3 className="mb-7 text-lg md:text-xl font-semibold text-white">
                  {col.title}
                </h3>

                <ul
                    className={
                      col.title === "Web"
                          ? "grid grid-cols-4 grid-rows-2 gap-x-6 gap-y-8"
                          : "grid grid-rows-2 grid-flow-col gap-x-6 gap-y-8"
                    }
                >
                  {col.items.map(({ label, Icon }, iIdx) => (
                      <li
                          key={label}
                          className="flex flex-col items-center text-neutral-300
                             transition-transform hover:-translate-y-1
                             hover:scale-110"
                          style={{ animationDelay: `${iIdx * 30}ms` }}
                      >
                        <Icon size={32} className="mb-2" />
                        <span className="text-xs md:text-sm text-center tracking-wide">
                    {label}
                  </span>
                      </li>
                  ))}
                </ul>
              </div>
          ))}
        </div>
      </section>
  );
}
