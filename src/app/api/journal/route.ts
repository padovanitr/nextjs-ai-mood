import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

export const POST = async () => {
  const user = await getUserByClerkId()
  console.log('user', user)
  const entry = await prisma.journalEntry.create({
    data: {
      userId: user?.id as string,
      content: 'Write about your day!',
    },
  })

  revalidatePath('/journal')

  return NextResponse.json({ data: entry })
}
