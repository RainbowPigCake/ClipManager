import React, { useEffect, useState } from 'react'
import Clip from './Clip'
import SearchBar from './SearchBar'
import './ClipGrid.css'
import { invoke } from '@tauri-apps/api'

interface Clip {
  id: string
  path: string
}

export default function ClipGrid({}) {
  let [clips, setClips] = useState([])

  useEffect(() => {
    // refreshClips('')
  }, [])

  const refreshClips = (dir) => {
    console.log('Refreshing Clips!')
    invoke('get_clip_file_paths', {
      directory: dir,
    }).then((res) => {
      setClips([])
      res.map((path) => {
        setClips((prevClips) => {
          return [...prevClips, { id: crypto.randomUUID(), path: path }]
        })
      })
    })
  }

  return (
    <>
      <SearchBar onRefresh={refreshClips}/>
      <div className="list-container">
        {clips.map((clip) => (
          <div key={clip.id}>
            <Clip key={clip.id} filePath={clip.path} />
          </div>
        ))}
      </div>
    </>
  )
}
