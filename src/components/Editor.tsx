'use client'

import { updateEntry } from '@/utils/api'
import { JournalEntry } from '@prisma/client'
import { useState } from 'react'
import { useAutosave } from 'react-autosave'
import Spinner from './Spinner'

interface EditorProps {
  entry: JournalEntry | null
}

const Editor = ({ entry }: EditorProps) => {
  const [text, setText] = useState(entry?.content)
  const [currentEntry, setEntry] = useState(entry)
  const [isSaving, setIsSaving] = useState(false)

  useAutosave({
    data: text,
    onSave: async (_text) => {
      if (_text === entry?.content) return
      setIsSaving(true)

      const { data } = await updateEntry(entry?.id as string, _text as string)

      setEntry(data)
      setIsSaving(false)
    },
  })

  return (
    <div className="relative">
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
    </div>
  )
}

export default Editor
