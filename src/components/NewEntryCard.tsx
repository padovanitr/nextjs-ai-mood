'use client'

import { revalidatePath } from 'next/cache'
import { useRouter } from 'next/navigation'

const NewEntry = () => {
  const router = useRouter()

  const handleOnClick = async () => {}

  return (
    <div
      className="cursor-pointer overflow-hidden rounded-lg bg-white shadow"
      onClick={handleOnClick}
    >
      <div className="px-4 py-5 sm:p-6">
        <span className="text-3xl">New Entry</span>
      </div>
    </div>
  )
}

export default NewEntry
