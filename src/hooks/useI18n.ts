"use client"

import { useState, useCallback } from "react"
import type { Language, TranslationKeys } from "../i18n/types"
import {
  getTranslation,
  getBrowserLanguage,
  getStoredLanguage,
  setStoredLanguage,
  getSupportedLanguages,
  isSupportedLanguage,
} from "../i18n"

export const useI18n = () => {
  const [language] = useState<Language>(() => {
    if (typeof window === "undefined") return "zh"
    const stored = getStoredLanguage()
    return stored !== "zh" ? stored : getBrowserLanguage()
  })

  // 切换语言 - 使用页面刷新确保更新
  const changeLanguage = useCallback(
    (newLanguage: Language) => {
      if (isSupportedLanguage(newLanguage) && newLanguage !== language) {
        setStoredLanguage(newLanguage)
        // 在v0环境中使用页面刷新来确保语言切换生效
        window.location.reload()
      }
    },
    [language],
  )

  // 获取翻译文本的函数，支持变量替换
  const t = useCallback(
    (key: keyof TranslationKeys, variables?: Record<string, string | number>): string => {
      let text = getTranslation(language, key)

      // 支持变量替换，如 {year}
      if (variables) {
        Object.entries(variables).forEach(([varKey, varValue]) => {
          text = text.replace(new RegExp(`\\{${varKey}\\}`, "g"), String(varValue))
        })
      }

      return text
    },
    [language],
  )

  // 获取支持的语言列表
  const supportedLanguages = getSupportedLanguages()

  return {
    language,
    changeLanguage,
    t,
    supportedLanguages,
  }
}
