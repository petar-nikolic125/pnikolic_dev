/* client/src/hooks/useSkills.tsx */
import skillsRaw from '@/data/skills.json'
import { SkillCol } from '@/data/schemas'
import * as Si from '@icons-pack/react-simple-icons'
import { FC } from 'react'

/** Minimal prop shape every Simple‑Icon component accepts */
type IconProps = { size?: number; className?: string }
type IconComponent = FC<IconProps>

/* ---------- emoji helper ---------- */
const makeEmoji = (glyph: string): IconComponent =>
    ({ size = 32, className = '' }) => (
        <span
            role="img"
            aria-label="emoji"
            style={{ fontSize: size, lineHeight: 1 }}
            className={className}
        >
      {glyph}
    </span>
    )

/* ---------- safe dynamic lookup ---------- */
const simpleIconMap: Record<string, IconComponent> =
    Si as unknown as Record<string, IconComponent> /* see explanation */

export const skills = SkillCol.array()           // runtime schema
    .parse(skillsRaw)                              // validate JSON
    .map(col => ({
        ...col,
        items: col.items.map(it => ({
            ...it,
            Icon: it.icon.startsWith('emoji:')
                ? makeEmoji(it.icon.slice(6))
                : simpleIconMap[it.icon] ?? (() => <>❓</>)
        }))
    }))
