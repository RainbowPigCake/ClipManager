import React, { useState } from 'react'
import './Clip.css'
import { useNavigate } from 'react-router-dom'

export default function Clip({ filePath, saveClipGridState }) {
  const parsedPath = filePath.split(/[/\\]/).pop()

  let navigate = useNavigate()

  const changeRoute = () => {
    saveClipGridState(filePath, navigate)
  }

  return (
    <>
      <div className="clip-item" onClick={changeRoute}>
        <img
          className="clip-thumbnail"
          src="https://media.discordapp.net/attachments/982835971458486322/1174881299014619136/image.png"
        />
        <div className="clip-title">{parsedPath}</div>
      </div>
    </>
  )
}
