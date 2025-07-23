import personalRaw   from '@/data/personal.json'
import experienceRaw from '@/data/experience.json'
import projectsRaw    from '@/data/projects.json'

import { Personal, Experience, Project } from '@/data/schemas'

export const personal   = Personal.parse(personalRaw)
export const experience = Experience.parse(experienceRaw)
export const projects   = Project.array().parse(projectsRaw)

/* handy enums -------------------------------------------------------------- */
export const typeOptions         = [...new Set(projects.map(p => p.type))]
export const availabilityOptions = [...new Set(projects.map(p => p.availability))]
export const categoryOptions     = [...new Set(projects.map(p => p.category))]
