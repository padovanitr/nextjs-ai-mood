'use client'

import { useClerk } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

export const SignOutButton = () => {
  const { signOut } = useClerk()
  const router = useRouter()

  const handleSignOut = () => {
    signOut()
    router.push('/')
  }

  return <button onClick={handleSignOut}>Sign out</button>
}
