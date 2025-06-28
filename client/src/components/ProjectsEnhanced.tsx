// src/components/ProjectsEnhanced.tsx
import { useState, useRef, useMemo } from "react";
import { Search, Filter, ChevronDown, ExternalLink } from "lucide-react";
import {
    projects,
    technologies,
    categoryOptions,
    typeOptions,
} from "@/data/portfolio";

interface ProjectFilters {
    search: string;
    technology: string[];
    category: string[];
    type: string[];
}

export default function ProjectsEnhanced() {
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

    const filtered = useMemo(() => {
        return projects.filter((p) => {
            // 1) search text
            if (filters.search) {
                const q = filters.search.toLowerCase();
                const hit =
                    p.name.toLowerCase().includes(q) ||
                    p.description.toLowerCase().includes(q) ||
                    p.technologies.some((t) => t.toLowerCase().includes(q));
                if (!hit) return false;
            }
            // 2) tech
            if (
                filters.technology.length &&
                !filters.technology.some((t) => p.technologies.includes(t))
            )
                return false;
            // 3) category
            if (filters.category.length && !filters.category.includes(p.category))
                return false;
            // 4) type
            if (filters.type.length && !filters.type.includes(p.type)) return false;

            return true;
        });
    }, [filters]);

    // helpers
    const flip = (k: keyof typeof expanded) =>
        setExpanded((s) => ({ ...s, [k]: !s[k] }));
    const toggle = (k: keyof Omit<ProjectFilters, "search">, v: string) =>
        setFilters((f) => ({
            ...f,
            [k]: f[k].includes(v)
                ? f[k].filter((x) => x !== v)
                : [...f[k], v],
        }));
    const clear = () => {
        setFilters({ search: "", technology: [], category: [], type: [] });
        if (searchRef.current) searchRef.current.value = "";
    };

    const activeCount =
        filters.technology.length +
        filters.category.length +
        filters.type.length +
        (filters.search ? 1 : 0);

    return (
        <section
            id="projects"
            className="py-12 md:py-16 lg:py-20 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto"
        >
            {/* heading */}
            <header className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold fg-base mb-4">
                    <span className="shimmer-text">Projects</span>
                </h2>
                <p className="text-xl fg-faint">Explore my work across different domains</p>
            </header>

            {/* search + filters */}
            <div className="mb-10 space-y-4">
                {/* search bar */}
                <div className="relative group">
                    <Search
                        className="absolute left-4 top-1/2 -translate-y-1/2 fg-faint transition-colors"
                        size={20}
                    />
                    <input
                        ref={searchRef}
                        type="text"
                        placeholder="Search projects, technologies…"
                        className="w-full pl-12 pr-4 py-3 rounded-lg bg-[hsl(var(--bg-surface)/.6)] border fg-base placeholder:fg-faint focus:outline-none focus:border-[hsl(var(--accent-from))] focus:ring-2"
                        onChange={(e) =>
                            setFilters((f) => ({ ...f, search: e.target.value }))
                        }
                    />
                </div>

                {/* Tech panel */}
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

                {/* Category panel */}
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

            {/* summary + clear */}
            {activeCount > 0 && (
                <div className="flex items-center justify-between mb-6">
                    <p className="text-sm fg-faint">
                        {filtered.length} / {projects.length} shown
                    </p>
                    <button
                        onClick={clear}
                        className="text-sm text-[hsl(var(--accent-from))] hover:text-[hsl(var(--accent-to))]"
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
                        className="group relative rounded-xl border bg-[hsl(var(--bg-surface)/.6)] hover-lift transition-all"
                        style={{ animationDelay: `${i * 60}ms` }}
                    >
                        {/* image */}
                        <div className="relative overflow-hidden">
                            <img
                                src={p.image}
                                alt={p.name}
                                loading="lazy"
                                className="w-full aspect-[16/9] object-cover object-center"
                            />
                        </div>

                        {/* content */}
                        <div className="p-6 space-y-4">
                            <header className="flex justify-between items-start">
                                <h3 className="text-xl font-bold group-hover:text-[hsl(var(--accent-from))]">
                                    {p.name}
                                </h3>
                                {p.liveUrl && (
                                    <a
                                        href={p.liveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="fg-faint hover:text-[hsl(var(--accent-from))]"
                                    >
                                        <ExternalLink size={18} />
                                    </a>
                                )}
                            </header>
                            {p.category && (
                                <span className="chip chip-blue">{p.category}</span>
                            )}
                            <p className="fg-subtle line-clamp-3">{p.description}</p>
                            <div className="flex flex-wrap gap-2">
                                {p.technologies.slice(0, 4).map((t, idx) => (
                                    <span key={t} className={`chip chip-${["blue","lime","amber","fuchsia","cyan"][idx % 5]}`}>
                    {t}
                  </span>
                                ))}
                                {p.technologies.length > 4 && (
                                    <span className="text-[11px] px-2 py-1 fg-faint">
                    +{p.technologies.length - 4}
                  </span>
                                )}
                            </div>
                        </div>
                    </article>
                ))}
            </div>

            {filtered.length === 0 && (
                <div className="text-center py-20">
                    <p className="fg-faint mb-4">No projects match your filters.</p>
                    <button
                        onClick={clear}
                        className="text-[hsl(var(--accent-from))] hover:text-[hsl(var(--accent-to))]"
                    >
                        Reset filters
                    </button>
                </div>
            )}
        </section>
    );
}

// ——— composables ———

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
        <div className="border rounded-lg overflow-hidden">
            <button
                onClick={onToggle}
                className="w-full px-4 py-3 flex justify-between hover:bg-[hsl(var(--bg-surface)/.6)]"
            >
        <span className="flex items-center gap-2 fg-base font-medium">
          <Filter size={16} className="fg-faint" />
            {label}
            {count > 0 && (
                <span className={`px-2 py-1 text-xs font-medium ${colorClasses[color]}`}>
              {count}
            </span>
            )}
        </span>
                <ChevronDown
                    size={16}
                    className={`fg-faint transition-transform ${open ? "rotate-180" : ""}`}
                />
            </button>
            {open && <div className="px-4 pb-4 border-t">{children}</div>}
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
            {options.map((opt) => (
                <label key={opt} className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={checked.includes(opt)}
                        onChange={() => onChange(opt)}
                        className="rounded border bg-transparent focus:ring-[hsl(var(--accent-from))]"
                    />
                    <span className="text-sm fg-base truncate">{opt}</span>
                </label>
            ))}
        </div>
    );
}
