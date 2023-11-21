import React, { useState } from 'react'
import './Clip.css'
import { useNavigate } from 'react-router-dom'

export default function Clip({ filePath }) {
  const parsedPath = filePath.split(/[/\\]/).pop()

  let navigate = useNavigate()

  const changeRoute = () => {
    let path = `/view/${encodeURI(filePath)}`
    navigate(path)
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
