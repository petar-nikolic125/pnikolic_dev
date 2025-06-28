/* ------------------------------------------------------------------
   ProjectsEnhanced.tsx  – image banners + full filter UI
------------------------------------------------------------------- */
import { useState, useEffect, useRef, useMemo } from "react";
import { Search, Filter, ChevronDown, ExternalLink } from "lucide-react";
import {
  projects,                // make sure each project has .image (string) now
  technologies,
  categoryOptions,
  typeOptions,
} from "@/data/portfolio";
import { createAnimationObserver } from "@/lib/animations";

interface ProjectFilters {
  search: string;
  technology: string[];
  category: string[];
  type: string[];
}

export default function ProjectsEnhanced() {
  /* ───────────────────────────── state & refs ────────────────────────────── */
  const [filters, setFilters] = useState<ProjectFilters>({
    search: "",
    technology: [],
    category: [],
    type: [],
  });
  const [expanded, setExpanded] = useState({
    technology: false,
    category: false,
    type: false,
  });
  const searchRef = useRef<HTMLInputElement>(null);

  /* ───────────────────────────── animations init ─────────────────────────── */
  useEffect(() => {
    const obs = createAnimationObserver(
        ".project-card",
        "project-card-entered",
        { threshold: 0.05, rootMargin: "50px" }
    );
    return () => obs.disconnect();
  }, []);

  /* ───────────────────────────── filtering logic ─────────────────────────── */
  const filtered = useMemo(() => {
    return projects.filter((p) => {
      /* search text */
      if (filters.search) {
        const q = filters.search.toLowerCase();
        const hit =
            p.name.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q) ||
            p.technologies.some((t) => t.toLowerCase().includes(q));
        if (!hit) return false;
      }
      /* tech chips */
      if (
          filters.technology.length &&
          !filters.technology.some((t) => p.technologies.includes(t))
      )
        return false;
      /* category */
      if (filters.category.length && !filters.category.includes(p.category))
        return false;
      /* type */
      if (filters.type.length && !filters.type.includes(p.type)) return false;

      return true;
    });
  }, [filters]);

  /* ───────────────────────────── tiny helpers ────────────────────────────── */
  const flip = (k: keyof typeof expanded) =>
      setExpanded((s) => ({ ...s, [k]: !s[k] }));
  const toggle = (k: keyof Omit<ProjectFilters, "search">, v: string) =>
      setFilters((f) => ({
        ...f,
        [k]: f[k].includes(v) ? f[k].filter((x) => x !== v) : [...f[k], v],
      }));
  const clear = () => {
    setFilters({ search: "", technology: [], category: [], type: [] });
    searchRef.current && (searchRef.current.value = "");
  };

  const activeCount =
      filters.technology.length +
      filters.category.length +
      filters.type.length +
      (filters.search ? 1 : 0);

  /* ───────────────────────────── ui starts here ──────────────────────────── */
  return (
      <section id="projects" className="py-12 md:py-16 lg:py-20 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
        {/* heading */}
        <header className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold fg-base mb-4 fade-in-up">
            <span className="shimmer-text">Projects</span>
          </h2>
          <p className="text-xl fg-faint fade-in-up delay-150">
            Explore my work across different domains
          </p>
        </header>

        {/* search + filter */}
        <div className="mb-10 space-y-4">
          {/* search bar */}
          <div className="relative fade-in-up delay-225 group">
            <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 fg-faint group-focus-within:text-[hsl(var(--accent-from))] transition-colors duration-300"
                size={20}
            />
            <input
                ref={searchRef}
                type="text"
                placeholder="Search projects, technologies…"
                className="w-full pl-12 pr-4 py-3 rounded-lg bg-[hsl(var(--bg-surface)/.6)] border border-[hsl(var(--border-color))] fg-base placeholder:fg-faint 
                         focus:outline-none focus:border-[hsl(var(--accent-from))] focus:ring-2 focus:ring-[hsl(var(--ring-color))] 
                         focus:bg-[hsl(var(--bg-surface)/.8)] transition-all duration-300 hover-lift"
                onChange={(e) =>
                    setFilters((f) => ({ ...f, search: e.target.value }))
                }
            />
          </div>

          {/* collapsible filter panels */}
          <FilterPanel
              label="Technologies"
              color="indigo"
              count={filters.technology.length}
              open={expanded.technology}
              onToggle={() => flip("technology")}
          >
            <CheckboxGrid
                options={technologies}
                checked={filters.technology}
                onChange={(v) => toggle("technology", v)}
            />
          </FilterPanel>

          <FilterPanel
              label="Categories"
              color="purple"
              count={filters.category.length}
              open={expanded.category}
              onToggle={() => flip("category")}
          >
            <CheckboxGrid
                options={categoryOptions}
                checked={filters.category}
                onChange={(v) => toggle("category", v)}
            />
          </FilterPanel>
        </div>

        {/* active-filter summary */}
        {activeCount > 0 && (
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm fg-faint">
                {filtered.length} / {projects.length} shown
              </p>
              <button
                  onClick={clear}
                  className="text-sm text-[hsl(var(--accent-from))] hover:text-[hsl(var(--accent-to))] transition"
              >
                Clear all
              </button>
            </div>
        )}

        {/* project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((p, i) => (
              <article
                  key={p.id}
                  className="project-card group relative rounded-xl border border-[hsl(var(--border-color))] bg-[hsl(var(--bg-surface)/.6)] 
                           overflow-hidden transition-all duration-500 hover-lift
                           hover:border-[hsl(var(--accent-from))] hover:shadow-2xl hover:shadow-[hsl(var(--black-900)/.55)]"
                  style={{ animationDelay: `${i * 60}ms` }}
              >
                {/* Premium hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--accent-from)/.15)] to-transparent opacity-0 
                             group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10" />
                
                {/* image banner with zoom effect */}
                <div className="relative overflow-hidden">
                  {p.image ? (
                      <img
                          src={p.image}
                          alt={p.name}
                          loading="lazy"
                          className="w-full aspect-[16/9] object-cover object-center 
                                   transform transition-all duration-700 
                                   group-hover:scale-110 group-hover:rotate-1"
                      />
                  ) : (
                      <div className="w-full aspect-[16/9] bg-gradient-to-br from-[hsl(var(--bg-elevated))] to-[hsl(var(--bg-surface)/.6)] 
                                    relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent 
                                      -translate-x-full group-hover:translate-x-full transition-transform duration-1500" />
                      </div>
                  )}
                </div>

                {/* content */}
                <div className="p-6 space-y-4 relative z-20">
                  <header className="flex justify-between items-start">
                    <h3 className="text-xl font-bold fg-base group-hover:text-[hsl(var(--accent-from))] 
                               transition-all duration-300 group-hover:translate-x-1">
                      {p.name}
                    </h3>
                    {p.liveUrl && (
                        <a
                            href={p.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="fg-faint hover:text-[hsl(var(--accent-from))] transition-all duration-300
                                     hover:scale-110 hover:rotate-12"
                            title="View live"
                        >
                          <ExternalLink size={18} />
                        </a>
                    )}
                  </header>

                  {p.category && (
                      <span className="chip chip-blue inline-block hover:scale-105 transition-transform duration-300">
                        {p.category}
                      </span>
                  )}

                  <p className="fg-subtle line-clamp-3 group-hover:fg-base transition-colors duration-500">
                    {p.description}
                  </p>

                  {/* tech pills with stagger animation */}
                  <div className="flex flex-wrap gap-2">
                    {p.technologies.slice(0, 4).map((t, index) => {
                      const chipColors = ['chip-blue', 'chip-lime', 'chip-amber', 'chip-fuchsia', 'chip-cyan'];
                      const colorClass = chipColors[index % chipColors.length];
                      return (
                        <span
                            key={t}
                            className={`chip ${colorClass}`}
                        >
                    {t}
                  </span>
                      );
                    })}
                    {p.technologies.length > 4 && (
                        <span className="text-[11px] px-2 py-1 fg-faint">
                    +{p.technologies.length - 4}
                  </span>
                    )}
                  </div>
                </div>

                {/* subtle overlay on hover */}
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[hsl(var(--brand-sky)/0)] via-transparent to-[hsl(var(--brand-fuchsia)/0)] group-hover:from-[hsl(var(--brand-sky)/.08)] group-hover:to-[hsl(var(--brand-fuchsia)/.08)] transition opacity-0 group-hover:opacity-100" />
              </article>
          ))}
        </div>

        {/* empty-state */}
        {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="fg-faint mb-4">No projects match your filters.</p>
              <button
                  onClick={clear}
                  className="text-[hsl(var(--accent-from))] hover:text-[hsl(var(--accent-to))] transition"
              >
                Reset filters
              </button>
            </div>
        )}
      </section>
  );
}

/* ————————————————————— tiny composables ——————————————————————— */
function FilterPanel({
                       children,
                       label,
                       color,
                       count,
                       open,
                       onToggle,
                     }: {
  children: React.ReactNode;
  label: string;
  color: "indigo" | "purple";
  count: number;
  open: boolean;
  onToggle: () => void;
}) {
  const colorClasses = {
    indigo: "bg-indigo-500/10 text-indigo-300 border-indigo-500/20",
    purple: "bg-purple-500/10 text-purple-300 border-purple-500/20",
  };

  return (
      <div className="border border-[hsl(var(--border-color))] rounded-lg bg-[hsl(var(--bg-surface)/.4)] overflow-hidden">
        <button
            onClick={onToggle}
            className="w-full px-4 py-3 flex items-center justify-between hover:bg-[hsl(var(--bg-surface)/.6)] transition-colors"
        >
          <div className="flex items-center gap-3">
            <Filter size={16} className="fg-faint" />
            <span className="font-medium fg-base">{label}</span>
            {count > 0 && (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${colorClasses[color]}`}>
            {count}
          </span>
            )}
          </div>
          <ChevronDown
              className={`fg-faint transition-transform duration-200 ${
                  open ? "rotate-180" : ""
              }`}
              size={16}
          />
        </button>
        {open && (
            <div className="px-4 pb-4 border-t border-[hsl(var(--border-color)/.5)]">
              {children}
            </div>
        )}
      </div>
  );
}

function CheckboxGrid({
                        options,
                        checked,
                        onChange,
                      }: {
  options: string[];
  checked: string[];
  onChange: (value: string) => void;
}) {
  return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 pt-3">
        {options.map((option) => (
            <label
                key={option}
                className="flex items-center gap-2 cursor-pointer hover:bg-[hsl(var(--bg-surface)/.6)] p-2 rounded transition-colors"
            >
              <input
                  type="checkbox"
                  checked={checked.includes(option)}
                  onChange={() => onChange(option)}
                  className="rounded border-[hsl(var(--border-color))] bg-transparent focus:ring-[hsl(var(--accent-from))] focus:ring-offset-0"
              />
              <span className="text-sm fg-base truncate">{option}</span>
            </label>
        ))}
      </div>
  );
}