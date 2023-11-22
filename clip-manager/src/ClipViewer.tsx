import React from 'react'
import { useParams } from 'react-router-dom'
import { appDataDir, join } from '@tauri-apps/api/path'
import { convertFileSrc } from '@tauri-apps/api/tauri'
import ReactPlayer from 'react-player'

export default function ClipViewer() {
  const { file } = useParams()
  const clipURI = convertFileSrc(decodeURI(file))

  return (
    <>
      <div>{decodeURI(file)}</div>
      <ReactPlayer
        playing
        url={[{ src: clipURI, type: 'video/mp4' }]}
        width={1200}
        height={675}
        controls
      />
    </>
  )
}
