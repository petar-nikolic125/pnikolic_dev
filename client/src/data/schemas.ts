/* ─────────────── src/data/schemas.ts ────────────────
   Ultra‑relaxed Zod schema collection – every field optional,
   unknown keys preserved via .passthrough()
   ---------------------------------------------------- */

import { z } from 'zod'

/* helpers */
const Id      = z.union([z.string(), z.number()]).optional()
const Txt     = z.string().optional()
const ArrS    = z.array(z.string()).optional()
const Ribbon  = z.enum(['LIVE', 'HOT', 'NEW']).optional()

/* 1 · PERSONAL */
export const Social = z.record(z.string()).optional()

export const Personal = z.object({
    id: Id,
    name: Txt, title: Txt, subtitle: Txt, location: Txt, social: Social
}).passthrough()

/* 2 · EXPERIENCE */
export const WorkItem = z.object({
    id: Id, type: z.literal('work').optional(),
    period: Txt, heading: Txt, subHeading: Txt, subText: Txt,
    logo: Txt, emoji: Txt, ribbon: Ribbon,
    tech: ArrS, metrics: ArrS,
    liveUrl:  Txt,        // public demo / prod link
    repoUrl:  Txt,        // ← NEW – GitHub / GitLab
    detailUrl: Txt        // ← NEW – internal page (/projects/…)
}).passthrough()

export const EduItem = z.object({
    id: Id, type: z.literal('edu').optional(),
    period: Txt, heading: Txt, subHeading: Txt, subText: Txt,
    logo: Txt, emoji: Txt, ribbon: Ribbon,
    metrics: ArrS, docUrl: Txt,
    repoUrl:  Txt,        // ← NEW
    detailUrl: Txt        // ← NEW
}).passthrough()

export const Experience = z.object({
    work: z.array(WorkItem).optional(),
    education: z.array(EduItem).optional()
}).passthrough()

/* 3 · SKILLS (unchanged) */
export const SkillCol = z.object({
    category: Txt,
    items: z.array(z.object({ label: z.string(), icon: Txt }).passthrough()).optional()
}).passthrough()

/* 4 · PROJECTS  (added repoUrl / detailUrl for symmetry) */
export const Project = z.object({
    id: Id, slug: Txt, name: Txt, description: Txt, image: Txt,
    technologies: ArrS, liveUrl: Txt, sourceUrl: Txt, docsUrl: Txt,
    repoUrl: Txt,       // external SCM
    detailUrl: Txt,     // internal SPA route
    type: Txt, availability: Txt, category: Txt, ribbon: Ribbon
}).passthrough()
