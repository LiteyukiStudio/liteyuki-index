import type { Language, TranslationKeys } from "./types"
import { zh } from "./locales/zh"
import { en } from "./locales/en"

// 语言资源映射
const translations: Record<Language, TranslationKeys> = {
  zh,
  en,
}

// 默认语言
const DEFAULT_LANGUAGE: Language = "zh"

// 获取浏览器语言
export const getBrowserLanguage = (): Language => {
  if (typeof window === "undefined") return DEFAULT_LANGUAGE

  const browserLang = navigator.language.toLowerCase()
  if (browserLang.startsWith("zh")) return "zh"
  if (browserLang.startsWith("en")) return "en"

  return DEFAULT_LANGUAGE
}

// 从本地存储获取语言
export const getStoredLanguage = (): Language => {
  if (typeof window === "undefined") return DEFAULT_LANGUAGE

  const stored = localStorage.getItem("language") as Language
  return stored && Object.keys(translations).includes(stored) ? stored : DEFAULT_LANGUAGE
}

// 保存语言到本地存储
export const setStoredLanguage = (language: Language): void => {
  if (typeof window === "undefined") return
  localStorage.setItem("language", language)
}

// 获取翻译文本
export const getTranslation = (language: Language, key: keyof TranslationKeys): string => {
  return translations[language]?.[key] || translations[DEFAULT_LANGUAGE][key] || key
}

// 获取所有支持的语言
export const getSupportedLanguages = (): Language[] => {
  return Object.keys(translations) as Language[]
}

// 检查是否为支持的语言
export const isSupportedLanguage = (lang: string): lang is Language => {
  return Object.keys(translations).includes(lang)
}
