/* ─────────────── src/data/schemas.ts ────────────────
   Ultra‑relaxed Zod schema collection – all fields optional,
   unknown keys preserved via .passthrough()
   ---------------------------------------------------- */

import { z } from 'zod'

/* helpers ─────────────────────────────────────────── */
const Id    = z.union([z.string(), z.number()]).optional()   // id may be absent
const Txt   = z.string().optional()                          // optional string
const ArrS  = z.array(z.string()).optional()                 // optional string[]
const Ribbon = z.enum(['LIVE', 'HOT', 'NEW']).optional()     // optional tag

/* 1 · PERSONAL ─────────────────────────────────────── */
export const Social = z.record(z.string()).optional()

export const Personal = z.object({
    id:        Id,
    name:      Txt,
    title:     Txt,
    subtitle:  Txt,
    location:  Txt,
    social:    Social,
}).passthrough()

/* 2 · EXPERIENCE ───────────────────────────────────── */
export const WorkItem = z.object({
    id:         Id,
    type:       z.literal('work').optional(),
    period:     Txt,
    heading:    Txt,
    subHeading: Txt,
    subText:    Txt,
    logo:       Txt,
    emoji:      Txt,
    ribbon:     Ribbon,
    tech:       ArrS,
    metrics:    ArrS,
    liveUrl:    Txt,
}).passthrough()

export const EduItem = z.object({
    id:         Id,
    type:       z.literal('edu').optional(),
    period:     Txt,
    heading:    Txt,
    subHeading: Txt,
    subText:    Txt,
    logo:       Txt,
    emoji:      Txt,
    ribbon:     Ribbon,
    metrics:    ArrS,
    docUrl:     Txt,
}).passthrough()

export const Experience = z.object({
    work:       z.array(WorkItem).optional(),
    education:  z.array(EduItem).optional(),
}).passthrough()

/* 3 · SKILLS ───────────────────────────────────────── */
export const SkillCol = z.object({
    category: Txt,
    items: z.array(
        z.object({
            label: z.string(),
            icon:  Txt,
        }).passthrough()
    ).optional(),
}).passthrough()

/* 4 · PROJECTS ─────────────────────────────────────── */
export const Project = z.object({
    id:          Id,
    slug:        Txt,          // optional friendly URL key
    name:        Txt,
    description: Txt,
    image:       Txt,
    technologies: ArrS,
    liveUrl:     Txt,
    sourceUrl:   Txt,
    docsUrl:     Txt,
    type:        Txt,
    availability: Txt,
    category:    Txt,
    ribbon:      Ribbon,
}).passthrough()
