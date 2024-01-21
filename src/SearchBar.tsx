import React, { useRef } from 'react'

export default function SearchBar({ onRefresh }) {
  const folderPathRef = useRef('')

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
    </>
  )
}
