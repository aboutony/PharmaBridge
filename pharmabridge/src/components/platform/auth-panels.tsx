'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { GlassPanel } from '@/components/platform/glass-panel'
import { useAuthStore } from '@/stores/auth'
import { type AppLocale, getExperienceCopy } from '@/lib/platform-content'

export function LoginPanel({ locale }: { locale: AppLocale }) {
  const copy = getExperienceCopy(locale)
  const router = useRouter()
  const { login } = useAuthStore()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(true)
  const [loading, setLoading] = useState(false)

  return (
    <GlassPanel level={2} tone="teal" className="w-full max-w-xl p-8">
      <h1 className="text-3xl font-bold text-white">{copy.auth.loginTitle}</h1>
      <p className="mt-3 text-base leading-8 text-white/65">{copy.auth.loginBody}</p>

      <form
        className="mt-8 space-y-4"
        onSubmit={async (event) => {
          event.preventDefault()
          setLoading(true)
          await login(email, password, rememberMe)
          router.push(`/${locale}/pharmacy/dashboard`)
        }}
      >
        <label className="block text-sm font-semibold text-white/75">
          {copy.auth.email}
          <input
            className="mt-2 w-full rounded-2xl border border-white/12 bg-white/8 px-4 py-3 text-white outline-none transition placeholder:text-white/35 focus:border-[#60A8D4]"
            placeholder={locale === 'ar' ? 'name@domain.com' : 'name@domain.com'}
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label>
        <label className="block text-sm font-semibold text-white/75">
          {copy.auth.password}
          <input
            className="mt-2 w-full rounded-2xl border border-white/12 bg-white/8 px-4 py-3 text-white outline-none transition placeholder:text-white/35 focus:border-[#60A8D4]"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </label>
        <div className="flex items-center justify-between gap-4">
          <label className="inline-flex items-center gap-2 text-sm text-white/70">
            <input type="checkbox" checked={rememberMe} onChange={(event) => setRememberMe(event.target.checked)} />
            {copy.auth.rememberMe}
          </label>
          <Link href={`/${locale}/auth/reset-password`} className="text-sm font-semibold text-[#60A8D4] hover:text-white">
            {copy.auth.forgotPassword}
          </Link>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-2xl bg-[#148F77] px-5 py-3 text-sm font-semibold text-white shadow-[0_0_20px_rgba(20,143,119,0.28)] transition hover:bg-[#19a387] disabled:opacity-60"
        >
          {loading ? (locale === 'ar' ? 'جارٍ الدخول...' : 'Signing in...') : copy.auth.loginButton}
        </button>
      </form>
    </GlassPanel>
  )
}

export function RegisterPanel({ locale }: { locale: AppLocale }) {
  const copy = getExperienceCopy(locale)
  const router = useRouter()
  const { register } = useAuthStore()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    userType: 'pharmacy' as 'pharmacy' | 'distributor' | 'admin',
  })

  return (
    <GlassPanel level={2} tone="blue" className="w-full max-w-2xl p-8">
      <h1 className="text-3xl font-bold text-white">{copy.auth.registerTitle}</h1>
      <p className="mt-3 text-base leading-8 text-white/65">{copy.auth.registerBody}</p>

      <form
        className="mt-8 grid gap-4 tablet:grid-cols-2"
        onSubmit={async (event) => {
          event.preventDefault()
          setLoading(true)
          await register({
            firstName: form.firstName,
            lastName: form.lastName,
            email: form.email,
            phone: form.phone,
            userType: form.userType,
          })
          router.push(`/${locale}/auth/login`)
        }}
      >
        {([
          ['firstName', copy.auth.firstName],
          ['lastName', copy.auth.lastName],
          ['email', copy.auth.email],
          ['phone', copy.auth.phone],
        ] as const).map(([key, label]) => (
          <label key={key} className="block text-sm font-semibold text-white/75">
            {label}
            <input
              className="mt-2 w-full rounded-2xl border border-white/12 bg-white/8 px-4 py-3 text-white outline-none transition placeholder:text-white/35 focus:border-[#60A8D4]"
              type={key === 'email' ? 'email' : 'text'}
              value={form[key]}
              onChange={(event) => setForm((current) => ({ ...current, [key]: event.target.value }))}
              required={key !== 'phone'}
            />
          </label>
        ))}

        <label className="block text-sm font-semibold text-white/75">
          {copy.auth.accountType}
          <select
            className="mt-2 w-full rounded-2xl border border-white/12 bg-[#0f1726] px-4 py-3 text-white outline-none transition focus:border-[#60A8D4]"
            value={form.userType}
            onChange={(event) => setForm((current) => ({ ...current, userType: event.target.value as 'pharmacy' | 'distributor' | 'admin' }))}
          >
            <option value="pharmacy">{copy.auth.accountTypes.pharmacy}</option>
            <option value="distributor">{copy.auth.accountTypes.distributor}</option>
            <option value="admin">{copy.auth.accountTypes.admin}</option>
          </select>
        </label>

        <label className="block text-sm font-semibold text-white/75">
          {copy.auth.password}
          <input
            className="mt-2 w-full rounded-2xl border border-white/12 bg-white/8 px-4 py-3 text-white outline-none transition focus:border-[#60A8D4]"
            type="password"
            value={form.password}
            onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
            required
          />
        </label>

        <label className="block text-sm font-semibold text-white/75 tablet:col-span-2">
          {copy.auth.confirmPassword}
          <input
            className="mt-2 w-full rounded-2xl border border-white/12 bg-white/8 px-4 py-3 text-white outline-none transition focus:border-[#60A8D4]"
            type="password"
            value={form.confirmPassword}
            onChange={(event) => setForm((current) => ({ ...current, confirmPassword: event.target.value }))}
            required
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="tablet:col-span-2 w-full rounded-2xl bg-[#2471A3] px-5 py-3 text-sm font-semibold text-white shadow-[0_0_20px_rgba(36,113,163,0.28)] transition hover:bg-[#2f85bf] disabled:opacity-60"
        >
          {loading ? (locale === 'ar' ? 'جارٍ الإنشاء...' : 'Creating account...') : copy.auth.registerButton}
        </button>
      </form>
    </GlassPanel>
  )
}

export function ResetPanel({ locale }: { locale: AppLocale }) {
  const copy = getExperienceCopy(locale)
  const router = useRouter()
  const [email, setEmail] = useState('')

  return (
    <GlassPanel level={2} tone="purple" className="w-full max-w-xl p-8">
      <h1 className="text-3xl font-bold text-white">{copy.auth.resetTitle}</h1>
      <p className="mt-3 text-base leading-8 text-white/65">{copy.auth.resetBody}</p>

      <form
        className="mt-8 space-y-4"
        onSubmit={(event) => {
          event.preventDefault()
          router.push(`/${locale}/auth/login`)
        }}
      >
        <label className="block text-sm font-semibold text-white/75">
          {copy.auth.email}
          <input
            className="mt-2 w-full rounded-2xl border border-white/12 bg-white/8 px-4 py-3 text-white outline-none transition placeholder:text-white/35 focus:border-[#60A8D4]"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label>
        <button
          type="submit"
          className="w-full rounded-2xl bg-[#6C3483] px-5 py-3 text-sm font-semibold text-white shadow-[0_0_20px_rgba(108,52,131,0.28)] transition hover:bg-[#7d4598]"
        >
          {copy.auth.resetButton}
        </button>
      </form>
    </GlassPanel>
  )
}
