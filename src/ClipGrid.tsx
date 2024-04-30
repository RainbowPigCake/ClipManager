import React, { useEffect, useState } from 'react'
import Clip from './Clip'
import SearchBar from './SearchBar'
import Record from './Record'

import './ClipGrid.css'
import { invoke } from '@tauri-apps/api'
import { useLocation } from 'react-router-dom'

export default function ClipGrid({}) {
  const [clips, setClips] = useState([])
  const state = useLocation()

  useEffect(() => {
    if (state.state !== null) {
      setClips(state.state.clips)
    }
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

  const saveClipGridState = (filePath, navigate) => {
    let path = `/view/${encodeURI(filePath)}`
    navigate(path, { state: { clips } })
  }

  return (
    <>
      <div className="topPanel">
        <SearchBar onRefresh={refreshClips} />
        <Record />
      </div>
      <div className="list-container">
        {clips.map((clip) => (
          <div key={clip.id}>
            <Clip
              key={clip.id}
              filePath={clip.path}
              saveClipGridState={saveClipGridState}
            />
          </div>
        ))}
      </div>
    </>
  )
}
