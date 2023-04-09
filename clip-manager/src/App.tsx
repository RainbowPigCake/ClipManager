import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import Clip  from "./Clip";
import ClipGrid from "./ClipGrid";

function App() {
  const [clips, setClips] = useState(["Clip1", "Clip2", "Clip3", "Clip4", "Clip", "Clip", "Clip", "Clip", "Clip", "Clip", "Clip", "Clip", "Clip", "Clip", "Clip", "Clip", "ClipLast"]);
  return (
    <>
      <ClipGrid clips={clips}/>
    </>
  )
}

export default App;
