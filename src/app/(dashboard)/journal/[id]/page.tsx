import Editor from '@/components/Editor'
import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'

const getEntry = async (id: string) => {
  const user = await getUserByClerkId()
  const entry = await prisma.jornalEntry.findUnique({
    where: {
      userId_id: {
        userId: user?.id as string,
        id,
      },
    },
    include: {
      analysis: true,
    },
  })

  return entry
}

const EntryPage = async ({ params }: { params: { id: string } }) => {
  return (
    <div className="w-full h-full">
      <Editor />
    </div>
  )
}

export default EntryPage
