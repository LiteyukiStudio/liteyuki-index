export interface Project {
  id: string
  name: string
  descriptionKey: keyof import("../i18n/types").TranslationKeys
  stars: number
  forks: number
  language: string
  url: string
  status: "stable" | "beta" | "alpha"
  category?: string
  tags?: string[]
  featured?: boolean
}

export interface ProjectCategory {
  id: string
  nameKey: keyof import("../i18n/types").TranslationKeys
  description?: string
}
