import React, { useState, useRef } from 'react'
import Clip from './Clip'
import './ClipGrid.css'

interface ClipGridProps {
  clips: Array<{ id: string; path: string }>
}

export default function ClipGrid({ clips, onRefresh }) {
  const folderPathRef = useRef("")

  const handleSubmit = (e) => {
    e.preventDefault()
    onRefresh(folderPathRef.current.value)
  }
  return (
    <>
      <div className="search">
        <form onSubmit={handleSubmit}>
          <label>
            Enter Folder Path:
            <input type="text" name="name" ref={folderPathRef} />
          </label>
          <input type="submit" name="submit" />
        </form>
      </div>
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
