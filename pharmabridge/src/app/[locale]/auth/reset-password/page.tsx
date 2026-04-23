'use client'

import { AuthLayout } from "@/components/layout/auth-layout"
import { ResetPasswordForm } from "@/components/auth/reset-password-form"

export default function ResetPasswordPage() {
  return (
    <AuthLayout title="Reset your password">
      <ResetPasswordForm />
    </AuthLayout>
  )
}