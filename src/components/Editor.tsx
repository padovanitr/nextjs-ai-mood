'use client'

import { updateEntry } from '@/utils/api'
import { JournalEntry } from '@prisma/client'
import { useState } from 'react'
import { useAutosave } from 'react-autosave'
import Spinner from './Spinner'

interface EditorProps {
  entry:
    | ({
        analysis: {
          id: string
          createdAt: Date
          updatedAt: Date
          entryId: string
          mood: string
          summary: string
          color: string
          negative: boolean
          subject: string
        } | null
      } & {
        id: string
        createdAt: Date
        updatedAt: Date
        userId: string
        content: string
      })
    | null
}

const Editor = ({ entry }: EditorProps) => {
  const [text, setText] = useState(entry?.content)
  const [isSaving, setIsSaving] = useState(false)
  const [analysis, setAnalysis] = useState(entry?.analysis)

  const { mood, summary, color, subject, negative } = analysis ?? {}
  console.log('mood', mood)
  const analysisData = [
    { name: 'Summary', value: summary },
    { name: 'Subject', value: subject },
    { name: 'Mood', value: mood },
    { name: 'Negative', value: negative ? 'True' : 'False' },
  ]

  useAutosave({
    data: text,
    onSave: async (_text) => {
      if (_text === entry?.content) return
      setIsSaving(true)
      const data = await updateEntry(entry?.id as string, _text as string)
      setAnalysis(data.analysis)
      setIsSaving(false)
    },
  })

  return (
    <div className="relative w-full h-full grid grid-cols-3">
      <div className="absolute left-0 top-0 p-2">
        {isSaving ? (
          <Spinner />
        ) : (
          <div className="w-[16px] h-[16px] rounded-full bg-green-500"></div>
        )}
      </div>
      <div className="col-span-2">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-full text-xl p-8"
        />
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

export default Editor
