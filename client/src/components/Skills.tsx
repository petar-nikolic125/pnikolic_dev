/* ───────── src/components/Skills.tsx ─────────
   JSON‑driven skills showcase · 4 × 2 board
   Long labels wrap     ·     bins keep their 4‑column feel
────────────────────────────────────────────── */

import { useEffect, useRef, useState } from 'react'
import { skills as raw } from '@/hooks/useSkills'

/* -------- always end with exactly 8 bins (4 × 2) -------- */
const COLUMNS = 4
const ROWS    = 2
const CELLS   = COLUMNS * ROWS

const skills = (() => {
  const arr = [...raw]
  while (arr.length < CELLS) arr.push({ category: '', items: [] })
  return arr.slice(0, CELLS)
})()

export default function Skills() {
  const ref = useRef<HTMLElement | null>(null)
  const [show, setShow] = useState(false)

  /* one‑shot fade‑in */
  useEffect(() => {
    const io = new IntersectionObserver(
        ([e]) => e.isIntersecting && setShow(true),
        { threshold: 0.25 }
    )
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  return (
      <section
          id="skills"
          ref={ref}
          className="mx-auto max-w-screen-xl px-6 md:px-10 lg:px-16
                 py-12 md:py-16 lg:py-20"
      >
        <h2 className="mb-12 md:mb-16 text-center font-serif font-bold
                     text-4xl md:text-5xl">
          Skills
        </h2>

        {/* outer 4 × 2 board */}
        <div
            className="
          grid gap-y-16 gap-x-12
          sm:grid-cols-2
          md:grid-cols-4 md:grid-rows-2 md:grid-flow-col
        "
        >
          {skills.map((col, idx) =>
              col.category ? (
                  <div
                      key={col.category}
                      className={`flex flex-col items-center
                          ${show ? 'animate-fade-up' : 'opacity-0'}`}
                      style={{ animationDelay: `${idx * 80}ms` }}
                  >
                    <h3 className="mb-7 text-center font-semibold
                             text-lg md:text-xl">
                      {col.category}
                    </h3>

                    {/* ► fixed three columns under md, four from md↑
                  ► keeps equal column widths so bins NEVER collapse
                  ► long labels wrap with fluid font‑size           */}
                    <ul
                        className="
                  grid gap-x-6 gap-y-8 place-items-center
                  grid-cols-3
                  md:grid-cols-4
                "
                    >
                      {col.items.map(({ label, Icon }, i) => (
                          <li
                              key={label}
                              className="flex flex-col items-center text-neutral-300
                               transition-transform
                               hover:-translate-y-1 hover:scale-110"
                              style={{ animationDelay: `${i * 30}ms` }}
                          >
                            <Icon size={32} className="mb-2" />
                            <span
                                className="
                        text-center leading-snug break-words whitespace-normal
                        max-w-[6rem]
                        text-[clamp(0.6rem,0.75vw,0.75rem)]
                      "
                            >
                      {label}
                    </span>
                          </li>
                      ))}
                    </ul>
                  </div>
              ) : (
                  <div key={`pad-${idx}`} className="invisible" />
              )
          )}
        </div>
      </section>
  )
}
