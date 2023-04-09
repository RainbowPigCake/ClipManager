import React, { useState } from 'react'
import Clip from './Clip'
// import { Stack } from '@mui/material
import './ClipGrid.css'

export default function ClipGrid({ clips }) {
  return (
    <div className="list-container">
      {clips.map((clip) => (
        <div key={clip.id} className="list-item">
          <Clip key={clip.id} file={clip} />
        </div>
      ))}
    </div>
  )
}
