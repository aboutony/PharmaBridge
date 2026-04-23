import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata() {
  const t = await getTranslations({ locale: 'ar', namespace: 'common' })

  return {
    title: 'PharmaBridge',
    description: t('loading'),
  }
}

export default function RootRedirect() {
  // This component should not render - the redirect happens in the page component
  return null
}