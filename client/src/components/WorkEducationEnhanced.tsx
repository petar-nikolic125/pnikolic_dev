import { useState, useEffect, useRef } from 'react';
import {
  Briefcase,
  GraduationCap,
  ExternalLink,
  Download,
} from 'lucide-react';
import { createAnimationObserver, countUp } from '@/lib/animations';

interface Base {
  id: string;
  period: string;
  heading: string;
  subHeading: string;
  subText?: string;
  logo?: string;
  emoji?: string;
  ribbon?: 'LIVE' | 'HOT' | 'NEW';
}

export interface WorkItem extends Base {
  type: 'work';
  metrics?: string[];
  tech?: string[];
  liveUrl?: string;
}

export interface EduItem extends Base {
  type: 'edu';
  metrics?: string[];
  docUrl?: string;
}

export const work: WorkItem[] = [
  {
    id: 'w-indie',
    type: 'work',
    emoji: '🚀',
    period: '2022 – Present',
    heading: 'Independent Full-Stack Consultant',
    subHeading: '11 enterprise clients • 99 % CSAT',
    subText: 'Distributed systems • Real-time data • UI performance',
    metrics: ['11 clients', '99 %', '100 K LoC'],
    tech: ['React', 'Node', 'Postgres', 'AWS'],
    ribbon: 'HOT',
  },
  {
    id: 'w-forge',
    type: 'work',
    emoji: '🧩',
    period: '2024',
    heading: 'Component Forge',
    subHeading: 'Live React-HTML component builder',
    subText: 'Drag & drop • CSS tokens • One-click Figma import',
    metrics: ['98 LH', '60 fps', 'PWA'],
    tech: ['React', 'Three.js', 'Tailwind', 'TypeScript'],
    liveUrl: 'https://pixel-component-craft.vercel.app/',
    ribbon: 'LIVE',
  },
  {
    id: 'w-config',
    type: 'work',
    emoji: '🔧',
    period: '2023',
    heading: '3-D Product Configurator',
    subHeading: '+35 % conversions • 50 K configs / mo',
    metrics: ['35 %', '≈50 K', '<100 ms'],
    tech: ['WebGL', 'Spline', 'Redis', 'GraphQL'],
  },
  {
    id: 'w-viz',
    type: 'work',
    emoji: '📊',
    period: '2023',
    heading: 'Data-Visualisation Engine',
    subHeading: 'Streams 1 M pts < 50 ms',
    tech: ['D3.js', 'WebGL', 'Socket.io'],
  },
  {
    id: 'w-showcase',
    type: 'work',
    emoji: '🎨',
    period: '2023',
    heading: 'Interactive Portfolio Explainer',
    subHeading: '280 % engagement lift',
    tech: ['Spline', 'React', 'TypeScript'],
  },
  {
    id: 'w-scheduler',
    type: 'work',
    emoji: '📆',
    period: '2022',
    heading: 'On-Demand Booking Platform',
    subHeading: 'Real-time slots • <100 ms latency',
    tech: ['Socket.io', 'PostgreSQL', 'Docker'],
  },
  {
    id: 'w-etl',
    type: 'work',
    emoji: '🛠️',
    period: '2022',
    heading: 'Serverless ETL Pipelines',
    subHeading: '5 TB / day gzip→Parquet → Redshift < 10 min',
    tech: ['AWS Step Fn', 'Lambda', 'Athena'],
  },
];

export const education: EduItem[] = [
  {
    id: 'e-raf',
    type: 'edu',
    emoji: '🎓',
    period: '2023 – Present',
    heading: 'Računarski Fakultet – RAF',
    subHeading: 'B.Sc. Computer Science',
    subText: "Dean's list • ACM-ICPC regionals (3× finals)",
    metrics: ['3 finals', '121 ECTS'],
    ribbon: 'NEW',
  },
  {
    id: 'e-oop',
    type: 'edu',
    emoji: '🧑‍💻',
    period: '2023',
    heading: 'OOP Principles + JavaFX Suite',
    subHeading: 'MVC • DAO • Observer • 95 % test coverage',
    docUrl: '/oop-report.pdf',
  },
  {
    id: 'e-patterns',
    type: 'edu',
    emoji: '📐',
    period: '2023',
    heading: 'Design-Pattern Framework',
    subHeading: 'Interactive UML generator & validator',
  },
  {
    id: 'e-ai',
    type: 'edu',
    emoji: '🤖',
    period: '2024',
    heading: 'AI in Medicine',
    subHeading: 'CNN AUC 0.92 • Robotics & Nanotech',
    docUrl: '/whitepaper.pdf',
  },
  {
    id: 'e-os',
    type: 'edu',
    emoji: '🖥️',
    period: '2023',
    heading: 'xv6 Kernel Extensions',
    subHeading: 'Shared-mem • New syscalls • SMP allocator',
  },
  {
    id: 'e-psy',
    type: 'edu',
    emoji: '🩺',
    period: '2024',
    heading: 'Psychotherapy Scheduler',
    subHeading: 'JavaFX • MySQL • Multithreaded DAO • HIPAA-ready',
  },
];

function Badge({
                 logo,
                 emoji,
                 type,
               }: {
  logo?: string;
  emoji?: string;
  type: 'work' | 'edu';
}) {
  const [loaded, setLoaded] = useState(!logo);

  const fallbackIcon =
      type === 'work' ? <Briefcase size={20} /> : <GraduationCap size={20} />;

  const ringFrom = type === 'work' ? 'from-sky-500' : 'from-fuchsia-500';
  const ringTo   = 'to-gray-400';

  if (!logo) {
    return (
        <span
            className={`
          relative grid place-content-center w-12 h-12 shrink-0 rounded-full bg-white shadow-md
          transition-transform duration-300 hover:scale-105
          before:absolute before:inset-0 before:rounded-full before:ring-2 before:ring-transparent
          hover:before:ring-[3px] hover:before:bg-gradient-to-br hover:before:${ringFrom} hover:before:${ringTo}
        `}
        >
        <span className="relative z-10 text-xl">
          {emoji ?? fallbackIcon}
        </span>
      </span>
    );
  }

  return (
      <span
          className={`
        relative w-12 h-12 shrink-0 rounded-full overflow-hidden
        transition-transform duration-300 hover:scale-105
        before:absolute before:inset-0 before:rounded-full before:ring-2 before:ring-transparent
        hover:before:ring-[3px] hover:before:bg-gradient-to-br hover:before:${ringFrom} hover:before:${ringTo}
      `}
      >
      {!loaded && (
          <span className="absolute inset-0 rounded-full bg-neutral-200/70 animate-pulse" />
      )}

        <img
            src={logo}
            alt=""
            width={48}
            height={48}
            className={`
          relative z-10 w-full h-full object-contain p-1 bg-white rounded-full
          transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}
        `}
            onLoad={() => setLoaded(true)}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
        />
    </span>
  );
}

function MetricChip({ label, delay }: { label: string; delay: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const num = parseFloat(label.replace(/[^\d.]/g, ''));
    if (Number.isNaN(num)) return;

    const io = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) {
            countUp(el, 0, num, 1000, label.replace(/[\d.]+/, ''));
            io.disconnect();
          }
        },
        { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [label]);

  return (
      <span
          ref={ref}
          style={{ animationDelay: `${delay}ms` }}
          className="
        bg-gradient-to-r from-blue-500 to-cyan-500
        text-white rounded-full px-3 py-0.5 text-[10px] font-semibold
        shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105
      "
      >
      {label}
    </span>
  );
}

function WorkCard({ item, index }: { item: WorkItem; index: number }) {
  return (
      <li
          className="
        timeline-card relative flex pl-20 pr-5 py-4
        before:absolute before:left-16 before:top-0 before:h-full before:w-px before:bg-white/10
        hover:-translate-y-1 transition-transform duration-200 group
      "
          style={{ animationDelay: `${index * 70}ms` }}
      >
        <span
            className="
          absolute inset-0 -translate-x-full bg-gradient-to-r
          from-transparent via-white/5 to-transparent
          group-hover:translate-x-full transition-transform duration-[900ms]
        "
        />

        <div className="absolute left-5 top-4 transition-transform duration-300 group-hover:scale-105">
          <Badge logo={item.logo} emoji={item.emoji} type="work" />
        </div>

        <div className="space-y-0.5">
          <time className="block text-[11px] text-white/50 group-hover:text-sky-300">
            {item.period}
          </time>
          <h3 className="text-sm font-semibold text-white group-hover:text-sky-400">
            {item.heading}
          </h3>
          <p className="text-[13px] text-white/70">{item.subHeading}</p>
          {item.subText && (
              <p className="text-[11px] leading-snug text-white/40">{item.subText}</p>
          )}

          {item.metrics && (
              <div className="mt-1 flex flex-wrap gap-1">
                {item.metrics.map((m, i) => (
                    <MetricChip key={m} label={m} delay={i * 100} />
                ))}
              </div>
          )}

          {item.tech && (
              <div className="mt-1 flex flex-wrap gap-1">
                {item.tech.map((t) => (
                    <span
                        key={t}
                        className="
                  rounded bg-white/5 px-1.5 py-0.5
                  text-[9px] uppercase tracking-wide text-white/50
                "
                    >
                {t}
              </span>
                ))}
              </div>
          )}

          {item.liveUrl && (
              <a
                  href={item.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[10px] text-sky-400 hover:text-fuchsia-400 transition-colors mt-1"
              >
                <ExternalLink className="w-3 h-3" />
                View Live
              </a>
          )}
        </div>
      </li>
  );
}

function EduCard({ item, index }: { item: EduItem; index: number }) {
  return (
      <li
          className="
        timeline-card relative flex pl-20 pr-5 py-4
        before:absolute before:left-16 before:top-0 before:h-full before:w-px before:bg-white/10
        hover:-translate-y-1 transition-transform duration-200 group
      "
          style={{ animationDelay: `${index * 70}ms` }}
      >
        <span
            className="
          absolute inset-0 -translate-x-full bg-gradient-to-r
          from-transparent via-white/5 to-transparent
          group-hover:translate-x-full transition-transform duration-[900ms]
        "
        />

        <div className="absolute left-5 top-4 transition-transform duration-300 group-hover:scale-105">
          <Badge logo={item.logo} emoji={item.emoji} type="edu" />
        </div>

        <div className="space-y-0.5">
          <time className="block text-[11px] text-white/50 group-hover:text-fuchsia-300">
            {item.period}
          </time>
          <h3 className="text-sm font-semibold text-white group-hover:text-fuchsia-400">
            {item.heading}
          </h3>
          <p className="text-[13px] text-white/70">{item.subHeading}</p>
          {item.subText && (
              <p className="text-[11px] leading-snug text-white/40">{item.subText}</p>
          )}

          {item.metrics && (
              <div className="mt-1 flex flex-wrap gap-1">
                {item.metrics.map((m, i) => (
                    <MetricChip key={m} label={m} delay={i * 100} />
                ))}
              </div>
          )}

          {item.docUrl && (
              <a
                  href={item.docUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[10px] text-fuchsia-400 hover:text-sky-400 transition-colors mt-1"
              >
                <Download className="w-3 h-3" />
                Download PDF
              </a>
          )}
        </div>
      </li>
  );
}

function Toggle({ tab, setTab }: { tab: 'work' | 'edu'; setTab: (tab: 'work' | 'edu') => void }) {
  return (
      <div className="flex justify-center mb-16 relative z-10">
        <div className="relative flex bg-[hsl(var(--black-700)/0.6)] backdrop-blur-sm border border-[var(--border-color)] rounded-full p-1">
          <div 
            className={`absolute inset-y-1 w-1/2 rounded-full bg-gradient-to-r from-[var(--brand-sky)] to-[var(--brand-fuchsia)] transition-all duration-300 ${tab === 'work' ? 'left-1' : 'left-1/2'}`}
          />
          <button 
            className={`relative z-10 px-6 py-2 text-sm font-medium transition-colors duration-300 ${tab === 'work' ? 'text-white' : 'text-[var(--fg-faint)]'}`}
            onClick={() => setTab('work')}
          >
            Work
          </button>
          <button 
            className={`relative z-10 px-6 py-2 text-sm font-medium transition-colors duration-300 ${tab === 'edu' ? 'text-white' : 'text-[var(--fg-faint)]'}`}
            onClick={() => setTab('edu')}
          >
            Education
          </button>
        </div>
      </div>
  );
}

function Backdrop() {
  return (
      <div className="absolute inset-0 opacity-5">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-[var(--brand-sky)] to-transparent animate-float-smooth"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-[var(--brand-fuchsia)] to-transparent animate-float-smooth" style={{ animationDelay: '3s' }}></div>
      </div>
  );
}

export default function WorkEducationEnhanced() {
  const [tab, setTab] = useState<'work' | 'edu'>('work');
  const data = tab === 'work' ? work : education;

  useEffect(() => {
    const io = createAnimationObserver('.timeline-card', 'animate-card', {
      threshold: 0.15,
    });
    return () => io.disconnect();
  }, [tab]);

  return (
      <section
          id="experience"
          className="relative mx-auto py-12 md:py-16 lg:py-20 max-w-6xl px-4 md:px-8 lg:px-16"
      >
        <Backdrop />
        
        <header className="text-center mb-12 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-fade-up">
            <span className="shimmer-text">Experience</span>
          </h2>
          <p className="text-xl text-[var(--fg-faint)] animate-fade-up delay-150">
            Building impactful solutions across domains
          </p>
        </header>

        <Toggle tab={tab} setTab={setTab} />

        <div
            role="feed"
            className="
          relative mt-16 overflow-hidden rounded-xl
          border border-white/20 bg-white/5 backdrop-blur
          shadow-[0_2px_30px_-10px_rgba(0,0,0,0.8)]
        "
        >
        <span
            aria-hidden
            className="
            absolute left-[4.5rem] top-0 h-full w-px
            bg-gradient-to-b from-transparent via-white/20 to-transparent
          "
        />
          <ul className="space-y-2 py-8">
            {data.map((item, i) => 
              item.type === 'work' ? (
                <WorkCard key={item.id} item={item} index={i} />
              ) : (
                <EduCard key={item.id} item={item} index={i} />
              )
            )}
          </ul>
        </div>
      </section>
  );
}
