import React, { useState } from 'react'
import Clip from './Clip'
// import { Stack } from '@mui/material
import './ClipGrid.css'

interface ClipGridProps {
  clips: Array<{ id: string; path: string }>
}

export default function ClipGrid({ clips }) {
  function handleClipOnClick(e: any) {
    e.preventDefault()
    console.log('test')
  }
  return (
    <div className="list-container">
      {clips.map((clip: any) => (
        <div key={clip.id} className="list-item" onClick={handleClipOnClick}>
          <Clip key={clip.id} file={clip.path} />
        </div>
      ))}
    </div>
  )
}
