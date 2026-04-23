'use client'

import { createContext, useContext } from 'react'

type MessageLeaf = string

interface MessageMap {
  [key: string]: MessageLeaf | MessageMap
}

type Messages = MessageMap

interface LocaleContextValue {
  locale: string
  messages: Messages
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

export function LocaleProvider({
  children,
  locale,
  messages,
}: {
  children: React.ReactNode
  locale: string
  messages: Messages
}) {
  return (
    <LocaleContext.Provider value={{ locale, messages }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale() {
  const context = useContext(LocaleContext)

  if (!context) {
    throw new Error('useLocale must be used within a LocaleProvider')
  }

  return context.locale
}

export function useTranslations(namespace: string) {
  const context = useContext(LocaleContext)

  if (!context) {
    throw new Error('useTranslations must be used within a LocaleProvider')
  }

  const section = context.messages[namespace]

  return (key: string) => {
    if (section && typeof section === 'object' && key in section) {
      const value = section[key]
      return typeof value === 'string' ? value : key
    }

    return key
  }
}
