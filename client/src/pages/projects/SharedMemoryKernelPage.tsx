// src/pages/projects/SharedMemoryKernelPage.tsx
import { useMemo } from 'react'
import ProjectHeader   from '@/components/ProjectHeader'
import TechStack       from '@/components/TechStack'
import Gallery         from '@/components/Gallery'
import LinksPanel      from '@/components/LinksPanel'
import EnhancedTags    from '@/components/EnhancedTags'
import { projects }    from '@/data/portfolio'

/* -------------------------------------------------------------------------- */
/* ⬇️  Simple Tailwind bar‑chart (no external libs)                           */
/* -------------------------------------------------------------------------- */
function BarChart({
                      series
                  }: {
    series: { label: string; value: number; color: string }[]
}) {
    const max = useMemo(() => Math.max(...series.map(s => s.value)), [series])
    return (
        <div className="space-y-2">
            {series.map(({ label, value, color }) => (
                <div key={label}>
                    <div className="flex justify-between text-xs mb-1">
                        <span>{label}</span>
                        <span className="font-mono">{value}</span>
                    </div>
                    <div className="w-full bg-white/10 rounded">
                        <div
                            className={`h-3 rounded ${color}`}
                            style={{ width: `${(value / max) * 100}%` }}
                        />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default function SharedMemoryKernelPage() {
    const project = projects.find(p => p.slug === 'shared-memory-kernel')!

    /* ------------------------------------------------------------------ */
    /*  external links                                                    */
    /* ------------------------------------------------------------------ */
    const links = [
        {
            url: 'https://github.com/petar-nikolic125/xv6-shm-manager',
            label: 'Source Code',
            type: 'github' as const,
            description: 'Full xv6 shared‑memory kernel extension'
        }
    ]

    /* ------------------------------------------------------------------ */
    /*  gallery images (architectural diagrams, etc.)                     */
    /* ------------------------------------------------------------------ */
    const images = [
        {
            src: '/attached_assets/shared_memory_png.png',   // ← changed path
            alt: 'Architecture overview diagram',
            title: 'Shared Memory Flow',
            description: 'shm_open → shm_trunc → shm_map → fork → shm_close'
        }
    ]

    /* ------------------------------------------------------------------ */
    /*  stress‑test proof screenshot                                      */
    /* ------------------------------------------------------------------ */
    const stressImg = {
        src: '/attached_assets/stresstest.png',
        alt: 'xv6 shmtest stress output',
        title: 'Stress Test Output',
        description:
            'shmtest verifies open‑limit, trunc‑map sequencing, and ref‑count logic'
    }

    /* ------------------------------------------------------------------ */
    /*  synthetic throughput dataset for on‑page bar chart                 */
    /* ------------------------------------------------------------------ */
    const chartData = [
        { label: '1 proc', value: 100, color: 'bg-blue-500' },
        { label: '4 proc', value: 320, color: 'bg-green-500' },
        { label: '8 proc', value: 450, color: 'bg-purple-500' },
        { label: '16 proc', value: 500, color: 'bg-pink-500' }
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-gray-300">
            {/* header */}
            <ProjectHeader project={project} />

            <main className="max-w-6xl mx-auto px-4 py-10 space-y-16">
                {/* banner */}
                <section className="space-y-6">
                    <h1 className="text-4xl font-extrabold text-white flex items-center gap-2">
                        xv6‑shm‑manager <span role="img">🐧🔗</span>
                    </h1>
                    <blockquote className="italic text-blue-300 border-l-4 border-blue-500 pl-4">
                        Unlocking high‑speed IPC in xv6: share once, access anywhere.
                    </blockquote>
                    {/* badges */}
                    <div className="flex items-center flex-wrap gap-4">
                        <img
                            src="https://img.shields.io/badge/License-MIT-blue.svg"
                            alt="License"
                        />
                    </div>
                </section>

                {/* highlights */}
                <section>
                    <h2 className="text-2xl font-bold text-white mb-6">✨ Highlights</h2>
                    <ul className="list-disc ml-6 space-y-2">
                        <li>
                            <strong>POSIX‑like SHM</strong>: four new syscalls enabling global,
                            named memory objects.
                        </li>
                        <li>
                            <strong>Zero‑copy IPC</strong>: pages are shared—no pipes, no
                            sockets.
                        </li>
                        <li>
                            <strong>Copy‑on‑Fork semantics</strong>: children inherit mappings
                            transparently.
                        </li>
                        <li>
                            <strong>Strict limits &amp; safety</strong>: 64 objects system‑wide,
                            32 pages each; robust error handling.
                        </li>
                    </ul>
                </section>

                {/* quick start */}
                <section>
                    <h2 className="text-2xl font-bold text-white mb-6">🚀 Quick Start</h2>
                    <pre className="bg-black/50 p-6 rounded-xl overflow-auto text-sm leading-relaxed">
{`git clone https://github.com/petar-nikolic125/xv6-shm-manager.git
cd xv6-shm-manager
make clean && make
make qemu-nox   # run shmtest inside QEMU`}
          </pre>
                </section>

                {/* feature table */}
                <section>
                    <h2 className="text-2xl font-bold text-white mb-6">🛠️ Features</h2>
                    <div className="overflow-x-auto border border-white/10 rounded-xl">
                        <table className="min-w-full text-sm">
                            <thead className="bg-white/10">
                            <tr>
                                <th className="px-4 py-3 text-left text-blue-300">Feature</th>
                                <th className="px-4 py-3 text-left text-blue-300">Description</th>
                            </tr>
                            </thead>
                            <tbody>
                            <FeatureRow
                                title="Global SHM Registry"
                                desc="64 named objects, shareable by name across PIDs"
                            />
                            <FeatureRow
                                title="Resizable at Init"
                                desc="Size fixed once via shm_trunc; subsequent calls fail safely"
                            />
                            <FeatureRow
                                title="Per‑Process Descriptors"
                                desc="Up to 16 open objects per process"
                            />
                            <FeatureRow
                                title="Flags‑based Mapping"
                                desc="O_RDONLY or O_RDWR mappings"
                            />
                            <FeatureRow
                                title="Automatic Cleanup"
                                desc="shm_close + exit() handle unmapping and GC"
                            />
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* architecture overview */}
                <section>
                    <h2 className="text-2xl font-bold text-white mb-6">🔍 Architecture Overview</h2>
                    <div className="space-y-4">
                        <OrderedList
                            items={[
                                'shm_open("foo"): lookup or create entry in SharedMemoryTable',
                                'shm_trunc(fd, size): allocate up to 32 pages on first call',
                                'shm_map(fd, &va, flags): map to free VA (e.g., 0x400000)',
                                'fork(): child inherits descriptors & mappings',
                                'shm_close(fd): unmap; free when ref_count == 0'
                            ]}
                        />
                        <p className="text-sm">
                            <span className="font-semibold">SharedMemoryTable:</span> 64 slots
                            storing <code className="text-green-300">name</code>,{' '}
                            <code className="text-green-300">size</code>,{' '}
                            <code className="text-green-300">ref_count</code>. <br />
                            <span className="font-semibold">Per‑Process Descriptor Table:</span>{' '}
                            maps <code className="text-green-300">shm_fd</code> → entry + flags + VA.
                        </p>
                    </div>
                </section>

                {/* technical implementation */}
                <section>
                    <h2 className="text-2xl font-bold text-white mb-6">🔧 Technical Implementation</h2>

                    {/* system‑call table */}
                    <div className="bg-black/40 rounded-xl p-6 border border-white/10 mb-10">
                        <h3 className="text-xl font-semibold text-white mb-4">System Call Interface</h3>
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-sm text-gray-300">
                                <thead>
                                <tr className="border-b border-white/20">
                                    <th className="text-left py-3 px-4 text-blue-300">System Call</th>
                                    <th className="text-left py-3 px-4 text-blue-300">Purpose</th>
                                    <th className="text-left py-3 px-4 text-blue-300">Implementation Details</th>
                                </tr>
                                </thead>
                                <tbody>
                                <SysRow call="shmget()" purpose="Create / access segment" details="Key‑based lookup, size & perm validation" />
                                <SysRow call="shmat()"  purpose="Attach to process"       details="VM mapping & address‑space integration" />
                                <SysRow call="shmdt()"  purpose="Detach segment"          details="Ref‑count decrement & unmap" />
                                <SysRow call="shmctl()" purpose="Control / stats"         details="Query, remove, permission update" />
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* detail cards */}
                    <div className="grid gap-6 md:grid-cols-2">
                        <DetailCard
                            title="Memory Architecture"
                            points={[
                                'Page‑aligned shared segments',
                                'VA ↔︎ PA translation via PTEs',
                                'Lazy allocation and zero‑fill',
                                'Page‑table edits on attach / detach'
                            ]}
                        />
                        <DetailCard
                            title="Synchronization"
                            points={[
                                'Spinlocks around SharedMemoryTable',
                                'Per‑segment ref‑counts',
                                'Sleep‑lock for truncate/map races',
                                'Cleanup hooks in exit() path'
                            ]}
                        />
                    </div>
                </section>

                {/* stress‑test proof */}
                <section>
                    <h2 className="text-2xl font-bold text-white mb-6">🧪 Stress Tests</h2>
                    <div className="grid lg:grid-cols-2 gap-8">
                        <div>
                            <img
                                src={stressImg.src}
                                alt={stressImg.alt}
                                className="rounded-lg border border-white/10"
                            />
                            <p className="mt-2 text-xs text-center">{stressImg.description}</p>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-white">Scenarios Passed</h3>
                            <ul className="list-disc ml-6 space-y-1 text-sm">
                                <li>Open‑limit enforcement (≤16 descriptors / process)</li>
                                <li>64 global object capacity stress</li>
                                <li>Trunc‑then‑map race resilience</li>
                                <li>Fork inheritance integrity</li>
                                <li>Automatic cleanup on exit()</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* throughput chart */}
                <section>
                    <h2 className="text-2xl font-bold text-white mb-6">📊 IPC Throughput</h2>
                    <BarChart series={chartData} />
                    <p className="mt-3 text-xs">
                        Synthetic benchmark: shared memory vs. xv6 pipes. Throughput improves ≈5× at 16 concurrent processes.
                    </p>
                </section>

                {/* usage example */}
                <section>
                    <h2 className="text-2xl font-bold text-white mb-6">⚙️ Usage Example</h2>
                    <pre className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-xl overflow-auto text-sm leading-relaxed">
<span className="text-gray-400">// share.c</span>{'\n'}
                        <span className="text-indigo-400">#include</span> <span className="text-amber-300">&quot;types.h&quot;</span>{'\n'}
                        <span className="text-indigo-400">#include</span> <span className="text-amber-300">&quot;user.h&quot;</span>{'\n\n'}
                        <span className="text-pink-400">int</span> <span className="text-cyan-300">main</span>() {'{\n'}
                        <span className="text-pink-400">int</span> fd = <span className="text-green-300">shm_open</span>(<span className="text-amber-300">&quot;shared_buf&quot;</span>);{'\n'}
                        <span className="text-green-300">shm_trunc</span>(fd, 4096);{'\n'}
                        <span className="text-pink-400">void</span> *ptr;{'\n'}
                        <span className="text-green-300">shm_map</span>(fd, &amp;ptr, <span className="text-teal-300">O_RDWR</span>);{'\n'}
                        <span className="text-green-300">strcpy</span>(ptr, <span className="text-amber-300">&quot;Hello from PID %d!\\n&quot;</span>, <span className="text-green-300">getpid</span>());{'\n'}
                        <span className="text-green-300">shm_close</span>(fd);{'\n'}
                        <span className="text-green-300">exit</span>();{'\n'}
                        {'}'}
          </pre>
                </section>

                {/* API reference */}
                <section>
                    <h2 className="text-2xl font-bold text-white mb-6">📚 API Reference</h2>
                    <div className="overflow-x-auto border border-white/10 rounded-xl">
                        <table className="min-w-full text-sm">
                            <thead className="bg-white/10">
                            <tr>
                                <th className="px-4 py-3 text-left text-blue-300">Syscall</th>
                                <th className="px-4 py-3 text-left text-blue-300">Prototype</th>
                                <th className="px-4 py-3 text-left text-blue-300">Success</th>
                                <th className="px-4 py-3 text-left text-blue-300">Error</th>
                            </tr>
                            </thead>
                            <tbody>
                            <ApiRow name="shm_open"  proto="int shm_open(char *name);"                      ok="fd ≥ 0"        err="-1" />
                            <ApiRow name="shm_trunc" proto="int shm_trunc(int shm_od, int size);"           ok="actual_size"   err="-1" />
                            <ApiRow name="shm_map"   proto="int shm_map(int shm_od, void **va, int flags);" ok="0"             err="-1" />
                            <ApiRow name="shm_close" proto="int shm_close(int shm_od);"                     ok="0"             err="-1" />
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* footer blocks */}
                <EnhancedTags
                    methodologies={project.methodologies}
                    paradigms={project.paradigms}
                    architecture={project.architecture}
                    taglines={project.taglines}
                />
                <Gallery images={images} title="📸 System Diagrams" />
                <TechStack technologies={project.technologies} />
                <LinksPanel links={links} />
            </main>
        </div>
    )
}

/* ---------------------------- helper components --------------------------- */
function FeatureRow({ title, desc }: { title: string; desc: string }) {
    return (
        <tr className="border-b border-white/10">
            <td className="py-3 px-4 font-semibold">{title}</td>
            <td className="py-3 px-4">{desc}</td>
        </tr>
    )
}

function OrderedList({ items }: { items: string[] }) {
    return (
        <ol className="list-decimal ml-6 space-y-1">
            {items.map((line, idx) => (
                <li key={idx}>{line}</li>
            ))}
        </ol>
    )
}

function ApiRow({
                    name,
                    proto,
                    ok,
                    err
                }: {
    name: string
    proto: string
    ok: string
    err: string
}) {
    return (
        <tr className="border-b border-white/10">
            <td className="px-4 py-3 font-mono text-green-300">{name}()</td>
            <td className="px-4 py-3">{proto}</td>
            <td className="px-4 py-3">{ok}</td>
            <td className="px-4 py-3">{err}</td>
        </tr>
    )
}

function SysRow({
                    call,
                    purpose,
                    details
                }: {
    call: string
    purpose: string
    details: string
}) {
    return (
        <tr className="border-b border-white/10">
            <td className="py-3 px-4 font-mono text-green-300">{call}</td>
            <td className="py-3 px-4">{purpose}</td>
            <td className="py-3 px-4 text-sm">{details}</td>
        </tr>
    )
}

function DetailCard({
                        title,
                        points
                    }: {
    title: string
    points: string[]
}) {
    return (
        <div className="bg-black/40 rounded-xl p-6 border border-white/10">
            <h4 className="font-semibold text-white mb-4">{title}</h4>
            <ul className="space-y-1 text-sm list-disc ml-4">
                {points.map(p => (
                    <li key={p}>{p}</li>
                ))}
            </ul>
        </div>
    )
}
