import React, { useState } from 'react'
import Box from '@mui/material/Box'
import './Clip.css'
export default function Clip({ file }) {
  return (
    <>
      <img
        className="clip-thumbnail"
        src="https://cdn.discordapp.com/attachments/982835971458486322/1094441933146968144/manatee-oof.png"
      />
      <div className="clip-title">{file}</div>
    </>
  )
}
