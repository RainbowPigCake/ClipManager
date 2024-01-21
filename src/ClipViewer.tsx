import React, { useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { appDataDir, join } from '@tauri-apps/api/path'
import { convertFileSrc } from '@tauri-apps/api/tauri'
import ReactPlayer from 'react-player'

export default function ClipViewer() {
  const { file } = useParams()
  const clipURI = convertFileSrc(decodeURI(file))

  const navigate = useNavigate()
  const location = useLocation()
  const { state } = location

  const changeRoute = () => {
    let path = `/`
    navigate(path, { state })
  }
  useEffect(() => {
    console.log('Rendering ClipViewer!')
  }, [])
  return (
    <>
      <div>
        <button onClick={changeRoute}>← Back</button>
        <div>{decodeURI(file)}</div>
        <ReactPlayer
          playing
          url={[{ src: clipURI, type: 'video/mp4' }]}
          width={1120}
          height={630}
          controls
        />
      </div>
    </>
  )
}
