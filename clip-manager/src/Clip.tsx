import React, { useState } from 'react'
import path from 'path'
import './Clip.css'

export default function Clip({ filePath }) {
  const parsedPath = filePath.split(/[/\\]/).pop()
  return (
    <>
      <div className="clip-item">
        <img
          className="clip-thumbnail"
          src="https://media.discordapp.net/attachments/982835971458486322/1174881299014619136/image.png"
        />
        <div className="clip-title">{parsedPath}</div>
      </div>
    </>
  )
}
