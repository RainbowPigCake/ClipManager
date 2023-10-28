import { useState, useEffect } from 'react'
import { invoke } from '@tauri-apps/api/tauri'
import './App.css'
import Clip from './Clip'
import ClipGrid from './ClipGrid'

interface Clip {
  id: string
  path: string
}

function App() {
  const [clips, setClips] = useState<Clip[]>([])

  useEffect(() => {
    invoke('get_clip_file_paths', {
      directory: 'D:\\programming\\ClipManager\\test',
    }).then((res: string[]) => {
      setClips([])
      res.map((path) => {
        setClips((prevClips) => {
          return [...prevClips, { id: crypto.randomUUID(), path: path }]
        })
      })
    })
  }, [])

  return (
    <>
      <ClipGrid clips={clips} />
    </>
  )
}

export default App
