// src/components/ProjectsEnhanced.tsx
import React, { useState, useRef, useMemo } from "react";
import { Search, Filter, ChevronDown, ExternalLink } from "lucide-react";
import { Link } from "wouter";
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

export default function ProjectsEnhanced(): JSX.Element {
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

    const filtered = useMemo(
        () =>
            projects.filter((p) => {
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
                if (filters.category.length && p.category && !filters.category.includes(p.category))
                    return false;
                // 4) type
                if (filters.type.length && p.type && !filters.type.includes(p.type)) return false;

                return true;
            }),
        [filters]
    );

    // helpers
    const flip = (k: keyof typeof expanded) =>
        setExpanded((s) => ({ ...s, [k]: !s[k] }));
    const toggle = (k: keyof Omit<ProjectFilters, "search">, v: string) =>
        setFilters((f) => ({
            ...f,
            [k]: f[k].includes(v) ? f[k].filter((x) => x !== v) : [...f[k], v],
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
            aria-labelledby="projects-heading"
            className="py-12 md:py-16 lg:py-20 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto"
            role="region"
        >
            {/* heading */}
            <header className="text-center mb-12">
                <h2
                    id="projects-heading"
                    className="text-4xl md:text-5xl font-bold fg-base mb-4"
                >
                    <span className="shimmer-text">Projects</span>
                </h2>
                <p className="text-xl fg-faint">
                    Explore my work across different domains
                </p>
            </header>

            {/* search + filters */}
            <div className="mb-10 space-y-4">
                {/* search bar */}
                <div className="relative" role="search">
                    <label htmlFor="project-search" className="sr-only">
                        Search projects
                    </label>
                    <Search
                        className="absolute left-4 top-1/2 -translate-y-1/2 fg-faint"
                        size={20}
                    />
                    <input
                        ref={searchRef}
                        id="project-search"
                        type="text"
                        placeholder="Search projects, technologies…"
                        className="w-full pl-12 pr-4 py-3 rounded-lg bg-[hsl(var(--bg-surface)/.6)] border fg-base placeholder:fg-faint focus:outline focus:ring-2 focus:ring-[hsl(var(--accent-from))]"
                        onChange={(e) =>
                            setFilters((f) => ({ ...f, search: e.target.value }))
                        }
                    />
                </div>

                <fieldset className="space-y-4">
                    {/* Technologies */}
                    <FilterPanel
                        label="Technologies"
                        color="indigo"
                        count={filters.technology.length}
                        open={expanded.technology}
                        onToggle={() => flip("technology")}
                        ariaControls="tech-options"
                    >
                        <CheckboxGrid
                            id="tech-options"
                            options={technologies}
                            checked={filters.technology}
                            onChange={(v) => toggle("technology", v)}
                        />
                    </FilterPanel>

                    {/* Categories */}
                    <FilterPanel
                        label="Categories"
                        color="purple"
                        count={filters.category.length}
                        open={expanded.category}
                        onToggle={() => flip("category")}
                        ariaControls="category-options"
                    >
                        <CheckboxGrid
                            id="category-options"
                            options={categoryOptions}
                            checked={filters.category}
                            onChange={(v) => toggle("category", v)}
                        />
                    </FilterPanel>

                    {/* Types */}
                    <FilterPanel
                        label="Types"
                        color="fuchsia"
                        count={filters.type.length}
                        open={expanded.type}
                        onToggle={() => flip("type")}
                        ariaControls="type-options"
                    >
                        <CheckboxGrid
                            id="type-options"
                            options={typeOptions}
                            checked={filters.type}
                            onChange={(v) => toggle("type", v)}
                        />
                    </FilterPanel>
                </fieldset>
            </div>

            {/* summary + clear */}
            {activeCount > 0 && (
                <div className="flex items-center justify-between mb-6">
                    <p className="text-sm fg-faint" aria-live="polite">
                        {filtered.length} / {projects.length} shown
                    </p>
                    <button
                        onClick={clear}
                        className="text-sm text-[hsl(var(--accent-from))] hover:text-[hsl(var(--accent-to))] focus:underline"
                    >
                        Clear all
                    </button>
                </div>
            )}

            {/* project grid */}
            <ul
                role="list"
                aria-label="Filtered project list"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
                {filtered.map((p, i) => (
                    <li key={p.id}>
                        <article
                            tabIndex={0}
                            aria-labelledby={`proj-${p.id}-title`}
                            className="group relative rounded-xl border bg-[hsl(var(--bg-surface)/.6)] hover-lift transition-all focus:outline focus:ring-2 cursor-pointer"
                            style={{ animationDelay: `${i * 60}ms` }}
                            onClick={() => window.location.href = `/projects/${p.slug || p.id}`}
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
                                    <h3 id={`proj-${p.id}-title`} className="text-xl font-bold">
                                        {p.name}
                                    </h3>
                                    {p.liveUrl && (
                                        <span
                                            aria-label={`Live site for ${p.name}`}
                                            className="fg-faint text-[hsl(var(--accent-from))]"
                                        >
                                            <ExternalLink size={18} />
                                        </span>
                                    )}
                                </header>
                                {p.category && (
                                    <span className="chip chip-blue">{p.category}</span>
                                )}
                                <p className="fg-subtle line-clamp-3">{p.description}</p>
                                <ul
                                    className="flex flex-wrap gap-2"
                                    aria-label="Technologies used"
                                >
                                    {p.technologies.slice(0, 4).map((t, idx) => (
                                        <li key={t}>
                      <span
                          className={`chip chip-${
                              ["blue", "lime", "amber", "fuchsia", "cyan"][idx % 5]
                          }`}
                      >
                        {t}
                      </span>
                                        </li>
                                    ))}
                                    {p.technologies.length > 4 && (
                                        <li>
                      <span className="text-[11px] px-2 py-1 fg-faint">
                        +{p.technologies.length - 4}
                      </span>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </article>
                    </li>
                ))}
            </ul>

            {/* empty state */}
            {filtered.length === 0 && (
                <div className="text-center py-20" role="alert">
                    <p className="fg-faint mb-4">No projects match your filters.</p>
                    <button
                        onClick={clear}
                        className="text-[hsl(var(--accent-from))] hover:text-[hsl(var(--accent-to))] focus:underline"
                    >
                        Reset filters
                    </button>
                </div>
            )}
        </section>
    );
}

// ——— tiny composables ———

interface PanelProps {
    children: React.ReactNode;
    label: string;
    color: "indigo" | "purple" | "fuchsia";
    count: number;
    open: boolean;
    onToggle: () => void;
    ariaControls: string;
}
function FilterPanel({
                         children,
                         label,
                         color,
                         count,
                         open,
                         onToggle,
                         ariaControls,
                     }: PanelProps): JSX.Element {
    const colorClasses = {
        indigo: "bg-indigo-500/10 text-indigo-300 border-indigo-500/20",
        purple: "bg-purple-500/10 text-purple-300 border-purple-500/20",
        fuchsia: "bg-fuchsia-500/10 text-fuchsia-300 border-fuchsia-500/20",
    };
    return (
        <div className="border rounded-lg overflow-hidden">
            <button
                onClick={onToggle}
                aria-expanded={open}
                aria-controls={ariaControls}
                className="w-full flex items-center justify-between p-4 bg-[hsl(var(--bg-surface)/.4)] hover:bg-[hsl(var(--bg-surface)/.6)] transition"
            >
        <span className="flex items-center gap-2 fg-base font-medium">
          <Filter size={16} className="fg-faint" />
            {label}
            {count > 0 && (
                <span
                    className={`px-2 py-1 text-xs font-medium ${
                        colorClasses[color]
                    }`}
                >
              {count}
            </span>
            )}
        </span>
                <ChevronDown
                    size={16}
                    className={`fg-faint transition-transform ${
                        open ? "rotate-180" : ""
                    }`}
                />
            </button>
            <div
                id={ariaControls}
                className={`overflow-hidden transition-[max-height] ${
                    open ? "max-h-80" : "max-h-0"
                }`}
                style={{ transitionDuration: "300ms" }}
            >
                {children}
            </div>
        </div>
    );
}

function CheckboxGrid({
                          id,
                          options,
                          checked,
                          onChange,
                      }: {
    id: string;
    options: string[];
    checked: string[];
    onChange: (value: string) => void;
}): JSX.Element {
    return (
        <div
            role="group"
            aria-labelledby={`${id}-label`}
            className="p-4 grid grid-cols-2 md:grid-cols-3 gap-2"
        >
      <span id={`${id}-label`} className="sr-only">
        Select {id.replace("-options", "")}
      </span>
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
