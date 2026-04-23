import { useTranslations } from 'next-intl'
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { LanguageToggle } from "@/components/ui/language-toggle"
import { DirectionalChevron } from "@/components/ui/directional-chevron"

export default function Home() {
  const t = useTranslations('common')

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to PharmaBridge</h1>
        <p className="text-lg mb-8">Unified Pharmaceutical Ecosystem Platform</p>
        <div className="flex gap-4 mb-4">
          <ThemeToggle />
          <LanguageToggle />
        </div>
        <div className="flex items-center gap-2">
          <span>{t('save')}</span>
          <DirectionalChevron className="w-4 h-4" />
        </div>
      </div>
    </main>
  )
}