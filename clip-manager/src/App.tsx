import { useState, useEffect } from 'react'
import { invoke } from '@tauri-apps/api/tauri'
import {
  BrowserRouter as Router,
  Route,
  useLocation,
  Routes,
} from 'react-router-dom'
import ClipGrid from './ClipGrid'
import ClipViewer from './ClipViewer'

interface Clip {
  id: string
  path: string
}

function App() {
  const [clips, setClips] = useState<Clip[]>([])

  useEffect(() => {
    // refreshClips('')
  }, [])

  const refreshClips = (dir) => {
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
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<ClipGrid clips={clips} onRefresh={refreshClips} />} />
          <Route path="/view/:file" element={<ClipViewer></ClipViewer>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
