import type { Preview } from '@storybook/react'
import '../src/app/globals.css'
import { LocaleProvider } from '../src/lib/i18n'

const preview: Preview = {
  globalTypes: {
    direction: {
      name: 'Direction',
      defaultValue: 'ltr',
      toolbar: {
        items: ['ltr', 'rtl'],
      },
    },
    theme: {
      name: 'Theme',
      defaultValue: 'light',
      toolbar: {
        items: ['light', 'dark'],
      },
    },
    locale: {
      name: 'Locale',
      defaultValue: 'en',
      toolbar: {
        items: ['en', 'ar'],
      },
    },
  },
  decorators: [
    (Story, context) => {
      const { direction, theme, locale } = context.globals
      document.documentElement.dir = direction
      document.documentElement.lang = locale
      document.documentElement.classList.toggle('dark', theme === 'dark')

      const messages = {
        navigation: {
          dashboard: locale === 'ar' ? 'لوحة التحكم' : 'Dashboard',
        },
      }

      return (
        <LocaleProvider locale={locale} messages={messages}>
          <div className={theme === 'dark' ? 'dark bg-background p-6' : 'bg-background p-6'}>
            <Story />
          </div>
        </LocaleProvider>
      )
    },
  ],
}

export default preview
