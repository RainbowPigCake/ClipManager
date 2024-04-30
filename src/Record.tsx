import { useState } from 'react'
// import '@mantine/core/styles.css'
import { NumberInput } from '@mantine/core'

export default function Record() {
  const [recording, setRecording] = useState(false)

  return (
    <>
      <input
        type="button"
        value={recording ? '🔴' : '⚫'}
        onClick={() => {
          setRecording(!recording)
        }}
      />
    </>
  )
}
