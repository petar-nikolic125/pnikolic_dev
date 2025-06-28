import { useState, useEffect, useRef } from 'react';
import { ExternalLink, Calendar, MapPin, TrendingUp } from 'lucide-react';
import { workExperience, education as educationData } from '@/data/portfolio';
import { countUp } from '@/lib/animations';

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

// Transform data to match component interface
export const work: WorkItem[] = workExperience.map(item => ({
  id: item.id.toString(),
  type: 'work' as const,
  period: `${item.startDate} - ${item.endDate}`,
  heading: item.company,
  subHeading: item.position,
  subText: item.description,
  metrics: item.bullets?.map(b => `${b.metric} ${b.label}`) || [],
  emoji: '💼',
  ribbon: item.endDate === 'Present' ? 'LIVE' : undefined
}));

export const educationItems: EduItem[] = educationData.map(item => ({
  id: item.id.toString(),
  type: 'edu' as const,
  period: `${item.startDate} - ${item.endDate}`,
  heading: item.institution,
  subHeading: item.degree,
  subText: item.description,
  metrics: item.bullets?.map(b => `${b.metric} ${b.label}`) || [],
  emoji: '🎓',
  ribbon: item.endDate === 'Present' ? 'LIVE' : undefined
}));

function Badge({
  text,
  variant = 'default',
}: {
  text: string;
  variant?: 'live' | 'hot' | 'new' | 'default';
}) {
  const variants = {
    live: 'bg-green-500/20 text-green-300 border-green-500/30',
    hot: 'bg-red-500/20 text-red-300 border-red-500/30',
    new: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    default: 'bg-gray-500/20 text-gray-300 border-gray-500/30',
  };

  return (
    <span
      className={`px-2 py-1 text-xs font-medium rounded-full border ${variants[variant]} animate-pulse`}
    >
      {text}
    </span>
  );
}

function MetricChip({ label, delay }: { label: string; delay: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (ref.current) {
        ref.current.classList.add('animate-fade-in-up');
      }
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <span
      ref={ref}
      className="inline-flex items-center gap-1 px-3 py-1 bg-blue-500/10 text-blue-300 rounded-full text-sm font-medium border border-blue-500/20 opacity-0"
    >
      <TrendingUp size={12} />
      {label}
    </span>
  );
}

function WorkCard({ item, index }: { item: WorkItem; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (cardRef.current) {
        cardRef.current.classList.add('animate-slide-in-left');
      }
    }, index * 150);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="relative p-6 bg-gray-800/50 rounded-xl border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 group opacity-0 transform translate-x-[-50px]"
    >
      {/* Ribbon */}
      {item.ribbon && (
        <div className="absolute -top-2 -right-2 z-10">
          <Badge text={item.ribbon} variant={item.ribbon.toLowerCase() as any} />
        </div>
      )}

      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        {item.emoji && (
          <div className="text-3xl mt-1 group-hover:scale-110 transition-transform duration-300">
            {item.emoji}
          </div>
        )}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
              {item.heading}
            </h3>
            {item.liveUrl && (
              <a
                href={item.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <ExternalLink size={16} />
              </a>
            )}
          </div>
          <p className="text-blue-300 font-medium mb-1">{item.subHeading}</p>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <Calendar size={14} />
            <span>{item.period}</span>
          </div>
        </div>
      </div>

      {/* Description */}
      {item.subText && (
        <p className="text-gray-300 leading-relaxed mb-4">{item.subText}</p>
      )}

      {/* Metrics */}
      {item.metrics && item.metrics.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {item.metrics.map((metric, i) => (
            <MetricChip key={i} label={metric} delay={index * 150 + i * 100} />
          ))}
        </div>
      )}
    </div>
  );
}

function EduCard({ item, index }: { item: EduItem; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (cardRef.current) {
        cardRef.current.classList.add('animate-slide-in-right');
      }
    }, index * 150);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="relative p-6 bg-gray-800/50 rounded-xl border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 group opacity-0 transform translate-x-[50px]"
    >
      {/* Ribbon */}
      {item.ribbon && (
        <div className="absolute -top-2 -right-2 z-10">
          <Badge text={item.ribbon} variant={item.ribbon.toLowerCase() as any} />
        </div>
      )}

      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        {item.emoji && (
          <div className="text-3xl mt-1 group-hover:scale-110 transition-transform duration-300">
            {item.emoji}
          </div>
        )}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
              {item.heading}
            </h3>
            {item.docUrl && (
              <a
                href={item.docUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <ExternalLink size={16} />
              </a>
            )}
          </div>
          <p className="text-purple-300 font-medium mb-1">{item.subHeading}</p>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <Calendar size={14} />
            <span>{item.period}</span>
          </div>
        </div>
      </div>

      {/* Description */}
      {item.subText && (
        <p className="text-gray-300 leading-relaxed mb-4">{item.subText}</p>
      )}

      {/* Metrics */}
      {item.metrics && item.metrics.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {item.metrics.map((metric, i) => (
            <MetricChip key={i} label={metric} delay={index * 150 + i * 100} />
          ))}
        </div>
      )}
    </div>
  );
}

function Toggle({ tab, setTab }: { tab: 'work' | 'edu'; setTab: (tab: 'work' | 'edu') => void }) {
  return (
    <div className="relative inline-flex bg-gray-800/50 rounded-full p-1 border border-gray-700/50">
      <Backdrop />
      <button
        onClick={() => setTab('work')}
        className={`relative z-10 px-6 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
          tab === 'work' ? 'text-white' : 'text-gray-400 hover:text-gray-200'
        }`}
      >
        Work
      </button>
      <button
        onClick={() => setTab('edu')}
        className={`relative z-10 px-6 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
          tab === 'edu' ? 'text-white' : 'text-gray-400 hover:text-gray-200'
        }`}
      >
        Education
      </button>
      
      {/* Moving background */}
      <div
        className={`absolute top-1 bottom-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full transition-all duration-300 ease-out ${
          tab === 'work' ? 'left-1 right-[50%]' : 'left-[50%] right-1'
        }`}
      />
    </div>
  );
}

function Backdrop() {
  return (
    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full" />
  );
}

export default function WorkEducationEnhanced() {
  const [tab, setTab] = useState<'work' | 'edu'>('work');
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-950 opacity-0"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Experience
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Building impactful solutions across domains
          </p>
          <Toggle tab={tab} setTab={setTab} />
        </div>

        {/* Content */}
        <div className="space-y-8">
          {tab === 'work' ? (
            work.map((item, index) => (
              <WorkCard key={item.id} item={item} index={index} />
            ))
          ) : (
            educationItems.map((item, index) => (
              <EduCard key={item.id} item={item} index={index} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}