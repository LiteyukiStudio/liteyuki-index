"use client"

import { Github, Star, GitFork, ExternalLink, Code, Users, Zap, Heart, Mail } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useI18n } from "../src/hooks/useI18n"
import { LanguageSwitcher } from "../src/components/LanguageSwitcher"
import { projects } from "../src/data/projects"
import Image from 'next/image'

export default function HomePage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  const { t, language } = useI18n()

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    setCurrentYear(new Date().getFullYear())
  }, [])

  const features = [
    {
      icon: <Code className="w-8 h-8" />,
      titleKey: "features.opensource.title" as const,
      descriptionKey: "features.opensource.description" as const,
    },
    {
      icon: <Users className="w-8 h-8" />,
      titleKey: "features.community.title" as const,
      descriptionKey: "features.community.description" as const,
    },
    {
      icon: <Zap className="w-8 h-8" />,
      titleKey: "features.performance.title" as const,
      descriptionKey: "features.performance.description" as const,
    },
    {
      icon: <Heart className="w-8 h-8" />,
      titleKey: "features.developer.title" as const,
      descriptionKey: "features.developer.description" as const,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "stable":
        return "bg-green-500"
      case "beta":
        return "bg-yellow-500"
      case "alpha":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  // 获取工作室名称（根据语言）
  const getStudioName = () => {
    return language === "zh" ? "轻雪工作室" : "Liteyuki Studio"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white overflow-hidden">
      {/* Animated background */}
      <div
        className="fixed inset-0 opacity-30"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.1), transparent 40%)`,
        }}
      />

      {/* Header */}
      <header className="relative z-10 border-b border-white/10 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Image
                src="https://cdn.liteyuki.org/logos/studio.svg"
                alt="Liteyuki Studio Logo"
                width={32}
                height={32}
                className="w-8 h-8"
                onError={(e) => {
                  e.currentTarget.style.display = "none"
                  const fallback = e.currentTarget.nextElementSibling as HTMLElement
                  if (fallback) fallback.style.display = "flex"
                }}
              />
              <div
                className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center"
                style={{ display: "none" }}
              >
                <Code className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold">{getStudioName()}</span>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <Link href="#projects" className="hover:text-blue-300 transition-colors">
                {t("header.projects")}
              </Link>
              <Link href="#about" className="hover:text-blue-300 transition-colors">
                {t("header.about")}
              </Link>
              <Link href="https://lab.liteyuk.org" className="hover:text-blue-300 transition-colors">
                {t("header.community")}
              </Link>
              <LanguageSwitcher />
              <Link
                href="https://github.com/LiteyukiStudio"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 border border-white/20 text-white hover:bg-white/10 rounded-md transition-colors flex items-center"
              >
                <Github className="w-4 h-4 mr-2" />
                {t("header.github")}
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button className="p-2 text-white hover:text-blue-300 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-blue-400 bg-clip-text text-transparent whitespace-pre-line">
              {t("hero.title")}
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">{t("hero.subtitle")}</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="https://github.com/LiteyukiStudio"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-white/20 text-white hover:bg-white/10 rounded-md transition-colors flex items-center justify-center"
              >
                <Github className="w-5 h-5 mr-2" />
                {t("hero.explore")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative z-10 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t("projects.title")}</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">{t("projects.subtitle")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group hover:scale-105 rounded-lg p-6"
              >
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold text-white group-hover:text-blue-300 transition-colors">
                      {project.name}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(project.status)}`} />
                      <span className="text-xs text-gray-400 capitalize">{t(`status.${project.status}`)}</span>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm">{t(project.descriptionKey)}</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-1 bg-white/10 text-white text-xs rounded">{project.language}</span>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 mr-1" />
                        {project.stars.toLocaleString()}
                      </div>
                      <div className="flex items-center">
                        <GitFork className="w-4 h-4 mr-1" />
                        {project.forks}
                      </div>
                    </div>
                  </div>

                  <Link
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full px-4 py-2 border border-blue-400/30 text-blue-200 hover:bg-blue-500/20 hover:text-slate-800 hover:border-blue-300 transition-all rounded-md flex items-center justify-center"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    {t("projects.visit")}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-20 bg-white/5 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t("features.title")}</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">{t("features.subtitle")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">{t(feature.titleKey)}</h3>
                <p className="text-gray-300">{t(feature.descriptionKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">{t("cta.title")}</h2>
            <p className="text-xl text-gray-300 mb-8">{t("cta.subtitle")}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="https://github.com/LiteyukiStudio"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white border-0 rounded-md transition-all flex items-center justify-center"
              >
                <Github className="w-5 h-5 mr-2" />
                {t("cta.contribute")}
              </Link>
              <Link
                href="https://lab.liteyuki.org"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-white/20 text-white hover:bg-white/10 rounded-md transition-colors flex items-center justify-center"
              >
                <Users className="w-5 h-5 mr-2" />
                {t("cta.joinCommunity")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Image
                  src="https://cdn.liteyuki.org/logos/studio.svg"
                  alt="Liteyuki Studio Logo"
                  className="w-8 h-8"
                  width={32}
                  height={32}
                  onError={(e) => {
                    e.currentTarget.style.display = "none"
                    const fallback = e.currentTarget.nextElementSibling as HTMLElement
                    if (fallback) fallback.style.display = "flex"
                  }}
                />
                <div
                  className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center"
                  style={{ display: "none" }}
                >
                  <Code className="w-5 h-5" />
                </div>
                <span className="text-xl font-bold">{getStudioName()}</span>
              </div>
              <p className="text-gray-400">{t("footer.studio.description")}</p>
            </div>
            {/* 产品 */}
            <div>
              <h4 className="font-semibold mb-4">{t("footer.products")}</h4>
              <ul className="space-y-2 text-gray-400">
                {projects.slice(0, 3).map((project) => (
                  <li key={project.id}>
                    <Link
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors"
                    >
                      {project.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            {/* 社区 */}
            <div>
              <h4 className="font-semibold mb-4">{t("footer.community")}</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link
                    href="https://github.com/LiteyukiStudio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors flex items-center"
                  >
                    <Github className="w-4 h-4 mr-2" />
                    {t("contact.github")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://lab.liteyuki.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors flex items-center"
                  >
                    <Users className="w-4 h-4 mr-2" />
                    {t("contact.community")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="mailto:contact@liteyuki.org"
                    className="hover:text-white transition-colors flex items-center"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    {t("contact.email")}
                  </Link>
                </li>
              </ul>
            </div>
            {/* 支持 */}
            <div>
              <h4 className="font-semibold mb-4">{t("footer.support")}</h4>
              <ul className="space-y-2 text-gray-400">
                
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    {t("footer.docs")}
                  </Link>
                </li>
                <li>
                  <Link href="https://cdn.liteyuki.org" className="hover:text-white transition-colors">
                    {t("footer.cdn")}
                  </Link>
                </li>
                <li>
                  <Link href="mailto:contact@liteyuki.org" className="hover:text-white transition-colors">
                    {t("footer.contact")}
                  </Link>
                </li>
                
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-gray-400">
            <p>{t("footer.copyright", { year: currentYear })}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
