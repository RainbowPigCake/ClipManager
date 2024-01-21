import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ClipGrid from './ClipGrid'
import ClipViewer from './ClipViewer'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<ClipGrid/>} />
          <Route path="/view/:file" element={<ClipViewer></ClipViewer>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
