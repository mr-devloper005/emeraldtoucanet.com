'use client'

import { useRouter } from 'next/navigation'
import { useState, type FormEvent } from 'react'
import { useAuth } from '@/lib/auth-context'

export function LoginForm({ actionClassName }: { actionClassName: string }) {
  const { login, isLoading } = useAuth()
  const router = useRouter()
  const [error, setError] = useState('')

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const email = String(new FormData(form).get('email') ?? '').trim()
    const password = String(new FormData(form).get('password') ?? '')
    if (!email || !password) {
      setError('Enter your email and password.')
      return
    }
    setError('')
    await login(email, password)
    router.push('/')
    router.refresh()
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 grid gap-4">
      <input
        name="email"
        type="email"
        autoComplete="email"
        required
        className="h-12 rounded-xl border border-current/10 bg-transparent px-4 text-sm"
        placeholder="Email address"
      />
      <input
        name="password"
        type="password"
        autoComplete="current-password"
        required
        className="h-12 rounded-xl border border-current/10 bg-transparent px-4 text-sm"
        placeholder="Password"
      />
      {error ? <p className="text-sm text-red-600 dark:text-red-400">{error}</p> : null}
      <button type="submit" disabled={isLoading} className={`inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-semibold disabled:opacity-60 ${actionClassName}`}>
        {isLoading ? 'Signing in…' : 'Sign in'}
      </button>
    </form>
  )
}
