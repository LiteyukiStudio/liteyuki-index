"use client"

import { useI18n } from "../hooks/useI18n"
import type { Language } from "../i18n/types"

const languageNames: Record<Language, string> = {
  zh: "中文",
  en: "English",
}

export const LanguageSwitcher = () => {
  const { language, changeLanguage, supportedLanguages } = useI18n()

  return (
    <div className="relative">
      <select
        value={language}
        onChange={(e) => changeLanguage(e.target.value as Language)}
        className="bg-transparent border border-white/20 text-white rounded-md px-3 py-1 text-sm hover:bg-white/10 transition-colors cursor-pointer"
        title="切换语言 / Switch Language"
      >
        {supportedLanguages.map((lang) => (
          <option key={lang} value={lang} className="bg-slate-800 text-white">
            {languageNames[lang]}
          </option>
        ))}
      </select>
    </div>
  )
}
