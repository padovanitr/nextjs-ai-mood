import Editor from '@/components/Editor'
import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'

const getEntry = async (id: string) => {
  const user = await getUserByClerkId()
  const entry = await prisma.journalEntry.findUnique({
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
  const entry = await getEntry(params.id)
  console.log('entry', entry)
  const { mood, summary, color, subject, negative } = entry?.analysis ?? {}
  console.log('mood', mood)
  const analysisData = [
    { name: 'Summary', value: summary },
    { name: 'Subject', value: subject },
    { name: 'Mood', value: mood },
    { name: 'Negative', value: negative ? 'True' : 'False' },
  ]
  return (
    <div className="w-full h-full grid grid-cols-3">
      <div className="col-span-2">
        <Editor entry={entry} />
      </div>
      <div className="border-l border-black/5">
        <div
          className="h-[100px]  text-white p-8"
          style={{ backgroundColor: color }}
        >
          <h2 className="text-2xl text-black">Analysis</h2>
        </div>
        <div>
          <ul role="list" className="divide-y divide-gray-200">
            {analysisData.map((item) => (
              <li
                key={item.name}
                className="py-4 px-8 flex items-center justify-between"
              >
                <div className="text-xl font-semibold w-1/3">{item.name}</div>
                <div className="text-xl">{item.value}</div>
              </li>
            ))}
            <li className="py-4 px-8 flex items-center justify-between">
              <button
                type="button"
                className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              >
                Delete
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default EntryPage
