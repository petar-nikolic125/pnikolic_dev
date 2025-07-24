// src/components/WorkExperienceEnhanced.tsx
import { Fragment, useEffect, useRef, useState } from 'react'
import { Briefcase, GraduationCap, ExternalLink, Download } from 'lucide-react'
import { createAnimationObserver, countUp } from '@/lib/animations'
import { experience } from '@/hooks/usePortfolio'           // JSON‑driven data (work + education)

/* ──────────────────────────  HELPERS  ────────────────────────── */

function Badge({
                   logo,
                   emoji,
                   type,
               }: {
    logo?: string
    emoji?: string
    type: 'work' | 'edu'
}) {
    const [loaded, setLoaded] = useState(!logo)
    const fallback =
        type === 'work' ? <Briefcase size={20} /> : <GraduationCap size={20} />
    const ring = type === 'work' ? 'from-sky-500' : 'from-fuchsia-500'

    return !logo ? (
        <span
            className={`
        relative grid place-content-center w-12 h-12 rounded-full bg-white shadow-md
        transition-transform duration-300 hover:scale-105
        before:absolute before:inset-0 before:rounded-full before:ring-2 before:ring-transparent
        hover:before:ring-[3px] hover:before:bg-gradient-to-br hover:before:${ring} hover:before:to-gray-400
      `}
        >
      <span className="relative z-10 text-xl">{emoji ?? fallback}</span>
    </span>
    ) : (
        <span
            className={`
        relative w-12 h-12 rounded-full overflow-hidden transition-transform duration-300 hover:scale-105
        before:absolute before:inset-0 before:rounded-full before:ring-2 before:ring-transparent
        hover:before:ring-[3px] hover:before:bg-gradient-to-br hover:before:${ring} hover:before:to-gray-400
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
          relative z-10 w-full h-full p-1 bg-white rounded-full object-contain
          transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}
        `}
                onLoad={() => setLoaded(true)}
                onError={(e) => {
                    ;(e.currentTarget as any).replaceWith(fallback)
                }}
            />
    </span>
    )
}

function MetricChip({ label, delay }: { label: string; delay: number }) {
    const ref = useRef<HTMLSpanElement>(null)

    useEffect(() => {
        const el = ref.current
        if (!el) return
        const num = parseFloat(label.replace(/[^\d.]/g, ''))
        if (isNaN(num)) return

        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    countUp(el, 0, num, 1000, label.replace(/[\d.]+/, ''))
                    io.disconnect()
                }
            },
            { threshold: 0.5 }
        )
        io.observe(el)
        return () => io.disconnect()
    }, [label])

    return (
        <span
            ref={ref}
            style={{ animationDelay: `${delay}ms` }}
            className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full px-3 py-0.5 text-[10px] font-semibold shadow-lg transition-all duration-300 hover:scale-105"
        >
      {label}
    </span>
    )
}

/* ──────────────────────────  TOGGLE  ────────────────────────── */

function Toggle({
                    tab,
                    setTab,
                }: {
    tab: 'work' | 'edu'
    setTab: (v: 'work' | 'edu') => void
}) {
    return (
        <div className="flex justify-center mb-8">
            <div className="relative isolate overflow-hidden rounded-full border border-white/25 backdrop-blur-sm">
        <span
            className={`
            absolute inset-y-0 rounded-full bg-white/10 transition-all duration-500
            ${tab === 'work' ? 'left-1 right-1/2' : 'left-1/2 right-1'}
          `}
        />
                <span className="pointer-events-none absolute -inset-1 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent animate-[shimmer_4s_ease-in-out_infinite]" />
                {(['work', 'edu'] as const).map((label) => (
                    <button
                        key={label}
                        onClick={() => setTab(label)}
                        className={`
              relative z-10 px-12 py-2 font-medium transition-all
              ${tab === label ? 'text-white scale-105' : 'text-white/50 hover:text-white'}
            `}
                    >
                        {label === 'work' ? 'Work' : 'Education'}
                    </button>
                ))}
            </div>
        </div>
    )
}

/* ──────────────────────────  CARDS  ────────────────────────── */

function WorkCard({ item, index }: { item: any; index: number }) {
    return (
        <li
            className="timeline-card relative flex pl-20 pr-5 py-4 before:absolute before:left-16 before:top-0 before:h-full before:w-px before:bg-white/10 hover:-translate-y-1 transition-transform duration-200 group"
            style={{ animationDelay: `${index * 70}ms` }}
        >
            <div className="absolute left-5 top-4 transition-transform duration-300 group-hover:scale-105">
                <Badge logo={item.logo} emoji={item.emoji} type="work" />
            </div>

            <div className="space-y-0.5 flex-1">
                <time className="block text-[11px] text-white/50 group-hover:text-sky-300">
                    {item.period}
                </time>
                <h3 className="text-sm font-semibold text-white group-hover:text-sky-400 flex items-center gap-1">
                    {item.heading}
                    {item.liveUrl && (
                        <a
                            href={item.liveUrl}
                            target="_blank"
                            className="text-gray-400 hover:text-white"
                        >
                            <ExternalLink size={12} />
                        </a>
                    )}
                </h3>
                <p className="text-[13px] text-white/70">{item.subHeading}</p>
                {item.subText && (
                    <p className="text-[11px] leading-snug text-white/40">
                        {item.subText}
                    </p>
                )}

                {item.metrics && (
                    <div className="mt-1 flex flex-wrap gap-1">
                        {item.metrics.map((m: string, i: number) => (
                            <MetricChip key={m} label={m} delay={i * 100} />
                        ))}
                    </div>
                )}

                {item.tech && (
                    <div className="mt-1 flex flex-wrap gap-1">
                        {item.tech.map((t: string) => (
                            <span
                                key={t}
                                className="rounded bg-white/5 px-1.5 py-0.5 text-[9px] uppercase tracking-wide text-white/50"
                            >
                {t}
              </span>
                        ))}
                    </div>
                )}
                
                {item.detailUrl && (
                    <div className="mt-2">
                        <a
                            href={item.detailUrl}
                            className="inline-block px-3 py-1 rounded bg-sky-500 text-white font-semibold hover:bg-sky-600 transition text-xs"
                        >
                            View Project
                        </a>
                    </div>
                )}
            </div>

            {item.ribbon && (
                <span
                    className={`
            absolute -top-1 -right-1 rounded px-1.5 py-[1px] text-[9px] font-bold
            ${
                        item.ribbon === 'LIVE'
                            ? 'bg-emerald-500 text-black'
                            : item.ribbon === 'HOT'
                                ? 'bg-amber-500 text-black'
                                : 'bg-blue-500 text-white'
                    }
          `}
                >
          {item.ribbon}
        </span>
            )}
        </li>
    )
}

function EduCard({ item, index }: { item: any; index: number }) {
    return (
        <li
            className="timeline-card relative flex pl-20 pr-5 py-4 hover:-translate-y-1 transition-transform duration-200 group"
            style={{ animationDelay: `${index * 70}ms` }}
        >
            <div className="absolute left-5 top-4 transition-transform duration-300 group-hover:scale-105">
                <Badge logo={item.logo} emoji={item.emoji} type="edu" />
            </div>

            <div className="space-y-0.5">
                <time className="block text-[11px] text-white/50">{item.period}</time>
                <h3 className="text-sm font-semibold text-white group-hover:text-blue-400">
                    {item.heading}
                </h3>
                <p className="text-[13px] text-white/70">{item.subHeading}</p>

                {item.subText && (
                    <p className="text-[11px] leading-snug text-white/40">
                        {item.subText}
                    </p>
                )}

                {item.metrics && (
                    <div className="mt-1 flex flex-wrap gap-1">
                        {item.metrics.map((m: string, i: number) => (
                            <MetricChip key={m} label={m} delay={i * 100} />
                        ))}
                    </div>
                )}

                {item.docUrl && (
                    <a
                        href={item.docUrl}
                        target="_blank"
                        className="mt-1 inline-flex items-center gap-1 text-blue-400 hover:text-cyan-400 text-xs"
                    >
                        <Download size={12} /> PDF
                    </a>
                )}
                
                {item.detailUrl && (
                    <a
                        href={item.detailUrl}
                        className="mt-1 inline-block px-3 py-1 rounded bg-teal-500 text-white font-semibold hover:bg-teal-600 transition text-xs"
                    >
                        View Project
                    </a>
                )}
            </div>

            {item.ribbon && (
                <span className="absolute -top-1 -right-1 rounded bg-blue-500 px-1.5 py-[1px] text-[9px] font-bold text-white">
          {item.ribbon}
        </span>
            )}
        </li>
    )
}

/* ──────────────────────────  TIMELINE  ────────────────────────── */

function Timeline() {
    const [tab, setTab] = useState<'work' | 'edu'>('work')
    const data = tab === 'work' ? experience.work : experience.education

    useEffect(() => {
        const io = createAnimationObserver('.timeline-card', 'animate-card', {
            threshold: 0.15,
        })
        return () => io.disconnect()
    }, [tab])

    /* layout tweaks: vertical timeline for work, 2‑col grid for edu */
    const listWrapperClass =
        tab === 'work'
            ? 'relative space-y-2'
            : 'grid gap-6 sm:grid-cols-2 lg:grid-cols-2'

    return (
        <section
            id="experience"
            className="relative mx-auto py-12 md:py-16 lg:py-20 max-w-6xl px-4 md:px-8 lg:px-16"
        >
            <Backdrop />
            <h2 className="text-center text-4xl md:text-5xl font-bold text-white mb-4">
                Experience
            </h2>
            <p className="text-center text-gray-400 mb-12 text-lg">
                Building impactful solutions across domains
            </p>
            <Toggle tab={tab} setTab={setTab} />

            <div className={listWrapperClass}>
                {tab === 'work' && (
                    <span
                        aria-hidden
                        className="absolute left-[4.5rem] top-0 h-full w-px bg-gradient-to-b from-transparent via-white/20 to-transparent"
                    />
                )}

                {(data ?? []).map((item: any, i: number) =>
                    item.type === 'work' ? (
                        <WorkCard key={item.id} item={item} index={i} />
                    ) : (
                        <EduCard key={item.id} item={item} index={i} />
                    )
                )}
            </div>
        </section>
    )
}

/* ──────────────────────────  BACKDROP  ────────────────────────── */

function Backdrop() {
    return (
        <>
            <div className="pointer-events-none absolute -z-10 left-1/2 top-0 h-[900px] w-[900px] -translate-x-1/2 rounded-full bg-sky-400/5 blur-[160px]" />
            <div className="pointer-events-none absolute -z-10 right-0 top-1/3 h-[600px] w-[600px] -rotate-45 bg-gradient-to-b from-fuchsia-400/5 via-transparent to-sky-400/0 blur-[160px]" />
        </>
    )
}

export default function WorkExperienceEnhanced() {
    return <Timeline />
}
