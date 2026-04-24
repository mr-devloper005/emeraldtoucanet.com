'use client'

import { useRouter } from 'next/navigation'
import { useState, type FormEvent } from 'react'
import { useAuth } from '@/lib/auth-context'

export function RegisterForm({ actionClassName }: { actionClassName: string }) {
  const { signup, isLoading } = useAuth()
  const router = useRouter()
  const [error, setError] = useState('')

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const name = String(fd.get('name') ?? '').trim()
    const email = String(fd.get('email') ?? '').trim()
    const password = String(fd.get('password') ?? '')
    if (!name || !email || !password) {
      setError('Fill in name, email, and password.')
      return
    }
    setError('')
    await signup(name, email, password)
    router.push('/')
    router.refresh()
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 grid gap-4">
      <input
        name="name"
        type="text"
        autoComplete="name"
        required
        className="h-12 rounded-xl border border-current/10 bg-transparent px-4 text-sm"
        placeholder="Full name"
      />
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
        autoComplete="new-password"
        required
        className="h-12 rounded-xl border border-current/10 bg-transparent px-4 text-sm"
        placeholder="Password"
      />
      <input
        name="intent"
        type="text"
        className="h-12 rounded-xl border border-current/10 bg-transparent px-4 text-sm"
        placeholder="What are you creating or publishing? (optional)"
      />
      {error ? <p className="text-sm text-red-600 dark:text-red-400">{error}</p> : null}
      <button type="submit" disabled={isLoading} className={`inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-semibold disabled:opacity-60 ${actionClassName}`}>
        {isLoading ? 'Creating account…' : 'Create account'}
      </button>
    </form>
  )
}
