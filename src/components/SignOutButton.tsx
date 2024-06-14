'use client'

import { useClerk } from '@clerk/nextjs'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface SignOutButtonProps {
  userImageUrl: string
}

export const SignOutButton = ({ userImageUrl }: SignOutButtonProps) => {
  const [showOptions, setShowOptions] = useState(false)
  const { signOut } = useClerk()
  const router = useRouter()

  const handleSignOut = () => {
    signOut()
    router.push('/')
  }

  return (
    <div className="relative">
      <button onClick={() => setShowOptions((prevState) => !prevState)}>
        <Image
          alt="user picture"
          height={40}
          width={40}
          src={userImageUrl}
          className="rounded-full"
          title="Sign out"
        />
      </button>
      {showOptions && (
        <div className="px-4 py-2 flex bg-white rounded-xl absolute right-2 shadow-lg border-gray-200 border w-28 justify-center hover:bg-gray-100 cursor-pointer">
          <button onClick={handleSignOut}>Sign out</button>
        </div>
      )}
    </div>
  )
}
